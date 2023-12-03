import { useState, useEffect } from "react"
import { Button, Snackbar } from "@mui/material"
import { AgGridReact } from "ag-grid-react"
import { fetchTrainings } from "./FetchTrainings"

import dayjs from 'dayjs'

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"

function TrainingList() {
    const [trainings, setTrainings] = useState([])
    const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false)

    useEffect(() => {
      fetchTrainings()
      .then(data => setTrainings(data))
      .catch(error => console.error("Error fetching trainings:", error))
    }, [])

      const deleteTraining = (id) => {
        if(window.confirm("Are you sure you want to delete this training?")) {
          fetch(import.meta.env.VITE_API_URL + "/api/trainings/" + id, {method: "DELETE"}) 
        .then(response => {
          if(!response.ok) {
            throw new Error("Error during deletion" + response.statusText)
          } else {
            setDeleteSnackbarOpen(true)
            fetchTrainings()
          }
        })
        .catch(err => console.log(err))
        }
      }

      const [columnDefs] = useState([
        { field: 'customerName', headerName: 'Customer Name', sortable: true, filter: true,
        valueGetter: params => params.data.customer.firstname + ' ' + params.data.customer.lastname, },
        { field: 'date', headerName: 'Date', sortable: true, filter: true, 
        valueFormatter: params => params.value ? dayjs(params.value).format("DD.MM.YYYY HH:MM") : "" },
        { field: 'duration', headerName: 'Duration', sortable: true, filter: true, width: 140 },
        { field: 'activity', headerName: 'Activity', sortable: true, filter: true },
        {
          cellRenderer: params => <Button variant="outlined" size="small" onClick={() => deleteTraining(params.data.id)}>Delete</Button>,
          width: 120
      },
      ])

    return(
        <>
            <div className="ag-theme-material" style={{ width: '100%', height: 600}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
            <Snackbar
                open={deleteSnackbarOpen}
                autoHideDuration={3000}
                onClose={() => setDeleteSnackbarOpen(false)}
                message="Training deleted succesfully"
            />
        </>
    )

}

export default TrainingList
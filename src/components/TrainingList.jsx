import { useState, useEffect, useCallback, useRef } from "react"
import { Button, IconButton, Snackbar } from "@mui/material"
import { AgGridReact } from "ag-grid-react"
import { fetchTrainings } from "./FetchTrainings"
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import DeleteIcon from '@mui/icons-material/Delete'

import dayjs from 'dayjs'

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"

function TrainingList() {
    const [trainings, setTrainings] = useState([])
    const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false)

    const gridRef = useRef()

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
            fetchTrainings().then(data => setTrainings(data))
          }
        })
        .catch(err => console.log(err))
        }
      }

      const [columnDefs] = useState([
        { field: 'customerName', headerName: 'Customer Name', sortable: true, filter: true,
        valueGetter: params => params.data.customer.firstname + ' ' + params.data.customer.lastname, },
        { field: 'date', headerName: 'Date', sortable: true, filter: true, 
        valueFormatter: params => params.value ? dayjs(params.value).format("DD.MM.YYYY HH:MM") : "", width: 160 },
        { field: 'duration', headerName: 'Duration', sortable: true, filter: true, width: 120 },
        { field: 'activity', headerName: 'Activity', sortable: true, filter: true, width: 140},
        {
          cellRenderer: params => <IconButton color="error" size="small" onClick={() => deleteTraining(params.data.id)}><DeleteIcon /></IconButton>,
          width: 90
      },
      ])

      const onBtnExport = useCallback(() => {
        const params = {
            columnKeys: ["customerName", "date", "duration", "activity"],
            fileName: "trainings.csv"
        }
    
        gridRef.current.api.exportDataAsCsv(params)
    }, [])

    return(
        <>
            <Button onClick={onBtnExport} component="label" variant="contained" startIcon={<FileDownloadIcon />} style={{ marginTop: 7, marginLeft: 4 }}>
                Download CSV
            </Button>
            <div className="ag-theme-material" style={{ width: '100%', height: 600}}>
                <AgGridReact
                    ref={gridRef}
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
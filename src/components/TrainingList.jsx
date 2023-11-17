import { useState, useEffect } from "react"
import { AgGridReact } from "ag-grid-react"

import dayjs from 'dayjs'

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"

function TrainingList() {
    const [trainings, setTrainings] = useState([])

    useEffect(() => {
        fetchTrainings()
    }, [])

    const fetchTrainings = () => {
        fetch(import.meta.env.VITE_API_URL + '/gettrainings')
          .then((response) => {
            if (!response.ok)
              throw new Error("Something went wrong: " + response.statusText)
            return response.json()
          })
          .then(data => setTrainings(data)) 
          .catch(error => console.error("Error fetching trainings:", error))
      };
    
      const [columnDefs] = useState([
        { field: 'customerName', headerName: 'Customer Name', sortable: true, filter: true,
        valueGetter: params => params.data.customer.firstname + ' ' + params.data.customer.lastname, },
        { field: 'date', headerName: 'Date', sortable: true, filter: true, 
        valueFormatter: params => params.value ? dayjs(params.value).format("DD.MM.YYYY HH:MM") : "" },
        { field: 'duration', headerName: 'Duration', sortable: true, filter: true, width: 140 },
        { field: 'activity', headerName: 'Activity', sortable: true, filter: true },
      ]);

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
        </>
    )

}

export default TrainingList
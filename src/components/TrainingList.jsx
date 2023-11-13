import { useState, useEffect } from "react"
import { AgGridReact } from "ag-grid-react"

import dayjs, { Dayjs } from 'dayjs';

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"

function TrainingList() {
    const [trainings, setTrainings] = useState([])

    useEffect(() => {
        fetchTrainings()
    }, [])

    const fetchTrainings = () => {
        fetch("https://traineeapp.azurewebsites.net/api/trainings")
          .then((response) => {
            if (!response.ok)
              throw new Error("Something went wrong: " + response.statusText);
            return response.json();
          })
          .then((data) => {
            //map is used to apply the follwing to the each element of array
            const trainingPromises = data.content.map((training) =>
            // finding the link to the customer
              fetch(training.links.find((link) => link.rel === "customer").href)
                .then((response) => {
                    if (!response.ok)
                        throw new Error("Something went wrong: " + response.statusText);
                    return response.json();
                })
                .then((customerData) => ({
                  ...training,
                  customerName: customerData.firstname + " " + customerData.lastname,
                }))
            );
    
            // Resolve all promises and update state
            Promise.all(trainingPromises).then((updatedTrainings) => {
              setTrainings(updatedTrainings);
            });
          })
          .catch((err) => console.error(err));
      };
    
      const [columnDefs] = useState([
        { field: 'customerName', headerName: 'Customer Name', sortable: true, filter: true },
        { field: 'date', headerName: 'Date', sortable: true, filter: true, 
        valueFormatter: params => params.value ? dayjs(params.value).format("DD.MM.YYYY") : "" },
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
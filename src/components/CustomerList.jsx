import { useState, useEffect, useCallback, useRef } from "react"
import { AgGridReact } from "ag-grid-react"
import { Snackbar, Button  } from "@mui/material"
import AddCustomer from "./AddCustomer"
import EditCustomer from "./EditCustomer"
import AddTraining from "./AddTraining"
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"

function CustomerList() {
    const [customers, setCustomers] = useState([])
    const [open, setOpen] = useState(false)
    const [addTrainingSnackbarOpen, setAddTrainingSnackbarOpen] = useState(false)

    const gridRef = useRef()

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = () => {
        fetch(import.meta.env.VITE_API_URL + '/api/customers')
        .then(response => {
            if(!response.ok)
                throw new Error("Something went wrong: " + response.statusText)
            return response.json()
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {
        if(window.confirm("Are you sure?")) {
            fetch(url, {method: "DELETE"})
        .then(response => {
            if(!response.ok) {
                throw new Error("Error during delition: " + response.statusText)
            } else {
                setOpen(true)
                fetchCustomers()
            }
        }) 
        .catch(error => console.log(error))

        }
    }

    const [columnDefs] = useState([
        { field: 'firstname', sortable: true, filter: true, width: 170},
        { field: 'lastname', sortable: true, filter: true, width: 150},
        { field: 'streetaddress', sortable: true, filter: true},
        { field: 'postcode', sortable: true, filter: true, width: 150},
        { field: 'city', sortable: true, filter: true, width: 170},
        { field: 'email', sortable: true, filter: true, width: 250},
        { field: 'phone', sortable: true, filter: true, width: 140},
        {
            cellRenderer: params => <Button variant="outlined" size="small" onClick={() => deleteCustomer(params.data.links[0].href)}>Delete</Button>,
            width: 120
        },
        {
            cellRenderer: params => <EditCustomer customerdata={params.data} fetchCustomers={fetchCustomers} />,
            width: 120
        },
         {
            cellRenderer: params => <AddTraining customerdata={params.data} fetchCustomers={fetchCustomers} setAddTrainingSnackbarOpen={setAddTrainingSnackbarOpen} />,
            width: 190
        }
    ])

    const onBtnExport = useCallback(() => {
        const params = {
            columnKeys: ["firstname", "lastname", "streetaddress", "postcode", "city", "email", "phone"]
        };
    
        gridRef.current.api.exportDataAsCsv(params);
    }, []);

    return(
        <>
            <AddCustomer fetchCustomers={fetchCustomers} />
            <Button onClick={onBtnExport} component="label" variant="contained" startIcon={<FileDownloadIcon />} style={{ marginTop: 7, marginLeft: 4 }}>
                Download CSV
            </Button>
            <div className="ag-theme-material" style={{ width: '100%', height: 600, marginTop: 7}}>
                <AgGridReact
                    ref={gridRef}
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Customer deleted succesfully"
            />
            <Snackbar
                open={addTrainingSnackbarOpen}
                autoHideDuration={3000}
                onClose={() => setAddTrainingSnackbarOpen(false)}
                message="Training added succesfully"
            />
        </>
    )

}

export default CustomerList
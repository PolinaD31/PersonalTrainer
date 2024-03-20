import { useState, useEffect, useCallback, useRef } from "react"
import { AgGridReact } from "ag-grid-react"
import { Snackbar, Button  } from "@mui/material"
import { fetchCustomers } from "./FetchCustomers"
import AddCustomer from "./AddCustomer"
import EditCustomer from "./EditCustomer"
import AddTraining from "./AddTraining"
import IconButton from '@mui/material/IconButton'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import DeleteIcon from '@mui/icons-material/Delete'

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"

function CustomerList() {
    const [customers, setCustomers] = useState([])
    const [open, setOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState("")

    const gridRef = useRef()

    useEffect(() => {
        fetchCustomers()
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }, [])

    const deleteCustomer = (url) => {
        if(window.confirm("Are you sure?")) {
            // For netlify to not block with "mixed request"
            url = url.replace("http://", "https://")
            fetch(url, {method: "DELETE"})
        .then(response => {
            if(!response.ok) {
                throw new Error("Error during delition: " + response.statusText)
            } else {
                setOpen(true)
                setSnackbarText("Customer deleted succesfully!")
                fetchCustomers().then(data => setCustomers(data.content))
            }
        }) 
        .catch(error => console.log(error))

        }
    }

    const openTrainingAddedSnackbar = (text) => {
        setOpen(true)
        setSnackbarText(text)
    }

    const columnDefs = [
        { field: 'firstname', sortable: true, filter: true, width: 140},
        { field: 'lastname', sortable: true, filter: true, width: 140},
        { field: 'streetaddress', sortable: true, filter: true},
        { field: 'postcode', sortable: true, filter: true, width: 130},
        { field: 'city', sortable: true, filter: true, width: 150},
        { field: 'email', sortable: true, filter: true, width: 200},
        { field: 'phone', sortable: true, filter: true, width: 130},
        {
            cellRenderer: params => 
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <IconButton color="error" size="small" onClick={() => deleteCustomer(params.data.links[0].href)}><DeleteIcon /></IconButton>
            </div>,
            width: 20
        },
        {
            cellRenderer: params => <EditCustomer customerdata={params.data} fetchCustomers={fetchCustomers} setCustomers={setCustomers} />,
            width: 20
        },
         {
            cellRenderer: params => <AddTraining customerdata={params.data} fetchCustomers={fetchCustomers} TrainingSnackbarOpen={openTrainingAddedSnackbar} />,
            width: 150
        }
    ]

    const onBtnExport = useCallback(() => {
        const params = {
            columnKeys: ["firstname", "lastname", "streetaddress", "postcode", "city", "email", "phone"],
            fileName: "customers.csv"
        }
    
        gridRef.current.api.exportDataAsCsv(params)
    }, [])

    return(
        <>
            <AddCustomer fetchCustomers={fetchCustomers} setCustomers={setCustomers} />
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
                message={snackbarText}
            />
        </>
    )

}

export default CustomerList
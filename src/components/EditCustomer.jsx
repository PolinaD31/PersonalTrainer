import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'

export default function EditCustomer({ customerdata, fetchCustomers }) {
  const [open, setOpen] = useState(false)
  const [customer, setCustomer] = useState({
    firstname: "", 
    lastname: "", 
    streetaddress: "", 
    postcode: "", 
    city: "", 
    email: "", 
    phone: ""})


  const handleClickOpen = () => {
    setCustomer({
      firstname: customerdata.firstname, 
      lastname: customerdata.lastname, 
      streetaddress: customerdata.streetaddress, 
      postcode: customerdata.postcode, 
      city: customerdata.city, 
      email: customerdata.email, 
      phone: customerdata.phone
    })
      setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = () => {
    fetch(customerdata.links[0].href, {
        method: 'PUT', 
        headers: { 'Content-type':'application/json' },
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Editing failed: " + response.statusText)

            fetchCustomers()
    })
    .catch(err => console.error(err))

    handleClose()
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <IconButton size="small" color="primary" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Firstname"
            value={customer.firstname}
            onChange={e => setCustomer({...customer, firstname: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Lastname"
            value={customer.lastname}
            onChange={e => setCustomer({...customer, lastname: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Street Address"
            value={customer.streetaddress}
            onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Postcode"
            value={customer.postcode}
            onChange={e => setCustomer({...customer, postcode: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="City"
            value={customer.city}
            onChange={e => setCustomer({...customer, city: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Email"
            value={customer.email}
            onChange={e => setCustomer({...customer, email: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Phone"
            value={customer.phone}
            onChange={e => setCustomer({...customer, phone: e.target.value})}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
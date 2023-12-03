import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers'

export default function AddTraining({ customerdata, fetchTrainings, setAddTrainingSnackbarOpen }) {
  const [open, setOpen] = useState(false)
  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: ""
  })


  const handleClickOpen = () => {
    setOpen(true)
    setTraining({...training, customer: customerdata.links[0].href})
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = () => {
    fetch(import.meta.env.VITE_API_URL + '/api/trainings', {
        method: 'POST', 
        headers: { 'Content-type':'application/json' },
        body: JSON.stringify(training)
        
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Addition failed: " + response.statusText);
        setAddTrainingSnackbarOpen(true)
    })
    .catch(err => console.error(err))

    handleClose()
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
        <div style={{ marginTop: 6 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DateTimePicker
            margin="dense"
            label="Date"
            value={training.date}
            onChange={(date) => setTraining({ ...training, date: date.toISOString() })}
            fullWidth
            variant="standard"
          />
          </LocalizationProvider>
          </div>
          <TextField
            margin="dense"
            label="Activity"
            value={training.activity}
            onChange={e => setTraining({...training, activity: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Duration"
            value={training.duration}
            onChange={e => setTraining({...training, duration: e.target.value})}
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
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AppBar, Toolbar, Button} from '@mui/material'


function App() {

  return (
    <>
      <div className='App'>
        <AppBar position='static'>
          <Toolbar>
            <nav>
            <Button color="inherit" component={Link} to="/">
              Customers
            </Button>
            <Button color="inherit" component={Link} to="/trainings">
              Trainings
            </Button>
            <Button color="inherit" component={Link} to="/calendar">
              Calendar 
            </Button>
            <Button color="inherit" component={Link} to="/chart">
              Activity chart
            </Button>
            </nav>
          </Toolbar>
        </AppBar>
        <Outlet />
      </div>
    </>
  )
}

export default App

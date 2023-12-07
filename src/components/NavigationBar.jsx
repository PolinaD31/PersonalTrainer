import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

function NavigationBar() {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          Personal Trainer
        </Typography>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/">
            Customers
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/trainings">
            Trainings
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/calendar">
            Calendar 
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/chart">
            Activity chart
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default NavigationBar

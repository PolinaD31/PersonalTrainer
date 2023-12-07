import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'


function App() {

  return (
    <>
      <div className='App'>
        <NavigationBar />
        <Outlet />
      </div>
    </>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CustomerList from './components/CustomerList.jsx'
import TrainingList from './components/TrainingList.jsx'
import CalendarPage from './components/Calendar.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ActivityChart from './components/ActivityChart.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [ 
      {
        element: <CustomerList />,
        index: true 
      },
      {
        path: 'trainings',
        element: <TrainingList />
      },
      {
        path: 'calendar',
        element: <CalendarPage />
      },
      {
        path: 'chart',
        element: <ActivityChart />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

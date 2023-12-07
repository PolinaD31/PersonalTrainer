import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { _ } from 'lodash'
import { useState, useEffect } from 'react'
import { fetchTrainings } from './FetchTrainings'

export default function ActivityChart() {
    const [chartActivities, setChartAvtivities] = useState([])

    useEffect(() => {
        fetchTrainings()
          .then(data => {
            setChartAvtivities(prepareTrainingData(data))
          })
          .catch(error => console.error("Error fetching trainings:", error))
      }, [])

    const prepareTrainingData = (trainings) => {
        const groupedData = _.groupBy(trainings, 'activity')
        const preparedData = Object.keys(groupedData).map((activity) => ({
            activity,
            'Duration': _.sumBy(groupedData[activity], 'duration'),
          }))
          return preparedData
    }

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '90vh'}}>
            <BarChart width={1000} height={450} data={chartActivities}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" />
                <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Duration" fill="#8884d8"/>
            </BarChart>
            </div>
        </>
      )
}
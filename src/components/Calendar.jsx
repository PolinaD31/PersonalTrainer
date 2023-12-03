import React, { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { fetchTrainings } from "./FetchTrainings"

const mLocalizer = momentLocalizer(moment)

function CalendarPage() {
  const [trainings, setTrainings] = useState([])  
  const [calendarEvents, setCalendarEvents] = useState([])

  const mapTrainingsToCalendarEvents = (trainings) => {
    return trainings.map((training) => ({
      title: training.activity,
      start: new Date(training.date),
      end: moment(training.date)
        .add(training.duration, "minutes")
        .toDate(),
    }))
  }

  useEffect(() => {
    fetchTrainings()
      .then(data => {
        setTrainings(data)
        setCalendarEvents(mapTrainingsToCalendarEvents(data))
      })
      .catch(error => console.error("Error fetching trainings:", error))
  }, [])

  return (
    <div style={{ height: 600, marginTop: 20 }}>
      <Calendar
        localizer={mLocalizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
}

export default CalendarPage
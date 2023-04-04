import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css"
import React, {useState} from 'react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const locales = {
  "en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events = [
    /*database code for pulling in events made by user*/
    {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2023, 3, 1),
    end: new Date(2023, 3, 1)
  },
  {
    title: "Vacation",
    allDay: true,
    start: new Date(2023, 3, 4),
    end: new Date(2023, 3, 4)
  },
  {
    title: "Work",
    allDay: true,
    start: new Date(2023, 3, 10),
    end: new Date(2023, 3, 10)
  }
]

const ScheduleCalendar = () => {
  //newEvent state tracks the title, start date, and end date of a new event that the user wants to add to the calendar
  const [newEvent, setNewEvent] = useState({ title:"", start: "", end: ""})
  //allEvents state is an array of all events that have been added to the calendar
  const [allEvents, setAllEvents] = useState(events)

  //when the user clicks the button to add a new event. It adds the new event to the allEvents array by updating the state using setAllEvents
  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent])
  }

  return (
    <div>
        <h1>Calendar</h1>
        <div>
            <div style={{float: 'left', width: '300px', marginLeft: '50px' }}>
                <DatePicker placeholderText='Start Date' selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText='End Date' selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <input type='text' placeholder='Add Title' style={{ width: '100%', marginRight: '10px' }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <button style={{ marginTop: '10px', width: '60px', height: '50px', backgroundColor: 'black', color: 'white' }} onClick={handleAddEvent}>Submit</button>
                <div>
                    <ul style={{marginTop: '20px', listStyle: 'none', padding: '30px'}}>
                        {allEvents.map((event, index) => (
                            <li key={index}>{event.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div style={{ marginRight: '30px', float: 'right', width: '600px' }}>
                <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, width: '100%' }} />
            </div>
        </div>
    </div>
  );
}

export default ScheduleCalendar;
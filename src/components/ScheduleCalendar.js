import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css"
import React, {useState, useEffect} from 'react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import moment from "moment"
import emailjs from "@emailjs/browser";  // imported to use emailJS for schedule notification

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

const ScheduleCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [startYear, setStartYear] = useState(0)
  const [startMonth, setStartMonth] = useState(0)
  const [startDay, setStartDay] = useState(0)
  const [endYear, setEndYear] = useState(0)
  const [endMonth, setEndMonth] = useState(0)
  const [endDay, setEndDay] = useState(0)
  const [startHour, setStartHour] = useState(0)
  const [startMinute, setStartMinute] = useState(0)
  const [endHour, setEndHour] = useState(0)
  const [endMinute, setEndMinute] = useState(0)
  const [title, setTitle] = useState('');
  const [events, setEvents] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [busyTimes, setBusyTimes] = useState([]);

  const handleStartDateChange = ((date) => {
    setStartDate(date)
    const { year, month, day } = convertDateString(date);
    setStartYear(year)
    setStartMonth(month)
    setStartDay(day)
  });

  const handleEndDateChange = ((date) => {
    setEndDate(date)
    const { year, month, day } = convertDateString(date);
    setEndYear(year)
    setEndMonth(month)
    setEndDay(day)
  });

  const handleTitleChange = ((event) => {
    setTitle(event.target.value)
  });

  const handleStartTimeChange = ((time) => {
    const { hour, minute } = convertTimeString(time);
    setStartHour(hour)
    setStartMinute(minute)
  });

  const handleEndTimeChange = ((time) => {
    const { hour, minute } = convertTimeString(time);
    setEndHour(hour)
    setEndMinute(minute)
  });


  function convertDateString(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return { 
      year: Number(year), 
      month: Number(month), 
      day: Number(day) 
    }
  };

  function convertTimeString(timeString){
    const formatted = timeString && timeString.format('HH:mm');
    const [hour, minute] = formatted.split(':');

    return {
      hour: Number(hour),
      minute: Number(minute)
    }
  }

  async function handleCreateEvent(e) {
    e.preventDefault()
      await fetch('http://localhost:8000/events', {
      method: 'POST',
      body: JSON.stringify({
        title,
        startYear,
        startMonth,
        startDay,
        endYear,
        endMonth,
        endDay,
        startHour,
        startMinute,
        endHour,
        endMinute,
        isMeeting: false
      }),
      headers: {
        "Content-Type": 'application/json'
      }
    });
    setTitle("")
    setStartDate("")
    setEndDate("")
    setStartTime("")
    setEndTime("")
    fetchEvents()
  }

  // Urvik - EmailJS implementation for schedule builder
  // This is to send an email notification when you schedule a group meeting
  async function handleScheduleEvent(e) {
    e.preventDefault()
      await fetch('http://localhost:8000/events', {
      method: 'POST',
      body: JSON.stringify({
        title,
        startYear,
        startMonth,
        startDay,
        endYear,
        endMonth,
        endDay,
        startHour,
        startMinute,
        endHour,
        endMinute,
        isMeeting: true
      }),
      headers: {
        "Content-Type": 'application/json'
      }
    });
    // we will loop through all the user emails in the group and send each member an email notification
    // for loop is not done yet since we need to pull in group emails
    emailjs.send("service_boqxtij","template_ksuoxyq",{
        message: `Your Meeting will start at ${startDate = new Date}`,
        subject: `New Meeting Scheduled on ${startDate}`,
        email: "urvik95@gmail.com",
        }, "4jG-pY2QT7n7S8m1j");
    // end of emailJS
    setTitle("")
    setStartDate("")
    setEndDate("")
    setStartTime("")
    setEndTime("")
    fetchEvents()
  }


async function handleDelete(id) {
  await fetch(`http://localhost:8000/events/${id}`, {
    method: 'DELETE'
  });
  fetchEvents();
}

  async function fetchEvents(){
    const response  = await fetch('http://localhost:8000/events');
    const eventsData = await response.json(); 
    const events = eventsData.map(event => {
      console.log(event._id)
      return {
        id: event._id,
        title: event.title,
        start: new Date(event.startYear, event.startMonth - 1, event.startDay, event.startHour, event.startMinute),
        end: new Date(event.endYear, event.endMonth - 1, event.endDay, event.endHour, event.endMinute),
        isMeeting: event.isMeeting
      }
    });
    setEvents(events)
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const meetingsArray = events.filter((event) => event.isMeeting);
    const busyArray = events.filter((event) => !event.isMeeting);
    setMeetings(meetingsArray);
    setBusyTimes(busyArray);
  }, [events])
  
  return (
    <div>
        <div>
            <div style={{float: 'left', width: '275px', marginLeft: '50px' }}>
              <DatePicker defaultDate={new Date()}  selected={startDate} onChange={handleStartDateChange} placeholderText='Start Date' />
              <TimePicker
                placeholder="Select Time"
                selected={startTime}
                use12Hours
                showSecond={false}
                focusOnOpen={true}
                minuteStep={15}
                format="hh:mm a"
                onChange={handleStartTimeChange}
              />
              <DatePicker defaultDate={moment().toDate()} selected={endDate} onChange={handleEndDateChange} placeholderText='End Date' />
              <TimePicker
                placeholder="Select Time"
                selected={endTime}
                use12Hours
                showSecond={false}
                focusOnOpen={true}
                minuteStep={15}
                format="hh:mm a"
                onChange={handleEndTimeChange}
              />
                <input value={title} onChange={handleTitleChange} type='text' style={{ width: '100%', marginRight: '10px' }}/>
                <button onClick={handleCreateEvent} style={{ marginTop: '10px', width: '60px', height: '50px', backgroundColor: 'black', color: 'white' }}>Submit</button>
                <br />
                <button onClick={handleScheduleEvent} style={{ marginTop: '10px', width: '80px', height: '50px', backgroundColor: 'black', color: 'white' }}>Schedule Meeting</button>
                <div style={{padding: '30px'}}>
                    <h1>Meetings</h1>
                    <ul style={{listStyle: 'none'}}>
                        {meetings.map((event, index) => (
                          <div>
                            <li key={index}>{event.title}</li>
                            <button onClick={() => handleDelete(event.id)}>Delete</button>
                          </div>
                        ))}
                    </ul>
                    <br />
                    <h1>Busy Times</h1>
                    <ul style={{listStyle: 'none'}}>
                        {busyTimes.map((event, index) => (
                          <div>
                            <li key={index}>{event.title}</li>
                            <button onClick={() => handleDelete(event.id)}>Delete</button>
                          </div>
                        ))}
                    </ul>
                </div>
            </div>
            <div style={{ marginRight: '30px', float: 'right', width: '900px' }}>
              <Calendar min={new Date(0, 0, 0, 8, 0, 0)} max={new Date(0, 0, 0, 21, 0, 0)} defaultView="week" defaultDate={moment().toDate()} localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, width: '100%' }} />
            </div>
        </div>
    </div>
  );
}

export default ScheduleCalendar;
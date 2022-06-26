import './calendarEvents.css'
import { useState, useEffect } from 'react';
import moment from 'moment';
import Event from './Event'
const CalendarEvents = () => {

    const [events, setEvents] = useState([]);


    useEffect(()=>{
        
        const getEvents = async() =>{
            //moment().format('ll')

            const today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0, 0);

            const {schedule, timeStamp} = localStorage.getItem('mvhsio-schedule') ? JSON.parse(localStorage.getItem('mvhsio-schedule')) : {schedule: [], timeStamp: 0};
            
            if(timeStamp === 0 || timeStamp > today.getTime()){
                const today = new Date(moment().format('ll'))
                const tomorrow = new Date(moment().add(1, 'days'))
                const url =`https://www.googleapis.com/calendar/v3/calendars/` +
                `mvla.net_3236303434383738363838@resource.calendar.google.com` +
                `/events?` +
                `key=AIzaSyCfRrWtuQjgV2ekSGkmDn_BROYje60T61c&` +
                `timeMin=${today.toISOString()}&` +
                `timeMax=${tomorrow.toISOString()}`;
    
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    const eventItems = data.items.filter(e => e.start && e.status !== 'cancelled')
                    .sort((e1, e2) => {
                      const e1Date = moment(e1.start.date || e1.start.dateTime);
                      const e2Date = moment(e2.start.date || e2.start.dateTime);
                      return e1Date.valueOf() - e2Date.valueOf();
                    })
                    setEvents(eventItems);
                    
                    const timeStamp = new Date();
                    timeStamp.setHours(0);
                    timeStamp.setMinutes(0);
                    timeStamp.setSeconds(0, 0);

                    localStorage.setItem('mvhsio-schedule', JSON.stringify(
                        {
                            schedule: eventItems,
                            timeStamp: timeStamp
                        }
                    ))
                        
                })
                .catch(err => console.error(err)); 
            }
            else{
                setEvents(schedule);
            }

        }
        getEvents();
    },[])


    return ( 
        <>
            <div className="calendarEvents-container">
                <h1>Events</h1>
                {
                    events.map((item, index)=>{
                        return(
                            <Event summary={item.summary} startTime = {item.start.dateTime} endTime = {item.end.dateTime} key = {index}/>
                        )
                    })
                }
                {
                    events.length === 0 && <h3>No Events For Today</h3>
                }
            </div>
        </>
     );
}
 
export default CalendarEvents;
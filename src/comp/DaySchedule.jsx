import { useCallback, useContext, useState } from "react";
import ScheduleBand from "./ScheduleBand";
import DayScheduleEventEntry from "./DayScheduleEventEntry";
import DayScheduleEventCreator from "./DayScheduleEventCreator";
import TBDCalendarContext from "../context/TBDCalendarContext";
import { sortEventsByTimeRange } from "../Utility";

const dayLookup = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function DaySchedule({schedule, day}) {
  const [eventCreatorActive, setEventCreatorActive] = useState(false);
  const {user} = useContext(TBDCalendarContext);
  
  const renderEvents = useCallback(() => {
    const events = sortEventsByTimeRange(schedule.events);

    if (events.length === 0) {
      return <p>No events</p>
    }

    return events.map((event, idx) => {
      return <DayScheduleEventEntry key={idx} event={event} day={day} user={user}/>
    });
  }, [user]);

  return (<div style={{marginBottom: "150px"}}>
    <ScheduleBand color={schedule.colour}/>
    <h3>{dayLookup[day]}</h3>
    
    <button 
      title="Create a new event" 
      onClick={() => {setEventCreatorActive(!eventCreatorActive)}}
    >
      {eventCreatorActive ? "Cancel" : "Add event"}
    </button>

    {eventCreatorActive && <DayScheduleEventCreator day={day}/>}

    {renderEvents()}
  </div>)
}

export default DaySchedule;
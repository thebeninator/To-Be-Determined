import { useState } from "react";
import ScheduleBand from "./ScheduleBand";

const dayLookup = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function DaySchedule({schedule, day}) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTimeRange, setEventTimeRange] = useState([-1, -1]);
  
  function tryCreateOrUpdateEvent() {
    var invalid = false;
    var invalidReason = "";
    const [start, end] = eventTimeRange;

    if (start > end) {
      invalid = true;
      invalidReason += "Start time cannot be later than the end time\n";
    }

    if (start === -1 || end === -1) {
      invalid = true;
      invalidReason += "Start time or end time not specified\n";
    }

    if (invalid) {
      alert("Could not create/update event, reason(s):\n" + invalidReason);
      return;
    }

    const event = new Event(
      eventName,
      eventDescription,
      eventTimeRange,
      [],
      null,
      user.id
    );
    
    // const success = editingEvent !== null ? updateEvent(user, editingEvent, event) : addEvent(user, event);
    // if (success) {

    // };
  }
  function renderEvents() {
    const events = schedule.events;

    if (events.length === 0) {
      return <p>No events</p>
    }

    return events.map((event, idx) => {
      return <p>event.name</p>
    });
  }

  return (<div>
    <ScheduleBand color={schedule.colour}/>
    <h3>{dayLookup[day]}</h3>
    <button title="Create a new event">+</button>
    {renderEvents()}
  </div>)
}

export default DaySchedule;
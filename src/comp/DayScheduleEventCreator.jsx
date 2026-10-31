import { useContext, useState } from "react";
import { validTimeRange } from "../Utility";
import TimeRangeEntry from "./TimeRangeEntry";
import { addToSchedule } from "../../api/User";
import TBDCalendarContext from "../context/TBDCalendarContext";
import Event from "../obj/Event";

function DayScheduleEventCreator({day}) {
  const {user, updateUser} = useContext(TBDCalendarContext)
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTimeRange, setEventTimeRange] = useState([-1, -1]);

  function clearEvent() {
    setEventName("");
    setEventTimeRange([-1, -1]);
    setEventDescription("");
  }

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
    
    const success = addToSchedule(user, day, event);
    if (success) {
      updateUser({...user});
      clearEvent();
    };
  }

  return (<div style={{border: "solid 1px", padding: "2px", boxSizing: "border-box", width: "fit-content" }}>
    {/* set name */}
    <p>Name</p>
    <input 
      type="text" 
      value={eventName}
      placeholder="Name of the event" 
      maxLength={100}
      onChange={(event) => {
        setEventName(event.target.value);
      }}
    />    

    {/* set description */}
    <p>Description ({eventDescription.length}/1500 characters used)</p>
    <textarea 
      type="text"
      value={eventDescription}
      placeholder="Description of the event"
      maxLength={1500}
      onChange={(event) => {
        setEventDescription(event.target.value);
      }}
    />

    <h3>Time
      <TimeRangeEntry timeRange={eventTimeRange} idx={0} setEventTimeRange={setEventTimeRange}/>
      {" to "}
      <TimeRangeEntry timeRange={eventTimeRange} idx={1} setEventTimeRange={setEventTimeRange}/>
    </h3>    
    {!validTimeRange(eventTimeRange) && <p style={{fontSize: "13px", color: "red"}}>Invalid start/end time</p>}

    <button onClick={tryCreateOrUpdateEvent}>Create</button>

  </div>) 
}

export default DayScheduleEventCreator;
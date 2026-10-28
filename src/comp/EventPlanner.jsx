import { useEffect, useState } from "react";
import { addEvent } from "../obj/User";
import Event from "../obj/Event";
import { hashDate } from "../Utility";
import TimeRangeEntry from "./TimeRangeEntry";

const leftMargin = {
  marginLeft: "20px"
}

const textAreaStyle = {
  width: "600px",
  height: "200px",
  resize: "none"
}

function EventPlanner({date, user, updateUser}) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventInvites, setEventInvites] = useState([]);
  const [eventTimeRange, setEventTimeRange] = useState([-1, -1]);
  const [invalid, setInvalid] = useState(false);
  const [invalidReason, setInvalidReason] = useState("");
  // const [eventDateHash, setEventDateHash] = useState("");

  function createEvent() {
    if (invalid) {
      alert(invalidReason);
      return;
    }

    const event = new Event(
      eventName,
      eventDescription,
      eventTimeRange,
      [],
      hashDate(date),
      user.id
    );
    
    const success = addEvent(user, event);
    if (success) updateUser({...user});
  }

  useEffect(() => {
    if (eventTimeRange[0] > eventTimeRange[1]) {
      setInvalid(true);
      setInvalidReason("Start time cannot be later than the end time");

      return;
    }

    if (eventTimeRange[0] === -1 || eventTimeRange[1] === -1) {
      setInvalid(true);
      setInvalidReason("Start time or end time not specified");

      return;
    }

    setInvalid(false);
    setInvalidReason("");

  }, [eventTimeRange]);

  return (<div>
    <h2>Plan a new event</h2>

    <button onClick={createEvent}>Create</button>

    <h3>
      Name
      <input 
        style={leftMargin} 
        id="eventDate" 
        type="text" 
        value={eventName} 
        placeholder="Name of the event" 
        maxLength={100}
        onChange={(event) => {
          setEventName(event.target.value);
        }}
      />
    </h3>

    <h3>
      Time
      
      <TimeRangeEntry timeRange={eventTimeRange} idx={0} setter={setEventTimeRange}/>
      {" to "}
      <TimeRangeEntry timeRange={eventTimeRange} idx={1} setter={setEventTimeRange}/>
    </h3>    

    <h3>
      Date 
      <input 
        style={{...leftMargin, fieldSizing: "content"}} 
        disabled={true} 
        value={date === null ? "" : date.toDateString()} 
        placeholder="Select a date from the calendar"
      />
    </h3>
    
    <h3>Description</h3>
    <p style={{fontSize: "13px"}}>{eventDescription.length}/1500 characters used</p>
    <textarea 
      style={textAreaStyle} 
      id="eventDate" 
      type="text" 
      value={eventDescription} 
      placeholder="Description of the event"
      maxLength={1500}
      onChange={(event) => {
        setEventDescription(event.target.value);
      }}
    />

  </div>);
}

export default EventPlanner;

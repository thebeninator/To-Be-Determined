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
  const [eventTimeRange, setEventTimeRange] = useState(["", ""]);
  // const [eventDateHash, setEventDateHash] = useState("");

  return (<div>
    <h2>Plan a new event</h2>

    <button 
      onClick={() => {
        const event = new Event(
          eventName,
          eventDescription,
          [0, 1500],
          [],
          hashDate(date),
          user.id
        );
        
        const success = addEvent(user, event);
        if (success) updateUser({...user});       
      }
    }>
      Create
    </button>

    <button style={leftMargin} onClick={() => {
      setEventName("");
      setEventDescription("");
      setEventInvites([]);
      setEventTimeRange([-1, -1]);
      setEventDate(null);
    }}>
      Clear
    </button>

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
      {" - "}
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

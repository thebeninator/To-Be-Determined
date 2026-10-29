// renders a view for creating, modifying, and deleting events

import { useEffect, useState } from "react";
import { addEvent, findFreeRanges } from "../obj/User";
import Event from "../obj/Event";
import { getEventsOnDay, hashDate, secondsToHHMM } from "../Utility";
import TimeRangeEntry from "./TimeRangeEntry";
import Select from "react-select";
import { DummyDb } from "../obj/DummyUser";

const leftMargin = {
  marginLeft: "20px"
}

const textAreaStyle = {
  width: "600px",
  height: "200px",
  resize: "none"
}

function freeTimeRangeStringBuilder(user, date) {
  const freeTimeRanges = findFreeRanges(user, date);
  var string = "";

  for (var i = 0; i < freeTimeRanges.length; i++) {
    const range = freeTimeRanges[i];
    const start = range[0];
    const end = range[1];
    string += "[" + secondsToHHMM(start) + " - " + secondsToHHMM(end) + "]";

    if (i != freeTimeRanges.length - 1) {
      string += ", ";
    }
  }

  return string;
}

function EventPlanner({date, user, updateUser}) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventInvites, setEventInvites] = useState([]);
  const [eventTimeRange, setEventTimeRange] = useState([-1, -1]);
  // const [eventDateHash, setEventDateHash] = useState("");
  
  function createEvent() {
    var invalid = false;
    var invalidReason = "";

    if (eventTimeRange[0] > eventTimeRange[1]) {
      invalid = true;
      invalidReason += "Start time cannot be later than the end time\n";
    }

    if (eventTimeRange[0] === -1 || eventTimeRange[1] === -1) {
      invalid = true;
      invalidReason += "Start time or end time not specified\n";
    }

    if (date === null) {
      invalid = true;
      invalidReason += "No date selected\n";
    }

    if (invalid) {
      alert("Could not create event, reason(s):\n" + invalidReason);
      return;
    }

    const event = new Event(
      eventName,
      eventDescription,
      eventTimeRange,
      eventInvites,
      hashDate(date),
      user.id
    );
    
    const success = addEvent(user, event);
    if (success) updateUser({...user});
  }

  return (<div>
    <h2>Plan a new event</h2>

    <button onClick={createEvent}>Create</button>

    {/* use currently selected calendar day */}
    <h3>
      Date 
      <input 
        style={{...leftMargin, fieldSizing: "content"}} 
        disabled={true} 
        value={date === null ? "" : date.toDateString()} 
        placeholder="Select a date from the calendar"
      />
    </h3>

    {date === null ? null : 
    <>
      {/* user availability */}
      <h3>Availability</h3>
      <p>You: {freeTimeRangeStringBuilder(user, date)}</p>
      {eventInvites.map((userId, idx) => {
        return <p>{DummyDb[userId].name}: {freeTimeRangeStringBuilder(DummyDb[userId], date)}</p>
      })}

      {/* contact inviting */}
      <h3 style={{width: "clamp(200px, 15vw, 600px)"}}>
        Invitees 
        <Select 
          isMulti={true} 
          options={
            user.contacts.map((userId, idx) => {
              return {value: userId, label: DummyDb[userId].name};
            })
          }
          onChange={(options) => {
            // options is [{value: ..., label: ...}, ...]
            const ids = [];
            for (var i = 0; i < options.length; i++) {
              ids.push(options[i].value);
            }

            setEventInvites(ids);
          }} 
        />
      </h3>

      {/* time setting */}
      <h3>
        Time
        
        <TimeRangeEntry timeRange={eventTimeRange} idx={0} setter={setEventTimeRange}/>
        {" to "}
        <TimeRangeEntry timeRange={eventTimeRange} idx={1} setter={setEventTimeRange}/>
      </h3>    
      
      {/* event naming */}
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

      {/* set description */}
      <h3>Description</h3>
      <p style={{fontSize: "15px"}}>{eventDescription.length}/1500 characters used</p>
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
    </>}

  </div>);
}

export default EventPlanner;

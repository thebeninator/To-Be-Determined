// renders a view for creating, modifying, and deleting events

import { useContext, useEffect, useState } from "react";
import { addEvent, deleteEvent, findFreeRanges, findTimeConflicts, inFreeTimeRanges, updateEvent } from "../../api/User";
import Event from "../obj/Event";
import { getEventsOnDay, hashDate, secondsToHHMM, validTimeRange } from "../Utility";
import TimeRangeEntry from "./TimeRangeEntry";
import Select from "react-select";
import { DummyDb } from "../../api/DummyDb";
import TBDCalendarContext from "../context/TBDCalendarContext";
import CreatedEventsList from "./CreatedEventsList";
import EventPlannerContext from "../context/EventPlannerContext";

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
    const [start, end] = freeTimeRanges[i];
  
    string += "[" + secondsToHHMM(start) + " - " + secondsToHHMM(end) + "]";

    if (i != freeTimeRanges.length - 1) {
      string += ", ";
    }
  }

  return string;
}

function EventPlanner() {
  const {
    selectedDate, user, updateUser, 
    setPlannedEventTimeRange, setPlannedInvitees,
    editingEvent, setEditingEvent
  } = useContext(TBDCalendarContext);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventInvites, setEventInvites] = useState([]);
  const [eventTimeRange, setEventTimeRange] = useState([-1, -1]);

  const createdEventsListContext = {
    setEventDescription, 
    setEventInvites, setEventName, 
    setEventTimeRange,
    clearEvent
  };

  useEffect(() => {
    setPlannedEventTimeRange(eventTimeRange);
  }, [eventTimeRange]);

  useEffect(() => {
    setPlannedInvitees(eventInvites);
  }, [eventInvites]);

  function clearEvent() {
    setEventName("");
    setEventTimeRange([-1, -1]);
    setEventDescription("");
    setEventInvites([]);
  }

  function renderInviteeAvailability(invitees) {
    return invitees.map((userId, idx) => {
      const invitedUser = DummyDb[userId];
      var style = {};
      var timeConflict = false;

      if (
        !inFreeTimeRanges(eventTimeRange, invitedUser, selectedDate) 
        && validTimeRange(eventTimeRange)
      ) {
        style={color: "red"};
        timeConflict = true;
      }

      return <p style={style} key={idx}>
        {userId === user.id ? "You" : invitedUser.name}: {freeTimeRangeStringBuilder(invitedUser, selectedDate)}
        {timeConflict ? " <<< Time Conflict" : ""}
      </p>
    });
  }

  function tryDeleteEvent() {
    const success = deleteEvent(user, editingEvent);
    if (success) {
      updateUser({...user});
      setEditingEvent(null);
      clearEvent();
    };  
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

    if (selectedDate === null) {
      invalid = true;
      invalidReason += "No date selected\n";
    }

    if (invalid) {
      alert("Could not create/update event, reason(s):\n" + invalidReason);
      return;
    }

    const event = new Event(
      eventName,
      eventDescription,
      eventTimeRange,
      eventInvites,
      selectedDate,
      user.id
    );
    
    const success = editingEvent !== null ? updateEvent(user, editingEvent, event) : addEvent(user, event);
    if (success) {
      updateUser({...user});
      setEditingEvent(null);
      clearEvent();
    };
  }

  return (<div>
    <h2>{editingEvent !== null ? "Editing event" : "Plan a new event"}</h2>

    <button onClick={tryCreateOrUpdateEvent}>{editingEvent !== null ? "Save" : "Create"}</button>

    {editingEvent !== null && <button onClick={tryDeleteEvent}>Delete</button>}

    {editingEvent !== null && 
      <button 
        onClick={() => {
          setEditingEvent(null); 
          clearEvent();}
        }
      >
        Cancel Edit
      </button>
    }

    <div style={{display: "flex", gap: "100px"}}>
      {/* use currently selected calendar day */}
      <div>
        <h3> Date <input 
          style={{...leftMargin, fieldSizing: "content"}} 
          disabled={true} 
          value={selectedDate === null ? "" : selectedDate.toDateString()} 
          placeholder="Select a date from the calendar"
          />
        </h3>

        {selectedDate !== null && <>
          {/* time setting */}
          <h3> Time
            <TimeRangeEntry timeRange={eventTimeRange} idx={0} setEventTimeRange={setEventTimeRange}/>
            {" to "}
            <TimeRangeEntry timeRange={eventTimeRange} idx={1} setEventTimeRange={setEventTimeRange}/>
          </h3>    
          {!validTimeRange(eventTimeRange) && <p style={{fontSize: "15px", color: "red"}}>Invalid start/end time</p>}

          {/* contact inviting */}
          <h3 style={{width: "clamp(200px, 30vw, 600px)"}}>
            Invitees <Select 
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

              value={
                eventInvites.map((userId, idx) => {
                  return {value: userId, label: DummyDb[userId].name}
                })
              }
            />
          </h3>

          {/* user availability */}
          <h3>Availability</h3>
          {renderInviteeAvailability([user.id, ...eventInvites])}
        </>}
      </div>
      
      {selectedDate !== null && <div>
        {/* event naming */}
        <h3>
          Name
          <input 
            style={leftMargin} 
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
          type="text" 
          value={eventDescription} 
          placeholder="Description of the event"
          maxLength={1500}
          onChange={(event) => {
            setEventDescription(event.target.value);
          }}
        />
      </div>}

      <div>
        <h3>Created Events</h3>
        <small>Hover over an event to see its description</small>
        <EventPlannerContext.Provider value={createdEventsListContext}>
          <CreatedEventsList selectedDate={selectedDate} user={user} />
        </EventPlannerContext.Provider>
      </div>
    </div>
  </div>);
}

export default EventPlanner;

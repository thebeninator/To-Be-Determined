// renders the events and their details for currently
// selected Calendar day

import { DummyDb } from "../obj/DummyUser";
import { getEventsOnDay, secondsToHHMM, sortEventsByTimeRange } from "../Utility";

const eventStyle = {
  paddingBottom: "15px", 
  width: "fit-content",
}

function inviteeStringBuilder(invitees) {
  var string = "";

  for (var i = 0; i < invitees.length; i++) {
    string += DummyDb[invitees[i]].name;

    if (i != invitees.length - 1) {
      string += ", ";
    }
  }

  return string;
}

function renderEvents(events, user) {
  const sortedEvents = sortEventsByTimeRange(events);

  return (
    sortedEvents.map((event, idx) => {
      return <div key={idx} style={eventStyle}>
        <h4>
          {secondsToHHMM(event.timeRange[0])} 
          - 
          {secondsToHHMM(event.timeRange[1])}
          : {event.name === "" ? "Unnamed Event" : event.name}
        </h4>

        <p>Invitees: {(() => {
          const list = inviteeStringBuilder(event.invitees);
          if (list === "") return "None";
          return list;
        })()}</p>
        
        <p>Created by: {user.id === event.createdById ? "You" : event.createdById}</p>     

        <p style={{whiteSpace: "pre-line"}}>
          {event.description === "" ? "No description provided" : event.description}
        </p>
      </div>
    }) 
  )
}

function DayInspector({date, user}) {
  const events = getEventsOnDay(user, date);

  return (<div>
    {date === null ? 
    <h2>No day selected</h2> 
    : 
    <>
      <h2>{date.toDateString()}</h2>

      <div>
        <h3>Events</h3>
        {events === null || events.length === 0 ? "No events" : renderEvents(events, user)}
      </div>
    </>}
  </div>);
}

export default DayInspector;

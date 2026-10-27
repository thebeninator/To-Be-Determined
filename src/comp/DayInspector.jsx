import { DummyUser } from "../obj/DummyUser";
import { secondsToHHMM } from "../Utility";

const eventStyle = {
  paddingBottom: "15px", 
  width: "fit-content",
}

function renderEvents(events, user) {
  return (
    events.map((event, idx) => {
      return <div key={idx} style={eventStyle}>
        <h4>
          {secondsToHHMM(event.timeRange[0])} - {secondsToHHMM(event.timeRange[1])}: {event.name}
        </h4>
        <p>Created by: {user.id === event.createdById ? "You" : event.createdById}</p>        
        <p style={{whiteSpace: "pre-line"}}>{event.description}</p>
      </div>
    }) 
  )
}

function DayInspector({date, events, user}) {
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

import { useContext } from "react";
import { getEventsOnDay, secondsToHHMM } from "../Utility";
import EventPlannerContext from "../context/EventPlannerContext";
import TBDCalendarContext from "../context/TBDCalendarContext";

function CreatedEventsList() {
  const {
    setEventDescription, setEventInvites,
    setEventName, setEventTimeRange, 
  } = useContext(EventPlannerContext);

  const { user, setSelectedDate, setEditingEvent } = useContext(TBDCalendarContext);

  function renderEventsForSelected() {
    const maybeEventsHashTable = user.events;

    if (
      maybeEventsHashTable === null 
      || maybeEventsHashTable === undefined 
    ) {
      return <p>None</p>;
    }

    const toRender = [<></>];

    Object.entries(maybeEventsHashTable).map(([hashDate, events]) => {
      for (var i = 0; i < events.length; i++) {
        const event = events[i];

        if (event.createdById !== user.id) continue;

        const hoverDescription = `From ${secondsToHHMM(event.timeRange[0])} to ${secondsToHHMM(event.timeRange[1])}\n\n`
          + `${event.description}\n`

        // incoming Dates from server are 
        // deserialized as plain text
        const date = new Date(event.date);

        toRender.push(<div key={i+hashDate} >
          <button title={hoverDescription}
            onClick={() => {
              setSelectedDate(date);
              setEditingEvent(event)
              setEventName(event.name);
              setEventDescription(event.description);
              setEventTimeRange(event.timeRange);
              setEventInvites(event.invitees);
            }}
          >{event.name} {`(${date.toDateString()})`}</button>
        </div>);
      }
    })

    if (toRender.length === 1) {
      return <p>None</p>;
    } else {
      toRender[0] = <small>Hover over an event to see its description</small>;
    }

    return toRender;
  }

  return (<>
    {renderEventsForSelected()}
  </>)
}

export default CreatedEventsList;
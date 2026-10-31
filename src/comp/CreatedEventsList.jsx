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
      || maybeEventsHashTable.length === 0
    ) {
      return <p>None</p>;
    }

    const toRender = [];

    Object.entries(maybeEventsHashTable).map(([hashDate, events]) => {
      for (var i = 0; i < events.length; i++) {
        const event = events[i];
        if (event.createdById !== user.id) continue;

        const hoverDescription = `From ${secondsToHHMM(event.timeRange[0])} to ${secondsToHHMM(event.timeRange[1])}\n\n`
          + `${event.description}\n`

        toRender.push(<div key={i+hashDate} >
          <button title={hoverDescription}
            onClick={() => {
              setSelectedDate(event.date);
              setEditingEvent(event)
              setEventName(event.name);
              setEventDescription(event.description);
              setEventTimeRange(event.timeRange);
              setEventInvites(event.invitees);
            }}
          >{event.name} {`(${event.date.toDateString()})`}</button>
        </div>);
      }
    })

    return toRender;
  }

  return (<>
    {renderEventsForSelected()}
  </>)
}

export default CreatedEventsList;
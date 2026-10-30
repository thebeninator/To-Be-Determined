import { getEventsOnDay } from "../Utility";

function renderEventsForSelected(user, selectedDate) {
  const maybeEvents = getEventsOnDay(user, selectedDate);

  if (maybeEvents === null || maybeEvents === undefined || maybeEvents.length === 0) {
    return <p>None</p>;
  }

  return (
    getEventsOnDay(user, selectedDate)?.map((event, idx) => {
      if (event.createdById !== user.id) return;

      return <div>
        <button key={idx}>{event.name}</button>
      </div>
    })
  )
}

function CreatedEventsList({user, selectedDate}) {
  return (<>
    {renderEventsForSelected(user, selectedDate)}
  </>)
}

export default CreatedEventsList;
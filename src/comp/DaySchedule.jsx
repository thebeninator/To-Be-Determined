import ScheduleBand from "./ScheduleBand";

const dayLookup = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function DaySchedule({schedule, day}) {
  function renderEvents() {
    const events = schedule.events;

    if (events.length === 0) {
      return <p>No events</p>
    }
  }

  return (<div>
    <ScheduleBand color={schedule.colour}/>
    <h3>{dayLookup[day]}</h3>
    {renderEvents()}
  </div>)
}

export default DaySchedule;
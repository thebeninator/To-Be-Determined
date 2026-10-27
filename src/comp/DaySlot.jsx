import ScheduleBand from "./ScheduleBand";

function DaySlot({events, schedule}) {
  const hasEvents = events === null || events.length === 0;

  return <div>
    <ScheduleBand />
    <p style={hasEvents ? null: {backgroundColor: "yellow"}}> 
      {hasEvents ? "[No events]" : `Events: ${events.length}`}
    </p>
  </div>
}

export default DaySlot;

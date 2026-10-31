import { useContext } from "react";
import DaySchedule from "./DaySchedule";
import TBDCalendarContext from "../context/TBDCalendarContext";

function TBDScheduler() {
  const {user} = useContext(TBDCalendarContext);
  
  return (<div>
    <small>Hover over an event to see its description</small>
    {user.weeklySchedule.map((schedule, idx) => {
      return <DaySchedule key={idx} schedule={schedule} day={idx} />
    })}
  </div>);
}

export default TBDScheduler;
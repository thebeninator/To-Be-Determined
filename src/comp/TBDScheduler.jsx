import { useContext } from "react";
import DaySchedule from "./DaySchedule";
import TBDCalendarContext from "../context/TBDCalendarContext";

function TBDScheduler() {
  const {user} = useContext(TBDCalendarContext);
  const weeklySchedule = user.weeklySchedule;

  return (<div style={{display: "flex", gap: "280px"}}>
    {weeklySchedule.map((schedule, idx) => {
      return <DaySchedule key={idx} schedule={schedule} day={idx} />
    })}
  </div>);
}

export default TBDScheduler;
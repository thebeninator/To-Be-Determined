import { useContext } from "react";
import { removeFromSchedule } from "../../api/User";
import { secondsToHHMM } from "../Utility";
import TBDCalendarContext from "../context/TBDCalendarContext";

function DayScheduleEventEntry({user, day, event}) {
  const startTime = secondsToHHMM(event.timeRange[0]);
  const endTime = secondsToHHMM(event.timeRange[1]);
  const {updateUser} = useContext(TBDCalendarContext);

  function tryDeleteEvent() {
    const success = removeFromSchedule(user.id, day, event);
    if (success) {
      updateUser({...user});
    };     
  }

  return(<div title={event.description} style={{paddingBottom: "15px", paddingTop: "15px"}}>
    <button title="Delete event" style={{marginRight: "25px"}} onClick={tryDeleteEvent}>-</button>
    {<strong>{startTime} - {endTime}:</strong>} {event.name} 
  </div>)
}

export default DayScheduleEventEntry;
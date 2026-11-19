import { useContext } from "react";
import { dayLookup } from "../Utility";
import TBDCalendarContext from "../context/TBDCalendarContext";
import Event from "../obj/Event";
import { setScheduleEvents } from "../../api/User";

function DayScheduleCopyOption({targetDay, day, setCopierActive}) {
  const {user, updateUser} = useContext(TBDCalendarContext);

  return <button onClick={() => {
    const eventsToCopy = user.weeklySchedule[day].events;
    const copiedEvents = [];

    for (var i = 0; i < eventsToCopy.length; i++) {
      const eventToCopy = eventsToCopy[i];
      copiedEvents.push(new Event(
        eventToCopy.name,
        eventToCopy.description,
        eventToCopy.timeRange,
        eventToCopy.createdById,
      ));
    }

    const success = setScheduleEvents(user, targetDay, copiedEvents);

    if (success) {
      updateUser({...user});
      setCopierActive(false);
    }
  }}>
    {dayLookup[day]}
  </button>
}

export default DayScheduleCopyOption;
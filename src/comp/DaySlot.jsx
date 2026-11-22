// renders supplementary information on a Calendar day slot

import { useContext, useEffect } from "react";
import { addEvent, inFreeTimeRanges } from "../../api/User";
import ScheduleBand from "./ScheduleBand";
import TBDCalendarContext from "../context/TBDCalendarContext";
import { validTimeRange } from "../Utility";
import { UserCache } from "../UserCache";

function getAvailableStyle(percentAvailable) {
  const r = 255 * (1 - percentAvailable);
  const g = 255 * percentAvailable;
  const b = 0;
  return {backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`}
}

function getPercentAvailable(user, invited, eventTimeRange, date) {
  var totalUsers = 1 + invited.length;
  var totalAvailable = 0;

  if (inFreeTimeRanges(eventTimeRange, user, date)) {
    totalAvailable++;
  }

  for (var i = 0; i < invited.length; i++) {
    if (inFreeTimeRanges(eventTimeRange, UserCache[invited[i]], date)) {
      totalAvailable++;
    }
  }

  return (totalAvailable / totalUsers);
}

function DaySlot() {
  const {
    user, events, date, 
    plannedEventTimeRange, plannedInvitees, eventPlannerActive
  } = useContext(TBDCalendarContext);
  const hasEvents = events === null || events.length === 0;

  useEffect(() => {
    
  }, [events]);

  function renderAvailability() {
    if (eventPlannerActive && validTimeRange(plannedEventTimeRange)) {
      const percent = getPercentAvailable(user, plannedInvitees, plannedEventTimeRange, date);
      const style = getAvailableStyle(percent);
      return <p style = {style}> Availability: {percent.toLocaleString('en-US', { style: 'percent' })}</p> 
    }

    return <p>Availability: N/A</p>
  }

  return <div>
    <ScheduleBand color={user.weeklySchedule[date.getDay()].colour}/>
    <p style={hasEvents ? null: {backgroundColor: "yellow"}}> 
      {hasEvents ? "[No events]" : `Events: ${events.length}`}
    </p>
    {/* {renderAvailability()} */}
  </div>
}

export default DaySlot;

// renders supplementary information on a Calendar day slot

import { useContext } from "react";
import { DummyDb } from "../../api/DummyDb";
import { addEvent, inFreeTimeRanges } from "../../api/User";
import ScheduleBand from "./ScheduleBand";
import TBDCalendarContext from "../context/TBDCalendarContext";
import { validTimeRange } from "../Utility";

function getPercentAvailable(user, invited, eventTimeRange, date) {
  var totalUsers = 1 + invited.length;
  var totalAvailable = 0;

  if (inFreeTimeRanges(eventTimeRange, user, date)) {
    totalAvailable++;
  }

  for (var i = 0; i < invited.length; i++) {
    if (inFreeTimeRanges(eventTimeRange, DummyDb[invited[i]], date)) {
      totalAvailable++;
    }
  }

  return (totalAvailable / totalUsers).toLocaleString('en-US', { style: 'percent' })
}

function DaySlot() {
  const {
    user, events, date, 
    plannedEventTimeRange, plannedInvitees, eventPlannerActive
  } = useContext(TBDCalendarContext);
  const hasEvents = events === null || events.length === 0;

  return <div>
    <ScheduleBand color={user.weeklySchedule[date.getDay()].colour}/>
    <p style={hasEvents ? null: {backgroundColor: "yellow"}}> 
      {hasEvents ? "[No events]" : `Events: ${events.length}`}
    </p>
    {eventPlannerActive && validTimeRange(plannedEventTimeRange) 
    && <p>Availability: {getPercentAvailable(user, plannedInvitees, plannedEventTimeRange, date)}</p>
    || <p>Availability: N/A</p>}
  </div>
}

export default DaySlot;

// renders supplementary information on a Calendar day slot

import { memo, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { addEvent, inFreeTimeRanges } from "../../api/User";
import ScheduleBand from "./ScheduleBand";
import TBDCalendarContext from "../context/TBDCalendarContext";
import { getEventsOnDay, hashDate, validTimeRange } from "../Utility";
import { UserCache } from "../UserCache";

function getAvailableStyle(percentAvailable) {
  const r = 255 * (1 - percentAvailable);
  const g = 255 * percentAvailable;
  const b = 0;
  return {backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`}
}

function getPercentAvailable(user, invited, eventTimeRange, date, editingEvent) {
  var totalUsers = 1 + invited.length;
  var totalAvailable = 0;
  const [datedEvents, scheduleEvents] = getEventsOnDay(user, date);

  const events = [...datedEvents, ...scheduleEvents];

  if (editingEvent && editingEvent.dateHash === hashDate(date)) {
    var idx = 0;

    while (idx < events.length) {
      if (events[idx].id === editingEvent.id) break;
      idx++;
    }

    events.splice(idx, 1);
  }

  if (inFreeTimeRanges(eventTimeRange, events)) {
    totalAvailable++;
  }

  for (var i = 0; i < invited.length; i++) {
    const [invitedDatedEvents, invitedScheduleEvents] = getEventsOnDay(UserCache[invited[i]], date);
    const invitedEvents = [...invitedDatedEvents, ...invitedScheduleEvents];

    if (inFreeTimeRanges(eventTimeRange, invitedEvents)) {
      totalAvailable++;
    }
  }

  return (totalAvailable / totalUsers);
}

function DaySlot({user, events, date}) {
  const {
    editingEvent, eventPlannerActive,
    plannedEventTimeRange, plannedInvitees
  } = useContext(TBDCalendarContext);
  
  const hasEvents = !events || events.length === 0;
  const currTotEvents = useRef(events.length ?? 0);
  const ref = useRef();
  
  useEffect(() => {
    const [currDatedEvents] = getEventsOnDay(user, date);

    if (currDatedEvents.length > currTotEvents.current) {
      ref.current.className = "new-event-added";
      setTimeout(() => { ref.current.className = "" }, 1200);
    }

    if (currDatedEvents.length < currTotEvents.current) {
      ref.current.className = "event-deleted";
      setTimeout(() => { ref.current.className = "" }, 1200);
    }

    currTotEvents.current = currDatedEvents.length;
  }, [user]);

  function renderAvailability() {
    if (eventPlannerActive && validTimeRange(plannedEventTimeRange)) {
      const percent = getPercentAvailable(user, plannedInvitees, plannedEventTimeRange, date, editingEvent);
      const style = getAvailableStyle(percent);
      return <p style = {style}> Availability: {percent.toLocaleString('en-US', { style: 'percent' })}</p> 
    }

    return <p>Availability: N/A</p>
  }

  return <div ref={ref}>
    <ScheduleBand color={user.weeklySchedule[date.getDay()].colour}/>
    <p style={hasEvents ? null: {backgroundColor: "yellow"}}> 
      {hasEvents ? "[No events]" : `Events: ${events.length ?? 0}`}
    </p>
    {renderAvailability()}
  </div>
}

export default DaySlot;

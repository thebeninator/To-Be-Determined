import { getEventsOnDay, sortEventsByTimeRange } from "../Utility";

// user: User object
// event: Event to be added
// returns true if event was successfully added, false otherwise
function addEvent(user, event) {
  try {
    // note: this should attempt to update the DB before
    // making these changes locally

    if (event.date === null || event.date === "") return false;
    if (event.timeRange[0] === -1 || event.timeRange[1] === -1) return false;

    if (user.events[event.dateHash] === null || user.events[event.dateHash] === undefined) {
      user.events[event.dateHash] = [];
    }

    user.events[event.dateHash].push(event);

    return true;
  } catch (exception) {
    console.error("failed to add event: " + exception.message);
    return false;
  }
}

// user: User object
// event: Event to be deleted
// returns true if event was successfully deleted, false otherwise
function deleteEvent(user, event) {
  try {
    // note: this should attempt to update the DB before
    // making these changes locally

    const hash = event.dateHash;

    if (!(hash in user.events)) return false;

    var idx = -1;
    for (var i = 0; i < user.events.length; i++) {
      if (user.events[hash][i].id === event.id) idx = i;
      break;
    }

    if (idx === -1) return false;

    user.events[hash].splice(idx, 1);

    return true;
  } catch (exception) {
    console.error("failed to delete event: " + exception.message);
    return false;
  }
}

function updateEvent(user, event, newData) {
  // note: this should attempt to update the DB before
  // making these changes locally
}

function findFreeRanges(user, date) {
  const dayStart = 0, dayEnd = 86340; // 00:00, 23:59

  const daySchedule = Array.isArray(user.weeklySchedule)
    ? user.weeklySchedule[date.getDay()]
    : null;
  const scheduleEvents = daySchedule && Array.isArray(daySchedule.events)
    ? daySchedule.events
    : [];
  const datedEvents = getEventsOnDay(user, date) || [];
  const busyRanges = [...scheduleEvents, ...datedEvents];

  if (busyRanges.length === 0) return [[dayStart, dayEnd]];
  
  const sorted = sortEventsByTimeRange(busyRanges);
  const merged = [];

  for (const event of sorted) {
    const [start, end] = event.timeRange;
    if (start >= end) continue;

    const last = merged[merged.length - 1];

    if (!last || start > last[1]) {
      merged.push([start, end]);
    } else {
      last[1] = Math.max(last[1], end);
    }
  }

  const freeRanges = [];
  let currentTime = dayStart;

  for (const [start, end] of merged) {
    if (start > currentTime) {
      freeRanges.push([currentTime, start]);
    }

    currentTime = Math.max(currentTime, end);
  }

  if (currentTime < dayEnd) {
    freeRanges.push([currentTime, dayEnd]);
  }

  return freeRanges;
}

export {addEvent, deleteEvent, updateEvent, findFreeRanges};
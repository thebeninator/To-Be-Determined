import { getEventsOnDay, sortEventsByTimeRange } from "../src/Utility";

// user: User object
// event: Event to be added
// returns true if event was successfully added, false otherwise
function addEvent(user, event) {
  try {
    // note: this should attempt to update the DB before
    // making these changes locally
    const [eventStart, eventEnd] = event.timeRange;
    const hash = event.dateHash;

    if (event.date === null || event.date === "") return false;
    if (eventStart === -1 || eventEnd === -1) return false;
    if (eventStart > eventEnd) return false;

    if (user.events[hash] === null || user.events[hash] === undefined) {
      user.events[hash] = [];
    }

    user.events[hash].push(event);

    return true;
  } catch (exception) {
    console.error("failed to add event: " + exception.message);
    return false;
  }
}

// user: User object
// event: Event to be updated
// returns true if event was successfully updated, false otherwise
function updateEvent(user, oldEvent, newEvent) {
  try {
    // note: this should attempt to update the DB before
    // making these changes locally
    deleteEvent(user, oldEvent);
    addEvent(user, newEvent);

    return true;
  } catch (exception) {
    console.error("failed to update event: " + exception.message);
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
    for (var i = 0; i < user.events[hash].length; i++) {
      if (user.events[hash][i].id === event.id) {
        idx = i;
        break;
      }
    }

    if (idx === -1) return false;

    user.events[hash].splice(idx, 1);

    return true;
  } catch (exception) {
    console.error("failed to delete event: " + exception.message);
    return false;
  }
}

// eventTimeRange: time range
// antagEvents: an array of event object
// returns an array containing the events from antagEvents 
// that conflict with eventTimeRange
function findTimeConflicts(eventTimeRange, antagEvents) {
  try {
    const [eventStart, eventEnd] = eventTimeRange;
    
    return antagEvents.filter((antagEvent) => {
      const [antagStart, antagEnd] = antagEvent.timeRange;
      return eventStart < antagEnd && antagStart < eventEnd;
    });
  } catch (exception) {
    console.error(exception.message);
    return [];
  }
}

// eventTimeRange: time range
// user: user object
// date: date object
// returns true if eventTimeRange is within the free time of the user
function inFreeTimeRanges(eventTimeRange, user, date) {
  const freeTimeRanges = findFreeRanges(user, date);
  
  const [eventStart, eventEnd] = eventTimeRange;

  const overlap = freeTimeRanges.filter((freeTimeRange) => {
    const [freeStart, freeEnd] = freeTimeRange;
    return (
      eventStart <= freeEnd && freeStart <= eventEnd &&
      eventStart >= freeStart && freeEnd >= eventEnd
    );
  });

  return overlap.length > 0;
}

function findFreeRanges(user, date) {
  const dayStart = 0, dayEnd = 86340; // 00:00, 23:59

  try {
    const daySchedule = user.weeklySchedule[date.getDay()];
    const scheduleEvents = daySchedule.events;
    const datedEvents = getEventsOnDay(user, date);
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
  } catch (exception) {
    console.error(exception.message);
    return [];
  }
}

export {addEvent, deleteEvent, updateEvent, findFreeRanges, findTimeConflicts, inFreeTimeRanges};
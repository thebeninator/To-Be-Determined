// creates a hash id given a date of the form YYYYMMDD
// date: Date object
function hashDate(date) {
  if (date === null) return "";
  return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
}

// returns an array containing events on the specified date
// user: User object events should be fetched from
// date: Date object
function getEventsOnDay(user, date) {
  try {
    const maybe_day_key = hashDate(date);
    const key_exists = maybe_day_key in user.events;

    if (!key_exists) return null;

    return user.events[maybe_day_key];
  } catch (exception) {
    console.error(exception.message);
    return null;
  }
}

// converts seconds to HH:MM format
// sec: int
function secondsToHHMM(sec) {
  return new Date(sec * 1000).toISOString().slice(11, 16);
}

// converts HH:MM to seconds
// hour: int
// minute: int
function HHMMToSeconds(hour, minute) {
  return hour * 3600 + minute * 60;
}

function sortEventsByTimeRange(events) {
    // copy first b/c sort mutates
  const sortedEvents = [...events].sort()

  return sortedEvents;
}

export {getEventsOnDay, hashDate, secondsToHHMM, HHMMToSeconds, sortEventsByTimeRange}
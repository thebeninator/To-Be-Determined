const dayLookup = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function getUser(userId) {
  const ret = await fetch(`http://localhost:8080/api/user/getUser?userId=${userId}`);
  const user = await ret.json();

  return user;
}

// creates a hash id given a date of the form YYYYMMDD
// date: Date object
function hashDate(date) {
  if (date === null || date === undefined) return "";
  var dd = String(date.getDate());

  if (dd.length == 1) dd = "0" + dd;
  
  return `${date.getFullYear()}${date.getMonth()}${dd}`;
}

// returns an array containing events on the specified date
// user: User object events should be fetched from
// date: Date object
function getEventsOnDay(user, date) {
  try {
    const maybeDateKey = hashDate(date);
    // mon..sun
    const day = date.getDay();

    return [user.events[maybeDateKey] ?? [], user.weeklySchedule[day].events ?? []];
  } catch (exception) {
    console.error(exception.message);
    return [[], []];
  }
}

// converts seconds to HH:MM format
// sec: int
function secondsToHHMM(sec) {
  if (sec === -1) {
    return "";
  }
  return new Date(sec * 1000).toISOString().slice(11, 16);
}

// converts HH:MM to seconds
// hour: int
// minute: int
function HHMMToSeconds(hour, minute) {
  return hour * 3600 + minute * 60;
}

// sorts an array of events by start time (earliest -> latest)
// returns a copy of the array, sorted
function sortEventsByTimeRange(events) {
    // copy first b/c sort mutates
  const sortedEvents = [...events].sort((eventA, eventB) => {
    return eventA.timeRange[0] - eventB.timeRange[0];
  });

  return sortedEvents;
}

function validTimeRange(timeRange) {
  const [start, end] = timeRange;

  return (start < end) && (start !== -1 && end !== -1);
}

export {
  getEventsOnDay, 
  hashDate, 
  secondsToHHMM, 
  HHMMToSeconds, 
  sortEventsByTimeRange, 
  validTimeRange,
  dayLookup,
  getUser
}
function hashDate(date) {
  if (date === null) return "";
  return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
}

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

function secondsToHHMM(sec) {
  return new Date(sec * 1000).toISOString().slice(11, 16);
}

export {getEventsOnDay, hashDate, secondsToHHMM}
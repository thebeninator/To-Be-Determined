function fetchUser(userId) {
  return {};
}

// user: User object
// event: Event to be added
// returns true if event was successfully added, false otherwise
function addEvent(user, event) {
  try {
    // note: this should attempt to update the DB before
    // making these changes locally

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

  } catch (exception) {
    console.error("failed to delete event: " + exception.message);
  }
}

function updateEvent(user, event, newData) {
  // note: this should attempt to update the DB before
  // making these changes locally
}

function updateUser(user, newData) {
  try {
    // note: this should attempt to update the DB before
    // making these changes locally
  } catch (exception) {
    console.error("failed to update user: " + exception.message);
  }
}

export {fetchUser, addEvent, deleteEvent, updateEvent, updateUser};
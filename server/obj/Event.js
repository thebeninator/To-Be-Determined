const { hashDate } = require("../Utility.js");

class Event {
  constructor(name, description, timeRange, invitees, date, createdById, scheduleEvent = false) {
    this.name = name;
    this.description = description;
    this.timeRange = timeRange;
    this.invitees = invitees;
    this.date = date;
    this.dateHash = hashDate(date);
    this.createdById = createdById;
    this.id = crypto.randomUUID();
    this.overlappingWith = [];
    this.scheduleEvent = scheduleEvent;
  }
}

module.exports = Event;
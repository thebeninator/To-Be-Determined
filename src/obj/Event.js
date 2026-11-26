import { hashDate } from "../Utility";

class Event {
  constructor(name, description, timeRange, invitees, date, createdById, id = undefined, scheduleEvent = false) {
    this.name = name;
    this.description = description;
    this.timeRange = timeRange;
    this.invitees = invitees;
    this.date = date;
    this.dateHash = hashDate(date);
    this.createdById = createdById;
    this.id = id ?? crypto.randomUUID();
    this.overlappingWith = [];
    this.scheduleEvent = scheduleEvent;
  }
}

export default Event;
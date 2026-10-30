import { hashDate } from "../Utility";

class Event {
  constructor(name, description, timeRange, invitees, date, createdById) {
    this.name = name;
    this.description = description;
    this.timeRange = timeRange;
    this.invitees = invitees;
    this.date = date;
    this.dateHash = hashDate(date);
    this.createdById = createdById;
    this.id = crypto.randomUUID();
    this.overlappingWith = [];
  }
}

export default Event;
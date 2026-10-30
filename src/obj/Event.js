class Event {
  constructor(name, description, timeRange, invitees, dateHash, createdById) {
    this.name = name;
    this.description = description;
    this.timeRange = timeRange;
    this.invitees = invitees;
    this.dateHash = dateHash;
    this.createdById = createdById;
    this.id = crypto.randomUUID();
    this.overlappingWith = [];
  }
}

export default Event;
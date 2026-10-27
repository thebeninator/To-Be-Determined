class Event {
  constructor(name, description, timeRange, invitees, dateHash, creatorId) {
    this.name = name;
    this.description = description;
    this.timeRange = timeRange;
    this.invitees = invitees;
    this.dateHash = dateHash;
    this.createdById = creatorId;
    this.id = crypto.randomUUID();
  }
}

export default Event;
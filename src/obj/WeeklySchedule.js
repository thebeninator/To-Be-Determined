import Schedule from "./Schedule";

class WeeklySchedule {
  constructor() {
    this.schedules = [];

    // sunday, monday, tuesday, ..., saturday
    for (var i = 0; i < 7; i++) {
      this.schedules[i] = new Schedule();
    }
  }
}

export default WeeklySchedule;
import Event from "../src/obj/Event";
import Schedule from "../src/obj/Schedule";

var DummyUser = {
  name: "Aaron Bob",
  id: "user1",
  // hash table
  events: {
    // hash id
    ["2026927"]: [
      new Event(
        "Important Meeting", 
        "very imporat metting\nlocation: office building north-south 1", 
        [10000, 18000], 
        [], 
        new Date(2026, 9, 27), 
        "user1"
      ),
      new Event(
        "Important Meeting", 
        "very imporat metting", 
        [0, 11000], 
        [], 
        new Date(2026, 9, 27), 
        "user1"
      )
    ]
  },

  weeklySchedule: [
    new Schedule(), // sunday
    new Schedule(), // monday
    new Schedule(), // tuesday
    new Schedule(), // wednesday
    new Schedule(), // thursday
    new Schedule(), // friday
    new Schedule(), // saturday
  ],

  contacts: ["user2", "user3"]
};

var DummyContact1 = {
  name: "Charlie Darlene",
  id: "user2",
  events: {},

  weeklySchedule: [
    new Schedule(), // sunday
    new Schedule(), // monday
    new Schedule(), // tuesday
    new Schedule(), // wednesday
    new Schedule(), // thursday
    new Schedule(), // friday
    new Schedule(), // saturday
  ],

  contacts: []
};

var DummyContact2 = {
  name: "Ergot Fromage",
  id: "user3",
  events: {},

  weeklySchedule: [
    new Schedule(), // sunday
    new Schedule(), // monday
    new Schedule(), // tuesday
    new Schedule(), // wednesday
    new Schedule(), // thursday
    new Schedule(), // friday
    new Schedule(), // saturday
  ],

  contacts: []
};

// create clones to imitate a non-local database
var DummyDb = {
  ["user1"]: {...DummyUser},
  ["user2"]: {...DummyContact1},
  ["user3"]: {...DummyContact2}
}

export {DummyUser, DummyDb};
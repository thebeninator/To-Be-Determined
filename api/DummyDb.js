import Event from "../src/obj/Event";
import Schedule from "../src/obj/Schedule";

const dayColorLookup = ["red", "blue", "green", "purple", "orange", "cyan", "black"];

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
      )
    ],
    ["2026931"]: [    
      new Event(
        "Water Tasting", 
        "mmmmmmmmmmmm water", 
        [0, 11000], 
        [], 
        new Date(2026, 9, 31), 
        "user1"
      )
    ]
  },

  weeklySchedule: [
    new Schedule([], dayColorLookup[0]), // sunday
    new Schedule([], dayColorLookup[1]), // monday
    new Schedule([], dayColorLookup[2]), // tuesday
    new Schedule([], dayColorLookup[3]), // wednesday
    new Schedule([], dayColorLookup[4]), // thursday
    new Schedule([], dayColorLookup[5]), // friday
    new Schedule([], dayColorLookup[6]), // saturday
  ],

  contacts: ["user2", "user3"]
};

var DummyContact1 = {
  name: "Charlie Darlene",
  id: "user2",
  events: {},

  weeklySchedule: [
    new Schedule(), // sunday
    new Schedule([new Event("", "", [54000, 61200], [], null, "")]), // monday
    new Schedule([new Event("", "", [54000, 61200], [], null, "")]), // tuesday
    new Schedule([new Event("", "", [54000, 61200], [], null, "")]), // wednesday
    new Schedule([new Event("", "", [54000, 61200], [], null, "")]), // thursday
    new Schedule([new Event("", "", [54000, 61200], [], null, "")]), // friday
    new Schedule([new Event("", "", [54000, 61200], [], null, "")]), // saturday
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
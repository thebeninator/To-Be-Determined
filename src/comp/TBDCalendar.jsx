// renders Calendar view + Day Inspector, Event Planner, and Scheduler

import Calendar from "react-calendar";
import DaySlot from "./DaySlot";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { getEventsOnDay, getUser, hashDate } from "../Utility";
import TBDDayInspector from "./TBDDayInspector";
import TBDEventPlanner from "./TBDEventPlanner";
import TBDCalendarContext from "../context/TBDCalendarContext";
import TBDScheduler from "./TBDScheduler";
import { update } from "three/examples/jsm/libs/tween.module.js";
import { AddToCache, UserCache } from "../UserCache";

const MONTHS = [
  "January", "February", "March", 
  "April", "May", "June",
  "July", "August", "September", 
  "October", "November", "December"
];

function TBDCalendar() {
  const [user, updateUser] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState({});
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [dayInspectorActive, setDayInspectorActive] = useState(true);
  const [weeklySchedulerActive, setWeeklySchedulerActive] = useState(false);
  const [eventPlannerActive, setEventPlannerActive] = useState(false);
  const [plannedEventTimeRange, setPlannedEventTimeRange] = useState([-1, -1]);
  const [plannedInvitees, setPlannedInvitees] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const daySlotContext = {
    user, plannedEventTimeRange, plannedInvitees, 
    eventPlannerActive, editingEvent
  };

  const eventPlannerContext = {
    selectedDate, user, updateUser, 
    setPlannedEventTimeRange, setPlannedInvitees, 
    setSelectedDate, editingEvent, setEditingEvent
  };

  const weeklySchedulerContext = {
    user, updateUser
  }

  useLayoutEffect(() => {
    async function acquirePrimaryUser() {
      const primaryUser = await getUser("user1");

      AddToCache(primaryUser);

      for (var i = 0; i < primaryUser.contacts.length; i++) {
        const contact = await getUser(primaryUser.contacts[i]);
        AddToCache(contact);
      }

      updateUser(primaryUser);
    }
    acquirePrimaryUser();
  }, []);

  useEffect(() => {
    if (selectedDate === null) return;
    if (!user) return;
    const [events] = getEventsOnDay(user, selectedDate);
    setSelectedDateEvents(events);
  }, [user]);

  useEffect(() => {
    if (!eventPlannerActive) setEditingEvent(null);
  }, [eventPlannerActive])

  if (user) {
    return (<>   
      <div style={{padding: "80px"}}>
        <Calendar
          // showNavigation = {false} // TODO: custom nav
          maxDetail="month"
          showNeighboringMonth = {false}
          tileContent = {({view, date}) => {
            if (view === 'month') {
              const [events] = getEventsOnDay(user, date);

              return (
                <TBDCalendarContext.Provider value={{...daySlotContext}}>
                  <DaySlot user={user} date={date} events={events}/>
                </TBDCalendarContext.Provider>
              )
            }

            return null;
          }}

          tileClassName={({activeStartDate, date, view}) => {
            if (selectedDate.toDateString() === date.toDateString()) {
              return "day-selected";
            }

            return "";
          }}

          onClickDay = {(date) => {
            // const oldDateHash = hashDate(selectedDate);
            // var sameDate = oldDateHash === hashDate(date);

            // if (eventPlannerActive) sameDate = false;
          
            setSelectedDate(date);
            setSelectedDateEvents(getEventsOnDay(user, date)[0]);
          }}
        />
      </div>

      <div>
        <div>
          {/* this button setup is not very flexible but i think its OK */}
          {/* because we will not be implementing other views */}
          <button onClick={() => {
            setDayInspectorActive(true);
            setWeeklySchedulerActive(false);
            setEventPlannerActive(false);
          }}>
            Day Inspector
          </button>

          <button onClick={() => {
            setDayInspectorActive(false);
            setWeeklySchedulerActive(true);
            setEventPlannerActive(false);
          }}>
            Weekly Scheduler
          </button>

          <button onClick={() => {
            setDayInspectorActive(false);
            setWeeklySchedulerActive(false);
            setEventPlannerActive(true);
          }}>
            Event Planner
          </button>
        </div>

        {dayInspectorActive && <TBDDayInspector date={selectedDate} user={user} />}
        {eventPlannerActive && 
          <TBDCalendarContext.Provider value={eventPlannerContext}>
            <TBDEventPlanner />
          </TBDCalendarContext.Provider>
        }

        {weeklySchedulerActive &&
          <TBDCalendarContext.Provider value={weeklySchedulerContext}>
            <TBDScheduler />
          </TBDCalendarContext.Provider>
        }
      </div>
    </>);
  }

  return <p>Loading</p>
}

export default TBDCalendar;
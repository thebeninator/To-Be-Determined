// renders Calendar view + Day Inspector, Event Planner, and Scheduler

import Calendar from "react-calendar";
import DaySlot from "./DaySlot";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { getEventsOnDay, hashDate } from "../Utility";
import {DummyUser} from "../obj/DummyUser";
import DayInspector from "./DayInspector";
import EventPlanner from "./EventPlanner";
import TBDCalendarContext from "./TBDCalendarContext";

const MONTHS = [
  "January", "February", "March", 
  "April", "May", "June",
  "July", "August", "September", 
  "October", "November", "December"
];

function TBDCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState({});
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [dayInspectorActive, setDayInspectorActive] = useState(true);
  const [weeklySchedulerActive, setWeeklySchedulerActive] = useState(false);
  const [eventPlannerActive, setEventPlannerActive] = useState(false);
  const [user, updateUser] = useState(DummyUser);
  const [plannedEventTimeRange, setPlannedEventTimeRange] = useState([-1, -1]);
  const [plannedInvitees, setPlannedInvitees] = useState([]);

  useLayoutEffect(() => {
    var date = new Date();
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }, []);

  useEffect(() => {
    if (selectedDate === null) return;
    const events = getEventsOnDay(user, selectedDate);
    setSelectedDateEvents(events);
  }, [user]);

  return (<>   
    <div style={{padding: "80px"}}>
      <h1>
        {MONTHS[month]}, {year}
      </h1>

      <Calendar
        // showNavigation = {false} // TODO: custom nav
        maxDetail="month"
        showNeighboringMonth = {false}
        tileContent = {({view, date}) => {
          if (view === 'month') {
            const events = getEventsOnDay(user, date);

            return (
              <TBDCalendarContext.Provider value={{date, user, events, plannedEventTimeRange, plannedInvitees, eventPlannerActive}}>
                <DaySlot />
              </TBDCalendarContext.Provider>
            )
          }

          return null;
        }}

        onClickDay = {(date) => {
          const oldDateHash = hashDate(selectedDate);
          var sameDate = oldDateHash === hashDate(date);

          if (eventPlannerActive) sameDate = false;
        
          setSelectedDate(sameDate ? null : date);
          setSelectedDateEvents(sameDate ? null : getEventsOnDay(user, date));
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

      {dayInspectorActive && <DayInspector date={selectedDate} user={user} />}
      {eventPlannerActive && 
        <TBDCalendarContext.Provider value={{selectedDate, user, updateUser, setPlannedEventTimeRange, setPlannedInvitees}}>
          <EventPlanner />
        </TBDCalendarContext.Provider>
      }
    </div>
  </>);
}

export default TBDCalendar;
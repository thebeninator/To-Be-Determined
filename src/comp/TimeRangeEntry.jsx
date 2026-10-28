// renders HH:MM input boxes, for setting start/end times 

import { useEffect, useState } from "react";
import { HHMMToSeconds } from "../Utility";

const fixWidthHour = {
  width: "25px",
  textAlign: "right"
};

const fixWidthMinute = {
  width: "25px",
  textAlign: "left"
};

const fixWidthLeftMarginHour = {marginLeft: "20px", ...fixWidthHour};

function TimeRangeEntry({timeRange, idx, setter}) {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  // for setting the hour/minute states, with bounds and type checking
  function setTimeValue(value, setter, min, max) {
    if (value === "") {
      setter("");
      return;
    }

    const number = Number(value);

    if (Number.isInteger(number) && number >= min && number <= max) {
      setter(value);
    }
  }

  // update start/end time range in TBDCalendar
  useEffect(() => {
    if (minute.length == 2);

    const newTimeRange = [...timeRange];
    newTimeRange[idx] = HHMMToSeconds(Number(hour), Number(minute));
    setter(newTimeRange);
  }, [hour, minute]);

  return (<>
    <input 
      style={idx == 0 ? fixWidthLeftMarginHour : fixWidthHour} 
      value={hour}
      placeholder="HH"
      maxLength={2}

      onChange={(event) => {
        setTimeValue(event.target.value, setHour, 0, 23);
      }}
    />

    {" : "}

    <input 
      style={fixWidthMinute} 
      value={minute}
      placeholder="MM"
      maxLength={2}

      onChange={(event) => {
        setTimeValue(event.target.value, setMinute, 0, 59);
      }}

      onBlur={() => {
        // make single digit minutes two digits, ex: convert 1 to 01 
        if (minute.length == 1) setMinute(prev => "0" + prev);
      }}
    />     
  </>)
}

export default TimeRangeEntry;
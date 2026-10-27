import { useState } from "react";

const placeholderText = ["Start Time", "End Time"]

const leftMargin = {
  marginLeft: "20px"
}

function TimeRangeEntry({timeRange, idx, setter}) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  return (<input 
    style = {idx === 0 ? leftMargin : null} 
    type="text" 
    value={timeRange[idx]} 
    placeholder={placeholderText[idx]}
    maxLength={5}
    onChange={(event) => {
      var incomingChar = event.nativeEvent.data;
      const isDelete = event.nativeEvent.inputType === "deleteContentBackward";
      const needColon = event.target.value.length == 3 || 
        (event.target.value.length == 1 && isNaN(Number(incomingChar)));

      if (!isDelete && needColon) {
        incomingChar = ':';
      }

      const newTimeRange = [...timeRange];
      newTimeRange[idx] = isDelete ? event.target.value : newTimeRange[0] + incomingChar;
      setter(newTimeRange);
    }}
  />)
}

export default TimeRangeEntry;
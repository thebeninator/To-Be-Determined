import { useState } from "react";

const leftMargin = {
  marginLeft: "20px"
};

const fixWidth = {
  width: "25px"
};

const fixWidthLeftMargin = {...leftMargin, ...fixWidth};

function TimeRangeEntry({timeRange, idx, setter}) {
  const [hour, setHour] = useState(-1);
  const [minute, setMinute] = useState(-1);

  return (<>
    <input 
      style={idx == 0 ? fixWidthLeftMargin : fixWidth} 
      value={hour === -1 ? "" : hour}
      placeholder="HH"
      type="text"
      inputMode="numeric"
      maxLength={2}

      onChange={(event) => {

      }}
    />

    {" : "}

    <input 
      style={fixWidth} 
      value={minute === -1 ? "" : minute}
      placeholder="MM"
      type="text"
      inputMode="numeric"
      maxLength={2}
    />     
  </>)
}

export default TimeRangeEntry;
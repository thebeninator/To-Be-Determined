const placeholderText = ["Start Time", "End Time"]

const leftMargin = {
  marginLeft: "20px"
}

function TimeRangeEntry({timeRange, idx, setter}) {
  return (<input 
    style = {idx === 0 ? leftMargin : null}
    id="eventDate" 
    type="text" 
    value={timeRange[idx] === -1 ? "" : timeRange[idx]} 
    placeholder={placeholderText[idx]}
    maxLength={5}
    onChange={(event) => {
      const newTimeRange = [...timeRange];
      newTimeRange[idx] = event.target.value;
      setter(newTimeRange);
    }}
  />)
}

export default TimeRangeEntry;
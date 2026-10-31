function ScheduleBand({color}) {
  const style = {
    backgroundColor: "red",
    width: "auto",
    height: "20px",
    transform: "translate(0%, 50%)"
  };

  return <div style={{...style, backgroundColor: color ?? "red"}}>
    
  </div> 
}

export default ScheduleBand;
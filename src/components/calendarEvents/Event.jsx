const Event = ({summary, startTime, endTime}) => {
    
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const readableStartTime = startDate.toLocaleTimeString().split(":")[0] + ":" + startDate.toLocaleTimeString().split(":")[1] + " " + startDate.toLocaleTimeString().split(" ")[1];
    const readableEndTime = endDate.toLocaleTimeString().split(":")[0] + ":" + endDate.toLocaleTimeString().split(":")[1]+ " " + endDate.toLocaleTimeString().split(" ")[1];
    return (
        <>
            <div className="calendar-item">
                <h3>{summary}</h3>
                <h4>{readableStartTime} - {readableEndTime}</h4>
            </div>
        </>
     );
}
 
export default Event;
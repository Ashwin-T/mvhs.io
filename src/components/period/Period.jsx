import './period.css';

const Period = ({startTime, endTime, period}) => {

    const backgroundColor = (period === "Brunch" || period === "Lunch") ?  "break-period" : "regular-period"
    
    const readableStartTime = startTime.toLocaleTimeString().split(":")[0] + ":" + startTime.toLocaleTimeString().split(":")[1] + " " + startTime.toLocaleTimeString().split(" ")[1];
    const readableEndTime = endTime.toLocaleTimeString().split(":")[0] + ":" + endTime.toLocaleTimeString().split(":")[1]+ " " + endTime.toLocaleTimeString().split(" ")[1];
    
    return (  
        <>
            <div className={"period-container "  + backgroundColor}>
                <h2>{backgroundColor === "regular-period" && period !== 'Tutorial' && "Period "}{period}</h2>
                <h3>
                    {readableStartTime} - {readableEndTime}
                </h3>
            </div>
        </>
    ); 
}
 
export default Period;
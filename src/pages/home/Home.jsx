import { useEffect, useState } from "react";
import moment from "moment";
// import Loading from "../../components/loading/Loading";
import "./home.css";
// import { FaDirections } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { BsFillPeopleFill, BsFillChatTextFill} from "react-icons/bs";
// import { FiSettings } from "react-icons/fi";
// import AddToMobile from "../../components/addToMobile/AddToMobile";

// import * as FunWordsJSON from "../../data/FunWords.json";
import Period from '../../components/period/Period'
import Weather from '../../components/weather/Weather'
import CalendarEvents from '../../components/calendarEvents/CalendarEvents'
import { getPeriodsOnDay } from "mvhs-schedule";

const Home = () => {

    const today = moment().format("dddd") + " " + moment().format("MMM Do");
    // const [loading, setLoading] = useState(false);
    // const [linkStyle, setLinkStyle] = useState();

    // const [funWord, setFunWord] = useState("great");

    // const [user, setUser] = useState({})

    // const [name, setName] = useState("");


    const [selectedDate, setSelectedDate] = useState(new Date('05/25/2022')) 


    const [periodSchedule, setPeriodSchedule] = useState([]);

    useEffect(() => {
        const getPeriods = async() => {
            await getPeriodsOnDay(selectedDate).then((result) => {
                setPeriodSchedule(result);
            })
        }
        getPeriods();
    }, [selectedDate]);

    return (
        <>
            <div className="home-container">

                <h2>
                    {today.split(" ")[0]}
                </h2>
                <h3>
                    {today.split(" ")[1] + " " + today.split(" ")[2]}
                </h3>

                <div className="home-content">

                    <Weather />

                    <div className="periods-container">
                        {
                            periodSchedule.map((periodObject, index)=>{
                                return(
                                    <Period key = {index} period = {periodObject.period} startTime = {periodObject.start} endTime = {periodObject.end} />
                                )
                            })
                        }
                        {
                            periodSchedule.length === 0 && 
                            <div className = 'no-school'>
                                <h2>No school today!</h2>
                                <h3>Enjoy your break!</h3>
                            </div>
                        }
                    </div>
                    
                    <CalendarEvents />
                    {/* <Weather /> */}

                </div>
            </div>
        </>
    )
};

export default Home;

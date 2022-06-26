import { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

import "./setting.css";

import * as roomData from "../../data/Rooms.json";

import Loading from "../../components/loading/Loading";

const Settings = ({ init, setDontRedirect  }) => {
    //settings have preview of graduation year, and schecule of rooms


    const topRef = useRef('')
    const [name, setName] = useState("");
    const [studentID, setStudentID] = useState("");

    const [periodOne, setPeriodOne] = useState("");
    const [periodTwo, setPeriodTwo] = useState("");
    const [periodThree, setPeriodThree] = useState("");
    const [periodFour, setPeriodFour] = useState("");
    const [periodFive, setPeriodFive] = useState("");
    const [periodSix, setPeriodSix] = useState("");
    const [periodSeven, setPeriodSeven] = useState("");

    const [periodOneStyle, setPeriodOneStyle] = useState("");
    const [periodTwoStyle, setPeriodTwoStyle] = useState("");
    const [periodThreeStyle, setPeriodThreeStyle] = useState("");
    const [periodFourStyle, setPeriodFourStyle] = useState("");
    const [periodFiveStyle, setPeriodFiveStyle] = useState("");
    const [periodSixStyle, setPeriodSixStyle] = useState("");
    const [periodSevenStyle, setPeriodSevenStyle] = useState("");

    const [nameStyle, setNameStyle] = useState("");
    const [studentIDStyle, setStudentIDStyle] = useState("");

    const [title, setTitle] = useState("Settings");
    const styleName = init ? "init" : "";

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(true);

    const handleError = (message) => {
        setError(true);
        setErrorMessage(message);
    };

    useEffect(() => {
        setLoading(true);
        if (init) {
            setTitle("Let's Set Up");
        }   
        const getData = async () => {
            const user = JSON.parse(localStorage.getItem("mvhsio-user"));
            if (user !== null) {
                setName(user.name);
                setStudentID(user.id);
                setPeriodOne(user.periods[0]);
                setPeriodTwo(user.periods[1]);
                setPeriodThree(user.periods[2]);
                setPeriodFour(user.periods[3]);
                setPeriodFive(user.periods[4]);
                setPeriodSix(user.periods[5]);
                setPeriodSeven(user.periods[6]);
            }
            else{

            }

            setLoading(false);

        }
        getData();

    }, [init]);

    const handleRoomCheck = (roomNumber) => {
        return roomData.features.some((room) => room.properties.name === roomNumber || room.properties.name2 === roomNumber);
    };

    const submit = async () => {
        setLoading(true);
        const periods = [periodOne, periodTwo, periodThree, periodFour, periodFive, periodSix, periodSeven];
        
        localStorage.setItem("allow", "true");

        const user = {
            name: name,
            id: studentID,
            periods: periods
        }
        
        localStorage.setItem("mvhsio-user", JSON.stringify(user));
        setError(false);
        setLoading(false);
        
        if (init) {
            setDontRedirect(true)
        }

        topRef.current.scrollIntoView({
            behavior: "smooth"
        })
    };

    const changePage = () => {

        setPeriodOneStyle("");
        setPeriodTwoStyle("");
        setPeriodThreeStyle("");
        setPeriodFourStyle("");
        setPeriodFiveStyle("");
        setPeriodSixStyle("");
        setPeriodSevenStyle("");
        setNameStyle("");
        setStudentIDStyle("");

        if (periodOne === "" || periodTwo === "" || periodThree === "" || periodFour === "" || periodFive === "" || periodSix === "" || periodSeven === "") {
            handleError("Please fill out all periods");
            if(periodOne === ""){
                setPeriodOneStyle("errorUnderline");
            }
            if(periodTwo === ""){
                setPeriodTwoStyle("errorUnderline");
            }
            if(periodThree === ""){
                setPeriodThreeStyle("errorUnderline");
            }
            if(periodFour === ""){
                setPeriodFourStyle("errorUnderline");
            }
            if(periodFive === ""){
                setPeriodFiveStyle("errorUnderline");
            }
            if(periodSix === ""){
                setPeriodSixStyle("errorUnderline");
            }
            if(periodSeven === ""){
                setPeriodSevenStyle("errorUnderline");
            }
            if(name === ""){
                setNameStyle("errorUnderline");
            }
            if(studentID === "" || studentID.length !== 9 || !studentID.includes("1000")){
                setStudentIDStyle("errorUnderline");
            }

            return;
        }
        if (!handleRoomCheck(periodOne) || !handleRoomCheck(periodTwo) || !handleRoomCheck(periodThree) || !handleRoomCheck(periodFour) || !handleRoomCheck(periodFive) || !handleRoomCheck(periodSix) || !handleRoomCheck(periodSeven)) {
            handleError("Please enter a valid room number");

            if(!handleRoomCheck(periodOne)){
                setPeriodOneStyle("errorUnderline");
            }
            if(!handleRoomCheck(periodTwo)){
                setPeriodTwoStyle("errorUnderline");
            }
            if(!handleRoomCheck(periodThree)){
                setPeriodThreeStyle("errorUnderline");
            }
            if(!handleRoomCheck(periodFour)){
                setPeriodFourStyle("errorUnderline");
            }
            if(!handleRoomCheck(periodFive)){
                setPeriodFiveStyle("errorUnderline");
            }
            if(!handleRoomCheck(periodSix)){
                setPeriodSixStyle("errorUnderline");
            }
            if(!handleRoomCheck(periodSeven)){
                setPeriodSevenStyle("errorUnderline");
            }
            return;
        }
        if (name === '' ) {
            handleError("Please enter your name");
            return;
        }
        if (studentID === '' || studentID.length !== 9 || !studentID.includes("1000")) {
            handleError("Please enter a valid student ID");
            return;
        }
        submit();
    };

    return (
        <>

            <div style = {{position: 'absolute', top: '0'}} ref = {topRef} />
            {!loading ? 
            <>
                <div className={"setting-container " + styleName}>
                    <div className='year-container'>
                        <div className='main-resources-container' style={{ marginLeft: 2 + "rem" }}>
                            <h1 className='main-resources'>{title}</h1>
                            <div className='right-triangle-title'></div>
                        </div>

                        <div className='year-sub-container'>
                            <h2 className= {nameStyle}>
                                What is your name?
                            </h2>
                            <input type='text' placeholder='John Doe' value={name} onChange={(e) => setName(e.target.value)} />
                            <br />
                            <br />
                            <h2 className= {studentIDStyle}>
                                What is your student ID number?
                            </h2>
                            <input type='text' placeholder='100024247' value={studentID} onChange={(e) => setStudentID(e.target.value)} />
                        </div>
                    </div>
                    <div className='schedule-container'>
                        <div>
                            <div className='promptPeriod column'>
                                <h2>Enter in Your Rooms</h2>
                                <p>(portables or free is acceptable)</p>
                            </div>
                            <div className='periodContainers'>
                                <h2 className = {periodOneStyle}>Period 1</h2>
                                <input placeholder='806' className='info-input' type='text' value={periodOne} onChange={(e) => setPeriodOne(e.target.value.toLowerCase())} />
                            </div>
                            <div className='periodContainers'>
                                <h2 className = {periodTwoStyle}>Period 2</h2>
                                <input placeholder='607' className='info-input' type='text' value={periodTwo} onChange={(e) => setPeriodTwo(e.target.value.toLowerCase())} />
                            </div>
                            <div className='periodContainers'>
                                <h2 className = {periodThreeStyle}>Period 3</h2>
                                <input placeholder='' className='info-input' type='text' value={periodThree} onChange={(e) => setPeriodThree(e.target.value.toLowerCase())} />
                            </div>
                        </div>
                        <div>
                            <div className='periodContainers'>
                                <h2 className = {periodFourStyle}>Period 4</h2>
                                <input placeholder='' className='info-input' type='text' value={periodFour} onChange={(e) => setPeriodFour(e.target.value.toLowerCase())} />
                            </div>
                            <div className='periodContainers'>
                                <h2 className = {periodFiveStyle}>Period 5</h2>
                                <input placeholder='' type='text' value={periodFive} className='info-input' onChange={(e) => setPeriodFive(e.target.value.toLowerCase())} />
                            </div>
                            <div className='periodContainers'>
                                <h2 className = {periodSixStyle}>Period 6</h2>
                                <input placeholder='' type='text' value={periodSix} className='info-input' onChange={(e) => setPeriodSix(e.target.value.toLowerCase())} />
                            </div>
                            <div className='periodContainers'>
                                <h2 className = {periodSevenStyle}>Period 7</h2>
                                <input placeholder='free' type='text' value={periodSeven} className='info-input' onChange={(e) => setPeriodSeven(e.target.value.toLowerCase())} />
                            </div>
                        </div>
                    </div>
                </div>

                {error &&
                    <div className='flexbox row center errorBar'>
                        <Alert variant='outlined' severity='error'>
                            {errorMessage}
                        </Alert>
                    </div>
                }
                <br />
                <div className='flexbox column center'>
                    <button className='submit-button' onClick={changePage}>
                        Submit
                    </button>
                </div>
            </>
            : <Loading  />}

            <center style={{margin: '0 0.5rem'}}> 
                <p>Fill out your information above to enable customization and features such as form autofill, schedule router, and more. No data is saved online. It is cached locally on your device.</p>
            </center>
            
            <div className = 'bottom-margin' />
    
        </>
    );
};

export default Settings;

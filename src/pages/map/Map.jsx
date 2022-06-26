import { useState, useEffect, useRef } from "react";
import ReactMapGL, { Source, Layer, Popup } from "react-map-gl";
//eslint-disable-next-line
import mapboxgl from 'mapbox-gl';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import { FaRoute, FaDirections, FaParking, FaHome } from "react-icons/fa";
import {MdMap, MdDirectionsBike} from 'react-icons/md';
import {ImCross, ImWrench} from 'react-icons/im';

import { IoIosNavigate } from "react-icons/io";
import {RiMenuLine, RiMenuUnfoldLine} from 'react-icons/ri';   
import {GiVendingMachine} from 'react-icons/gi';
import{GrRestroom} from 'react-icons/gr';
import { BsFillPeopleFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { getPeriodsOnDay } from "mvhs-schedule";
import Alert from '@mui/material/Alert';
import moment from "moment";

import Navbar from "../../components/navbar/Navbar";
import MarkerPointsOneWay from "./MarkerPointsOneWay";
import MarkerPointsSchedule from "./MarkerPointsSchedule";
import Construction from "./Construction";
import * as roomData from "../../data/Rooms.json";
import * as otherData from "../../data/Other.json";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { mapboxToken } from "../../tools/Secrets";
import "./map.css";
import './mapbox-gl.css';

import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'


//NOTE: PLEASE BE CAREFULE WITH THE PAGE! IT HAS BEEN CREATED WITH A LOT OF WORK AND TIME. PLEASE STUDY IT CAREFULLY BEFORE MAKING ANY CHANGES!
const Map = () => {
    // latitude: 37.360257078662605
    // longitude: -122.06716285921868,
    //^ schools  center location

    mapboxgl.workerClass = MapboxWorker;

    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    let navigate = useNavigate();

    const [restRoom, setRestRoom] = useState(""); //sets initial value of 'search'
    const [findRoom, setFindRoom] = useState(""); //sets initial value of 'search'

    const [submittedRoom, setSubmittedRoom] = useState(false); 
    const [submittedSchedule, setSubmittedSchedule] = useState(false);

    const calculateZoom = () => {
        //this sets the zoom of the map so it looks ok on mobile and computer
        if (window.innerWidth <= 768 ) {
            // 768 is the borderish from phone to computer
            return 16.25;
        }
        return 17;
    };

    const calculateCenter = () => {
        //this sets the center of the map so it looks ok on mobile and computer
        if (window.innerWidth <= 768) {
            // 768 is the borderish from phone to computer
            return -122.06678308687613;
        }
        return -122.06656285921868;
    };

    
    const lon = calculateCenter();
    const zoomX = calculateZoom();

    const [viewPort, setViewPort] = useState({
        latitude: 37.360205578662605,
        longitude: lon,
        zoom: zoomX,
        width: "100vw",
        height: "100vh",
        bearing: 90,
    }); // sets initial value of 'view port' to empty js object. viewport will help us setd

    const [currentRoom, setCurrentRoom] = useState({});
    const [findingRoom, setFindingRoom] = useState({});

    const inputCurrentRoom = useRef(null);
    const inputFindingRoom = useRef(null);

    const [singleDirectionsToggle, setSingleDirectionsToggle] = useState(false);
    const [scheduleDirectionToggle, setScheduleDirectionToggle] = useState(true);

    const [singleDirectionStyle, setSingleDirectionStyle] = useState({ color: "dodgerblue" });
    const [scheduleDirectionStyle, setScheduleDirectionStyle] = useState({ color: "dodgerblue" });

    const [schedule, setSchedule] = useState([]);
    const [rawSchedule, setRawSchedule] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [startingRoomStyle, setStartingRoomStyle] = useState("");
    const [endingRoomStyle, setEndingRoomStyle] = useState("");

    const [showPopups, setShowPopups] = useState(true);

    const [orientation, setOrientation] = useState(window.orientation);

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const [showDrawer, setShowDrawer] = useState(false);

    const handleError = (message) =>{
        setError(true);
        setErrorMessage(message);
    }

    useEffect(() => {
        setViewPort({
            latitude: 37.360205578662605,
            longitude: lon,
            zoom: zoomX,
            width: "100vw",
            height: "100vh",
            bearing: 90,
        })
       
        window.addEventListener("orientationchange", function(event) {
            setOrientation(window.orientation);
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        });

        window.addEventListener('resize', function(event){
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        });

        return () => {
            window.removeEventListener("orientationchange", function(event) {
                setOrientation(window.orientation);
                setWidth(window.innerWidth);
                setHeight(window.innerHeight);
            });
            window.removeEventListener('resize', function(event){
                setWidth(window.innerWidth)
                setHeight(window.innerHeight)
            });
        }

    }, [window.innerWidth, window.innerHeight, window.orientation]); // the useEffect will run on start-up and add data to the viewport object


    const formChange1 = (room) => {
        setSubmittedRoom(false);
        setRestRoom(room);
    };

    const formChange2 = (room) => {
        setSubmittedRoom(false);
        setFindRoom(room); //sets searched to variable
    };

    const handleMap = async () => {

        setEndingRoomStyle("")
        setStartingRoomStyle("")
            
        let currentRoom = {},
            findingRoom = {};

        roomData.features.forEach((room) => {
            //pushed a
            if (room.properties.name === restRoom || room.properties.name2 === restRoom) {
                currentRoom = room;
                setCurrentRoom(room);
            }

            if (room.properties.name === findRoom || room.properties.name2 === findRoom) {
                findingRoom = room;
                setFindingRoom(room);
            }
        });

        if ("type" in currentRoom) {
            if("type" in findingRoom){
                setSubmittedRoom(true);
                handleSingleDirection();
                setError(false);
            }
            else{
                handleError("Please enter a valid room name");
                setEndingRoomStyle("colorRed")
            }
        }
        else{
            handleError("Please enter a valid room name");
            setStartingRoomStyle("colorRed")
        }


        setViewPort({
            latitude: 37.360205578662605,
            longitude: lon,
            zoom: zoomX,
            width: "100%",
            height: "100vh",
            bearing: 90,
        });
    };

    const handleSingleDirection = () => {
        setScheduleDirectionToggle(true);
        setSubmittedSchedule(false);
        setShowPopups(true);
        
        setScheduleDirectionStyle({ color: "dodgerblue" });

        setSingleDirectionsToggle(!singleDirectionsToggle);

        if (singleDirectionsToggle) {
            setSingleDirectionStyle({ color: "dodgerblue" });
        } else {
            setSingleDirectionStyle({ color: "#D7BE69" });
        }
    };

    const handleScheduleDirections = async () => {
        if(scheduleDirectionToggle){ //this is false lol sorry poor control flow and convention
            setSingleDirectionsToggle(false);
            setSubmittedRoom(false);

            if(schedule.length === 0){
                const userObj = JSON.parse(localStorage.getItem("mvhsio-user"))

                if(userObj !== null){
                    const periodsLocal = userObj.periods;
                    await getPeriodsOnDay(new Date()).then((result) => {
                        let resultArr = [];
                        let roomObjects = [];
    
                        setRawSchedule(result);
                        for (let i = 0; i < result.length; i++) {
                            resultArr.push(periodsLocal[result[i].period - 1]);
                        }
    
                        for (let i = 0; i < resultArr.length; i++) {
                            if (resultArr[i] !== undefined) {
                                roomData.features.forEach((room) => {
                                    if (room.properties.name === resultArr[i] || room.properties.name2 === resultArr[i]) {
                                        roomObjects.push(room);
                                    }
                                });
                            }
                        }        
                        setSchedule(roomObjects);
                        
                    })
                    .catch(()=>{
                        
                    })
                    }
                }
        

            setShowPopups(!showPopups);
            setSingleDirectionStyle({ color: "dodgerblue" });
        }

        if (!scheduleDirectionToggle) {
            setScheduleDirectionStyle({ color: "dodgerblue" });
            setSubmittedSchedule(false);
        }
        else {
            setScheduleDirectionStyle({ color: "#D7BE69" });
            setSubmittedSchedule(true);
        }

        setScheduleDirectionToggle(!scheduleDirectionToggle);
    };

    
    const DrawerList = () => {
        return(
            <>
                <List>
              <ListItem button onClick = {()=>navigate('/')}>
                <ListItemIcon>
                    <FaHome style={{ color: "black" }} size={35} />
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItem>
              <ListItem button onClick = {()=> setShowDrawer(false)}>
                <ListItemIcon>
                    <FaDirections size={35} style = {{color: 'dodgerblue' }}/>
                </ListItemIcon>
                <ListItemText primary={'Map'} />
              </ListItem>
              <ListItem button onClick = {()=>navigate('/resources')}>
                <ListItemIcon>
                    <BsFillPeopleFill style={{ color: "#D7BE69" }} size={35} />
                </ListItemIcon>
                <ListItemText primary={'Resources'} />
              </ListItem>
                <ListItem button onClick = {()=>navigate('/utilities')}>
                    <ListItemIcon>
                        <ImWrench style = {{color: 'darkgrey'}} size = {35} />
                    </ListItemIcon>
                    <ListItemText primary={'Utilities'} />
                </ListItem>
                <ListItem button onClick = {()=>navigate('/settings')}>
                    <ListItemIcon>
                        <FiSettings style={{ color: "grey" }} size={35} />
                    </ListItemIcon>
                    <ListItemText primary={'Settings'} />
                </ListItem>
          </List>
          <Divider />
          <List>
              <ListItem button onClick = {()=> setShowDrawer(false)}>
                <ListItemIcon>
                    <RiMenuUnfoldLine size = {30}/>
                </ListItemIcon>
                <ListItemText primary={'Go Back'} />
              </ListItem>
          </List>
            </>
        )
    }


    const Drawer = () => {
        return(
            <>
                {
                    window.innerWidth > 768 ?
                    <Box
                    role="presentation"
                    >
                        <DrawerList />
                    </Box>

                    :

                    <Box
                    role="presentation"
                    width="50vw"
                    >
                        <DrawerList />

                    </Box>
                   
                }
            </>
        )
    }

    return (
        <div className='flexbox mapPageContainer'>
            <ReactMapGL
                {...viewPort}
                mapStyle='mapbox://styles/ashwintalwalkar/ckuea6z3l17fq18nv6aobff7n'
                mapboxApiAccessToken={mapboxToken}
                onViewportChange={(viewPort) => setViewPort(viewPort)}
            >
                
                {width < 786 ?
                    <div className='mapNav flexbox center column'>
                        <button className='controlButton' onClick = {()=> setShowDrawer(true)}>
                            <RiMenuLine size={35}/>
                        </button>
                    </div>

                    :

                    <>
                        {
                            height > 414 &&
                            <Navbar />
                        }
                    </>
                
                }

                <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} open = {showDrawer} anchor={'left'}
                onClose={() => setShowDrawer(false)} onOpen={() => setShowDrawer(true)}><Drawer /></SwipeableDrawer>


                {submittedRoom && <MarkerPointsOneWay currentRoom={currentRoom} findingRoom={findingRoom} ok = {submittedRoom}/>}
                {submittedSchedule && <MarkerPointsSchedule schedule = {schedule} ok = {submittedSchedule} raw = {rawSchedule}/>}

                {
                    !submittedRoom && !submittedSchedule && 
                        <Source id='directionLayer' type='geojson' data={{
                            type: 'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    properties: {},
                                    geometry: {
                                        type: 'LineString',
                                        coordinates: ''
                                    }
                                }
                            ]
                        }}>
                           <Layer type='line' source='my-data' paint={{ "line-color": "green", "line-width": 5 }} />
                       </Source>
                }
                <div className='flexbox space-between'>
                    {singleDirectionsToggle && width >= 768 &&
                        <div className='controlContainer'>
                            <h3 className = {startingRoomStyle}>Starting Room: </h3>
                            <input ref={inputCurrentRoom} value={restRoom} type='text' className='findRoom' placeholder='806' onChange={(e) => formChange1(e.target.value.toLowerCase())} />
                            <h3 className = {endingRoomStyle}>Ending Room: </h3>
                            <input ref={inputFindingRoom} value={findRoom} type='text' className='findRoom' placeholder='607' onChange={(e) => formChange2(e.target.value.toLowerCase())} />
                            
                            {error && 
                                <div style = {{marginTop: '25px'}}>
                                    <Alert variant="outlined"  severity="error" sx = {{width: '175px'}}>{errorMessage}</Alert>
                                </div>
                            }
                            <br />
                            <div>
                                <button className='go' onClick={handleMap}>
                                    Navigate
                                </button>
                            </div>
                        </div>
                    }

                    {!scheduleDirectionToggle && width >= 768 &&

                        <div className='flexbox column center controlContainer'>
                            <div className = 'flexbox' style = {{justifyContent: 'flex-start', marginBottom: '0.5rem'}} onClick = {()=>setScheduleDirectionToggle(true)}>
                                <span style = {{color: 'grey'}}>Hide</span>
                            </div>

                            {
                                JSON.parse(localStorage.getItem("mvhsio-user")) === null ? 
                                    <Alert className = 'flexbox column center' variant="outlined" severity="info" sx = {{width: "75%"}}>
                                        Update periods in <Link>Settings</Link> to access this feature.
                                    </Alert>
                                :
                                <>
                                    <h2>Daily Schedule Route</h2>
                                    <h3>Your Periods For Today!</h3>
                                {
                                    schedule.length === 0 ?
                                    <div>
                                        <Alert className = 'flexbox center' variant="outlined" severity="info" sx = {{width: "75%"}}>No School Today!</Alert>
                                    </div> : 
                                    
                                    schedule.map((room, index) => {
                                    return (
                                        <li key={index}>
                                            {room.properties.name.charAt(0).toUpperCase() + room.properties.name.slice(1)}
                                        </li>
                                    );
                                })
                                }
                                </>
                            }
                        </div>
                    }

                    {
                        width >= 768 ?

                        <div className='mapControls'>
                            {height <= 414 && 
                                <div className='flexbox center column'>
                                    <button className='controlButton' onClick = {()=> setShowDrawer(true)}>
                                        <RiMenuLine size={35}/>
                                    </button>
                                </div>
                            }

                        <div className='flexbox center column'>
                            <button
                                onClick={() => {
                                    setViewPort({
                                        latitude: 37.360205578662605,
                                        longitude: lon,
                                        zoom: zoomX,
                                        width: "100vw",
                                        height: "100vh",
                                        bearing: 90,
                                    });
                                }}
                                className='controlButton'>
                                <IoIosNavigate size={35} />
                            </button>
                        </div>

                        <div className='flexbox center column'>
                            <button className='controlButton' onClick={handleSingleDirection}>
                                <FaDirections size={35} style={singleDirectionStyle} />
                            </button>
                        </div>

                        <div className='flexbox center column'>
                            <button className='controlButton' onClick={handleScheduleDirections}>
                                <FaRoute size={35} style={scheduleDirectionStyle} />
                            </button>
                        </div>
                        <div className="flexbox center column">
                            <button className='controlButton' onClick={()=>navigate('/static-map')}>
                                <MdMap size={35}/>
                            </button>
                        </div>
                    </div>
                    :
                    <>
                        <BottomSheet 
                            open={true}
                            snapPoints={({ minHeight }) => [minHeight] 
                            }
                            blocking={false}
                        >

                            <div className="mapControls-mobile flexbox column center">
                                <div className="map-control-buttons flexbox space-between">
                                    <div className="control-button flexbox column center">
                                        <button
                                            onClick={() => {
                                                setViewPort({
                                                    latitude: 37.360205578662605,
                                                    longitude: lon,
                                                    zoom: zoomX,
                                                    width: "100vw",
                                                    height: "100vh",
                                                    bearing: 90,
                                                });
                                            }}
                                            className='controlButton'>
                                            <IoIosNavigate size={35} />
                                        </button>
                                        <p>Center</p>
                                    </div>
                                    <div className="control-button flexbox column center">
                                        <button className='controlButton' onClick={handleSingleDirection}>
                                            <FaDirections size={35} style={singleDirectionStyle} />
                                        </button>
                                        <p>Navigate</p>
                                    </div>
                                    <div className="control-button flexbox column center">
                                        <button className='controlButton' onClick={handleScheduleDirections}>
                                            <FaRoute size={35} style={scheduleDirectionStyle} />
                                        </button>
                                        <p>Daily Schedule</p>
                                    </div>
                                    <div className="control-button flexbox column center">
                                        <button className='controlButton' onClick={()=>navigate('/static-map')}>
                                            <MdMap size={35}/>
                                        </button>
                                        <p>Static Map</p>
                                    </div>
                                </div>
                                {
                                    singleDirectionsToggle && 
                                    <div className='controlContainer'>
                                        <h3 className = {startingRoomStyle}>Starting Room: </h3>
                                        <input ref={inputCurrentRoom} value={restRoom} type='text' className='findRoom' placeholder='806' onChange={(e) => formChange1(e.target.value.toLowerCase())} />
                                        <h3 className = {endingRoomStyle}>Ending Room: </h3>
                                        <input ref={inputFindingRoom} value={findRoom} type='text' className='findRoom' placeholder='607' onChange={(e) => formChange2(e.target.value.toLowerCase())} />
                                        
                                        {error && 
                                            <div style = {{marginTop: '25px'}}>
                                                <Alert variant="outlined"  severity="error" sx = {{width: '175px'}}>{errorMessage}</Alert>
                                            </div>
                                        }
                                        <br />
                                        <div>
                                            <button className='go' onClick={handleMap}>
                                                Navigate
                                            </button>
                                        </div>
                                    </div>
                                }
                                {
                                    !scheduleDirectionToggle &&
                                    <div className='flexbox column center controlContainer'>
                                        <div className = 'flexbox center' style = {{justifyContent: 'flex-start', marginBottom: '0.5rem'}} onClick = {()=>setScheduleDirectionToggle(true)}>
                                            <span style = {{color: 'grey'}}>Hide</span>
                                        </div>
                                        <h2>Daily Schedule Route</h2>
                                        <h3>Your Periods For Today!</h3>
                                        {
                                            schedule.length === 0 ?
                                            <div>
                                                <Alert className = 'flexbox center' variant="outlined" severity="info" sx = {{width: "75%"}}>No School Today!</Alert>
                                            </div> : 
                                            
                                            schedule.map((room, index) => {
                                            return (
                                                <li key={index}>
                                                    {room.properties.name.charAt(0).toUpperCase() + room.properties.name.slice(1)}
                                                </li>
                                            );
                                        })
                                        }
                                    </div>
                                }
                                {
                                    !scheduleDirectionToggle || singleDirectionsToggle &&  
                                    <span style={{marginBotton: "1vh"}} />
                                }   
                            </div>
                            
                        </BottomSheet>
                    </>
                    }

                    <Construction />
                    {   showPopups && 
                        otherData.features.map((place, index) => {
                            if(place.properties.name === 'Vending Machine'){
                                return <Popup key={index} longitude={place.geometry.coordinates[0]} latitude={place.geometry.coordinates[1]} closeButton={false} closeOnClick={false} anchor='bottom'><GiVendingMachine size = {20}/></Popup>
                            }
                            else if(place.properties.name === 'Parking Lot'){
                                return <Popup key={index} longitude={place.geometry.coordinates[0]} latitude={place.geometry.coordinates[1]} closeButton={false} closeOnClick={false} anchor='bottom'><FaParking size = {20}/></Popup>
                            }
                            else if(place.properties.name === 'Bike Rack'){
                                return <Popup key={index} longitude={place.geometry.coordinates[0]} latitude={place.geometry.coordinates[1]} closeButton={false} closeOnClick={false} anchor='bottom'><MdDirectionsBike size = {20}/></Popup>
                            }
                            else if(place.properties.name === 'Bathroom'){
                                return <Popup key={index} longitude={place.geometry.coordinates[0]} latitude={place.geometry.coordinates[1]} closeButton={false} closeOnClick={false} anchor='bottom'><GrRestroom size = {20}/></Popup>
                            }
                            return null;
                        })
                    }
                </div>
            </ReactMapGL>
        </div>
    );
};

export default Map;

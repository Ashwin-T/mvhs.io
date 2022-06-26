import { useState, useEffect } from "react";
import './weather.css'
import {WiDaySunny, WiCloudy, WiDayRain, WiDayThunderstorm} from "weather-icons-react";

const Weather = () => { 


    const [forcast, setForcast] = useState('');
    const [temperature, setTemperature] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(()=>{
        const getWeather = async()=>{
            const url = `https://api.weather.gov/gridpoints/MTR/96,105/forecast/hourly`; 

            fetch(url)
            .then(response => response.json())
            .then(data => {
                setTemperature(data.properties.periods[0].temperature)
                const forcastTemp = data.properties.periods[0].shortForecast;
                setForcast(forcastTemp)
                if (forcastTemp.includes('Thunder')) {
                    setIcon(<WiDayThunderstorm color = {'goldenrod'} size = {125}/>)
                } 
                else if (forcastTemp.includes('Rain')) {
                    setIcon(<WiDayRain color = {'#59bfff'} size = {125} />)
                } 
                else if (forcastTemp.includes('Shower')) {
                    setIcon(<WiDayRain color = {'#59bfff'} size = {125} />)
                } 
                else if (forcastTemp.includes('Cloud')) {
                    setIcon(<WiCloudy color = {'grey'} size = {125}/>)
                }   
                else{
                    setIcon(<WiDaySunny color = {'orange'} size = {125}/>)
                }
            })
            .catch(err => console.error(err));   
        }
        getWeather();
    }, [])


    return ( 
        <>
            <div className="weather-container">
                {temperature !== '' ?
                    <>
                        {window.innerWidth > 786 &&
                        <h1>Weather</h1>
                        }
                        {icon}
                        <h2>{temperature}°</h2>
                        <h2>{forcast}</h2>
                    </>
                    :
                    <h2>No Weather Reports Today</h2>
                }
            </div>
        </>
    );
}
 
export default Weather;
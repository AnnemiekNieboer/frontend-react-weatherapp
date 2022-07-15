import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from "./pages/forecastTab/ForecastTab";
import TodayTab from "./pages/todayTab/TodayTab";
import './App.css';
import {TempContext} from "./context/TempProvider";

function App() {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState("");
    const [error, toggleError] = useState(false);
    const {kelvinToMetric} = useContext(TempContext);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},&appid=${process.env.REACT_APP_API_KEY}&lang=nl`)
                console.log(result.data);
                setWeatherData(result.data);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        if (location) {
            fetchData();
        }
    }, [location]);


    return (
        <>
            <div className="weather-container">

                {/*HEADER -------------------- */}
                <div className="weather-header">
                    <SearchBar setLocationHandler={setLocation}/>
                    {error &&
                        <span className="wrong-location-error">
                            Oeps! Deze locatie bestaat niet
                        </span>}
                    <span className="location-details">
            {Object.keys(weatherData).length > 0 &&
                <>
                    <h2>{weatherData.weather[0].description}</h2>
                    <h3>{weatherData.name} </h3>
                    <h1>{kelvinToMetric(weatherData.main.temp)}</h1>
                </>
            }

          </span>
                </div>

                {/*CONTENT ------------------ */}
                <Router>
                    <div className="weather-content">
                        <TabBarMenu/>
                        <Switch>
                            <div className="tab-wrapper">
                                <Route path="/komende-week">
                                    <ForecastTab coordinates={weatherData.coord}/>
                                </Route>
                                <Route exact path="/">
                                    <TodayTab coordinates={weatherData.coord}/>
                                </Route>
                            </div>
                        </Switch>

                    </div>
                </Router>


                <MetricSlider/>
            </div>
        </>
    )
        ;
}

export default App;

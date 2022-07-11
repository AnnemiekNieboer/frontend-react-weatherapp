import React, {useState, useEffect} from 'react';
import './ForecastTab.css';
import axios from "axios";

const apiKey = "22a778fa6c36dc3f51653cec7fce0a89";

function ForecastTab({coordinates}) {
    const [forecasts, setForecasts] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    function createDateString(timestamp) {
        const day = new Date(timestamp * 1000);
        return day.toLocaleDateString('nl-NL', {weekday: 'long'});
    }

    useEffect(() => {
        async function fetchData() {
            toggleError(false);
            toggleLoading(true);
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${apiKey}&lang=nl`)
                setForecasts(result.data.daily.slice(1, 6));
                console.log(result.data.daily);
            } catch (e) {
                console.error(e)
                toggleError(true);
            }
            toggleLoading(false);
        }

        if (coordinates !== undefined) {
            fetchData();
        }
    }, [coordinates])

    return (
        <div className="tab-wrapper">
            {loading && <span>Loading...</span>}
            {error && <span>Er is iets misgegaan met het ophalen van de data</span>}
            {forecasts.length === 0 && !error &&
            <span className="no-forecast">Zoek eerst een locatie om het weer voor deze week te bekijken</span>}
            {forecasts.map((day) => {
                return (
                    <article className="forecast-day" key={day.dt}>
                        <p className="day-description">
                            {createDateString(day.dt)}
                        </p>

                        <section className="forecast-weather">
                        <span>
                        {day.temp.day}&deg; C
                        </span>
                            <span className="weather-description">
                        {day.weather[0].description}
                        </span>
                        </section>
                    </article>
                )
            })}


        </div>
    );
};

export default ForecastTab;

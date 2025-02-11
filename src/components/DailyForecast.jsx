import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import clear_icon from '../assets/clear.png'
import cloudy_icon from '../assets/cloudy.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import humidity_icon from '../assets/humidity.png'
import snow_icon from '../assets/snow.png'
import storm_icon from '../assets/storm.png'
import wind_icon from '../assets/wind.png'


function DailyForecast({ lat, lon }){

	const key = 'df3d6eb726ef3b645b8e1ebe44c31ee9'
	const urlDaily = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=America%2FToronto`;
	const [dailyData, setDailyData] = useState([])
	const [loading, setLoading] = useState(true)

	const dailyIcons = {
		clear: clear_icon,
		cloudy: cloudy_icon,
        drizzle: drizzle_icon,
        rain: rain_icon,
        humidity: humidity_icon,
        snow: snow_icon,
		storm: storm_icon,
        wind: wind_icon,
	}

	const getWeatherIcon = (forecast) => {
		if (forecast.precipitation_sum > 0) {
		  if (forecast.temperature_2m_max < 0) {
			return dailyIcons.snow; 
		  }
		  return dailyIcons.rain; 
		} else if (forecast.temperature_2m_max > 20) {
		  return dailyIcons.clear; 
		} else {
		  return dailyIcons.cloudy; 
		}
	  };

	useEffect(() => {
		if (lat && lon) {
			axios.get(urlDaily)
			    .then(response => {
					console.log(response)

					const { time, temperature_2m_max, temperature_2m_min, precipitation_sum, windspeed_10m_max } = response.data.daily;
        
					const combinedData = time.map((t, index) => ({
					time: t,
					temperature_2m_max: temperature_2m_max[index],
					temperature_2m_min: temperature_2m_min[index],
					precipitation_sum: precipitation_sum[index],
					windspeed_10m_max: windspeed_10m_max[index],
					}));

					const filteredData = combinedData.slice(2, 7)

                    setDailyData(filteredData)
					setLoading(false)
                })
				.catch(error => {
                    console.error('Error fetching daily data:', error);
					setDailyData([])
					setLoading(false)
                });
		}
	}, [lat, lon])

	let content;
	if (loading){
		content = <p>Loading forecast...</p>
	} else if (dailyData.length === 0){
		content = <p>No forecast data available.</p>
	} 
	return (
		<div>
			<section className="daily-forecast py-5 text-secondary">
				<div className="container">
					<div className="daily-details">
						<h2 className="mb-3">Daily Forecast</h2>

					{/* START Daily Weather Card */}
						<div className="row gap-3">
							{dailyData.map((forecast, index) => (
								<div className="card card-body p-3 text-light text-center border-0 col-12 col-lg-2" key={index}>
									<p className="fs-4 fw-semibold">{new Date(forecast.time).toLocaleDateString("en-US", { weekday: "short" })}</p>

									{/*Weather Icon */}
									<div className="d-flex justify-content-center">
										<img src={getWeatherIcon(forecast)} alt="" className="weather-icon3 me-2 mb-3"/>
									</div>
									
									<p>High: {Math.round(forecast.temperature_2m_max)}°C</p>
									<p>Low: {Math.round(forecast.temperature_2m_min)}°C</p>
									<p>Precipitation: {forecast.precipitation_sum}mm</p>
									<p>Wind: {forecast.windspeed_10m_max} km/h</p>
								</div>
							))}
						</div>
					{/* END Daily Weather Card */}

					</div>
				</div>
			</section>
		</div>
	)
}

export default DailyForecast

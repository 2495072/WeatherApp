import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import clear_icon from '../assets/clear.png'
import cloudy_icon from '../assets/cloudy.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import humidity_icon from '../assets/humidity.png'
import snow_icon from '../assets/snow.png'
import storm_icon from '../assets/storm.png'
import wind_icon from '../assets/wind.png'



function Weather({
	city,
	state,
	country,
	lat,
	lon,
	setCity,
	setState,
	setCountry,
	setLat,
	setLon,
}){
	const [currentDate, setCurrentDate] = useState('')
	const key = '4922921a823cf0a78be24f6a5bd344c9';
	const [data, setData] = useState({});
	const urlNow = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
	const urlLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${key}`;

	const allIcons = {
		"01d": clear_icon,
		"01n": clear_icon,
		"02d": cloudy_icon,
        "02n": cloudy_icon,
        "03d": cloudy_icon,
        "03n": cloudy_icon,
        "04d": drizzle_icon,
		"04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
		"11d": storm_icon,
        "11n": storm_icon,
        "13d": snow_icon,
        "13n": snow_icon,
	}

	let icon = clear_icon
	if (data.weather && data.weather[0] && data.weather[0].icon) {
  	icon = allIcons[data.weather[0].icon] || clear_icon;
	}

	const handleInputCity = (event) => {
		setCity(event.target.value);
	};

	const handleInputState = (event) => {
		setState(event.target.value);
	};

	const handleInputCountry = (event) => {
		setCountry(event.target.value);
	};

	const handleSearch = () => {
		axios.get(urlLocation).then((response) => {
		const coord = response.data[0];
		setLat(coord.lat);
		setLon(coord.lon);
		console.log(coord.lat);
		console.log(coord.lon);
		})
	}

	useEffect( () => {
		if (lat && lon) {
		axios.get(urlNow).then((response) => {
			setData(response.data);
			console.log(`now weather ${response.data}`);
		})
		.catch(error => {
			console.error("error fetching data ", error);
		});
		}
	}, [lat, lon] );

	useEffect(() => {
		const today = new Date();
		const formattedDate = today.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
            month: 'long',
            day: 'numeric',
		})
		setCurrentDate(formattedDate);
	}, [])

  return (
    <>

    <section className="weather-banner text-light">
        <div className="container">
            <h5 className="">{currentDate}</h5>
            <h1 className="display-3 mb-4 fw-semibold">Your weather companion</h1>

		{/* START Search Input Group */}
            <div className="search input-group mb-5">
				<input
					type="text"
					className="form-control"
					placeholder="Enter city"
					value={city}
					onChange={handleInputCity}
				/>
				<input
					type="text"
					className="form-control"
					placeholder="Enter State"
					value={state}
					onChange={handleInputState}
				/>
				<input
					type="text"
					className="form-control"
					placeholder="Enter Country"
					value={country}
					onChange={handleInputCountry}
				/>
				<button className="search btn btn-outline-light" type="button" id="button-addon2" onClick={handleSearch}><i className="fa-solid fa-magnifying-glass me-2"></i>Search</button>    
            </div>
        {/* END Search Input Group */}


			<div className="temp-flex row g-3 align-items-center">

			{/* START Flex Left */}
				<div className="card temp-card col-12 col-md-6 border-0">
					<div className="text-center text-secondary">
						<img src={icon} alt="" className="weather-icon"/>
						<h2 className="display-1 fw-semibold">{data?.main ? `${Math.round(data.main.temp - 273.15)}°C` : "Loading..."}</h2>
						<p className="city-input text-capitalize fs-5">{city}</p>
					</div>			
				</div>
			{/* END Flex Left */}

			{/* START Flex Right */}
				<div className="details-card col-12 col-md-6 g-5 mt-3">
						{data?.weather ? (
							<>
						
							<div className="card card-body mb-2 text-light border-0 text-center">
								<p className="fs-6"><span className="fw-semibold">Feels Like:</span> {Math.round(data.main.feels_like - 273.15)}°C</p> 
							</div>

							<div className="card card-body mb-2 d-flex align-items-center border-0 text-light">
								<img src={humidity_icon} alt="" className="weather-icon2 me-2"/>
								<p className="fs-6"><span className="fw-semibold">Humidity:</span> {data.main.humidity}%</p> 
							</div>
						
							<div className="card card-body mb-2 d-flex align-items-center border-0 text-light">
								<img src={wind_icon} alt="" className="weather-icon2 me-2"/>
								<p className="fs-6"><span className="fw-semibold">Wind Speed:</span> {data.wind.speed} m/s</p> 
							</div>
						
							</>
						) : (
							<div className="col-12">
							<p className="text-center">Enter a location to see weather details.</p>
							</div>
						)}
				</div> 
			{/* END Flex Right */}

			</div>
        </div>
    </section>
   
    </>
  
  )
}

export default Weather

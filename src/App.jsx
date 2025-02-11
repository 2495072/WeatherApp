import { useState } from 'react'
import './App.css'
import Weather from './components/Weather'
import HeroBanner from './components/HeroBanner'
import DailyForecast from './components/DailyForecast'
import Footer from './components/Footer'


function App() {
  
    
    const [city, setCity] = useState('Montreal');
    const [state, setState] = useState('QC');
    const [country, setCountry] = useState('Canada');
    const [lat, setLat] = useState('45.5031824');  // montreal
    const [lon, setLon] = useState('-73.5698065'); // montreal

    return (
      <>
      <HeroBanner />  
      <Weather 
		city={city}
        state={state}
        country={country}
        lat={lat}
        lon={lon}
        setCity={setCity}
        setState={setState}
        setCountry={setCountry}
        setLat={setLat}
        setLon={setLon}
      />
      <DailyForecast lat={lat} lon={lon} />
	  <Footer />
      
    
      </>
    )
}

export default App

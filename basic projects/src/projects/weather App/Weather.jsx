import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('delhi');

  

  const getWeather = async () => {
    try{
      const res= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`)
      console.log(res.data);
      setWeather(res.data);

    }
    catch(err){
      console.log(err);

    }
  }

  const DateAndtime=()=>{
    
      const date=new Date();

    const hours=date.getHours();
    const minutes=date.getMinutes();
    const seconds=date.getSeconds();

    const ampm=hours>=12 ? 'PM' : 'AM';

    const formattedHours=hours%12 || 12;

    const formattedTime=`${formattedHours}:${minutes}:${seconds} ${ampm}`;

    return formattedTime;
      

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  }

  useEffect(() => {
    getWeather();
  },[])


  return (
    <section className='max-w-md mx-auto p-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-xl backdrop-blur-sm'>
      <form onSubmit={handleSubmit} className='flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/30'>
        <CiSearch className='text-white text-xl'  />
        <input 
          type="text" 
          placeholder="Search for location"
          className='w-full bg-transparent outline-none placeholder:text-white/80 text-white'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </form>

      <div className='mt-8 text-center text-white'>
        <h2 className='text-xl font-light opacity-80'>Current Weather</h2>
        {weather && (
          <>
            <h1 className='text-4xl font-bold mt-2'>{weather.name}</h1>
            <h1 className='text-3xl font-bold mt-2'>
              
              <span className='text-xl'>Feels like </span>{Math.round(weather.main.feels_like - 273.15)}°C
            </h1>
            <p className='mt-1 opacity-90'>{DateAndtime()}</p>
          </>
        )}
        
        <div className='mt-6 bg-white/20 rounded-xl p-4 backdrop-blur-sm'>
          <div className='flex justify-center items-center gap-4'>
            <span className='text-xl font-medium'>{weather?.weather[0].main}</span>
            <span className='text-3xl font-bold'>
              {weather ? Math.round(weather.main.temp - 273.15) : '--'}°C
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Weather
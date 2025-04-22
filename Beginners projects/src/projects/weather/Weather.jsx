import React, { useEffect, useState } from 'react';
import { FaLocationArrow } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { fetchWeather } from '../../Api/Weather_Api';

const Weather = () => {
    const [city, setCity] = useState('London');
    const [input, setInput] = useState('');
    const [weatherData, setWeatherData] = useState({
        current: null,
        forecast: null
    });

    useEffect(() => {
        const loadWeather = async () => {
            try {
                const data = await fetchWeather(city);
                setWeatherData({
                    current: data.current,
                    forecast: data.forecast
                });
            } catch (error) {
                console.error("Failed to fetch weather:", error);
            }
        };
        loadWeather();
    }, [city]);

    const formSubmit = (e) => {
        e.preventDefault();
        setCity(input);
    };

    return (
        <div className='w-full h-screen rounded-md flex'>
            <div className='w-3/4 h-full flex flex-col justify-between pr-10'>
                <h3 className='w-full p-3 text-end text-2xl'>
                    <span className='pr-4 border-r-2 border-gray-500'>
                        {new Date().toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </span>
                    <span className='pl-4'>{(new Date().toTimeString()).split(' ')[0]}</span>
                </h3>

                <div className='w-full flex flex-col gap-10 pr-10'>
                    {weatherData.current ? (
                        <h1 className='w-full text-end text-6xl border-b-2 pb-5 border-gray-500 capitalize'>
                            {weatherData.current.weather[0].description}
                        </h1>
                    ) : (
                        <div className='w-full text-end text-6xl border-b-2 pb-5 border-gray-500'>
                            Loading...
                        </div>
                    )}

                    <ul className='grid grid-cols-5 gap-3'>
                        {weatherData.forecast?.list.slice(0, 5).map((item, index) => (
                            <li key={index} className='flex justify-center gap-5 flex-col items-center text-3xl'>
                                <span className='border-b-2 border-gray-400 pb-5'>
                                    {new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className='pt-5'>{Math.round(item.main.temp)}°C</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='w-1/4 h-full p-4 flex flex-col gap-10 justify-between items-center'>
                <div className='w-3/4 m-auto flex justify-around items-center border-2 p-2 border-gray-300 text-gray-600'>
                    <FaLocationArrow />
                    <form onSubmit={formSubmit}>
                        <input
                            type="text"
                            placeholder='Enter your city'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className='outline-none bg-transparent text-gray-600'
                        />
                    </form>
                    <IoIosArrowDown />
                </div>

                {weatherData.current ? (
                    <>
                        <h1 className='text-8xl'>{Math.round(weatherData.current.main.temp)}°C</h1>
                        <h4 className='text-[1rem] capitalize text-gray-400 border-b-2 border-gray-300 pb-9 w-full text-center'>
                            {`${weatherData.current.wind.speed} Km/hr`}
                        </h4>
                    </>
                ) : (
                    <>
                        <h1 className='text-8xl'>--</h1>
                        <h4 className='text-[1rem] text-gray-400 border-b-2 border-gray-300 pb-9 w-full text-center'>
                            Loading...
                        </h4>
                    </>
                )}

                <div className='w-full text-center'>
                    <h2 className='text-[1rem] text-gray-700 mb-8'>The Next Days Forecast</h2>
                    <ul className='w-full flex flex-col gap-5 mt-4 capitalize'>
                        {weatherData.forecast?.list.slice(0, 5).map((item, index) => (
                            <li key={index} className='flex justify-center gap-5 text-xl items-center'>
                                <img
                                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                    alt="weather icon"
                                    className='w-10 h-10'
                                />
                                <div className='flex flex-col gap-1'>
                                    <h1>{new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h1>
                                    <h3>{item.weather[0].description}</h3>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h1>{Math.round(item.main.temp)}°C</h1>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Weather;

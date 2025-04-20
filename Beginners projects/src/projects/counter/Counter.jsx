import React, { useState } from 'react'

const Counter = () => {

    const [count, setCount] = useState(0);
    const [input, setInput] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleIncrement=()=>{
        input===0 ? setCount(count+1) : setCount(count+input);
        
        
    }

    const handleDecrement=()=>{
        input===0? setCount(count-1) : setCount(count-input);
    }

    const handleInput = (e)=>{
        const num= Number(e.target.value);
        setInput(num);

    }

  return (
    <section className={`w-full h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} flex justify-center items-center`}>
        <div className={`px-12 py-5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex justify-center items-center flex-col gap-10 rounded-lg shadow-xl`}>
            <button 
                onClick={toggleDarkMode}
                className={`absolute top-4 right-4 p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-800'}`}
            >
                {isDarkMode ? '🌙' : '☀️'}
            </button>
            
        <h1 className={`text-2xl ${isDarkMode ? 'text-white' : ' text-gray-950'}`}>Counter</h1>
        <h1 className={`text-2xl ${isDarkMode ? 'text-white' : ' text-gray-950'}`}>{count}</h1>
        <input 
            type="text" 
            placeholder='Enter a Number to Inc or Dec'
            className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
            onChange={handleInput}
        />
        <div className='flex gap-10'>
            <button 
                onClick={handleIncrement}
                className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-green-500' : 'bg-green-600'} text-white`}
            >Inc</button>
            <button
                onClick={handleDecrement}
                className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-red-500' : 'bg-red-600'} text-white`}
                disabled={count-input <0 || count===0}
            >Dec</button>
        </div>
        <button className={`px-6 py-2 rounded-md text-white ${isDarkMode ? 'bg-red-500' : 'bg-red-600'}`}
            onClick={() => setCount(0)}
        >
            Reset
        </button>
        </div>
    </section>
  )
}

export default Counter
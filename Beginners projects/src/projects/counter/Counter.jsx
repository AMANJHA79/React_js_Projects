import React, { useEffect, useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(
        Number(localStorage.getItem('countKey')) || 0
    );
    const [input, setInput] = useState(
        0
    );
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Consolidated dark mode classes
    const textColor = isDarkMode ? 'text-white' : 'text-gray-950';
    const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
    const inputBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    // Optimized handlers using functional updates
    const handleIncrement = () => setCount(prev => prev + (input || 1));
    const handleDecrement = () => setCount(prev => prev - (input || 1));

    // Added input validation
    const handleInput = (e) => {
        const num = Number(e.target.value);
        setInput(isNaN(num) ? 0 : num);
    };

    useEffect(() => {
        localStorage.setItem('countKey', count);
      }, [count]);

    return (
        <section className={`w-full h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} flex justify-center items-center`}>
            <div className={`px-12 py-5 ${bgColor} flex justify-center items-center flex-col gap-10 rounded-lg shadow-xl`}>
                <button 
                    onClick={toggleDarkMode}
                    className={`absolute top-4 right-4 p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-800'}`}
                >
                    {isDarkMode ? '🌙' : '☀️'}
                </button>
                
                <h1 className={`text-2xl ${textColor}`}>Counter</h1>
                <h1 className={`text-2xl ${textColor}`}>{count}</h1>
                <input 
                    type="number" 
                    placeholder='Enter increment/decrement value'
                    className={`px-4 py-2 rounded-md ${inputBg} ${textColor}`}
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
                        disabled={count - (input || 1) < 0}
                    >Dec</button>
                </div>
                <button className={`px-6 py-2 rounded-md text-white ${isDarkMode ? 'bg-red-500' : 'bg-red-600'}`}
                    onClick={() => 
                        setCount(0) 

                    }
                >
                    Reset
                </button>
            </div>
        </section>
    )
}

export default Counter;
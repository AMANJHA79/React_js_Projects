import React, { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);
    const [number, setNumber] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value)) {
            setNumber(value);  // store as string
        }
    };

    const handleIncrement = () => {
        const num = Number(number);
        if (number !== '' && !isNaN(num)) {
            setCount(prevVal => prevVal + num);
        } else {
            setCount(count + 1);
        }
    };

    const handleDecrement = () => {
        const num = Number(number);
        if (count < 0 || (number !== '' && count - num < 0)) return;

        if (number !== '' && !isNaN(num)) {
            setCount(prevVal => prevVal - num);
        } else {
            setCount(count - 1);
        }
    };

    return (
        <section className='flex flex-col gap-5 border-2 border-amber-100 p-6 items-center '>
            <h1 className='text-4xl'>{count}</h1>
            
            <input
                type="text"
                className='p-4 border border-amber-200'
                placeholder='Enter a number'
                value={number}
                onChange={handleInputChange}
            />

            <div className="flex gap-4 ">
                <button
                    onClick={handleIncrement}
                    className='p-4 border-2 border-amber-200 bg-green-800 text-white'
                >
                    Increase
                </button>
                <button
                    onClick={handleDecrement}
                    className='p-4 border-2 border-amber-200 bg-green-800 text-white'
                    disabled={Number(number) < 0 || count - Number(number) < 0}
                >
                    Decrease
                </button>
            </div>

            <button
                className='p-4 border-2 border-amber-200 bg-red-800 text-white w-full'
                onClick={() => setCount(0)}
            >
                Reset
            </button>
        </section>
    );
}

export default Counter;

import React, { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);
    const [number, setNumber] = useState('');
    const handleIncrement = () => {
        if(number) {
            setCount(prevVal => prevVal + number);
            return;
        }
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if(count<0 || count+number<0) {
            return;
        }
        if(number) {
            setCount(prevVal => prevVal - number);
            return;
        }
        setCount(count - 1);
    };

  return (
    <section className='flex flex-col gap-5 border-2 border-amber-100 p-6 items-center '>
        <h1 
        className='text-4xl'>{count}</h1>
        <input type="text" 
        className='p-4 border border-amber-200'
        placeholder='Enter a number'
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
        
        />
        <h2>{number}</h2>
        <h2>{typeof(number)}</h2>
        <div className="flex gap-4 ">
            <button onClick={handleIncrement}  
            className='p-4 border-2 border-amber-200 bg-green-800'>Increase</button>
            <button onClick={handleDecrement} 
            className='p-4 border-2 border-amber-200 bg-green-800'
            disabled={number<0 || count-number<0}
            >Decrease</button>
        </div>
        <button
        className='p-4 border-2 border-amber-200 bg-red-800 w-full'
        onClick={() => setCount(0)}
        >
            Reset
        </button>
      
    </section>
  )
}

export default Counter

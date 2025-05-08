import React, { useState } from 'react';

const Colorpicker = () => {
  const [color, setColor] = useState('#000000'); 

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(color);
    alert('Color copied to clipboard!');
  };

  return (
    <section className='w-1/2 flex flex-col gap-3 items-center border border-amber-50 p-4'>
      <input type="color" value={color} onChange={handleColorChange}
      className='w-full h-20 rounded-full'
      />
      <h1 className='flex flex-col gap-3 items-center'>Selected Color: 
        <h3 
        onClick={handleCopyToClipboard}
        className='text-3xl '
        
        >
          {color}
        </h3>
        
      </h1>
    </section>
  );
};

export default Colorpicker;
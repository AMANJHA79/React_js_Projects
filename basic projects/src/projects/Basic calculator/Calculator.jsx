import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const btn = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "+",
    "⬅️",
  ];
  const handleClick = (value) => {
    if (value === "⬅️") {
      setInput((prevVal) => prevVal.slice(0, -1));
    } else {
      setInput((prevVal) => prevVal + value);
    }
  };

  const handleResult = () => {
    setInput(eval(input));
  };

  return (
    <section className="p-4 max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg">
      <input
        type="text"
        className="w-full h-20 mb-4 bg-gray-700 text-white text-right text-4xl px-4 rounded-lg outline-none"
        value={input}
      />
      <div className="grid grid-cols-4 gap-3 ">
        {btn.map((value, index) => (
          <button
            key={index}
            className={`w-full h-20 bg-gray-600 text-white text-2xl rounded-lg hover:bg-gray-700 transition duration-300`}
            onClick={() => handleClick(value)}
          >
            {value}
          </button>
        ))}
      </div>

      <button
        className="w-full h-20 bg-green-500 text-white text-2xl rounded-lg hover:bg-green-600 transition duration-300 mt-4"
        onClick={handleResult}
      >
        =
      </button>
      <button
        className="w-full h-20 bg-red-500 text-white text-2xl rounded-lg hover:bg-red-600 transition duration-300 mt-4"
        onClick={() => setInput("")}
      >
        Clear
      </button>
    </section>
  );
};

export default Calculator;

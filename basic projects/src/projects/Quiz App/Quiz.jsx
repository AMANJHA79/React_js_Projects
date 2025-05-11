import React, { useState } from 'react'
import questions from './ques'

const Quiz = () => {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)



  const SetOptions = (option) => {
    if (option === questions[currentQuestion].answer) {
        setScore(prevScore => prevScore + 1);
        
    }
    if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(prevQues => prevQues + 1);
    } else {
        setShowScore(true);
    }
}


  const handleRestart = () => {
      setCurrentQuestion(0);
      setScore(0); // Reset the score
      setShowScore(false); 
  }


  


  return (
    <section className='py-4 px-8 border border-white flex flex-col gap-4 '>
      <h1 className='text-xl text-center'>Quiz</h1>
      {
        showScore ? (
          <>
            <p>You scored {score} out of {questions.length}</p>
            <button
            className='p-3 border border-white bg-red-500'
            onClick={handleRestart}
            >
              Restart 
            </button>
          </>
        ) : (
          <>
            <p className='text-2xl flex gap-2'>
              <span>Q{currentQuestion + 1}.</span>
              <h2>{questions[currentQuestion].question}</h2>
            </p>
            <ul className='grid grid-cols-2 gap-3'>
              {
                questions[currentQuestion].options.map((option, index) => {
                  return (
                    <li
                      className={`text-center p-2 border border-white bg-gray-800  hover:bg-gray-600 cursor-pointer transition`}
                      key={index}
                      onClick={() => SetOptions(option)}
                    >
                      {option}
                    </li>
                  );
                })
              }
            </ul>
           
          </>
        )
      }
    </section>
  )
}

export default Quiz
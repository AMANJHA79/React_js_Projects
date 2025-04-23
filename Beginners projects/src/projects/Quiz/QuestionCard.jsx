import React, { useState } from 'react'
import questions from './questions.json'
import Result from './Result';

const QuestionCard = () => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);


    const handleOptionClick=(options)=>{
        if(options===questions[currentQuestionIndex].answer){
            setScore(prev => prev+1);
        }
        if(currentQuestionIndex<questions.length-1){
            setCurrentQuestionIndex(currentQuestionIndex+1); 
            
        }
        else{
            setShowResult(true); 

        }
    }

    if(showResult){
        return(
            <Result 
                score={score} 
                totalQuestions={questions.length} 
                onPlayAgain={() => {
                    setShowResult(false);
                    setCurrentQuestionIndex(0); 
                    setScore(0); 
                }}
            />
        )
    }





  return (
    <section className='w-1/2 p-4 bg-gray-800 text-white flex flex-col gap-5'>
        <h1 className='text-4xl text-center'>Quizz</h1>
        <p className='text-sm text-gray-400'>Question {currentQuestionIndex + 1} of {questions.length}</p>
<p className='text-sm text-gray-400'>Current Score: {score}</p>
        <div>
            <h2>{questions[currentQuestionIndex].question}</h2>
            <ul>
                {
                    questions[currentQuestionIndex].options.map((options, index) => (
                        <li key={index} className='flex gap-3'>
                            <button onClick={() => handleOptionClick(options)} className='px-5 py-3 bg-gray-700 w-full'>{options}</button>
                        </li>
                    ))
                }
            </ul>

        </div>
    </section>
  )
}

export default QuestionCard

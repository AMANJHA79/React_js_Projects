import React from 'react'

const Result = ({ score, totalQuestions, onPlayAgain }) => {
  return (
    <section className='w-1/2 p-4 bg-gray-800 flex justify-between flex-col items-center gap-5 text-white'>
      <h2 >You scored {score} out of {totalQuestions}</h2>
      <h3>
        {
          (score / totalQuestions) * 100 >= 70 ? "Congratulations! You passed the quiz." : "You failed the quiz. Better luck next time!"
        }
      </h3>
      <h3>
        {
          (score / totalQuestions) * 100 >= 70 ? "😎😎🍾🍾" : "🥹🥹😭😭"
        }
      </h3>
      <button onClick={onPlayAgain}
      className='px-5 py-3 bg-gray-700 w-full'
      >Play Again</button>
    </section>
  )
}

export default Result

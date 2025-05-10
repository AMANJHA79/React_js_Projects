import React from 'react'
import Todo from './projects/Todo/Todo'
// import Clock from './projects/digital clock/Clock'
// import Calculator from './projects/Basic calculator/Calculator'
// import Colorpicker from './projects/color picker/Colorpicker'
// import Counter from './projects/counter/Counter'

const App = () => {
  return (
    <section className='w-full p-10 bg-gray-900 text-white flex items-center justify-center flex-col gap-10'>
      {/* <Counter /> */}
      {/* <Colorpicker /> */}
      {/* <Clock /> */}
      {/* <Calculator /> */}
      <Todo />
    </section>
  )
}

export default App

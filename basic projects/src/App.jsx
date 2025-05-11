import React from 'react'
import Images from './projects/Gallery/Images'
import Quiz from './projects/Quiz App/Quiz'
import FormValidation from './projects/Form Validator/Form'
import Weather from './projects/weather App/Weather'
import Todo from './projects/Todo/Todo'
import Quotes from './projects/Quotes genertor/Quotes'
import Clock from './projects/digital clock/Clock'
import Calculator from './projects/Basic calculator/Calculator'
import Colorpicker from './projects/color picker/Colorpicker'
import Counter from './projects/counter/Counter'

const App = () => {
  return (
    <section className='w-full min-h-screen p-10 bg-gray-900 text-white flex items-center justify-center flex-col gap-10'>
      <Counter />
      <Colorpicker />
      <Clock />
      <Calculator />
      <Todo />
      <Quotes />
      <Weather />
      <Images />
      <Quiz />
      <FormValidation/>
    </section>
  )
}

export default App

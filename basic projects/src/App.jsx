import React from 'react'
import Colorpicker from './projects/color picker/Colorpicker'
// import Counter from './projects/counter/Counter'

const App = () => {
  return (
    <section className='w-full h-screen bg-gray-900 text-white flex items-center justify-center'>
      {/* <Counter /> */}
      <Colorpicker />
    </section>
  )
}

export default App

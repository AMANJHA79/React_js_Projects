import React from 'react'
import Counter from './projects/counter/Counter'
import Todo from './projects/todo/Todo'
import TestTodo from './projects/todo/Test-todo'

const App = () => {
  return (
    <section className='w-full h-screen bg-gray-900 flex justify-center items-center'>
    {/* <Counter /> */}
    <Todo />
    {/* <TestTodo /> */}
    </section>
  )
}

export default App
import React, { useEffect, useState } from 'react'



const tabs= [
  'all',
  'active',
  'completed'
]
const Todo = () => {
  const [todos, setTodos] = useState(
    localStorage.getItem('todosKey') ? JSON.parse(localStorage.getItem('todosKey')) : []
  );
  const [inputText, setInputText] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  // Function to filter todos based on activeFilter
  const filteredTodos = todos.filter(todo => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return !todo.completed;
    if (activeFilter === 'completed') return todo.completed;
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    if(todos.some(todo => todo.text === inputText)){
      setInputText('')
      return;
    }
    if(inputText.trim()){
      setTodos([...todos, {
        text: inputText,
        completed: false
      }])
      setInputText('')
    } 
  }

  const handleDelete = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)

  }

  const handleChange = (index) => {
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed
    setTodos(newTodos) 
  }

  useEffect(() => {
    localStorage.setItem('todosKey', JSON.stringify(todos)) 
  },[todos])

  


  return (
    <section className='p-8 bg-gray-800 flex flex-col gap-5 items-center justify-between rounded-2xl'>
      <h1 className='text-4xl text-white font-bold border-b-[0.5px] border-b-amber-400 w-full text-center pb-3'>Todo</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Todo '
        className='p-2 outline-none bg-gray-700 text-white'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        />
        <button type='submit'
        className='py-2 px-4 bg-green-400 text-black'
        >Add</button>
      </form>

      {/* Tabs for filtering */}
      <div className='flex gap-4'>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`py-2 px-4 ${activeFilter === tab ? 'bg-blue-700 text-white' : 'bg-gray-600 text-black font-bold'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <ul className='w-full'>
        {
          filteredTodos.map((todo, index) => (
            <li className='flex gap-4 justify-between items-center bg-gray-700 p-4 rounded-lg mb-2' key={index}>
              <input type="checkbox"
                onChange={() => handleChange(index)}
                checked={todo.completed}
                className='form-checkbox h-5 w-5 text-green-500'
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-white'}`}>{todo.text}</span>
              <button
                onClick={() => handleDelete(index)}
                className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300'
              >Delete</button>
            </li>
          ))
        }
      </ul>
      <button
        onClick={() => setTodos([])}
        className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300'
      >Clear All</button>
    </section>
  )
}

export default Todo
import React from 'react'

const Todo = () => {
  const [todos, setTodos] = React.useState([])
  const [input, setInput] = React.useState('')
  const [filter, setFilter] = React.useState('all') // 'all', 'active', 'completed'

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedInput = input.trim()
    if (trimmedInput === '') return

    // Prevent duplicates
    if (todos.some(todo => todo.text === trimmedInput)) {
      setInput('')
      return
    }

    setTodos([...todos, { text: trimmedInput, isChecked: false }])
    setInput('')
  }

  const handleToggleCheck = (index) => {
    setTodos(
      todos.map((todo, idx) =>
        idx === index ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    )
  }

  const handleDelete = (index) => {
    setTodos(todos.filter((_, idx) => idx !== index))
  }

  const handleDeleteCompleted = () => {
    setTodos(todos.filter(todo => !todo.isChecked))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.isChecked
    if (filter === 'completed') return todo.isChecked
    return true // 'all'
  })

  return (
    <section className='flex flex-col gap-4 items-center'>
      <h1 className="text-2xl font-bold">Todo</h1>

      {/* Add Todo */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Add a todo"
          value={input}
          className='outline-none bg-transparent border px-3 py-2 rounded-lg'
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className='bg-blue-500 text-white px-4 py-2 rounded-lg'
        >
          Add
        </button>
      </form>

      {/* Filter Tabs */}
      <div className="flex gap-4 mt-2">
        {['all', 'active', 'completed'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1 rounded-full ${filter === tab ? 'bg-blue-500 text-white' : 'text-blue-500 border border-blue-500'}`}
          >
            {tab[0].toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <ul className='w-full max-w-md flex flex-col gap-3 mt-4'>
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className='flex justify-between items-center border-b pb-2'
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className='w-5 h-5'
                checked={todo.isChecked}
                onChange={() => handleToggleCheck(index)}
              />
              <span className={`text-lg ${todo.isChecked ? 'line-through text-gray-400' : 'text-gray-200'}`}>
                {todo.text}
              </span>
            </div>
            <button
              className='text-red-500 hover:underline'
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Delete Completed */}
      {todos.some(todo => todo.isChecked) && (
        <button
          onClick={handleDeleteCompleted}
          className='text-red-600 hover:underline mt-4'
        >
          Delete All Completed
        </button>
      )}
    </section>
  )
}

export default Todo

import React, { useEffect, useState } from 'react'

const TestTodo = () => {
  // Add state management
  const [todos, setTodos] = useState(
    localStorage.getItem('todosKey') ? JSON.parse(localStorage.getItem('todosKey')) : []
  );
  const [inputText, setInputText] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Add missing handler functions
  const addTodo = (e) => {
    e.preventDefault();
    // Fix incorrect duplicate check
    if(todos.some(todo => todo.text === inputText)){
      setInputText('');
      return;
    }
    if (inputText.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputText,
        completed: false
      }]);
      setInputText('');
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Filter todos based on active filter
  const filteredTodos = todos.filter(todo => {
    if (activeFilter === 'active') return !todo.completed;
    if (activeFilter === 'completed') return todo.completed;
    return true;
  });

  useEffect(() => {
    // Save todos to local storage
    localStorage.setItem('todosKey', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
  {/* Main Container */}
  <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
    
    {/* Header */}
    <div className="bg-blue-500 p-4 text-white">
      <h1 className="text-2xl font-bold text-center">Todo App</h1>
    </div>

    {/* Input Section - Add state and handlers */}
    <div className="p-4 border-b">
      <form onSubmit={addTodo} className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>
    </div>

    {/* Filter Buttons - Add click handler */}
    <div className="flex justify-center gap-2 p-2 bg-gray-50">
      {['All', 'Active', 'Completed'].map((filter) => (
        <button 
          key={filter}
          onClick={() => setActiveFilter(filter.toLowerCase())}
          className={`px-3 py-1 rounded-full text-sm ${activeFilter === filter.toLowerCase() ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {filter}
        </button>
      ))}
    </div>

    {/* Task List */}
    <ul className="divide-y">
      {filteredTodos.map((todo) => (
        <li key={todo.id} className="p-3 flex items-center group">
          {/* Checkbox */}
          <input 
            type="checkbox" 
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
            className="h-5 w-5 mr-3 rounded border-gray-300 text-blue-500 focus:ring-blue-400"
          />
          
          {/* Task Text */}
          <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {todo.text}
          </span>
          
          {/* Delete Button (appears on hover) */}
          <button 
            onClick={() => deleteTodo(todo.id)}
            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>

    {/* Footer Stats */}
    <div className="bg-gray-50 p-3 text-sm text-gray-500 text-center">
      {todos.filter(t => !t.completed).length} tasks remaining
    </div>
  </div>
</div>
  )
}

export default TestTodo

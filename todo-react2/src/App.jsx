import { useMemo, useState } from 'react'
import './App.css'

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([
    { id: 1, text: 'Eat', completed: true },
    { id: 2, text: 'Sleep', completed: false },
    { id: 3, text: 'Repeat', completed: false },
  ])
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.completed)
    if (filter === 'completed') return todos.filter((todo) => todo.completed)
    return todos
  }, [filter, todos])

  const remainingCount = todos.filter((todo) => !todo.completed).length

  function addTodo(event) {
    event.preventDefault()
    const text = newTodo.trim()
    if (!text) return

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: Date.now(), text, completed: false },
    ])
    setNewTodo('')
  }

  function toggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
    if (editingId === id) setEditingId(null)
  }

  function startEditing(todo) {
    setEditingId(todo.id)
    setEditingText(todo.text)
  }

  function saveTodo(event, id) {
    event.preventDefault()
    const text = editingText.trim()
    if (!text) return

    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    )
    setEditingId(null)
  }

  return (
    <main className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <form onSubmit={addTodo}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>

      <div className="filters btn-group stack-exception" aria-label="Filter tasks">
        {['all', 'active', 'completed'].map((option) => (
          <button
            key={option}
            type="button"
            className="btn toggle-btn"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <h2 id="list-heading">
        {remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} remaining
      </h2>
      <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {visibleTodos.map((todo) => (
          <li key={todo.id} className="todo stack-small">
            {editingId === todo.id ? (
              <form className="edit-form" onSubmit={(event) => saveTodo(event, todo.id)}>
                <label htmlFor={`edit-todo-${todo.id}`} className="visually-hidden">
                  Edit {todo.text}
                </label>
                <input
                  id={`edit-todo-${todo.id}`}
                  className="todo-text"
                  value={editingText}
                  onChange={(event) => setEditingText(event.target.value)}
                  autoFocus
                />
                <div className="btn-group">
                  <button type="submit" className="btn btn__primary">Save</button>
                  <button type="button" className="btn" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <div className="c-cb">
                  <input
                    id={`todo-${todo.id}`}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <label className="todo-label" htmlFor={`todo-${todo.id}`}>
                    {todo.text}
                  </label>
                </div>
                <div className="btn-group">
                  <button type="button" className="btn" onClick={() => startEditing(todo)}>
                    Edit <span className="visually-hidden">{todo.text}</span>
                  </button>
                  <button type="button" className="btn btn__danger" onClick={() => deleteTodo(todo.id)}>
                    Delete <span className="visually-hidden">{todo.text}</span>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App

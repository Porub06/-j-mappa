import { useState } from 'react'
import Form from './components/Form'
import Todo from './Todo'

const FILTER_MAP = {
  completed: (task) => task.completed,

};

const FILTER_NAMES = Objects.keys(FILTER_MAP);

const initialTasks = json.parse(localStorage.getItem("tasks")) || [];

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])

  localStorage.setItem("task".json.stringify(tasks));

function addTask(name){
  if (name.trim().toUpperCase() === "REACT") {
    alert=("You cannot add a task with the name 'REACT'.")
    return;
  }
}

  function addTodo(event) {
    event.preventDefault()
    const text = newTodo.trim()
    if (!text) return

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: `todo-${Date.now()}`, text, completed: false },
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
  }

  return (
    <main className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form value={newTodo} onChange={setNewTodo} onSubmit={addTodo} />

      <ul role="list" className="todo-list stack-large">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </main>
  )
}

export default App

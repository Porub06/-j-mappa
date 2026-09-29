import { useEffect, useState } from 'react';
import Form from './components/Form';
import Todo from './components/Todo';
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function getStoredTasks() {
  try {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    return Array.isArray(savedTasks)
      ? savedTasks.map((task) => ({
          ...task,
          priority: Number(task.priority) || 1,
        }))
      : [];
  } catch {
    return [];
  }
}

function App({ tasks: initialTasks = [] }) {
  const [tasks, setTasks] = useState(() => {
    localStorage.removeItem('tasks');
    return [];
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(name, priority = 1) {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return false;
    }

    if (trimmedName.toUpperCase() === 'REACT') {
      alert("You cannot add a task with the name 'REACT'.");
      return false;
    }

    const numericPriority = Math.max(1, Number(priority) || 1);

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: `todo-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: trimmedName,
        priority: numericPriority,
        completed: false,
      },
    ]);

    return true;
  }

  function toggleTaskCompleted(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  function updatePriority(id, newPriority) {
    const numericPriority = Math.max(1, Number(newPriority) || 1);

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, priority: numericPriority } : task,
      ),
    );
  }

  function editTask(id, newName, newPriority) {
    const trimmedName = newName.trim();

    if (!trimmedName) {
      return;
    }

    const numericPriority = Math.max(1, Number(newPriority) || 1);

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, name: trimmedName, priority: numericPriority } : task,
      ),
    );
  }

  const tasksToShow = tasks
    .filter(FILTER_MAP[filter])
    .sort((a, b) => (a.priority ?? 1) - (b.priority ?? 1));
  const tasksRemaining = tasks.filter((task) => !task.completed).length;

  return (
    <main className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        {FILTER_NAMES.map((name) => (
          <FilterButton
            key={name}
            name={name}
            isPressed={filter === name}
            setFilter={setFilter}
          />
        ))}
      </div>

      <h2 id="list-heading" tabIndex="-1">
        {tasksRemaining} {tasksRemaining === 1 ? 'task' : 'tasks'} remaining
      </h2>

      <ul role="list" className="todo-list stack-large">
        {tasksToShow.map((task) => (
          <Todo
            key={task.id}
            id={task.id}
            name={task.name}
            priority={task.priority ?? 1}
            completed={task.completed}
            toggleTaskCompleted={toggleTaskCompleted}
            updatePriority={updatePriority}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </main>
  );
}

export default App;

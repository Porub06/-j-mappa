import { useState } from 'react';

function Todo({ id, name, priority, completed, toggleTaskCompleted, updatePriority, deleteTask }) {
  const [selectedPriority, setSelectedPriority] = useState(priority ?? 1);

  function handlePriorityChange(event) {
    const value = Number(event.target.value);
    const nextPriority = value > 0 ? value : 1;
    setSelectedPriority(nextPriority);
    updatePriority(id, nextPriority);
  }

  return (
    <li className="todo">
      <div className="stack-small">
        <div className="c-cb" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: 600 }}>Priority:</span>
          <select
            value={selectedPriority}
            onChange={handlePriorityChange}
            style={{ width: '70px' }}
            aria-label={`Priority for ${name}`}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button type="button" className="btn btn__danger" onClick={() => deleteTask(id)}>
            Delete <span className="visually-hidden">{name}</span>
          </button>
          <input
            id={id}
            type="checkbox"
            checked={completed}
            onChange={() => toggleTaskCompleted(id)}
          />
          <label className="todo-label" htmlFor={id}>
            {name}
          </label>
        </div>
      </div>
    </li>
  );
}

export default Todo;

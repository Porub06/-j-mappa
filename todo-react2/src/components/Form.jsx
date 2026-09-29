import { useState } from 'react';

function Form({ addTask }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleChange(event) {
    setName(event.target.value);
    if (error) {
      setError('');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Please enter a task name.');
      return;
    }

    const wasAdded = addTask(trimmedName);

    if (wasAdded) {
      setName('');
      setError('');
      return;
    }

    setError('This word is forbidden.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      {error && <p role="alert">{error}</p>}
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
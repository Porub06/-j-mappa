import './style.css'
import axios from 'axios'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <section id="center">


    <div class="todo-container">

      <h1>TodoHazifeladat</h1>

      <div class="server-container">
        <label id="server-status">
          Server állapot: ellenőrzés...
        </label>
      </div>

      <div class="todo-input-container">
        <input
          id="todo-input"
          type="text"
          placeholder="Új feladat..."
        >

        <button id="add-button" type="button">
          Add
        </button>
      </div>

      <ul id="todo-list"></ul>

    </div>

    <button
      id="counter"
      type="button"
      class="counter"
    ></button>

  </section>
`

setupCounter(
  document.querySelector<HTMLButtonElement>('#counter')!
)

async function checkServer() {
  const statusLabel =
    document.querySelector<HTMLLabelElement>('#server-status')!

  try {
    await axios.get('/')

    statusLabel.textContent = 'Server állapot: server online'
    statusLabel.style.color = 'green'
  } catch {
    statusLabel.textContent = 'Server állapot: server offline'
    statusLabel.style.color = 'red'
  }
}

checkServer()

const todoInput =
  document.querySelector<HTMLInputElement>('#todo-input')!

const addButton =
  document.querySelector<HTMLButtonElement>('#add-button')!

const todoList =
  document.querySelector<HTMLUListElement>('#todo-list')!

function addTodo() {
  const text = todoInput.value.trim()

  if (text === '') {
    return
  }

  const listItem = document.createElement('li')

  listItem.className = 'todo-item'

  const textElement = document.createElement('span')
  textElement.textContent = text

  const deleteButton = document.createElement('button')
  deleteButton.type = 'button'
  deleteButton.className = 'delete-button'
  deleteButton.textContent = 'Törlés'

  deleteButton.addEventListener('click', () => {
    listItem.remove()
  })

  listItem.appendChild(textElement)
  listItem.appendChild(deleteButton)

  todoList.appendChild(listItem)

  todoInput.value = ''
  todoInput.focus()
}

addButton.addEventListener('click', addTodo)

todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo()
  }
})

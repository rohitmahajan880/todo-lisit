const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const remainingCount = document.getElementById("remaining-count");
const clearCompletedButton = document.getElementById("clear-completed");

const STORAGE_KEY = "todoListItems";
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function updateStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  const activeTodos = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `${activeTodos} item${activeTodos !== 1 ? "s" : ""} left`;

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item${todo.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      updateStorage();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "text";
    text.textContent = todo.text;

    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      todos = todos.filter((item) => item.id !== todo.id);
      updateStorage();
      renderTodos();
    });

    li.append(checkbox, text, removeButton);
    todoList.appendChild(li);
  });
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const trimmedText = todoInput.value.trim();
  if (!trimmedText) return;

  todos.push({
    id: Date.now().toString(),
    text: trimmedText,
    completed: false,
  });

  todoInput.value = "";
  updateStorage();
  renderTodos();
});

clearCompletedButton.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  updateStorage();
  renderTodos();
});

renderTodos();

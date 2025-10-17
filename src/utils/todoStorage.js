const TODO_KEY = "rd_todos_v1";

export function getTodos() {
  try {
    return JSON.parse(localStorage.getItem(TODO_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveTodos(todos) {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

export function addTodo(todo) {
  const todos = getTodos();
  todos.unshift(todo);
  saveTodos(todos);
}

export function updateTodo(id, patch) {
  const todos = getTodos().map((t) => (t.id === id ? { ...t, ...patch } : t));
  saveTodos(todos);
}

export function deleteTodo(id) {
  const todos = getTodos().filter((t) => t.id !== id);
  saveTodos(todos);
}

export function getTodoCounts() {
  const todos = getTodos();
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  return { total, completed, pending: total - completed };
}

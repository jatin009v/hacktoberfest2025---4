import React, { useState, useEffect } from "react";
import {
  Plus,
  CheckCircle2,
  Trash2,
  Edit2,
  ListChecks,
} from "lucide-react";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../../utils/todoStorage";

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Load saved todos on mount
  useEffect(() => {
    setTasks(getTodos());
  }, []);

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  const handleAdd = () => {
    if (!input.trim()) return alert("Please enter a task.");
    const now = new Date();
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      date: now.toLocaleDateString() + " " + now.toLocaleTimeString(),
      completed: false,
    };
    addTodo(newTask);
    setTasks(getTodos());
    setInput("");
  };

  const handleEdit = (id) => {
    const task = tasks.find((t) => t.id === id);
    const newText = prompt("Edit your task:", task.text);
    if (newText && newText.trim()) {
      updateTodo(id, { text: newText.trim() });
      setTasks(getTodos());
    }
  };

  const handleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);
    updateTodo(id, { completed: !task.completed });
    setTasks(getTodos());
  };

  const handleDelete = (id) => {
    deleteTodo(id);
    setTasks(getTodos());
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ListChecks size={22} /> Task Manager
        </h2>
        <div className="flex gap-4 text-sm text-gray-700 dark:text-gray-300">
          <span>
            Pending: <strong>{pendingCount}</strong>
          </span>
          <span>
            Completed: <strong>{completedCount}</strong>
          </span>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="flex-1 px-3 py-2 rounded-md border border-gray-300 
                     bg-white text-gray-600 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-primary-600
                     dark:bg-white dark:text-gray-600 dark:placeholder-gray-600"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 flex items-center gap-1 bg-primary text-white rounded-md hover:bg-primary"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No tasks yet. Add one above.
          </div>
        )}

        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 rounded-lg shadow-sm border flex justify-between items-center transition
              ${
                task.completed
                  ? "bg-gray-100 text-gray-500 line-through"
                  : "bg-white text-gray-600 dark:bg-white dark:text-gray-600"
              }`}
          >
            <div>
              <div className="font-medium">{task.text}</div>
              <div className="text-xs text-gray-400">{task.date}</div>
            </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => handleEdit(task.id)}
                className="text-blue-500 hover:text-blue-600"
                title="Edit Task"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleComplete(task.id)}
                className={`${
                  task.completed
                    ? "text-gray-300"
                    : "text-green-500 hover:text-green-600"
                }`}
                title="Mark as Done"
              >
                <CheckCircle2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500 hover:text-red-600"
                title="Delete Task"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

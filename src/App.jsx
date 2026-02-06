import { useState } from "react";
import "./App.css";

function ProductivityAnime() {
  return (
    <img
      src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDlqemk2em1jb2JmdjJ1ZHVtZ3A5eHR1ZWZ0eThnY2M2ZTZ2Y2ZrNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oriO0OEd9QIDdllqo/giphy.gif"
      alt="Focus"
      width="260"
    />
  );
}

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input,
        completed: false,
      },
    ]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const progress =
    todos.length === 0
      ? 0
      : Math.round((completedCount / todos.length) * 100);

  return (
    <div className="app">
      {/* LEFT SECTION */}
      <div className="left">
        <h1 className="title">My Colorful Todo ✨</h1>

        <div className="input-row">
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <div className="progress-wrapper">
          <div className="progress-label">
            Progress: {progress}%
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <div className="todo-item" key={todo.id}>
              <div
                className={`todo-text ${
                  todo.completed ? "completed" : ""
                }`}
                onClick={() => toggleTodo(todo.id)}
              >
                <span
                  className={`check ${
                    todo.completed ? "checked" : ""
                  }`}
                >
                  ✓
                </span>
                {todo.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="right">
        <div className="anime-box">
          <ProductivityAnime />
          <p>Focus. Finish. Flow. 🚀</p>
        </div>
      </div>
    </div>
  );
}

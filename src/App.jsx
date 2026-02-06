import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [dragId, setDragId] = useState(null);

  /* 🔹 SAVE TO LOCAL STORAGE */
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /* 🔹 CONFETTI WHEN ALL DONE */
  useEffect(() => {
    if (todos.length > 0 && todos.every((t) => t.completed)) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  /* 🔹 DRAG & DROP */
  const handleDrop = (id) => {
    const dragItem = todos.find((t) => t.id === dragId);
    const dropItem = todos.find((t) => t.id === id);

    const dragIndex = todos.indexOf(dragItem);
    const dropIndex = todos.indexOf(dropItem);

    const updated = [...todos];
    updated.splice(dragIndex, 1);
    updated.splice(dropIndex, 0, dragItem);

    setTodos(updated);
  };

  const completed = todos.filter((t) => t.completed).length;
  const progress =
    todos.length === 0 ? 0 : Math.round((completed / todos.length) * 100);

  return (
    <div className="app">
      {/* LEFT */}
      <div className="left">
        <h1 className="title">✨ My Todo</h1>

        <div className="input-row">
          <input
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <div className="progress-wrapper">
          <p>{progress}% completed</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? "done" : ""}`}
              draggable
              onDragStart={() => setDragId(todo.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(todo.id)}
              onClick={() => toggleTodo(todo.id)}
            >
              <span className="check">
                {todo.completed ? "✔" : "○"}
              </span>
              {todo.text}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="right">
        <div className="focus-box">
          <div className="face">😊</div>
          <p>Focus. Finish. Flow. 🚀</p>
        </div>
      </div>
    </div>
  );
}

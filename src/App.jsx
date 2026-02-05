import { useEffect, useState } from "react";
import "./App.css";
import { Moon, Sun, Check, Trash2 } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [input, setInput] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  const completedCount = tasks.filter(t => t.completed).length;
const progress = tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100;

<div className="progress-wrapper">
  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
  <p>{completedCount} / {tasks.length} completed</p>
</div>

  const toggleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className={`app ${dark ? "dark" : ""}`}>
      {/* LEFT SIDE */}
      <div className="todo-container">
        <div className="header">
          <h1>✨ My Todo</h1>
          <button onClick={() => setDark(!dark)} className="icon-btn">
            {dark ? <Sun /> : <Moon />}
          </button>
        </div>

        <div className="input-box">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className={task.done ? "done" : ""}>
              <span>{task.text}</span>
              <div className="actions">
                <button
  className={`check-btn ${task.completed ? "done" : ""}`}
  onClick={() => toggleDone(index)}
>
  ✔
</button>

              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT SIDE – ANIME */}
      <div className="anime-section">
        <div className="anime-section">
  <svg
    className="anime-svg"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="100" cy="100" r="80" fill="#9d4edd" />
    <circle cx="80" cy="90" r="6" fill="#fff" />
    <circle cx="120" cy="90" r="6" fill="#fff" />
    <path
      d="M70 120 Q100 140 130 120"
      stroke="#fff"
      strokeWidth="4"
      fill="none"
    />
  </svg>
</div>

      </div>
    </div>
  );
}

export default App;

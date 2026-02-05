import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>🎯 Todo</h2>
        <ul>
          <li>📥 Inbox</li>
          <li>🌤 Today</li>
          <li>📅 Upcoming</li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="main">
        <h1>Today</h1>

        <div className="add-task">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul className="task-list">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.completed ? "completed" : ""}
              onClick={() => toggleTask(index)}
            >
              {task.text}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import ProductivityAnime from "./components/ProductivityAnime";


function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), text, completed: false }
    ]);
    setText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const completed = tasks.filter((t) => t.completed).length;
  const progress = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  return (
    <div className="app">
      <div className="left">
        <h1>✨ My Todo</h1>

        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button>Add</button>
        </form>

        <div className="progress-wrapper">
          <div className="progress-text">{progress}% completed</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: progress + "%" }}
            />
          </div>
        </div>

        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? "done" : ""}>
              <span onClick={() => toggleTask(task.id)}>
                {task.completed ? "✔️" : "⭕"} {task.text}
              </span>
              <button onClick={() => deleteTask(task.id)}>🗑</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="right">
  <div className="anime-box">
    <ProductivityAnime />
    <p>Focus. Finish. Flow. 🚀</p>
  </div>
</div>

    </div>
  );
}

export default App;

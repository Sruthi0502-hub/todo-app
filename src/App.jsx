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
                <button onClick={() => toggleDone(index)}>
                  <Check />
                </button>
                <button onClick={() => deleteTask(index)}>
                  <Trash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT SIDE – ANIME */}
      <div className="anime-section">
        <img
          src="https://images.unsplash.com/photo-1606112219348-204d7d8b94ee"
          alt="anime productivity"
          className="anime-img"
        />
      </div>
    </div>
  );
}

export default App;

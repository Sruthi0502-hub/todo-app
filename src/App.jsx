import { useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";


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
  {todos.map((t) => (
    <TodoItem
      key={t.id}
      todo={t}
      onToggle={() =>
        setTodos(
          todos.map((x) =>
            x.id === t.id ? { ...x, done: !x.done } : x
          )
        )
      }
      onDelete={() =>
        setTodos(todos.filter((x) => x.id !== t.id))
      }
    />
  ))}
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

import { useState } from "react";
import "./App.css";

const categories = [
  { name: "Inbox", color: "#ffd166" },
  { name: "Today", color: "#06d6a0" },
  { name: "Work", color: "#118ab2" },
  { name: "Personal", color: "#ef476f" },
  { name: "Study", color: "#9b5de5" },
];

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Inbox");
  const [dark, setDark] = useState(false);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        date,
        category,
        completed: false,
      },
    ]);
    setText("");
    setDate("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const filtered = todos.filter((t) => t.category === category);
  const completed = filtered.filter((t) => t.completed).length;
  const progress = filtered.length
    ? Math.round((completed / filtered.length) * 100)
    : 0;

  return (
    <div className={`app ${dark ? "dark" : ""}`}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>📂 Lists</h2>

        {categories.map((c) => (
          <div
            key={c.name}
            className={`category ${category === c.name ? "active" : ""}`}
            style={{ borderLeft: `6px solid ${c.color}` }}
            onClick={() => setCategory(c.name)}
          >
            {c.name}
          </div>
        ))}

        <button className="theme-btn" onClick={() => setDark(!dark)}>
          {dark ? "🌞 Day" : "🌙 Night"}
        </button>
      </aside>

      {/* MAIN */}
      <main className="main">
        <h1>{category}</h1>

        <div className="input-row">
          <input
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <div className="progress">
          <span>{progress}% completed</span>
          <div className="bar">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="todo-list">
          {filtered.map((t) => {
            const color = categories.find(
              (c) => c.name === t.category
            ).color;

            return (
              <div
                key={t.id}
                className={`todo ${t.completed ? "done" : ""}`}
                onClick={() => toggleTodo(t.id)}
              >
                <div className="tick">
                  {t.completed && <span>✓</span>}
                </div>

                <div className="todo-text">
                  <p>{t.text}</p>
                  {t.date && <small>📅 {t.date}</small>}
                </div>

                <span
                  className="tag"
                  style={{ background: color }}
                />
              </div>
            );
          })}
        </div>
      </main>

      {/* ANIME PARALLAX */}
      <div className="anime">
        <img
          src="https://tse1.mm.bing.net/th/id/OIP.0ZHJivkXldzUnLiboVKo2AHaEP?pid=Api&P=0&h=180"
          alt="anime"
        />
        <div className="anime-text">
          Focus. Finish. Flow 🌊
        </div>
      </div>
    </div>
  );
}

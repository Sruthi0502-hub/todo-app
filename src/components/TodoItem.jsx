import { Check, Trash2 } from "lucide-react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.done ? "completed" : ""}`}>
      <button className="check-btn" onClick={onToggle}>
        {todo.done && <Check size={18} />}
      </button>

      <span>{todo.text}</span>

      <button className="delete-btn" onClick={onDelete}>
        <Trash2 size={16} />
      </button>
    </li>
  );
}

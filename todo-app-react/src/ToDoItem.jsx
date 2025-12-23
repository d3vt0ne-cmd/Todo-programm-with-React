import React from 'react'

function ToDoItem({ task, index, onDelete, onToggle, onMoveUp, onMoveDown, totalTasks }) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(index)}
        className="task-checkbox"
      />
      <span 
        className="task-text"
        style={{ 
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#999' : '#333'
        }}
      >
        {task.text}
        <small className="task-time">
          {new Date(task.createdAt).toLocaleDateString()}
        </small>
      </span>
      
      <div className="task-actions">
        {!task.completed && (
          <>
            <button 
              onClick={() => onMoveUp(index)}
              disabled={index === 0}
              className="move-btn"
              title="Вверх"
            >
              ↑
            </button>
            <button 
              onClick={() => onMoveDown(index)}
              disabled={index === totalTasks - 1}
              className="move-btn"
              title="Вниз"
            >
              ↓
            </button>
          </>
        )}
        <button 
          onClick={() => onDelete(index)}
          className="delete-btn"
          title="Удалить"
        >
          ✕
        </button>
      </div>
    </li>
  )
}

export default ToDoItem
import { useState, useEffect } from 'react'
import ToDoItem from './ToDoItem'
import './App.css'

const STORAGE_KEY = 'todo-tasks'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : [
      { text: 'Изучить React', completed: false, createdAt: Date.now() },
      { text: 'Сделать TODO приложение', completed: false, createdAt: Date.now() },
      { text: 'Запустить проект', completed: true, createdAt: Date.now() }
    ]
  })
  
  const [newTask, setNewTask] = useState('')

  // Сохраняем в localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTask.trim() !== '') {
      const taskObj = {
        text: newTask,
        completed: false,
        createdAt: Date.now()
      }
      setTasks([...tasks, taskObj])
      setNewTask('')
    }
  }

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index)
    setTasks(updatedTasks)
  }

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
  }

  // ФУНКЦИИ ПЕРЕМЕЩЕНИЯ - ДОБАВЬТЕ ИХ
  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks]
      const temp = updatedTasks[index]
      updatedTasks[index] = updatedTasks[index - 1]
      updatedTasks[index - 1] = temp
      setTasks(updatedTasks)
    }
  }

  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks]
      const temp = updatedTasks[index]
      updatedTasks[index] = updatedTasks[index + 1]
      updatedTasks[index + 1] = temp
      setTasks(updatedTasks)
    }
  }

  const clearAllTasks = () => {
    if (window.confirm('Удалить все задачи?')) {
      setTasks([])
    }
  }

  // Разделяем задачи
  const activeTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  return (
    <div className="app-container">
      <h1>📝 Мой TODO Список</h1>
      
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Введите новую задачу..."
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask} className="add-btn">
          Добавить
        </button>
      </div>

      {/* Активные задачи */}
      <div className="tasks-section">
        <h2>Активные задачи ({activeTasks.length})</h2>
        <ul className="task-list">
          {activeTasks.length === 0 ? (
            <p className="empty-state">Нет активных задач</p>
          ) : (
            activeTasks.map((task, index) => {
              const originalIndex = tasks.findIndex(t => t === task)
              return (
                <ToDoItem
                  key={originalIndex}
                  task={task}
                  index={originalIndex}
                  onDelete={deleteTask}
                  onToggle={toggleTask}
                  onMoveUp={moveTaskUp}       
                  onMoveDown={moveTaskDown}    
                  totalTasks={tasks.length}    
                />
              )
            })
          )}
        </ul>
      </div>

      {/* Выполненные задачи */}
      <div className="tasks-section">
        <h2>Выполненные ({completedTasks.length})</h2>
        <ul className="task-list">
          {completedTasks.length === 0 ? (
            <p className="empty-state">Нет выполненных задач</p>
          ) : (
            completedTasks.map((task, index) => {
              const originalIndex = tasks.findIndex(t => t === task)
              return (
                <ToDoItem
                  key={originalIndex}
                  task={task}
                  index={originalIndex}
                  onDelete={deleteTask}
                  onToggle={toggleTask}
                  onMoveUp={moveTaskUp}        
                  onMoveDown={moveTaskDown}    
                  totalTasks={tasks.length}    
                />
              )
            })
          )}
        </ul>
      </div>

      {tasks.length > 0 && (
        <button onClick={clearAllTasks} className="clear-btn">
          🗑️ Удалить все задачи
        </button>
      )}

      <div className="stats">
        Всего: {tasks.length} | Активных: {activeTasks.length} | Выполнено: {completedTasks.length}
      </div>
    </div>
  )
}

export default App
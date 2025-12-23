import React, { useState, useEffect } from 'react'
import ToDoItem from './ToDoItem'

const STORAGE_KEY = 'todo-tasks'

function ToDoList() {
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : [
      { 
        text: 'Позавтракать', 
        completed: false, 
        createdAt: new Date().getTime() 
      },
      { 
        text: 'Принять душ', 
        completed: false, 
        createdAt: new Date().getTime() 
      },
      { 
        text: 'Прогулка с собакой', 
        completed: false, 
        createdAt: new Date().getTime() 
      }
    ]
  })

  // Сохраняем задачи в localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const handleInputChange = (e) => {
    setNewTask(e.target.value)
  }

  const addTask = () => {
    const trimmedTask = newTask.trim()
    if (trimmedTask !== '') {
      const newTaskObj = {
        text: trimmedTask,
        completed: false,
        createdAt: new Date().getTime()
      }
      setTasks([...tasks, newTaskObj])
      setNewTask('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
  }

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index)
    setTasks(updatedTasks)
  }

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks]
      ;[updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]]
      setTasks(updatedTasks)
    }
  }

  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks]
      ;[updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]]
      setTasks(updatedTasks)
    }
  }

  const clearAllTasks = () => {
    if (window.confirm('Вы уверены, что хотите удалить ВСЕ задачи?')) {
      setTasks([])
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  // Разделяем задачи на активные и выполненные
  const activeTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  return (
    <div>
      <div className="input-section">
        <input
          type="text"
          placeholder="Введите новую задачу..."
          value={newTask}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="btn-add" onClick={addTask}>
          ➕ Добавить
        </button>
      </div>

      <ul className="task-list">
        <h2>Активные задачи ({activeTasks.length})</h2>
        {activeTasks.length === 0 ? (
          <p className="empty-state">Нет активных задач. Добавьте новую!</p>
        ) : (
          activeTasks.map((task, index) => {
            const originalIndex = tasks.findIndex(t => t === task)
            return (
              <ToDoItem
                key={originalIndex}
                task={task}
                index={originalIndex}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onMoveUp={moveTaskUp}
                onMoveDown={moveTaskDown}
              />
            )
          })
        )}

        <h2>Выполненные задачи ({completedTasks.length})</h2>
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
                onToggle={toggleTask}
                onMoveDown={moveTaskDown}
                totalTasks={tasks.length}
                onDelete={deleteTask}
                onMoveUp={moveTaskUp}
              />
            )
          })
        )}
      </ul>

      {tasks.length > 0 && (
        <button className="btn-clear" onClick={clearAllTasks}>
          🗑️ Удалить все задачи
        </button>
      )}

      <div style={{ 
        marginTop: '30px', 
        textAlign: 'center', 
        color: '#7f8c8d',
        fontSize: '14px' 
      }}>
        Всего задач: {tasks.length} | 
        Активных: {activeTasks.length} | 
        Выполнено: {completedTasks.length}
      </div>
    </div>
  )
}

export default ToDoList
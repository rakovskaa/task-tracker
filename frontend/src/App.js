import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch all tasks when component loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      
      {/* Add Task Form */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id, task.completed)}
            />
            <div className="task-content">
              <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </h3>
              {task.description && <p>{task.description}</p>}
            </div>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

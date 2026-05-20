import { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
      }
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return setError('Title is required');

    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, description, dueDate })
      });

      if (response.ok) {
        setTitle('');
        setDescription('');
        setDueDate('');
        setError('');
        fetchTasks(); // refresh tasks
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create task');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  const handleUpdateTask = async (id, updatedFields) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedFields)
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div>
      <div className="dashboard-header">
        <h2>My Tasks</h2>
      </div>

      <div className="task-form-container">
        <h3>Create New Task</h3>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleCreateTask}>
          <div>
            <input 
              type="text" 
              placeholder="Task Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div>
            <textarea 
              placeholder="Task Description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows="3"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
              Due Date (optional)
            </label>
            <input 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: 'auto' }}>
            Add Task
          </button>
        </form>
      </div>

      {tasks.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
          You have no tasks yet. Create one above!
        </p>
      ) : (
        <div className="task-grid">
          {tasks.map(task => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onUpdate={handleUpdateTask} 
              onDelete={handleDeleteTask} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

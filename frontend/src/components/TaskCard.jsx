const TaskCard = ({ task, onUpdate, onDelete }) => {
  const handleStatusToggle = () => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    onUpdate(task._id, { status: newStatus });
  };

  return (
    <div className={`task-card ${task.status === 'Completed' ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description || 'No description provided.'}</p>
      
      <div className="task-meta">
        <span>Status: <strong>{task.status}</strong></span>
        {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
      </div>

      <div className="task-actions">
        <button 
          className={task.status === 'Pending' ? 'btn-success' : ''} 
          onClick={handleStatusToggle}
        >
          {task.status === 'Pending' ? 'Mark Completed' : 'Mark Pending'}
        </button>
        <button className="btn-danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

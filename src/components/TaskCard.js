import React from 'react'
import './TaskCard.css'

function TaskCard(props) {
    // { task, onEdit, onDelete, onToggle }
    const {children}=props;
  return (
    <div className='task-item'>
      <input 
        type='checkbox' 
        className='task-checkbox'
        // checked={task.completed}
        // onChange={() => onToggle(task.id)}
      />
      <span className='task-text'>{children}</span>
      <div className='task-actions'>
        <button className='edit-btn' /* onClick={() => onEdit(task.id)}*/>✏️</button> 
        <button className='delete-btn'/* onClick={() => onDelete(task.id)}*/>🗑️</button>
      </div>
    </div>
  )
}

export default React.memo(TaskCard)
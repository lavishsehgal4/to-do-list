import React, { useState } from 'react'
import './TaskCard.css'



function TaskCard(props) {
    const {children,task,onDelete,onEdit,onToggle}=props;
    const [showDetails, setShowDetails] = useState(false);

  return (
    <>
    <div className='task-item' onClick={() => setShowDetails(!showDetails)}>
        <div className='task-timer'>
            <span className='timer-icon'>⏰</span>
            <span className='timer-text'>timeLeft</span>
        </div>
      <input 
        type='checkbox' 
        className='task-checkbox'
        // checked={task.completed}
        onClick={(e) => {
    e.stopPropagation();  // Add this
  }}
      />
      <span className='task-text'>{children}</span>
      <div className='task-actions'>
        <button className='edit-btn'  onClick={(e) => {e.stopPropagation();onToggle(true); onEdit(task)}}>✏️</button> 
        <button className='delete-btn' onClick={(e) =>{e.stopPropagation(); onDelete(task.id)}}>🗑️</button>
      </div>
    </div>
    {/* Details section that opens below */}
      {showDetails && (
        <div className='task-details'>
          <div className='details-content'>
            <p className='details-label'>Due Date:</p>
            <p className='details-value'>{task.date}</p>
            
            <p className='details-label'>Notes:</p>
            <p className='details-value'>{task.notes || 'No notes added'}</p>
          </div>
        </div>
      )}
      </>
  )
}

export default React.memo(TaskCard)
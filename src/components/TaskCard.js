import React, { useState } from 'react'
import './TaskCard.css'

function extractDateComponents(dateInput) {
  const dateObj = new Date(dateInput);
  const nowDate=new Date();
  const year = dateObj.getFullYear();      // number: 2025
  const month = dateObj.getMonth() + 1;    // number: 1-12 (add 1 because getMonth() returns 0-11)
  const date = dateObj.getDate();          // number: 1-31
  

  return { year, month, date };
}

function TaskCard(props) {
    // { task, , , onToggle }
    const {children,task,onDelete,onEdit,onToggle}=props;
    

  return (
    <div className='task-item'>
        <div className='task-timer'>
            <span className='timer-icon'>⏰</span>
            <span className='timer-text'>timeLeft</span>
        </div>
      <input 
        type='checkbox' 
        className='task-checkbox'
        // checked={task.completed}
        // onChange={() => onToggle(task.id)}
      />
      <span className='task-text'>{children}</span>
      <div className='task-actions'>
        <button className='edit-btn'  onClick={() => {onToggle(true); onEdit(task)}}>✏️</button> 
        <button className='delete-btn' onClick={() => onDelete(task.id)}>🗑️</button>
      </div>
    </div>
  )
}

export default React.memo(TaskCard)
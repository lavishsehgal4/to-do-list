import React, { useEffect, useState } from 'react'
import './Tasks.css'
function Tasks(props) {
    const [tasks,updateTask]=useState([]);
    
    const deleteTask=(id)=>{
      updateTask(prev => prev.filter(task => task.id !== id));
    }
    useEffect(() => {
  if (props.newTask) {
    updateTask(prev => [...prev, props.newTask]);
  }
}, [props.newTask]);

  return (
    <main className='tasks-container' >
      {
        tasks.map(task=>(
          <div className='task-item' key={task.id}>
            <input type='checkbox' className='task-checkbox' />
            <span className='task-text'>{task.task}</span>
            <button className='delete-btn' onClick={() => deleteTask(task.id)} >🗑️</button>
            
          </div>
        ))
      }
       {/* Show empty message only if tasks array is empty */}
      {tasks.length === 0 && (
        <div className='empty-state'>
          <p>No tasks yet! Add one above 📝</p>
        </div>
      )}
    </main>
  )
}

export default Tasks
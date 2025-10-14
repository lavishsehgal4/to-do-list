import React from 'react'
import './Tasks.css'
function Tasks() {
    
 
  return (
    <main className='tasks-container' >
      {/* {
        tasks.map(task=>(
          <div className='task-item' key={task.id}>
            <input type='checkbox' className='task-checkbox' />
            <span className='task-text'>{task.task}</span>
            <div className='task-actions'>
              <button className='edit-btn' onClick={()=>openModal(task.id)} >✏️</button>
            <button className='delete-btn' onClick={() => deleteTask(task.id)} >🗑️</button>
            </div>
            
          </div>
        ))
      } */}
       {/* Show empty message only if tasks array is empty */}
      {/* {tasks.length === 0 && (
        <div className='empty-state'>
          <p>No tasks yet! Add one above 📝</p>
        </div>
      )} */}
    </main>
  )
}

export default React.memo(Tasks)
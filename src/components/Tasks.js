import React from 'react'
import './Tasks.css'
import TaskCard from './TaskCard'
function Tasks(props) {
    const {toDoTasks,handleDeleteTask,handleModelToggle,getData}=props
 
  return (
    <main className='tasks-container' >
      {
        toDoTasks.map(task=>(
          <TaskCard key={task.id} 
          onDelete={handleDeleteTask} 
          task={task}
          onToggle={handleModelToggle}
          onEdit={getData}>{task.task}</TaskCard>
        ))
      }
       {/* Show empty message only if tasks array is empty */}
      {toDoTasks.length === 0 && (
        <div className='empty-state'>
          <p>No tasks yet! Add one above 📝</p>
        </div>
      )}
    </main>
  )
}

export default React.memo(Tasks)
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import './Modal.css'

function TaskEditingModel({isModalOpen,handleModelToggle,data,update}) {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const onSubmit=()=>{
      update({id:data.id,
        task:taskTitle,
        notes:taskDescription
      })
      handleModelToggle(false);
    }
     useEffect(() => {
        if (data) {
            setTaskTitle(data.task || '');
            setTaskDescription(data.notes || ''); // if you have description field
        }
    }, [data]);
  return ReactDOM.createPortal(
    <div className={isModalOpen?'modal-overlay':'modal-overlay hidden'}>
      <div className='modal-container'>
        <div className='modal-header'>
          <h3>Edit Task</h3>
          <button className='close-btn' onClick={()=>{handleModelToggle(false)}}>✕</button>
        </div>
        
        <div className='modal-body'>
          <div className='input-group'>
            <label>Task Title</label>
            <input 
              type='text' 
              className='modal-input' 
              placeholder='Enter task title'
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              
            />
          </div>
          
          <div className='input-group'>
            <label>Description / Notes</label>
            <textarea 
              className='modal-textarea' 
               value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              
              placeholder='Add description or notes...'
              rows='6'
            ></textarea>
          </div>
        </div>
        
        <div className='modal-footer'>
          <button className='cancel-btn' onClick={()=>{handleModelToggle(false)}} >Cancel</button>
          <button className='save-btn' onClick={onSubmit}>Save Changes</button>
        </div>
      </div>
    </div>,
  document.getElementById('modal-root'))
}

export default TaskEditingModel
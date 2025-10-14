import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import './Modal.css'

function TaskEditingModel() {
    
  return ReactDOM.createPortal(
    <div className='modal-overlay hidden'>
      <div className='modal-container'>
        <div className='modal-header'>
          <h3>Edit Task</h3>
          <button className='close-btn' >✕</button>
        </div>
        
        <div className='modal-body'>
          <div className='input-group'>
            <label>Task Title</label>
            <input 
              type='text' 
              className='modal-input' 
              placeholder='Enter task title'
              defaultValue= {`lavish`}
              
            />
          </div>
          
          <div className='input-group'>
            <label>Description / Notes</label>
            <textarea 
              className='modal-textarea' 
              
              
              placeholder='Add description or notes...'
              rows='6'
            ></textarea>
          </div>
        </div>
        
        <div className='modal-footer'>
          <button className='cancel-btn' >Cancel</button>
          <button className='save-btn'>Save Changes</button>
        </div>
      </div>
    </div>,
  document.getElementById('modal-root'))
}

export default TaskEditingModel
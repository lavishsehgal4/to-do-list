import React, { useEffect, useRef, useState } from 'react'
import './Header.css'
function Header(props) {
    const inputRef=useRef(null);
    const[task,changeTask]=useState("");
    const handleAdd=()=>{
        if(task.length===0){
            return
        }
       props.handleAdd(task);
    }
    useEffect(()=>{
        inputRef.current.focus()
    },[])
  return (
    <header className='header'>
        <div className='heading'>
            <h2>To-Do List</h2>
        </div>
        <div className='TakingInput'>
        <input className='addTaskInput'
        value={task}
         ref={inputRef} 
         placeholder='enter task to add'
         onChange={(e)=>changeTask(e.target.value)}></input>
        <button className='addTaskInput' onClick={handleAdd}>Add Task</button>
        </div>
    </header>
  )
}

export default React.memo(Header)
import React, { useEffect, useRef, useState } from 'react'
import './Header.css'
function Header() {
    const inputRef=useRef(null);
    const[task,changeTask]=useState("");
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
        <button className='addTaskInput'>Add Task</button>
        </div>
    </header>
  )
}

export default React.memo(Header)
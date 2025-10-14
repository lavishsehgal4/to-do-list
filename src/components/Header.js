import React, { useEffect, useRef, useState } from 'react'
import './Header.css'
function Header({handleAddTask}) {
    const [task,setTask]=useState('');
    const [date,setDate]=useState('');
    const inputRef=useRef(null);

    function isFuturetOrToday(dateValue) {
        const inputDate = new Date(dateValue);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return inputDate > today;
}

    const sendTaskToAdd=()=>{
        if(task==''){
            alert("enter task to continue");
            return;
        }if(date==''){
            alert("add valid date for todo to continue");
            return;
        }
        if(!isFuturetOrToday(date)){
            alert("input date must be greater than or equal to today's date");
            setDate('')
            return
        }
        const newtask={
            task:task,
            date:date,
            completed:false
        }
        handleAddTask(newtask);
        setTask('');
        setDate('');
       
    }

    const sendTaskToAddUsingEnter=(e)=>{
         if(e.key==='Enter'){
            sendTaskToAdd();
        }
    }
    useEffect(()=>{
        inputRef.current.focus();
    },[])
  return (
    <header className='header'>
        <div className='heading'>
            <h2>To-Do List</h2>
        </div>
        <div className='TakingInput'>
        <input className='addTaskInput'
         placeholder='enter task to add'
         value={task}
         ref={inputRef}
         onChange={(e)=>{setTask(e.target.value)}}
         onKeyDown={sendTaskToAddUsingEnter}></input>
         <input 
        type='date' 
         className='addDateInput'
         value={date}
        onChange={(e) => setDate(e.target.value)}
        onKeyDown={sendTaskToAddUsingEnter}></input>
        </div>
        <button className='addTaskInput' 
        onClick={sendTaskToAdd}>Add Task</button>
    </header>
  )
}

export default React.memo(Header)
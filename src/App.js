
import { useState,useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';


function App() {
  const[task,updateTask]=useState({id:-1,task:''})
  const addTask=(e)=>{
    const prevId=task.id;
    updateTask({id:prevId+1,task:e});
    
  }

  useEffect(() => {
  console.log("Tasks updated:", task);
}, [task]);

  return (
    <div className="app-container">
        <div className='todoCard' >
          <Header handleAdd={addTask}/>
          <Tasks newTask={task.id===-1?null:task}/>
        </div>
    </div>
  );
}

export default App;

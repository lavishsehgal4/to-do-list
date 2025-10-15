
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import TaskEditingModel from './components/TaskEditingModel';
import { useState } from 'react';


function App() {
  const [tasks,setTasks]=useState([]);

  const addTask = ({task, date, completed}) => {
  const newTask = {
    id: Date.now() + Math.random(),
    task: task,
    date: date,
    completed: completed
  }
  setTasks([...tasks, newTask]);
  console.log(newTask);
}
  return (
    <div className="app-container">
      <TaskEditingModel />
        <div className='todoCard' >
          <Header handleAddTask={addTask} />
          <Tasks toDoTasks={tasks}/>
        </div>
        
    </div>
  );
}

export default App;

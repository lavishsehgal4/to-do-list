
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import TaskEditingModel from './components/TaskEditingModel';
import { useState } from 'react';


function App() {
  const [tasks,setTasks]=useState([]);
  const [isModalOpen,setModal]=useState(false);
  const [modalData,setModalData]=useState({id:'',task:'',notes:''})
  const addTask = ({task, date, completed}) => {
  const newTask = {
    id: Date.now() + Math.random(),
    task: task,
    date: date,
    notes:'',
    completed: completed
  }
  setTasks([...tasks, newTask]);
  console.log(newTask);
}

  const deleteTask=(id)=>{
    console.log(id)
    const updatedTasks=tasks.filter(task=>task.id!==id);
    setTasks(updatedTasks);
  }

  const openModal=(isOpen)=>{
    setModal(isOpen);
  }
  const getData=({id,task,notes})=>{
    console.log(id,task,notes);
    setModalData({id:id,task:task,notes:notes})
  }
  const updatingTaskAndNote=({id,task,notes})=>{
    console.log(id,task,notes);
    for(let i=0;i<tasks.length;i++){
      if((Number)(id)===(Number)(tasks[i].id)){
        tasks[i].task=task
        tasks[i].notes=notes
        break;
      }
      
    }
    setTasks(tasks);
  }
  return (
    <div className="app-container">
      <TaskEditingModel isModalOpen={isModalOpen} handleModelToggle={openModal} data={modalData} update={updatingTaskAndNote}/>
        <div className='todoCard' >
          <Header handleAddTask={addTask} />
          <Tasks toDoTasks={tasks} 
          handleDeleteTask={deleteTask}
          handleModelToggle={openModal}
          getData={getData}/>
        </div>
        
    </div>
  );
}

export default App;

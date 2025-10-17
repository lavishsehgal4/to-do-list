import React, { useEffect, useState } from 'react'
import './TaskCard.css'
  function getTimeLeft(year, month, day) {
  const now = Date.now();
  const target = new Date(year, month - 1, day).getTime();

  let diff = target - now;

  if (diff <= 0) {
    return { years: 0, months: 0, days: 0, message: "Date already passed!" };
  }

  // Milliseconds in each unit
  const msInDay = 1000 * 60 * 60 * 24;
  const msInMonth = msInDay * 30.44; // average month length
  const msInYear = msInDay * 365.25; // accounting for leap years

  const years = Math.floor(diff / msInYear);
  diff -= years * msInYear;

  const months = Math.floor(diff / msInMonth);
  diff -= months * msInMonth;

  const days = Math.floor(diff / msInDay);

  return { years, months, days };
}

  function getFormatedTime(year,month,days){
    month=Math.abs(month);
    days=Math.abs(days);
    if(year==0 && month!=0 && days!=0){
      return (`${month} month and ${days} day left`);
    }else if(year==0 && month!=0 && days==0){
      return (`${month} month left`);
    }else if(year!=0 && month!=0){
      return(`${year} year and ${month} month left`)
    }else if(year!=0 && month==0){
      return(`${year} year left`);
    }else if(year==0 && month==0){
      return(`${days} day left`);
    }
  }


function TaskCard(props) {
    const {children,task,onDelete,onEdit,onToggle}=props;
    const [showDetails, setShowDetails] = useState(false);
    const [timer,setTimer]=useState('');

    const displayTimeLeft=(year_,month_,date_)=>{
      
      const{days,months,years}=getTimeLeft(year_,month_,date_);
      

      console.log(years,months,days)
      if(years==0 && months==0 && days==0){

      }else{
        const timeLeft=getFormatedTime(years,months,days);
        return timeLeft;
      }
      
    }
    useEffect(()=>{
      setTimer(displayTimeLeft(...task.date.split('-')))
      
    },[])
  return (
    <>
    <div className='task-item' onClick={() => setShowDetails(!showDetails)}>
        
      <input 
        type='checkbox' 
        className='task-checkbox'
        // checked={task.completed}
        onClick={(e) => {
    e.stopPropagation();  // Add this
  }}
      />
      <span className='task-text'>{children}</span>
      <div className='task-timer'>
            <span className='timer-icon'>⏰</span>
            <span className='timer-text'>{timer}</span>
        </div>
      <div className='task-actions'>
        <button className='edit-btn'  onClick={(e) => {e.stopPropagation();onToggle(true); onEdit(task)}}>✏️</button> 
        <button className='delete-btn' onClick={(e) =>{e.stopPropagation(); onDelete(task.id)}}>🗑️</button>
      </div>
    </div>
    {/* Details section that opens below */}
      {showDetails && (
        <div className='task-details'>
          <div className='details-content'>
            <p className='details-label'>Due Date:</p>
            <p className='details-value'>{task.date}</p>
            
            <p className='details-label'>Notes:</p>
            <p className='details-value'>{task.notes || 'No notes added'}</p>
          </div>
        </div>
      )}
      </>
  )
}

export default React.memo(TaskCard)
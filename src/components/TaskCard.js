import React, { useEffect, useState } from 'react'
import './TaskCard.css'

  function hasDatePassed(year, month, day) {
  const now = new Date();
  const target = new Date(year, month - 1, day, 23, 59, 59); // Set to end of day

  return now.getTime() > target.getTime(); // true only if past end of day
}

  function getTimeLeft(year, month, day) {
  const now = Date.now();
  const target = new Date(year, month - 1, day, 23, 59, 59, 999).getTime();


  let diff = target - now;
    
  if (diff <= 0) {
    
    return { years: -1, months: -1, days: -1, message: "Date already passed!" };
    
  }

  if(diff>0 && diff<86400000){
    return {years:0,months:0,days:0};
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


    const displayTimeLeft=(year_,month_,date_)=>{
      
      if(hasDatePassed(year_,month_,date_)){
        return "time passed"
      }else{
        const{days,months,years}=getTimeLeft(year_,month_,date_);
        
          if(days==0 && months==0 && years==0){
              return 'time left'
          }else{
        const timeLeft=getFormatedTime(years,months,days);
        return timeLeft;
          }
      }
      
    }

    function getIntervalDuration(year, month, day) {
  const now = new Date();
  const target = new Date(year, month - 1, day, 23, 59, 59, 999);
  
  const diffMs = target.getTime() - now.getTime();
  const totalHours = diffMs / (1000 * 60 * 60);
  
  if (totalHours > 1) {
    return 3600000; // 60 seconds interval
  } else if (totalHours > 0) {
    return 1000; // 1 second interval
  } else {
    return null; // time passed, don't set interval
  }
}
function getTimeRemainingToday() {
  const now = new Date();

  // Create a Date object for the start of *tomorrow*
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0); // midnight of next day

  // Difference in milliseconds
  const diff = tomorrow - now;

  // Convert to hours, minutes, seconds
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

function TaskCard(props) {
    const {children,task,onDelete,onEdit,onToggle}=props;
    const [showDetails, setShowDetails] = useState(false);
    const [timer,setTimer]=useState('');
    const [urgency,setUrgency]=useState('safe');
    const [intervalType, setIntervalType] = useState('hours');

    
    useEffect(() => {
  const [year, month, day] = task.date.split('-');
  
  const timeLeft=displayTimeLeft(year, month, day);
  
  let interval;

  if(timeLeft==='time left'){
    
    const intervalDuration = getIntervalDuration(year, month, day);
    console.log(intervalDuration);
    if (intervalDuration !== null) {
      
      setUrgency(intervalDuration===1000?'urgent':'warning');
      
     interval= setInterval(() => {
      console.log("ibht");
      const {hours,minutes,seconds}=getTimeRemainingToday();
      
      const display=hours!==0?`${hours} hr remaining`:`${hours}:${minutes}:${seconds}`
      setTimer(display);
    }, intervalDuration); 
  }
  else{
    setUrgency("Overdue");
  }

  }else if(timeLeft==='time passed'){
    setTimer('Overdue');
  }else{
    setTimer(displayTimeLeft(year, month, day));
    setUrgency('safe');
  }
  
  
  return () => {
    clearInterval(interval);
  };
  
  
}, [intervalType]);
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
      <div className={`task-timer ${urgency}`}>
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
import React, { useEffect, useState } from 'react'

const CurrentDateTime = () => {
    const [current, setCurrent] = useState(new Date());
    useEffect(()=>{
        const intervalId = setInterval(()=>{
            setCurrent(new Date())
        }, 1000*60)
        return ()=>{
            clearInterval(intervalId);
        }
    },[]);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const formatDate = ()=>{
        return `${days[current.getDay()]}, ${current.getDate()} ${months[current.getMonth()]}`
    }
    const formatTime = ()=>{
        let h = current.getHours();
        const m = current.getMinutes();
        const meridiem = h > 12 ? "PM" : "AM";
        return `${h}:${String(m).padStart(2,0)} ${meridiem}`
    }
  return (
    <div className='mt-6 flex-col justify-center items-center text-center'>
       <h1 className='text-4xl'>{formatDate()}</h1>
        <h2 className='text-4xl'>{formatTime()}</h2>
    </div>
  )
}

export default CurrentDateTime

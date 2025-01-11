import React, {useState, useEffect} from 'react'

const LineBar = (props) => {
  const fromDate = props.fromD;
  const endDate = props.endD;
  const itemColor = props.itemColor;  
  const [currentTime, setCurrentTime] = useState(new Date())
      useEffect(()=>{
          const intervalId = setInterval(()=>{
                  setCurrentTime(new Date());
              }, 1000);
          return ()=>{
              clearInterval(intervalId);
          }
      }, []);
  const percentage = 100 - ((endDate-currentTime)/ (endDate-fromDate))*100;
  const dayPassed = () =>{
    let dayCount = currentTime- fromDate;
    dayCount = dayCount /(1000*60*60*24);
    return Math.floor(dayCount);
  }
  const backgroundGradientCSS ={
    width: (percentage/100 * 400),
    background: "linear-gradient(90deg, " + itemColor.from + " 0%, " + itemColor.to + " 100%)",
  };
  return (
    <div className='px-2'>
      <h1 className='text-3xl text-center'>You have been here for {dayPassed()} days</h1>
      <div className='bg-white relative w-full h-2 rounded-2xl'>
        <div className=' bg-gradient-to-r  h-2 w-full rounded-2xl absolute' style={backgroundGradientCSS}>
        </div>
      </div>
      <div className='text-2xl  flex justify-between'>
          <p className=''>Form {fromDate.getDate()}/{fromDate.getMonth()+1}/{fromDate.getFullYear()}</p>
          <p>To {endDate.getDate()}/{endDate.getMonth()+1}/{endDate.getFullYear()}</p>
        </div>
    </div>
  )
}

export default LineBar
import React, { useEffect, useRef, useState } from 'react'

const CirleDateCount = (props) => { 
    // const fromDate = new Date(2025, 0, 10); //get from prop 
    // const endDate = new Date(2025,0,11); //get from p
    //Note: fromdate < current date< endate
   
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
    function calcRemainingDays(){
        let diffTime = Math.abs(endDate - currentTime); 
        const diffDays =Math.floor(diffTime/(1000*60*60*24));
        return `${Math.floor(diffDays)}`
    }
    function calcRemainingHours(){
        const diffTime = Math.abs(endDate - currentTime);
        const diffHours =Math.floor(diffTime / (1000*60*60) % 24);
        const diffMinutes =Math.floor(diffTime / (1000*60) % 60);
        // const diffSecs = Math.floor( (diffMinutes % Math.floor(diffMinutes))*60 ); 
        const diffSecs =Math.floor(diffTime / (1000) % 60); 
        return `${String(diffHours).padStart(2,0)}: ${String(Math.floor(diffMinutes)).padStart(2,0)}: ${String(diffSecs).padStart(2,0)}`
    }
    const percentage = 100- ((endDate-currentTime)/ (endDate-fromDate))*100;
    const radius = 48; // Bán kính vòng tròn
    const strokeWidth = 4; // Độ dày nét
    const circumference = 2 * Math.PI * radius; // Chu vi
    const strokeDashoffset = circumference - (percentage / 100) * circumference; // Tính phần trăm
    if(endDate - currentTime<=0){
        return (
            <div className="relative flex items-center justify-center w-[300px] h-[300px]">
        {/* SVG Vòng tròn */}
        <svg
            className="absolute"
            width="400"
            height="400"
            viewBox="0 0 120 120"
        >
            {/* Vòng tròn nền */}
            <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            />
            {/* Vòng tròn tiến trình */}
            <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="url(#gradient)" // Gradient
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform="rotate(-90 60 60)" // Bắt đầu từ trên cùng
            />
            {/* Gradient */}
            <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={itemColor.from} />
                <stop offset="100%" stopColor={itemColor.to} />
            </linearGradient>
            </defs>
        </svg>

        {/* Nội dung */}
        <div className="absolute flex flex-col items-center">
            <h1 className="text-5xl leading-[50px]">Xin chúc mừng</h1>
            <p className='text-3xl'>Bạn đã hoàn thành 1 chặng đường dài.</p>
        </div>
        </div>
        );
    }
    return (

        <div className="relative flex items-center justify-center w-[300px] h-[300px]">
        {/* SVG Vòng tròn */}
        <svg
            className="absolute"
            width="400"
            height="400"
            viewBox="0 0 120 120"
        >
            {/* Vòng tròn nền */}
            <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            />
            {/* Vòng tròn tiến trình */}
            <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="url(#gradient)" // Gradient
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)" // Bắt đầu từ trên cùng
            />
            {/* Gradient */}
            <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={itemColor.from} />
                <stop offset="100%" stopColor={itemColor.to} />
            </linearGradient>
            </defs>
        </svg>

        {/* Nội dung */}
        <div className="absolute flex flex-col items-center">
            <h1 className="text-[200px] leading-[100px]">{calcRemainingDays()}</h1>
            <p className="text-2xl">Days left</p>
            <p className="text-4xl ">{calcRemainingHours()}</p>
        </div>
        </div>
    )
}

export default CirleDateCount

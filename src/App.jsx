import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CurrentDateTime from './components/CurrentDateTime'
import CirleDateCount from './components/CirleDateCount'
import LineBar from './components/LineBar'

function App() {
  const [modalOpen, setOpenModal] = useState(false);
  const [fromDate, setFromDate] = useState(new Date(localStorage.getItem('fromDate')) || new Date(2024, 12, 10));
  const [endDate, setEndDate] = useState(new Date(localStorage.getItem('endDate')) || new Date(2025,0,11));

  const [backgroundColor, setBackgroundColor] = useState({from: localStorage.getItem('fromBG')||"#22c1c3", to: localStorage.getItem('endBG')||"#fdbb2d"});
  const [itemColor, setItemColor] = useState({from: localStorage.getItem('itemColorFrom')||"#6CA0DC", to: localStorage.getItem('itemColorTo')||"#FC14DD"});
  
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(()=>{
    if(localStorage.getItem('fromDate')&&localStorage.getItem('endDate')){
      setFromDate(new Date(localStorage.getItem('fromDate')));
      setEndDate(new Date(localStorage.getItem('endDate')));
    }
  }, []);

  const handleChangeFromDate = (e)=>{
    const val = new Date(e.target.value)
    if(val < endDate){
      setFromDate(val);
      localStorage.setItem('fromDate', new Date(e.target.value));
      setErrorMsg("");
    }else{
      setErrorMsg("Ngày đến phải lớn hơn ngày đi.");
    }
  }
  const handleChangeToDate = (e)=>{
    const val = new Date(e.target.value)
    if(fromDate < val){
      setEndDate(val);
      localStorage.setItem('endDate', new Date(e.target.value));
      setErrorMsg("");
    }else{
      setErrorMsg("Ngày đến phải lớn hơn ngày đi.");
    }
  }
  const handleChangeBackgroundFrom = (e)=>{
    setBackgroundColor(c=>c={...backgroundColor, from: e.target.value.toUpperCase()});
    localStorage.setItem('fromBG', e.target.value.toUpperCase());
  }
  const handleChangeBackgroundTo = (e)=>{
    setBackgroundColor(c=>c={...backgroundColor, to: e.target.value.toUpperCase()});
    localStorage.setItem('endBG', e.target.value.toUpperCase());
  }
  const handleChangeItemColorFrom = (e)=>{
    setItemColor(c=>c={...itemColor, from: e.target.value.toUpperCase()});
    localStorage.setItem('itemColorFrom', e.target.value.toUpperCase());
  }
  const handleChangeItemColorTo = (e) =>{
    setItemColor(c=>c={...itemColor, to: e.target.value.toUpperCase()});
    localStorage.setItem('itemColorTo', e.target.value.toUpperCase());
  }
  function handleOpenModal(){
    setOpenModal(true);
  }

  const handleCloseModal =()=>{
    setOpenModal(false);

  }
  const handleReset = () =>{
    localStorage.removeItem('fromBG');
    localStorage.removeItem('endBG');
    localStorage.removeItem('itemColorFrom');
    localStorage.removeItem('itemColorTo');
    setBackgroundColor({from: "#22c1c3", to:"#fdbb2d"});
    setItemColor({from: "#6CA0DC", to: "#FC14DD"});
  }
  const styleBackground = 'relative flex flex-col justify-between items-center bg-gradient-to-b h-screen text-white p-4 font-formal'

  const backgroundGradientCSS ={
    background: "linear-gradient(0deg, "+backgroundColor.from+" 0%, "+backgroundColor.to+" 100%)",
  };
  return (
    <>
      <div className={styleBackground} style={backgroundGradientCSS}>
        <CurrentDateTime />
        <CirleDateCount fromD={fromDate} endD={endDate} itemColor={itemColor}/>
        <LineBar fromD={fromDate} endD={endDate} itemColor={itemColor}/>
        <div className='flex flex-row justify-end w-full'>
          <button onClick={()=>handleOpenModal()} color={backgroundColor.from} className='font-mono'><i className="text-2xl fa-solid fa-gear"></i></button>
        </div>
        {
         modalOpen ?
          <div className='transition-opacity ease-in-out duration-300 rounded-xl absolute w-full md:w-[500px] bg-white text-gray-800 p-4 font-sans'>
            <div className=''>
              <h1 className='text-xl font-bold'>Ngày bắt đầu và kết thúc:</h1>
              <p className='text-red-500'>{errorMsg? errorMsg : ""}</p>
            </div>
            <div>
              <label htmlFor="">From: {fromDate.toLocaleString()}</label>
              <input value={fromDate.toString()} type="datetime-local" className='block border-2 p-2 w-full' onChange={(e)=>handleChangeFromDate(e)}/>
              
              <label htmlFor="">To: {endDate.toLocaleString()}</label>
              <input value={endDate} type="datetime-local" className='block border-2 p-2 w-full' onChange={(e)=>handleChangeToDate(e)}/>
              <h2 className='text-xl font-bold'>Tùy chỉnh màu sắc</h2>
              <label htmlFor="" className='block'>Background gradient: </label>
              From: <input value={backgroundColor.from} type="color" className='m-2 border-2' onChange={(e)=>handleChangeBackgroundFrom(e)}/>               
              To: <input value={backgroundColor.to} type="color" className='m-2 border-2' onChange={(e)=>handleChangeBackgroundTo(e)}/>               
              <label htmlFor="" className='block'>Component gradient: </label>
              From: <input value={itemColor.from} type="color" className='m-2 border-2' onChange={(e)=>handleChangeItemColorFrom(e)}/>               
              To: <input value={itemColor.to} type="color" className='m-2 border-2' onChange={(e)=>handleChangeItemColorTo(e)}/>   
            </div>
            <div className='flex justify-end'>
              <button className='mt-2 border-2 p-2 px-4 rounded-xl items-center justify-center bg-red-500 text-white' onClick={()=>handleReset()}>Mặc định</button>
              <button className='mt-2 border-2 p-2 px-4 rounded-xl items-center justify-center bg-green-500 text-white' onClick={()=>handleCloseModal()}>Đóng</button>
            </div>
          </div> : "" 
        }
      </div>
    </>
  )
}

export default App

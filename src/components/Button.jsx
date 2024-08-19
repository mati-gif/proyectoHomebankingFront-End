import React from 'react'
import { BrowserRouter as  Link } from 'react-router-dom';

function Button({bgColor,text}) {
  return (
    <div className='border-black border-2 flex flex-col justify-center items-center'>
        <button className={  `w-6/12 text-white mt-3 px-4 py-2 rounded ${bgColor}`}>{text}</button>
      
    </div>
  )
}//bg-[#a3a3a3]

export default Button 
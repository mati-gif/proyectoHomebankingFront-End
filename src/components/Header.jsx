import React from 'react'
import Img from './Img'
import Nav from './Nav';
import { Link } from 'react-router-dom';


function Header(props) {
  return (
    <header className="   bg-[#B2B5E0] p-2  flex flex-col justify-around items-center w-full md:flex-row ">
      <div className=' flex flex-col justify-center w-32 h-20 text-center '>
        <p className=' text-[28px] text-[#0575A5] font-bold'>NetBank</p>
      </div>
      {/*  <Nav/>  */}
      {props.children}
      <Link onClick={()=>localStorage.removeItem("token")} to="/login" className='px-3 text-[#213F99]  hover:text-[#213F99]' > Logout
        <img className='w-14 h-12' src="https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png" alt="" />
      </Link>
    </header>


  )
}

export default Header






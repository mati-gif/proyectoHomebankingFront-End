import React from 'react'
import Img from './Img'
import Nav from './nav';
import { Link } from 'react-router-dom';

// border-4 border-black, #F0F0F0
function Header(props) {
  return (
    <header className="   bg-[#B2B5E0] p-2  flex flex-col justify-around items-center w-full md:flex-row ">
      <div className=' flex flex-col justify-center w-32 h-20 text-center '>
      <p className=' text-[28px] text-[#0575A5] font-bold'>NetBank</p>

      </div>

      {/*  <Nav/>  */}
      {props.children}
      {/*         <a className='px-3' href='/login/log'>Logout
        <img className='w-14 h-12' src="https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png" alt="" />
      </a>  */}
      <Link to="/login" className='px-3 text-[#213F99]  hover:text-[#213F99]' > Logout
        <img className='w-14 h-12' src="https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png" alt="" />
      </Link>



    </header>


  )
}

export default Header






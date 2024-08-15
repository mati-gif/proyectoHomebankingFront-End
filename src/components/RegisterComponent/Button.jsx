import React from 'react'
import { BrowserRouter as  Link } from 'react-router-dom';

function Button() {
  return (
    <div className='border-black border-2 flex flex-col justify-center items-center'>
        <button className=" bg-[#a3a3a3] w-6/12 text-white mt-5 px-4 py-2 rounded">Register</button>
        <Link to="/">iniciar sesion</Link>

    </div>
  )
}

export default Button
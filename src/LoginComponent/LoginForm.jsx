import React from 'react'
import Button from '../components/Button'
import Img from '../components/Img'
import ImputEmailPassword from '../components/ImputEmailPassword'
import { Link } from 'react-router-dom'

function LoginForm() {
  return (
    <div className="mb-4  w-full flex flex-col justify-center gap-10 md:w-96" >
      <Img />
      <p className='text-center text-[20px] font-bold'>Welcome to your Online Banking</p>
      <ImputEmailPassword />

      <div className='  flex flex-col   '>
        <Button className="w-52 bg-green-500 text-white font-bold py-2 px-2 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" type="button">Login</Button>
        <p className='w-full  flex justify-center'>o</p>
        <Link className='w-full  flex justify-center' to="/register">Register</Link>

      </div>
    </div>
  )
}

export default LoginForm
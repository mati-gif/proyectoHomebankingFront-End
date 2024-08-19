import React from 'react'
import Button from '../components/Button'
import Img from '../components/Img'
import ImputEmailPassword from '../components/ImputEmailPassword'
import { Link } from 'react-router-dom'

function LoginForm() {
  return (
    <div className="mb-4 border-red-500 border-2 w-full flex flex-col justify-center gap-10 md:w-96" >
      <Img />
      <ImputEmailPassword />

      <div className='border-green-500 border-2  flex flex-col   '>
      <Button text="Ingresar" bgColor="bg-[#a3a3a3]" />
      <p className='w-full border-violet border-2 flex justify-center'>o</p>
      <Link className='w-full border-violet border-2 flex justify-center' to="/register">Registrarse</Link>
      </div>
    </div>
  )
}

export default LoginForm
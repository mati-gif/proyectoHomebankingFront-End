import React from 'react'
import LoginForm from './LoginForm'

function Login() {
  return (
    <div className=" bg-[#D5DBDB]  md:p-8  md:rounded-lg md:bg-gray-100 md:p-8 md:min-h-screen md:border-4 md:border-green-200">

    
    <div className='flex gap-32 '>
    

    
    <div className=' hidden md:w-6/12 md:bg-gray-200 md:flex md:flex-col md:justify-center md:gap-5 md:border-black md:border-2 md:p-6 md:rounded-lg'>
        <img src="https://media.istockphoto.com/id/962095876/es/foto/hombre-usando-banca-en-l%C3%ADnea-con-tarjeta-de-cr%C3%A9dito-en-el-dispositivo-de-pantalla-t%C3%A1ctil-banca.jpg?s=612x612&w=0&k=20&c=9Ec7VNswKfgl9Kpyw4_0GqBS9roLEhFz_RiFvrq7KsE=" alt="" />
        </div>

  <LoginForm/>


    </div>
    
    
        </div>
  )
}

export default Login
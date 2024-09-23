import React from 'react'
import LoginForm from './LoginForm'
import Img from '../components/Img'

function Login() {
  return (
    <div className=" relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://www2.personas.santander.com.ar/obp-webapp/angular/client/app/common/images/Ilustrador.svg')", backgroundSize: 'cover' }}>
      <div className="w-60  absolute top-0 left-0 p-5 text-white">
        <Img />
        <h1 className='font-[Georgia] text-[#0575A5] text-center font-semibold text-[40px]'>NetBank</h1>
      </div>
      <div className=" flex justify-end  items-center min-h-screen ">
        <div className="bg-[#fff]  p-8 rounded-lg shadow-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login
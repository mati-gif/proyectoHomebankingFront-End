import React from 'react'
import Button from '../components/Button'
import Img from '../components/Img'
import ImputEmailPassword from '../components/ImputEmailPassword'

function LoginForm() {
  return (
    <div className="mb-4 border-red-500 border-2 w-96 flex flex-col justify-center gap-10" >
       <Img/>
           <ImputEmailPassword/>
            <Button text="Ingresar" bgColor="bg-[#a3a3a3]"/>

            </div>
  )
}

export default LoginForm
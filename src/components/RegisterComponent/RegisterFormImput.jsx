import React from 'react'
import Button from '../Button'
import Img from '../Img'
import ImputEmailPassword from '../ImputEmailPassword'
import { Link } from 'react-router-dom'


function RegisterFormImput() {
    return (
        <div className="bg-gray-200 mb-4 border-black border-2 w-full flex flex-col justify-center gap-3 md:w-96" >
            <Img />
            <label htmlFor="FirstName" className="block text-gray-700 text-lg font-bold mb-2">
                FirstName:
            </label>
            <input id="FirstName" name="FirstName" required placeholder='FirstName' className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2" type="text" />

            <label htmlFor="LastName" className="block text-gray-700 text-lg font-bold mb-2">
                LastName:
            </label>
            <input id="LastName" name="LastName" required placeholder='LastName' className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2" type="text" />

            <ImputEmailPassword />
            <div className='border-green-500 border-2 h-full flex flex-col  '>
                <Button text="Registrar" bgColor="bg-[#a3a3a3]" />
                <p className='w-full border-violet border-2 flex justify-center'>o</p>
                <Link className='w-full border-violet border-2 flex justify-center' to="/login">iniciar sesion</Link>
            </div>
        </div>
    )
}

export default RegisterFormImput
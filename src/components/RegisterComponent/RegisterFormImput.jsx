import React from 'react'
import Button from '../Button'
import Img from '../Img'
import ImputEmailPassword from '../ImputEmailPassword'
import { Link } from 'react-router-dom'


function RegisterFormImput() {
    return (
        <div className=" mb-4  w-full flex flex-col justify-center gap-3 md:w-96" >
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
            <div className=' h-full flex flex-col  '>
            <Button className="w-52 bg-green-500 text-white font-bold py-2 px-2 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" type="button">Register</Button>
        <p className='w-full  flex justify-center'>o</p>
        <Link className='w-full  flex justify-center' to="/login">Login </Link>
            </div>
        </div>
    )
}

export default RegisterFormImput
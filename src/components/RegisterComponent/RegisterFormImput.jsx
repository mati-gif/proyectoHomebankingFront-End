import React from 'react'
import Button from '../Button'
import Img from '../Img'
import ImputEmailPassword from '../ImputEmailPassword'

function RegisterFormImput() {
    return (
        <div className="mb-4 border-black border-2 w-96 flex flex-col justify-center gap-3" >
            <Img/>
            <label htmlFor="FirstName" className="block text-gray-700 text-lg font-bold mb-2">
                FirstName:
            </label>
            <input id="FirstName" name="FirstName" required placeholder='FirstName' className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2" type="text" />

            <label htmlFor="LastName" className="block text-gray-700 text-lg font-bold mb-2">
                LastName:
            </label>
            <input id="LastName" name="LastName" required placeholder='LastName' className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2" type="text" />

            <ImputEmailPassword/>

        <Button text="Registrar" bgColor="bg-[#a3a3a3]"/>

        </div>
    )
}

export default RegisterFormImput
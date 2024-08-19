import React from 'react'
import RegisterForm from './RegisterForm'

function RegisterComponent() {
    return (
        <div className="bg-[#B3B2AE]  p-8  rounded-lg bg-gray-100 p-8 min-h-screen border-4 border-green-200 flex  justify-center items-center">
            {/* <input type="text" placeholder="First Name" className="mb-4 p-2 w-64 border border-gray-300 rounded" />
            <input type="text" placeholder="Last Name" className="mb-4 p-2 w-64 border border-gray-300 rounded" />
            <input type="email" placeholder="E-mail" className="mb-4 p-2 w-64 border border-gray-300 rounded" />
          <input type="password" placeholder="Password" className="mb-4 p-2 w-64 border border-gray-300 rounded" /> */}

            <RegisterForm />
        </div>
    )
}

export default RegisterComponent
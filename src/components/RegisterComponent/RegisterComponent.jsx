import React from 'react'
import RegisterForm from './RegisterForm'

function RegisterComponent() {
    return (
        <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center">
            {/* <input type="text" placeholder="First Name" className="mb-4 p-2 w-64 border border-gray-300 rounded" />
            <input type="text" placeholder="Last Name" className="mb-4 p-2 w-64 border border-gray-300 rounded" />
            <input type="email" placeholder="E-mail" className="mb-4 p-2 w-64 border border-gray-300 rounded" />
          <input type="password" placeholder="Password" className="mb-4 p-2 w-64 border border-gray-300 rounded" /> */}

            <RegisterForm />
        </div>
    )
}

export default RegisterComponent
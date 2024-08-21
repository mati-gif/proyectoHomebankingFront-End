import React from 'react'
import RegisterForm from './RegisterForm'

function RegisterComponent() {
    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://empresas.santander.com.ar/images/background3.png')", backgroundSize: 'cover' }}>
            <div className="flex flex-col justify-center items-start absolute top-1/4 left-8 text-white">
                <h2 className="text-6xl font-bold">NetBank</h2>
                <h1 className="text-2xl mt-4">Hello you are Welcome!</h1>
            </div>
            <div className="flex justify-end items-center min-h-screen">
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterComponent
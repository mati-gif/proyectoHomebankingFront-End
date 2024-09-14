import React, { useState } from 'react';
import axios from 'axios';
import Button from '../Button'
import Img from '../Img'
import ImputEmailPassword from '../ImputEmailPassword'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function RegisterFormImput() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        // Validar que todos los campos estén llenos
        if (!firstName || !lastName || !email || !password) {
            alert('All fields are required');
            return;
        }

        try {
            // Realizar el axios.post
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            });

            console.log('Registration successful:', response.data);
            navigate("/login"); // Redirige al usuario a la página de login después de un registro exitoso
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="mb-4 w-full flex flex-col justify-center gap-3 md:w-96">
            <Img />
            <label htmlFor="FirstName" className="block text-gray-700 text-lg font-bold mb-2">
                First Name:
            </label>
            <input
                id="FirstName"
                name="FirstName"
                required
                placeholder='First Name'
                className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <label htmlFor="LastName" className="block text-gray-700 text-lg font-bold mb-2">
                Last Name:
            </label>
            <input
                id="LastName"
                name="LastName"
                required
                placeholder='Last Name'
                className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <label htmlFor="email" className="block text-gray-700 text-lg font-bold mb-2">
                Email:
            </label>
            <input
                id="email"
                name="email"
                required
                placeholder='Email'
                className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-2">
                Password:
            </label>
            <input
                id="password"
                name="password"
                required
                placeholder='Password'
                className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className='h-full flex flex-col mt-5'>
                <Button
                    className="w-52 bg-green-500 text-white font-bold py-2 px-2 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    type="button"
                    onClick={handleSubmit}
                >
                    Register
                </Button>
                <p className='w-full flex justify-center'>o</p>
                <Link className='w-full flex justify-center' to="/login">Login</Link>
            </div>
        </div>
    );
}

export default RegisterFormImput
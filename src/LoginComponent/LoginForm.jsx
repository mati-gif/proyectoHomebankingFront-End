import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Img from '../components/Img';
import ImputEmailPassword from '../components/ImputEmailPassword';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      alert('Both email and password are required');
      return;
    }

    try {
      // Realizar el axios.post
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: email,
        password: password,
      });
console.log(response);

      const token = response.data; 
      localStorage.setItem('token', token);
      navigate("/");
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="mb-4 w-full flex flex-col justify-center gap-10 md:w-96">
      <Img />
      <p className='text-center text-[20px] font-bold'>Welcome to your Online Banking</p>
      <div className="mb-4 w-full flex flex-col justify-center gap-3 md:w-96">
        <label htmlFor="Email" className="block text-gray-700 text-lg font-bold mb-2">
          Email:
        </label>
        <input 
          id="Email" 
          name="Email" 
          required 
          placeholder='Email' 
          className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="Password" className="block text-gray-700 text-lg font-bold mb-2">
          Password:
        </label>
        <input 
          id="Password" 
          name="Password" 
          required 
          placeholder='Password' 
          className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='flex flex-col'>
        <Button 
          className="w-52 bg-green-500 text-white font-bold py-2 px-2 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" 
          type="button" 
          onClick={handleSubmit}
        >
          Login
        </Button>
        <p className='w-full flex justify-center'>o</p>
        <Link className='w-full flex justify-center' to="/register">Register</Link>
      </div>
    </div>
  );
}

export default LoginForm;

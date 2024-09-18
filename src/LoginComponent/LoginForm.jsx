import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Await, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Img from '../components/Img';
import ImputEmailPassword from '../components/ImputEmailPassword';
import { Link } from 'react-router-dom';
// Importamos useDispatch para despachar acciones y loginAction para manejar el estado de autenticación
import { useDispatch } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';

import { useSelector } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit';
import { authenticateUser } from '../redux/actions/authActions';
import Swal from 'sweetalert2'; // Importa SweetAlert2



function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // useDispatch para despachar la acción



  // Accedemos al estado de autenticación desde Redux
  const { status, isLoggedIn,error} = useSelector((state) => state.auth);
  console.log(status, isLoggedIn, error);



  // UseEffect para mostrar alertas basadas en el estado de autenticación
  useEffect(() => {

    console.log('Status:', status);
    console.log('IsLoggedIn:', isLoggedIn);
    console.log('Error:', error);

    // Mostrar alerta cuando la autenticación está en progreso
    if (status === 'pending') {
      Swal.fire({
        title: 'Logging in...',
        text: 'Please wait while we log you in.',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading(); // Muestra un spinner mientras está en proceso
        },
      });
    }

    // Mostrar alerta cuando la autenticación ha sido exitosa
    if (status === 'succeeded' && isLoggedIn) {
      Swal.close(); // Cierra la alerta de "Logging in..."
      Swal.fire({
        title: 'Login Successful!',
        text: 'You have been logged in successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/'); // Redirigir al home después del login exitoso
      });
    }

    // Mostrar alerta si falla la autenticación
    if (status === 'failed') {
      Swal.close(); // Cierra la alerta de "Logging in..." si falla
      Swal.fire({
        title: 'Login Failed!',
        text:  'The email or password you entered is incorrect. Please try again...',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }, [status, isLoggedIn, error, navigate]);


  // Validar el formulario antes de enviar
  const validateForm = () => {

    if (!email) {
      Swal.fire({
        title: 'Error',
        text: 'Email is required.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    }

    if (!password) {
      Swal.fire({
        title: 'Error',
        text: 'Password is required.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    }

    // Verificar si el email contiene espacios en blanco
    if (email.includes(' ')) {
      Swal.fire({
        title: 'Error',
        text: 'Email should not contain spaces.Try again',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    }

    // Verificar si la contraseña contiene espacios en blanco
    if (password.includes(' ')) {
      Swal.fire({
        title: 'Error',
        text: 'Password should not contain spaces. Try again',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    }


    return true; // Agrega esto para devolver true cuando el formulario sea válido
  };


  const handleSubmit = async () => {

    if (!validateForm()) return;

    try {

      const resultAction =   dispatch(authenticateUser({ email, password }))
      console.log("Resultado de authenticateUser:", resultAction);


      const result = unwrapResult(resultAction);
      console.log("Resultado desenrollado:", result);

      // Asegúrate de que el token es correcto aquí
      const token = localStorage.getItem('token');
      console.log("Token recuperado de localStorage:", token);

      if (!token) {
        throw new Error("Token no encontrado en localStorage");
      }



      // Despachamos la acción para cargar el usuario
      const userResult =  dispatch(loadUser());  // Asegúrate de esperar el resultado
      console.log("Resultado de loadUser:HOLAAAAAAAAAAAA", userResult);
      unwrapResult(userResult);

      // Redirige o realiza cualquier otra acción después de la autenticación exitosa
      navigate("/");
      // const user = {
      //   email,
      //   password
      // };
      // console.log(user);

      // // Realizar el axios.post
      // const response = await axios.post('http://localhost:8080/api/auth/login', user);
      // console.log('Full Response:', response);

      // const token = response.data;
      // console.log("Token:", token);
      // localStorage.setItem('token', token);

      // // Despachamos la acción para cargar el usuario
      // dispatch(loadUser(token));
      // navigate("/");

    } catch (error) {
      // Verifica si es un error de autenticación (401)
      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: 'Login Failed',
          text: 'The email or password you entered is incorrect. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      // else {
      //   Swal.fire({
      //     title: 'Error',
      //     text: error.response.data.message || 'An unexpected error occurred. Please try again.',
      //     icon: 'error',
      //     confirmButtonText: 'OK'
      //   });
      // }
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

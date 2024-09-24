import React, { useEffect, useRef, useState } from 'react';
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
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa los iconos



function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // useDispatch para despachar la acción
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});



  // Accedemos al estado de autenticación desde Redux
  const { status, isLoggedIn, error, token } = useSelector((state) => state.auth);
  console.log(status, isLoggedIn, error);
  console.log(token);

  const errorMessage = useSelector((state) => state.auth.error);




  // // UseEffect para mostrar alertas basadas en el estado de autenticación
  // useEffect(() => {

  //   console.log('Status:', status);
  //   console.log('IsLoggedIn:', isLoggedIn);
  //   console.log('Error:', error);


  //   // Ignorar el primer render o la primera carga
  //   if (!hasAttemptedLogin.current) {
  //     hasAttemptedLogin.current = true;
  //     return;
  //   }
  //   // Mostrar alerta cuando la autenticación está en progreso
  //   if (status === 'pending' && !isLoggedIn) {
  //     Swal.fire({
  //       title: 'Logging in...',
  //       text: 'Please wait while we log you in.',
  //       icon: 'info',
  //       allowOutsideClick: false,
  //       showConfirmButton: false,
  //       didOpen: () => {
  //         Swal.showLoading(); // Muestra un spinner mientras está en proceso
  //       },
  //     });
  //   }

  //   // Mostrar alerta cuando la autenticación ha sido exitosa
  //   if (status === 'succeeded' && isLoggedIn) {
  //     Swal.close(); // Cierra la alerta de "Logging in..."
  //     Swal.fire({
  //       title: 'Login Successful!',
  //       text: 'You have been logged in successfully.',
  //       icon: 'success',
  //       confirmButtonText: 'OK',
  //     }).then(() => {
  //       navigate('/'); // Redirigir al home después del login exitoso
  //     });
  //   }

  //   // Mostrar alerta si falla la autenticación
  //   if (status === 'failed') {
  //     Swal.close(); // Cierra la alerta de "Logging in..." si falla
  //     Swal.fire({
  //       title: 'Login Failed!',
  //       text: 'The email or password you entered is incorrect. Please try again...',
  //       icon: 'error',
  //       confirmButtonText: 'OK',
  //     });
  //   }
  // }, [status, isLoggedIn, error, navigate, dispatch]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));

    if (name === 'email') setEmail(value.replace(/\s+/g, ''));    // Eliminar espacios en blanco en email
    if (name === 'password') setPassword(value.replace(/\s+/g, '')); // Eliminar espacios en blanco en password
  };




  // Validar el formulario antes de enviar
  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      // Swal.fire({
      //   title: 'Error',
      //   text: 'Email is required.',
      //   icon: 'error',
      //   confirmButtonText: 'OK'
      // });
      // return false;
      newErrors.email = 'Email is required.';

    }

    if (!password) {
      // Swal.fire({
      //   title: 'Error',
      //   text: 'Password is required.',
      //   icon: 'error',
      //   confirmButtonText: 'OK'
      // });
      // return false;

      newErrors.password = 'Password is required.';
    }



    // Verificar si el email contiene espacios en blanco
    if (email.includes(' ')) {
      // Swal.fire({
      //   title: 'Error',
      //   text: 'Email should not contain spaces.Try again',
      //   icon: 'error',
      //   confirmButtonText: 'OK'
      // });
      // return false;
      newErrors.email = 'Email should not contain spaces.';
    }

    // Verificar si la contraseña contiene espacios en blanco
    if (password.includes(' ')) {
      // Swal.fire({
      //   title: 'Error',
      //   text: 'Password should not contain spaces. Try again',
      //   icon: 'error',
      //   confirmButtonText: 'OK'
      // });
      // return false;

      newErrors.password = 'Password should not contain spaces.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    // return true; // Agrega esto para devolver true cuando el formulario sea válido
  };


  const handleSubmit = async () => {

    if (!validateForm()) return;

    try {



      const resultAction = await dispatch(authenticateUser({ email, password })).unwrap()
      console.log("Resultado de login:", resultAction);



      // Si la autenticación es exitosa, cargamos el usuario
      await dispatch(loadUser(resultAction.token)).unwrap();

      // // Asegúrate de que el token es correcto aquí
      // const token = localStorage.getItem('token');
      // console.log("Token recuperado de localStorage:", token);





      // // Despachamos la acción para cargar el usuario
      // const userResult = dispatch(loadUser());  // Asegúrate de esperar el resultado
      // console.log("Resultado de loadUser:HOLAAAAAAAAAAAA", userResult);
      // unwrapResult(userResult);

      // Redirige o realiza cualquier otra acción después de la autenticación exitosa
      // navigate("/");
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
      navigate('/');
    } catch (error) {

      console.log("entro en el catch del back en el loadUser", error.response.data);

      // Manejo de errores desde el backend
      const backendErrorMessage = error?.response?.data?.message || error?.message || error;

      console.log("este es el error del back", backendErrorMessage);

      const newErrors = {};

      console.log("error en la variable newError", newErrors);


      if (typeof backendErrorMessage === 'string') {
        if (backendErrorMessage.includes('email field must not be empty') || backendErrorMessage.includes('Email is already in use')) {
          newErrors.email = backendErrorMessage.includes('already in use') ? 'Email is already in use' : 'Email is required';
        }
        if (backendErrorMessage.includes('password field must not be empty') || backendErrorMessage.includes('Password must be at least 8 characters long')) {
          newErrors.password = backendErrorMessage.includes('at least 8 characters') ? 'Password must be at least 8 characters' : 'Password is required';
        }


        setErrors(newErrors);
      }
    }
  }

  // else {
  //   Swal.fire({
  //     title: 'Error',
  //     text: error.response.data.message || 'An unexpected error occurred. Please try again.',
  //     icon: 'error',
  //     confirmButtonText: 'OK'
  //   });
  // }











  return (
    <div className="   mb-4 w-full flex flex-col justify-center gap-10 md:w-96">
      <Img />
      <p className='text-center text-[20px] font-bold text-[#0575A5]'>Welcome to your Online Banking</p>
      <div className=" bg-opacity-75 rounded-lg shadow-lg bg-[#CDD0D3] p-6 mb-4 w-full flex flex-col justify-center gap-3 md:w-96">
        <label htmlFor="Email" className="block text-gray-700 text-lg font-bold mb-2">
          Email:
        </label>
        <input
          id="Email"
          name="email"
          required
          placeholder='Email'
          className={`border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none ${errors.email ? 'border-red-500' : 'border-none'}`}
          type="email"
          value={email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 font-bold text-sm">{errors.email}</p>}


        <label htmlFor="Password" className="block text-gray-700 text-lg font-bold mb-2">
          Password:
        </label>
        <div className='relative'>
          <input
            id="Password"
            name="password"
            required
            placeholder='Password'
            className={`border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none ${errors.password ? 'border-red-500' : 'border-none'}`}
            value={password}
            type={showPassword ? 'text' : 'password'} // Alternar entre texto y contraseña
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
            onClick={() => setShowPassword(prev => !prev)} // Alternar visibilidad
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 font-bold text-sm">{errors.password}</p>}
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













  {/* <div className="flex items-center justify-center min-h-screen bg-gray-100">
<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
  <h2 className="text-2xl font-bold text-red-600 mb-6">Te damos la bienvenida a tu Banca Online</h2>
  <form>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nif">
        NIF
      </label>
      <input
        type="text"
        id="nif"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Introduce tu NIF"
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Clave de acceso
      </label>
      <input
        type="password"
        id="password"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Introduce tu clave"
      />
    </div>
    <div className="flex items-center justify-between">
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Entrar
      </button>
      <a
        href="#"
        className="inline-block align-baseline font-bold text-sm text-red-600 hover:text-red-800"
      >
        ¿Problemas con tu clave de acceso?
      </a>
    </div>
  </form>
</div>
</div> */}

}


export default LoginForm;

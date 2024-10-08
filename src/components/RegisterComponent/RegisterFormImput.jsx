import React, { useState } from 'react';
import Button from '../Button';
import Img from '../Img';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Asegúrate de instalar react-icons

function RegisterFormImput() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorMessage = useSelector((state) => state.auth.error);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));

        switch (name) {
            case 'firstName':
                setFirstName(value); // Permitir espacios
                break;
            case 'lastName':
                setLastName(value); // Permitir espacios
                break;
            case 'email':
                setEmail(value.replace(/\s+/g, '')); // Eliminar espacios en el email
                break;
            case 'password':
                setPassword(value.replace(/\s+/g, '')); // Eliminar espacios en la contraseña
                break;
            default:
                break;
        }
    };

    const handleSubmit = async () => {
        const sanitizedFirstName = firstName;
        const sanitizedLastName = lastName;
        const sanitizedEmail = email;
        const sanitizedPassword = password;


        console.log("Submit clicked!");
        const newErrors = {};

        console.log(newErrors);

//opcion1:dejarlo como esta .
//opcion 2  mirar las validaciones de abajo.
 //       Validación de campos
        if (!sanitizedFirstName) {
            newErrors.firstName = 'First name cannot be empty.';
            console.log('First name validation error:', newErrors.firstName);  // Agrega este log
        }
        if (!sanitizedLastName) {
            newErrors.lastName = 'Last name cannot be empty.';
            console.log('Last name validation error:', newErrors.lastName);  // Agrega este log
        }
        if (!sanitizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
            newErrors.email = 'A valid email is required  ';
            console.log("email validation error", newErrors.email);

        }
        if (!sanitizedPassword || sanitizedPassword.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long and cannot contain spaces.';
            console.log("password validation error", newErrors.password);

        }
        console.log("Validation errors: ", newErrors);

        if (Object.keys(newErrors).length > 0) {
            console.log("Validation errors: ", newErrors);
            setErrors(newErrors);
            return;
        }

        console.log("Form valid, sending data...");

        setErrors({}); // Limpiar errores antes de enviar

        try {
            const userData = {
                firstName: sanitizedFirstName,
                lastName: sanitizedLastName,
                email: sanitizedEmail,
                password: sanitizedPassword
            };
            console.log("Sending userData: ", userData);
            // Intentar realizar el registro
            const result = await dispatch(registerUser(userData)).unwrap();
            console.log("Register result: ", result);  // Agregar este log para ver el resultado exitoso


            Swal.fire({
                title: 'Registration Successful',
                text: 'Registered successfully! Redirecting to login...',
                icon: 'success',
                timer: 1000,
                showConfirmButton: false,
            });

            setTimeout(() => navigate('/login'), 1000);
        } catch (error) {


            console.error("Registration error: ", error);
            console.log("Error details:", error);
            console.log("Backend response data:", error?.response?.data);
            const newErrors = {};
            console.log(newErrors);

  // Verifica si el error es un string o viene en el formato esperado del backend
    const backendErrorMessage = error?.response?.data?.message || error?.message || error;

    console.log("Backend error message: ", backendErrorMessage)


            // Manejo de errores desde el backend
            if (typeof backendErrorMessage  === 'string') {

                //opcion 1 dejarlo como esta.
                //opcion2: descomentar estos 4 y comentar los otros 4 y comentar los 4 de arriba asi el mensaje del backse captura cuando se hace la solicitud
                // if (backendErrorMessage.includes('The name field must not be empty') || backendErrorMessage.includes('First name is required')) {
                //     newErrors.firstName = backendErrorMessage;
                // }
                // if (backendErrorMessage.includes('The last name field must not be empty') || backendErrorMessage.includes('Last name is required')) {
                //     newErrors.lastName = backendErrorMessage;
                // }

                // if (backendErrorMessage.includes('Email is already in use')) {
                //     newErrors.email = backendErrorMessage;
                // }
                // if (backendErrorMessage.includes('Password must be at least 8 characters long')) {
                //     newErrors.password = backendErrorMessage;
                // }
                if (error.includes('The name field must not be empty')) {
                    newErrors.firstName = 'First name is required';
                }

                if (error.includes('last name field must not be empty')) {
                    newErrors.lastName = 'Last name is required';
                }

                if (error.includes('email field must not be empty') || error.includes('Email is already in use')) {
                    newErrors.email = error.includes('already in use') ? 'Email is already in use' : 'Email is required';
                }
                if (error.includes('password field must not be empty') || error.includes('Password must be at least 8 characters long')) {
                    newErrors.password = error.includes('at least 8 characters') ? 'Password must be at least 8 characters' : 'Password is required';
                }


                setErrors(newErrors);

                console.log(newErrors);

            } else if (errorMessage) {
                Swal.fire({
                    title: 'Registration Failed',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
    };

    return (

        <div className="flex items-center justify-center min-h-screen  overflow-hidden">
            <div className="bg-white  bg-opacity-75 p-8 rounded-lg shadow-xl max-w-2xl  h-[600px] ">
                <Img />
                <h2 className="text-2xl font-bold text-[#0575A5]  mb-6 text-center"> NetBank</h2>
                <div className="rounded-[10px] p-6 overflow-hidden shadow-lg bg-opacity-50 bg-gray-400 w-[500px]">
                    <div className="flex mb-4 ">
                        <div className="w-1/2 pr-2 ">
                            <label className=" text-lg  mb-2 block text-gray-700  font-bold " htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                // className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                placeholder="First Name"
                                type="text"
                                value={firstName}
                                onChange={handleChange}
                                className={`shadow-lg border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-2 ${errors.firstName ? 'border-red-500' : 'border-none'}`}
                            />
                            {errors.firstName && <p className="text-red-500 text-sm font-bold">{errors.firstName}</p>}

                        </div>
                        <div className="w-1/2 pl-2">
                            <label className=" text-lg  mb-2 block text-gray-700  font-bold " htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                placeholder="Last Name"
                                value={lastName}
                                onChange={handleChange}
                                className={`shadow-lg border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-2 ${errors.lastName ? 'border-red-500' : 'border-none'}`}


                            />
                            {errors.lastName && <p className="text-red-500 font-bold text-sm">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <div className="w-1/2 pr-2">
                            <label className=" text-lg  mb-2 block text-gray-700  font-bold " htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Email"
                                required
                                type="email"
                                value={email}
                                onChange={handleChange}
                                className={`shadow-lg border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-2 ${errors.email ? 'border-red-500' : 'border-none'}`}

                            />
                            {errors.email && <p className="text-red-500 font-bold text-sm">{errors.email}</p>}
                        </div>


                        <div className="w-1/2 pl-2">
                            <label className=" text-lg  mb-2 block text-gray-700  font-bold " htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    required
                                    placeholder="Password"
                                    className={` shadow-lg border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-2 ${errors.password ? 'border-red-500' : 'border-none'}`}
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handleChange}
                                // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 font-bold text-sm">{errors.password}</p>}
                        </div>
                    </div>
                    <div className="flex  justify-center     h-full flex flex-col mt-5">
                        <Button
                            className="w-44  bg-green-500 text-white font-bold py-2 px-2 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                        <p className="w-full flex justify-center">o</p>
                        <Link className="w-full flex justify-center" to="/login">Login</Link>
                    </div>
                </div>
            </div >
        </div >












        // <div className="mb-4 w-full flex flex-col justify-center gap-3 md:w-96">
        //     <Img />
        //     <label htmlFor="firstName" className="block text-gray-700 text-lg font-bold mb-2">
        //         First Name:
        //     </label>
        //     <input
        //         id="firstName"
        //         name="firstName"
        //         required
        //         placeholder="First Name"
        //         className={`border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-2 ${errors.firstName ? 'border-red-500' : 'border-black'}`}
        //         type="text"
        //         value={firstName}
        //         onChange={handleChange}
        //     />

        // {errors.firstName && <p className="text-red-500 text-sm font-bold">{errors.firstName}</p>}

        //     <label htmlFor="lastName" className="block text-gray-700 text-lg font-bold mb-2">
        //         Last Name:
        //     </label>
        //     <input
        //         id="lastName"
        //         name="lastName"
        //         required
        //         placeholder="Last Name"
        //         className={`border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-2 ${errors.lastName ? 'border-red-500' : 'border-black'}`}
        //         type="text"
        //         value={lastName}
        //         onChange={handleChange}
        //     />
        //     {errors.lastName && <p className="text-red-500 font-bold text-sm">{errors.lastName}</p>}

        //     <label htmlFor="email" className="block text-gray-700 text-lg font-bold mb-2">
        //         Email:
        //     </label>
        //     <input
        //         id="email"
        //         name="email"
        //         required
        //         placeholder="Email"
        //         className={`border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-2 ${errors.email ? 'border-red-500' : 'border-black'}`}
        //         type="email"
        //         value={email}
        //         onChange={handleChange}
        //     />
        //     {errors.email && <p className="text-red-500 font-bold text-sm">{errors.email}</p>}

        //     <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-2">
        //         Password:
        //     </label>
        //     <div className="relative">
        //         <input
        //             id="password"
        //             name="password"
        //             required
        //             placeholder="Password"
        //             className={`border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-2 ${errors.password ? 'border-red-500' : 'border-black'}`}
        //             type={showPassword ? 'text' : 'password'}
        //             value={password}
        //             onChange={handleChange}
        //         />
        //         <button
        //             type="button"
        //             className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
        //             onClick={() => setShowPassword((prev) => !prev)}
        //         >
        //             {showPassword ? <FaEye /> : <FaEyeSlash />}
        //         </button>
        //     </div>
        //     {errors.password && <p className="text-red-500 font-bold text-sm">{errors.password}</p>}

        //     <div className="h-full flex flex-col mt-5">
        //         <Button
        //             className="w-52 bg-green-500 text-white font-bold py-2 px-2 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        //             type="button"
        //             onClick={handleSubmit}
        //         >
        //             Register
        //         </Button>
        //         <p className="w-full flex justify-center">o</p>
        //         <Link className="w-full flex justify-center" to="/login">Login</Link>
        //     </div>
        // </div>






    );
}

export default RegisterFormImput;

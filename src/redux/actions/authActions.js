import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert2

// Definimos las acciones como constantes
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';



// Acción para registrar un nuevo usuario
export const registerUser = createAsyncThunk("registerUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post('https://proyectohomebanking-1.onrender.com/api/auth/register', userData);

        return response.data;  // Retornamos la respuesta del backend si es exitoso
    } catch (error) {
        // Devolvemos el mensaje de error que venga del backend
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});


// Acción asincrónica para crear una transacción
export const createTransaction = createAsyncThunk(
    'transactions/createTransaction',
    async (transactionData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://proyectohomebanking-1.onrender.com/api/transactions', transactionData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
                },
            });
            console.log(response);

            Swal.fire({
                icon: 'success',
                title: 'Transacción Exitosa',
                text: 'La transacción ha sido realizada con éxito',
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response && error.response.data
                ? error.response.data.message || error.response.data
                : 'Ocurrió un error al procesar la transacción';
            Swal.fire({
                icon: 'error',
                title: 'Error en la Transacción',
                text: errorMessage,
            });
            return rejectWithValue(errorMessage);
        }
    }
);

// Acción asincrónica para obtener préstamos disponibles
export const fetchAvailableLoans = createAsyncThunk(
    'fetchAvailableLoans',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No token found');
            }

            const response = await axios.get('https://proyectohomebanking-1.onrender.com/api/loans', {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
                },
            });
            console.log("estos son los prestamos disponibles", response);
            console.log(response.data);

            if (response.data === "No more loans available.") {
                return rejectWithValue(response.data); // Retorna el mensaje como un error
            }
            return response.data; // Retorna los préstamos disponibles
        } catch (error) {
            const errorMessage = error.response && error.response.data
                ? error.response.data.message || error.response.data
                : 'An error occurred';

            Swal.fire({
                icon: 'error',
                title: 'Error fetching loans',
                text: errorMessage,
            });

            return rejectWithValue(errorMessage);
        }
    }
);

// Acción asincrónica para crear un préstamo
export const createLoan = createAsyncThunk(
    'loans/createLoan',
    async (loanData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post('https://proyectohomebanking-1.onrender.com/api/loans', loanData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
                },
            });
            console.log("Respuesta de crear loan:", response);
            Swal.fire({
                icon: 'success',
                title: 'Préstamo creado exitosamente',
                text: `Tu préstamo ha sido aprobado con ${loanData.installments} cuotas.`,
            });
            return response.data;
        } catch (error) {
            // Captura los mensajes de error del backend
            const errorMessage = error.response && error.response.data ?
                error.response.data.message || error.response.data :
                'An error occurred';


            Swal.fire({
                icon: 'error',
                title: 'Error en la solicitud de préstamo',
                text: error.response?.data?.message || 'Algo salió mal, inténtalo nuevamente',
            });
            return rejectWithValue(errorMessage);
        }
    }
);

// Acción para crear una tarjeta
export const createCard = createAsyncThunk("createCard", async (cardData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://proyectohomebanking-1.onrender.com/api/cards/clients/current/cards', cardData, {
            headers: {
                Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
            },
        });
        console.log("Respuesta de crear tarjeta:", response);
        return response.data;
    } catch (error) {
        // Captura los mensajes de error del backend
        const errorMessage = error.response && error.response.data ?
            error.response.data.message || error.response.data :
            'An error occurred';

        // Muestra el mensaje de error específico del backend
        Swal.fire({
            title: 'Error Creating Card',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Ok'
        });

        return rejectWithValue(errorMessage);
    }
});



export const fetchAccounts = createAsyncThunk("fetchAccounts", async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    console.log(token);

    if (!token) {
        return rejectWithValue("No token found");
    }

    try {
        const response = await axios.get('https://proyectohomebanking-1.onrender.com/api/accounts/clients/current/accounts', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);

        return response.data; // Devuelve la lista de cuentas
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});



// Acción para crear una cuenta
export const createAccount = createAsyncThunk("createAccount", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://proyectohomebanking-1.onrender.com/api/accounts/clients/current/accounts', {}, {
            headers: {
                Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
            },
        });
        console.log("Respuesta de crear cuenta:", response.data);
        // Mostrar alerta de éxito
        Swal.fire('Created!', 'Your account has been generated successfully.', 'success');
        return response.data;
    } catch (error) {
        console.error("Error creating account:", error);

        // Mostrar alerta de error si hay algún problema
        Swal.fire({
            title: 'Error Creating Account',
            text: error.response?.data || 'An unknown error occurred.',
            icon: 'error',
            confirmButtonText: 'Ok',
        });

        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Acción para autenticar usuario
export const authenticateUser = createAsyncThunk("authenticateUser", async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post('https://proyectohomebanking-1.onrender.com/api/auth/login', user);
        console.log("Respuesta de login:", response);

        const token = response.data;
        console.log("Token recibido:", token);

        localStorage.setItem('token', token);
        console.log("Token almacenado en localStorage:", localStorage.getItem('token'));  // Verifica que el token se almacena correctamente



        Swal.close(); // Cierra la alerta de "Logging in..."
        Swal.fire({
            title: 'Login Successful!',
            text: 'You have been logged in successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
        }).then(() => {
            navigate('/'); // Redirigir al home después del login exitoso
        });



        return token;

    } catch (error) {

        Swal.fire({
            title: 'Authentication Failed',
            text: error.response ? error.response.data.message : 'An error occurred',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});


// export const loadUser = createAsyncThunk("loadUser", async (data) => {





//     await axios.get("http://localhost:8080/api/auth/current",data)
//         .then((response) => {

//             console.log(response.data);


//             let usuario = {
//                 email: data.email,
//                 name: data.firstname + " " + data.lastname,
//                 token: data.jwt,
//                 isLoggedIn: true,
//             }
//             console.log(usuario);

//         })

//         ;

//     return {
//         payload: usuario,
//     };
// });



// export const loginAction = createAction('login', (data) => {
//     console.log(data);




//     return {
//         payload: usuario
//     }


// })

// Acción para cargar los datos del usuario

export const loadUser = createAsyncThunk("loadUser", async (_, { rejectWithValue }) => {


    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found');
        return rejectWithValue('No token found');
    }

    try {

        console.log("Token enviado en loadUser:", token);

        // Realizamos la solicitud GET a la API con el token del usuario
        const response = await axios.get('https://proyectohomebanking-1.onrender.com/api/auth/current', {

            headers: {
                Authorization: `Bearer ${token}`,  // El token correcto del usuario
            },

        });

        console.log("Respuesta de loadUser:", response);


        const responseData = response.data;
        console.log("Datos del usuario:", responseData);


        // Creamos el objeto usuario a partir de la respuesta de la API
        let usuario = {
            email: responseData.email,
            name: responseData.firstName + " " + responseData.lastName,
            token: token,  // Aquí el token viene del argumento `token`
            isLoggedIn: true,
            accounts: responseData.accounts, // Incluimos las cuentas del 
            cards: responseData.cards,  // Asegúrate de incluir las tarjetas
            loans: responseData.loans,


        };
        console.log("Usuario cargado:", usuario);

        // Retornamos el objeto usuario para almacenarlo en el estado global
        return usuario;

    } catch (error) {
        console.error("Error loading user:", error);

        Swal.fire({
            title: 'Error Loading User',
            text: error.response ? error.response.data.message : 'Error loading user',
            icon: 'error',
            confirmButtonText: 'Ok'
        });

        // Si el token es inválido o expirado, eliminamos el token de localStorage
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');  // Eliminamos el token
        }
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});



// Acción para cerrar sesión
export const logoutUser = createAsyncThunk("logoutUser", async (_, { rejectWithValue }) => {
    try {

        localStorage.removeItem('token');
        return; // Retornamos vacío ya que no hay payload
    } catch (error) {
        console.error("Error logging out:", error);
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});
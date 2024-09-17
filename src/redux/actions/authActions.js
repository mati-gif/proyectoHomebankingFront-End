import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Definimos las acciones como constantes
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


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
export const loadUser = createAsyncThunk("loadUser", async (token, { rejectWithValue }) => {
    try {

        console.log("Token enviado en loadUser:", token);

        // Realizamos la solicitud GET a la API con el token del usuario
        const response = await axios.get('http://localhost:8080/api/auth/current', {
            
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
            
        };
        console.log("Usuario cargado:", usuario);

        // Retornamos el objeto usuario para almacenarlo en el estado global
        return usuario;

    } catch (error) {
        console.error("Error loading user:", error);
        // Si el token es inválido o expirado, eliminamos el token de localStorage
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');  // Eliminamos el token
        }
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});



// Acción para autenticar usuario
export const authenticateUser = createAsyncThunk("authenticateUser", async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', user);
        console.log("Respuesta de login:", response);
        
        const token = response.data;
        console.log("Token recibido:", token); 

        localStorage.setItem('token', token);
        console.log("Token almacenado en localStorage:", localStorage.getItem('token'));  // Verifica que el token se almacena correctamente
        return token;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});





// Acción para cerrar sesión
export const logoutUser = createAsyncThunk("logoutUser", async (_, { rejectWithValue }) => {
    try {
        // Opcional: Si tienes una API que maneja el cierre de sesión, puedes llamarla aquí
        // await axios.post('http://localhost:8080/api/auth/logout');

        // Limpiamos el token de localStorage
        localStorage.removeItem('token');
        return; // Retornamos vacío ya que no hay payload
    } catch (error) {
        console.error("Error logging out:", error);
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});
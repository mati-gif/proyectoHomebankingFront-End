import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Importa SweetAlert2


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
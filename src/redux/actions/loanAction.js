import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';



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

            if (response.data == "No more loans available.") {
                return []; // Retorna un array vacio
            }
            return response.data
            // return response.data; // Retorna los préstamos disponibles
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
                title: 'Loan created successfully',
                text: `Your loan has been created successfully.`,
            });
            console.log(response.data);

            return response.data;
        } catch (error) {
            // Captura los mensajes de error del backend

            console.log("entro por el catch y este es el error del back para la solicitud de prestamos", error);

            const errorBack = error.response.data
            console.log("este es el string del error del back para la solicitud de prestamos", errorBack);



            Swal.fire({
                icon: 'error',
                title: 'Error en la solicitud de préstamo',
                text: error.response.data,
            });
            return rejectWithValue(errorBack);
        }
    }
);


export const loadLoans = createAsyncThunk("loadLoans", async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    console.log(token);

    if (!token) {
        return rejectWithValue("No token found");
    }

    try {
        const response = await axios.get('https://proyectohomebanking-1.onrender.com/api/auth/current', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);

        return response.data.loans; // Devuelve la lista de cuentas
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});


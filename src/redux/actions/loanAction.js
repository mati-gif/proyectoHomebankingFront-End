// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import Swal from 'sweetalert2';




// export const fetchAccounts = createAsyncThunk(
//     'loans/fetchAccounts',
//     async (_, { rejectWithValue }) => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get('http://localhost:8080/api/clients/current/accounts', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             return response.data; // La lista de cuentas
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// export const fetchLoanInstallments = createAsyncThunk(
//     'loans/fetchLoanInstallments',
//     async (loanType, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/api/loans/${loanType}/installments`);
//             return response.data; // Lista de cuotas para el tipo de préstamo
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

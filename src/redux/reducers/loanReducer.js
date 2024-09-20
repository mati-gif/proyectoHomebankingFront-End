import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { createReducer } from '@reduxjs/toolkit';
import { createLoan } from '../actions/loanActions';

const initialState = {
    loans: [],
    status: 'idle',
    loading: false,
    error: null,
    accounts:[],
    installments: [],
};


const loanReducer = createReducer(initialState, (builder) => {
    builder
  // Añadimos el manejo para createLoan
//   .addCase(createLoan.pending, (state) => {
//     return {
//         ...state,
//         status: "pending",
//         loading: true,
//         error: null,
//     };
// })
// .addCase(createLoan.fulfilled, (state, action) => {
//     console.log("Préstamo creado:", action.payload);
//     return {
//         ...state,
//         status: "succeeded",
//         loading: false,
//         loans: [...state.loans, action.payload],  // Añade el nuevo préstamo al estado
//     };
// })
// .addCase(createLoan.rejected, (state, action) => {
//     return {
//         ...state,
//         status: "failed",
//         loading: false,
//         error: action.payload || 'Error al crear el préstamo',
//     };
// })

})

export default loanReducer
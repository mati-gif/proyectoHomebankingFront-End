import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { createReducer } from '@reduxjs/toolkit';
import { fetchAvailableLoans,createLoan, loadLoans } from '../actions/loanAction';

const initialState = {
  loans: [],
  status: 'idle',
  loading: false,
  error: null,
  loansToSelect: []
};


const loanReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAvailableLoans.pending, (state) => {
      return {
        ...state,
        status: 'pending',
        loading: true,
        error: null,
      };
    })
    .addCase(fetchAvailableLoans.fulfilled, (state, action) => {
      console.log('Préstamos disponibles:', action.payload);
      return {
        ...state,
        status: 'succeeded',
        loading: false,
        loansToSelect: action.payload, // Actualiza la lista de préstamos disponibles
      };
    })
    .addCase(fetchAvailableLoans.rejected, (state, action) => {
      return {
        ...state,
        status: 'failed',
        loading: false,
        error: action.payload || 'Error fetching available loans',
      };
    })

    .addCase(createLoan.pending, (state) => {
      return {
        ...state,
        status: "pending",
        loading: true,
        error: null,
      };
    })
    .addCase(createLoan.fulfilled, (state, action) => {
      console.log("Préstamo creado:", action.payload);
      return {
        ...state,
        status: "succeeded",
        loading: false,
        loans: [...state.loans, action.payload],  // Añade el nuevo préstamo al estado
      };
    })
    .addCase(createLoan.rejected, (state, action) => {
      return {
        ...state,
        status: "failed",
        loading: false,
        error: action.payload || 'Error al crear el préstamo',
      };
    })
    .addCase(loadLoans.pending,(state)=>{
      return{
        ...state,
        status: "pending",
        loading: true,
        error: null,
        
      }
    })
    .addCase(loadLoans.fulfilled,(state,action)=>{
      return {
          ...state,
          status: "succeeded",
          loading: false,
          loans: action.payload,  // Añade la nueva cuenta a la lista
      };
  })


})

export default loanReducer
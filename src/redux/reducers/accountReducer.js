import { createReducer } from '@reduxjs/toolkit';
import { createAccount, fetchAccounts } from '../actions/accountActions';


const initialState ={

    accounts:[],
    status:"idle",
    error:null,
    loading:false,

}


const accountReducer = createReducer(initialState, (builder) => {
    builder

    .addCase(createAccount.pending, (state) => {
        return {
            ...state,
            status: "pending",
            loading: true,
            error: null,
        };
    })
    .addCase(createAccount.fulfilled, (state, action) => {
        console.log("Cuenta creada:", action.payload);
        return {
            ...state,
            status: "succeeded",
            loading: false,
            accounts:   [...state.accounts, action.payload],  // Añade la nueva cuenta a la lista
        };
    })
    .addCase(createAccount.rejected, (state, action) => {
        return {
            ...state,
            status: "failed",
            loading: false,
            error: action.payload || 'Error creating account',
        };
    })

    .addCase(fetchAccounts.pending,(state)=>{
        return{
            ...state,
            status:"pending",
            loading:true,
            error:null
        }
    })
    .addCase(fetchAccounts.fulfilled,(state,action)=>{
        return {
            ...state,
            status: "succeeded",
            loading: false,
            accounts: action.payload,  // Añade la nueva cuenta a la lista
        };
    })
    

})
export default  accountReducer
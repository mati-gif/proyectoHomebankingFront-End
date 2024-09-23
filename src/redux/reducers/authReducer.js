import { createReducer } from '@reduxjs/toolkit';
import { registerUser, createTransaction, fetchAvailableLoans, createLoan, loadUser, logoutUser, authenticateUser, createAccount, createCard, fetchAccounts } from '../actions/authActions';

const initialState = {

    isLoggedIn: !!localStorage.getItem('token'), // Si hay un token en localStorage, el usuario está logueado
    token: localStorage.getItem('token') || null, // Si hay un token en localStorage, lo cargamos al estado inicial
    email: null,
    name: null,
    accounts: [],
    status: 'idle', // Estado inicial de la solicitud
    loading: false,
    error: null,
    cards: [],
    loans: [], // Lista de préstamos
    loansToSelect: []
};

const authReducer = createReducer(initialState, (builder) => {
    builder

        // Registro de usuario pendiente
        .addCase(registerUser.pending, (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        })
        // Registro exitoso
        .addCase(registerUser.fulfilled, (state, action) => {

            return {
                ...state,
                isLoggedIn: false, // Aún no está logueado después del registro
                loading: false,
                error: null,
            };
        })
        // Registro fallido
        .addCase(registerUser.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload || 'Error during registration',
            };
        })


        .addCase(createTransaction.pending, (state) => {
            return {
                ...state,
                status: "pending",
                loading: true,
                error: null,
            };
        })
        .addCase(createTransaction.fulfilled, (state, action) => {
            console.log("Transacción creada:", action.payload);
            return {
                ...state,
                status: "succeeded",
                loading: false,
                // Aquí podrías actualizar la lista de transacciones si es necesario
            };
        })
        .addCase(createTransaction.rejected, (state, action) => {
            return {
                ...state,
                status: "failed",
                loading: false,
                error: action.payload || 'Error creando la transacción',
            };
        })
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


        .addCase(createCard.pending, (state) => {
            return {
                ...state,
                status: "pending",
                loading: true,
                error: null,
            };
        })
        .addCase(createCard.fulfilled, (state, action) => {
            console.log("Tarjeta creada:", action.payload);
            return {
                ...state,
                status: "succeeded",
                loading: false,
                cards: [...state.cards, action.payload],  // Añade la nueva tarjeta al estado
            };
        })
        .addCase(createCard.rejected, (state, action) => {
            return {
                ...state,
                status: "failed",
                loading: false,
                error: action.payload || 'Error creating card',
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
                accounts: [...state.accounts, action.payload],  // Añade la nueva cuenta a la lista
            };
        })

        // Añadir en el reducer
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

        .addCase(authenticateUser.pending, (state) => {
            return {
                ...state,
                status: "pending",
                loading: true,
                error: null,
            };
        })
        .addCase(authenticateUser.fulfilled, (state, action) => {
            console.log("Autenticación exitosa, token:", action.payload);
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload,
                status: "succeeded",
                loading: false,
            };
        })
        .addCase(authenticateUser.rejected, (state, action) => {
            return {
                ...state,
                status: "failed",
                loading: false,
                error: action.error?.message || 'Error during authentication'
            };
        })
        // Estado de solicitud pendiente (pending)
        .addCase(loadUser.pending, (state) => {
            console.log("Cargando usuario..."); // Log al iniciar la carga
            return {
                ...state, // Mantenemos el estado anterior
                status: "pending", // Actualizamos el estado de la solicitud
                loading: true,
                error: null, // Reseteamos el error
            };
        })
        // Estado cuando la solicitud es exitosa (fulfilled)
        .addCase(loadUser.fulfilled, (state, action) => {
            console.log("Usuario cargado:", action.payload);
            const newState = {
                ...state, // Mantenemos el estado anterior
                isLoggedIn: true,
                token: action.payload.token,  // Asignamos el nuevo token
                email: action.payload.email,  // Asignamos el email del usuario
                name: action.payload.name,    // Asignamos el nombre del usuario
                accounts: action.payload.accounts,  // Añadimos las cuentas al estado
                cards: action.payload.cards,
                loans: action.payload.loans,
                status: "succeeded",          // La solicitud fue exitosa
                loading: false,
                // Ya no está cargando
            };

            console.log("Estado actualizado (fulfilled):", newState)

            return newState
        })
        // Estado cuando la solicitud falla (rejected)
        .addCase(loadUser.rejected, (state, action) => {
            return {
                ...state, // Mantenemos el estado anterior
                status: "failed", // Indicamos que la solicitud falló
                loading: false, // Dejamos de estar en estado de carga
                error: action.payload || 'Error loading user', // Capturamos el error
            };
        })

        // Estado de solicitud de cierre de sesión pendiente (pending)
        .addCase(logoutUser.pending, (state) => {
            return {
                ...state,
                status: "pending",
                loading: true,
                error: null,
            };
        })

        // Estado cuando el cierre de sesión es exitoso (fulfilled)
        .addCase(logoutUser.fulfilled, (state) => {
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                email: null,
                name: null,
                accounts: [],
                status: "succeeded",
                loading: false,
            };
        })
        // Estado cuando el cierre de sesión falla (rejected)
        .addCase(logoutUser.rejected, (state, action) => {
            return {
                ...state,
                status: "failed",
                loading: false,
                error: action.payload || 'Error logging out',
            };
        });
})



export default authReducer;

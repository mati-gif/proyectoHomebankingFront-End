import { createReducer } from '@reduxjs/toolkit';
import { LOGIN, LOGOUT, loadUser, logoutUser, authenticateUser, createAccount ,createCard} from '../actions/authActions';

const initialState = {
    isLoggedIn: !!localStorage.getItem('token'), // Si hay un token en localStorage, el usuario está logueado
    token: localStorage.getItem('token') || null, // Si hay un token en localStorage, lo cargamos al estado inicial
    email: null,
    name: null,
    accounts: [],
    status: 'idle', // Estado inicial de la solicitud
    loading: false,
    error: null,
    cards: []
};

const authReducer = createReducer(initialState, (builder) => {
    builder

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
            return {
                ...state, // Mantenemos el estado anterior
                isLoggedIn: true,
                token: action.payload.token,  // Asignamos el nuevo token
                email: action.payload.email,  // Asignamos el email del usuario
                name: action.payload.name,    // Asignamos el nombre del usuario
                accounts: action.payload.accounts,  // Añadimos las cuentas al estado
                cards: action.payload.cards,
                status: "succeeded",          // La solicitud fue exitosa
                loading: false,               // Ya no está cargando
            };
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

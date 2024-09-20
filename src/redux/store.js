import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../redux/reducers/authReducer';
// import loanReducer from './reducers/loanReducer';
const store = configureStore({
  reducer: {
    auth: authReducer,
    // loan:loanReducer
  },
});


export default store;
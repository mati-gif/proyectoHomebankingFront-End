import { configureStore } from '@reduxjs/toolkit';


import authReducer from '../redux/reducers/authReducer';

  import accountReducer from './reducers/accountReducer';
import loanReducer from './reducers/loanReducer';


// import loanReducer from './reducers/loanReducer';
const store = configureStore({
  reducer: {
    auth: authReducer,
    // loan:loanReducer
    accountReducer:accountReducer,
    loanReducer:loanReducer
  },
});


export default store;
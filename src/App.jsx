/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */

import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import RegisterComponent from './components/RegisterComponent/RegisterComponent'
import Login from './LoginComponent/Login'

import MainAccount from './pages/MainAccount'
import MainDetailAccount from './components/AccountMainComponents/MainDetailAccount'

import MainCards from './pages/MainCards'
import ApplyCard from './components/CardsMainComponents/ApplyCard'

import MainTransaction from './pages/MainTransaction'

import MainLoan from './pages/MainLoan'
import LoanLoan from './components/LoanMainComponent/LoanLoan'


import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './Layout/MainLayout'
import { loadUser } from './redux/actions/authActions';
import { useDispatch } from 'react-redux';
import React, { useEffect } from "react"




function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Verifica si hay un token almacenado
    console.log(token);
    
    if (token) {
      dispatch(loadUser()); // Solo intenta cargar el usuario si hay un token
    }
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Cada Route define una ruta URL específica y el componente React que se renderizará cuando la URL coincida. */}
          <Route path='/' element={<MainLayout />}>   
            <Route index element={<MainAccount />} />{/*Aquí, si la URL es '/', MainLayout renderiza el componente MainAccount dentro de su Outlet.*/}
            <Route path='/accounts/:id' element={<MainDetailAccount />} />
            <Route path="/cards" element={<MainCards />} /> {/*Estoy definiendo una ruta especifica que es "/cards" y tambien estoy defindiendo el componente de react que se va a renderizar cuando la URL coincida con esa ruta */}
            <Route path="/loans" element={<MainLoan />} />
            <Route path="/transactions" element={<MainTransaction />} />
            <Route path="/loanLoan" element={<LoanLoan />} />
            <Route path='/applyCard' element={<ApplyCard />} />{/* Aca agrego la ruta específica que va a recibir la url para renderizar una determinada vista y agrego el componente que se va a renderizar.En este caso si pongo en la url: /applyCard --> Outlet va a renderizar "ApplyCard"*/}
            <Route path='/cancelCard' element={<MainCards />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<RegisterComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

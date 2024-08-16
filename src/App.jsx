/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */

/* import './App.css' */
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


import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Layout from './Layout/MainLayout';
import Accounts from './pages/MainAccount';
import Cards from './pages/MainCards';
import Loans from './pages/MainLoan';
import Transactions from './pages/MainTransaction';
import MainLayout from './Layout/MainLayout'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      
{/*       <Header/> */}
{/*       <MainAccount/>  */}
{/*       <MainDetailAccount/>   */}

{/*     <MainCards/> */}
{/*       <ApplyCard/>  */}

{/*     <MainTransaction/>  */}

{/*     <MainLoan/>  */}
{/*         <LoanLoan/>  */}

{/*     <RegisterComponent/>  */}

{/*     <Login/> */}
{/*       <Footer /> */}


<BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout/>}>
          <Route index element={<MainAccount/>} />
          <Route path="/cards" element={<MainCards/>} />
          <Route path="/loans" element={<MainLoan/>} />
          <Route path="/transactions" element={<MainTransaction/>} />
          </Route>
        </Routes>
    </BrowserRouter>

    </>
  )
}

export default App

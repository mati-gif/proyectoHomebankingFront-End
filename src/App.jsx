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

      {/*      */}
      {/*       <Footer /> */}


      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<MainAccount />} />
            <Route path='/accounts/:id' element={<MainDetailAccount />} />
            <Route path="/cards" element={<MainCards />} />
            <Route path="/loans" element={<MainLoan />} />
            <Route path="/transactions" element={<MainTransaction />} />
            <Route path="/loanLoan" element={ <LoanLoan/>  }/>
            <Route path='/applyCard' element={ <ApplyCard/> }/>
            <Route path='/cancelCard' element={<MainCards/>}/>
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path='/register' element={ <RegisterComponent/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

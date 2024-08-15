/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */

/* import './App.css' */
import Header from './pages/Header'
import Footer from './pages/Footer'
import RegisterComponent from './components/RegisterComponent/RegisterComponent'
import Login from './LoginComponent/Login'

 ///import MainAccount from './components/AccountMainComponents/MainAccount'
// import MainDetailAccount from './components/AccountMainComponents/MainDetailAccount'

//import MainCards from './components/CardsMainComponents/MainCards'
/* import ApplyCard from './components/CardsMainComponents/ApplyCard' */

/* import MainTransaction from './components/TransactionMainComponent/MainTransaction' */

//import MainLoan from './components/LoanMainComponent/MainLoan'
//import LoanLoan from './components/LoanMainComponent/LoanLoan'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      
      <Header/>
      {/* <MainAccount/> */}
     {/* <MainDetailAccount/>  */}

    {/*  <MainCards/> */}
    {/* <ApplyCard/> */}

    {/* <MainTransaction/> */}

    {/* <MainLoan/> */}
    {/* <LoanLoan/> */}

    {/* <RegisterComponent/> */}

    <Login/>
      <Footer />

    </>
  )
}

export default App

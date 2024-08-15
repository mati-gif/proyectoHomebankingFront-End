/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */

/* import './App.css' */
import Header from './pages/Header'
import Footer from './pages/Footer'
 ///import MainAccount from './components/AccountMainComponents/MainAccount'
// import MainDetailAccount from './components/AccountMainComponents/MainDetailAccount'

//import MainCards from './components/CardsMainComponents/MainCards'
import ApplyCard from './components/CardsMainComponents/ApplyCard'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      
      <Header/>
      {/* <MainAccount/> */}
     {/* <MainDetailAccount/>  */}

    {/*  <MainCards/> */}
    <ApplyCard/>

      <Footer />

    </>
  )
}

export default App

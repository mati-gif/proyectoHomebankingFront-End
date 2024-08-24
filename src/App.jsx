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


{/* El componente App define la estructura de navegación de tu aplicación. Usa BrowserRouter para manejar la historia de navegación, 
// y Routes junto con Route para definir qué componente se muestra en cada URL. Las rutas anidadas y los parámetros dinámicos permiten 
// crear una navegación compleja y flexible. */}
function App() {
  // const [count, setCount] = useState(0)


  return (
    <>
      {/* Componente de react Router, Es el contenedor principal para las rutas. Permite la navegación entre diferentes vistas sin recargar la página. */}
      <BrowserRouter>
        {/* Contiene todas las rutas que la aplicación manejará. Cada ruta está definida por un componente Route. */}
        <Routes>{/* es un componente de react-router-dom que contiene todas las rutas */}

          {/* Cada Route define una ruta URL específica y el componente React que se renderizará cuando la URL coincida. /}
      {/ Indico que la ruta base va a ser MainLayout que es un contenedor para otras vistas 
          Dentro de MainLayput las rutas estan anidadas y ependiendo de la ruta específica el Outlet definido en MainLayOut renderizará el 
          componente correspondiente*/}
          <Route path='/' element={<MainLayout />}>

            {/* Con "index" indico que Home va a ser mi elemento principal. Es decir si no defino una ruta especifica en la url. MainLayout va a renderizar 
           el componente Home*/}
            <Route index element={<MainAccount />} /> {/*Estoy definidendo las rutas y que componente le pertenece a  cada ruta.Estoy diciendo que la ruta index (que es la ruta principal). El componente que pertenece a esa ruta es MainAccount  */}

            {/* Aqui abajo agrego la ruta específica que va a recibir la url para renderizar una determinada vista y agrego el componente que se va a renderizar. 
         En este caso si pongo en la url: /applyCard --> Outlet va a renderizar "ApplyCard"*/}
            <Route path='/accounts/:id' element={<MainDetailAccount />} />
            <Route path="/cards" element={<MainCards />} />
            <Route path="/loans" element={<MainLoan />} />
            <Route path="/transactions" element={<MainTransaction />} />
            <Route path="/loanLoan" element={<LoanLoan />} />
            <Route path='/applyCard' element={<ApplyCard />} />
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

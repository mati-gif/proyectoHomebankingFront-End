import React from 'react'
import Img from './Img'

import { Link, useLocation } from 'react-router-dom';

function Nav() {

    const location = useLocation(); // Obtén la ruta actual

    // Función que determina si un enlace está activo
  const isActive = (path) => location.pathname === path;

    return (
        <nav className="flex justify-evenly items-center border-4 border-black w-full">
            {/* <button className="bg-gray-600 text-white px-4 py-2 rounded  hover:bg-gray-400" >Accounts</button>
        <button className="bg-[#a3a3a3] text-white px-4 py-2 rounded">Cards</button> */}
            <Link to="/" className={`${
          isActive('/') ? 'bg-gray-600' : 'bg-[#a3a3a3]'
        } text-white  px-4 py-2 rounded  hover:bg-gray-400`} >
                Accounts
            </Link>
            <Link to="/cards"  className={`${
          isActive('/cards') ? 'bg-gray-600' : 'bg-[#a3a3a3]'
        } text-white  px-4 py-2 rounded  hover:bg-gray-400`} >
                Cards
            </Link>

            <div className="flex justify-center items-center  bg-white border border-solid border-black rounded-full">
                <Img />
            </div>

            < Link to="/loans"  className={`${
          isActive('/loans') ? 'bg-gray-600' : 'bg-[#a3a3a3]'
        } text-white  px-4 py-2 rounded  hover:bg-gray-400`} >
                Loans
            </Link >
            <Link to="/transactions"  className={`${
          isActive('/transactions') ? 'bg-gray-600' : 'bg-[#a3a3a3]'
        } text-white  px-4 py-2 rounded  hover:bg-gray-400`} >
                Transactions
            </Link>
            {/* <button className="bg-[#a3a3a3] text-white px-4 py-2 rounded">Loans</button>
        <button className="bg-[#a3a3a3] text-white px-4 py-2 rounded">Transactions</button> */}
        </nav>

    )
}

export default Nav
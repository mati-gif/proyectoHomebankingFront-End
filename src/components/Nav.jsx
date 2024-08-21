import React from 'react'
import Img from './Img'

import { Link, useLocation } from 'react-router-dom';

function Nav() {

    const location = useLocation(); // Obtén la ruta actual

    // Función que determina si un enlace está activo
  const isActive = (path) => location.pathname === path;
  // bg-gray-400 , border-4 border-black
    return (
        <nav className="  flex flex-col  justify-evenly items-center  w-10/12  md:flex-row" >
            {/* <button className="bg-gray-600 text-white px-4 py-2 rounded  hover:bg-gray-400" >Accounts</button>
        <button className="bg-[#a3a3a3] text-white px-4 py-2 rounded">Cards</button> */}
            <Link to="/" className={`${
          isActive('/') ? 'bg-[#B2B5E0] text-[#213F99]  border-b-4 border-[#111439] text-[20px]' : 'bg-[#B2B5E0] text-[#213F99] text-[20px]'
        }   px-4 py-2    rounded  hover:text-[#f0f0f0]`}  >
                Accounts 
            </Link>
            <Link to="/cards"  className={`${
          isActive('/cards') ? 'bg-[#B2B5E0] text-[#213F99] border-b-4 border-[#111439] text-[#213F99] text-[20px]' : 'bg-[#B2B5E0] text-[#213F99] text-[20px]'
        }   px-4 py-2  rounded  hover:text-[#f0f0f0]`} >
                Cards
            </Link>

            <div className="flex justify-center items-center  bg-white border border-solid border-black rounded-full">
                <Img />
            </div>

            < Link to="/loans"  className={`${
          isActive('/loans') ? 'bg-[#B2B5E0] text-[#213F99] border-b-4 border-[#111439] text-[#213F99] text-[20px]' : 'bg-[#B2B5E0] text-[#213F99] text-[20px]'
        }   px-4 py-2 rounded  hover:text-[#f0f0f0]`} >
                Loans
            </Link >
            <Link to="/transactions"  className={`${
          isActive('/transactions') ? 'bg-[#B2B5E0] text-[#213F99] border-b-4 border-[#111439] text-[#213F99] text-[20px]' : 'bg-[#B2B5E0] text-[#213F99] text-[20px]'
        }   px-4 py-2 rounded  hover:text-[#f0f0f0]`} >
                Transactions
            </Link>
            {/* <button className="bg-[#a3a3a3] text-white px-4 py-2 rounded">Loans</button>
        <button className="bg-[#a3a3a3] text-white px-4 py-2 rounded">Transactions</button> */}
        </nav>

    )
}

export default Nav
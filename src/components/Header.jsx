import React from 'react'
import Img from './Img'
import Nav from './Nav';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/actions/authActions';
import Swal from 'sweetalert2';


function Header(props) {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {



    try {


      await dispatch(logoutUser());

      Swal.fire({
        title: 'Logged Out',
        text: 'You have been logged out successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/login'); // Redirige al usuario al login después de cerrar sesión
      });
    } catch (error) {
      Swal.fire({
        title: 'Logout Failed',
        text: 'There was a problem logging out. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  return (
    <header className="   bg-[#B2B5E0] p-2  flex flex-col justify-around items-center w-full md:flex-row ">
      <div className=' flex flex-col justify-center w-32 h-20 text-center '>
        <p className=' text-[28px] text-[#0575A5] font-bold'>NetBank</p>
      </div>
      {/*  <Nav/>  */}
      {props.children}
      <button onClick={handleLogout} to="/login" className='px-3 text-[#213F99]  hover:text-[#213F99]' > Logout
        <img className='w-14 h-12' src="https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png" alt="" />
      </button>
    </header>


  )
}

export default Header






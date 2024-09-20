import Swal from 'sweetalert2'; // Importa SweetAlert2
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { loadUser } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';


function LoanSelectAccountOrigen() {


  // Estado para almacenar las cuentas


  const { isLoggedIn, token, accounts } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (isLoggedIn && token) {
  //     // Solo si no hay cuentas cargadas, llamamos a loadUser
  //     if (accounts.length === 0) {
  //       dispatch(loadUser(token))
  //         .unwrap()
  //         .then((user) => {
  //           console.log('Cuentas cargadas:', user.accounts);
  //         })
  //         .catch((error) => {
  //           console.error('Error al cargar usuario:', error);
  //           navigate('/login');
  //         });
  //     }
  //   } else {
  //     // Redirigir al usuario si no está autenticado
  //     navigate('/login');
  //   }
  // }, [isLoggedIn, dispatch, navigate, token, accounts]);

console.log(arrayAccounts);



  useEffect(() => {
    if (isLoggedIn && token) {
        dispatch(loadUser(token))
            .unwrap().then((user) => {
                setArrayAccounts(user.accounts)
                console.log(arrayAccounts);
                
            }).catch((error) => {
                console.error('Error loading user:', error);
                navigate('/login');
            });

    } else {

        // Redirigir al usuario si no está autenticado
        navigate('/login'); // Cambia '/login' por la ruta de tu página de login
    }
}, [isLoggedIn, dispatch, navigate, token]);


//   const traerCuentas = () => {
//     axios.get("http://localhost:8080/api/clients/1")
//       .then((response) => {
//         setAccounts(response.data.accounts)
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   useEffect(() => {
// console.log("se ejecuto el useEffect");

//     traerCuentas();
//   }, []);



  return (
    <div className="mb-4 ">
      <label htmlFor="account" className=" block text-gray-700 text-lg font-bold mb-4">
        Source Account:
      </label>
      <select id="account" name="account" required className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none">
        <option value="">Select an Option</option>
        {arrayAccounts.map((item) => (
          <option key={item.id} value={item.number}>
            {item.number}
          </option>
        ))}




      </select>
    </div>
  )
}

export default LoanSelectAccountOrigen
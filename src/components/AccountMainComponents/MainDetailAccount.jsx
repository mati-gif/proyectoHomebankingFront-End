import TableMainDetailsAccount from './TableMainDetailsAccount'
import { Link } from 'react-router-dom'

import CardAccount from './CardAccount'
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";
import AccountTableDetailTransaction from './AccountTableDetailTransaction';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { useNavigate } from "react-router-dom";
import { loadUser,createAccount } from '../../redux/actions/authActions';


function MainDetailAccount() {

  const { id } = useParams();// hook que me va a retornar un objeto , me va a traer params de la ruta.
  //extrae el parámetro id de la URL.
  console.log(id);

  const [detailsAccount, setDetailAccount] = useState(null)

  const navigate = useNavigate(); // Declara useNavigate
  const dispatch =  useDispatch();
  const { isLoggedIn, token, accounts } = useSelector((state) => state.auth);

  // const solicitarDatosCuentaDetalle = async () => {

  //   try {
  //     const response = await axios.get(`http://localhost:8080/api/accounts/${id}`);
  //     console.log(response);

  //     setDetailAccount(response.data)
  //     console.log(response.data.transactions);
  //   } catch (error) {
  //     console.error('Error al obtener las cuentas:', error);
  //   }
  // };

  // useEffect(() => {
  //   console.log('Se cargó el useEffect desde cards');
  //   solicitarDatosCuentaDetalle();
  // }, []);

  console.log(accounts);
  
  useEffect(() => {
    if (isLoggedIn && token) {
      // Si las cuentas ya están cargadas en el estado global
      if (accounts.length > 0) {
        const account = accounts.find(acc => acc.id === parseInt(id, 10));  // Convertir id a número
        console.log(account);
        
        if (account) {
          setDetailAccount(account);  // Si la cuenta existe, establece su detalle en el estado
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Cuenta no encontrada',
            text: 'La cuenta seleccionada no existe.',
          });
          navigate('/');  // Si no se encuentra la cuenta, redirige
        }
      } else {
        // Si las cuentas aún no están en el estado global, carga el usuario para obtenerlas
        dispatch(loadUser(token))
          .unwrap()
          .then((user) => {
            const account = user.accounts.find(acc => acc.id === parseInt(id, 10)); // Convertir id a número
            console.log(account);
            
            if (account) {
              setDetailAccount(account);  // Si se encuentra la cuenta, guárdala en el estado
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Cuenta no encontrada',
                text: 'La cuenta seleccionada no existe.',
              });
              navigate('/');  // Si no se encuentra la cuenta, redirige
            }
          })
          .catch((error) => {
            console.error('Error al cargar el usuario:', error);
            navigate('/login');  // Redirige si hay un error o no está autenticado
          });
      }
    } else {
      navigate('/login');  // Redirige si no está autenticado
    }
  }, [isLoggedIn, dispatch, navigate, token, id, accounts]);
  


console.log(accounts);

return (
  <div className="bg-gray-100 p-8 min-h-screen flex flex-col">
    <h1 className="text-3xl font-bold text-center mb-8">Your selected account!</h1>
    <div className="flex justify-center mb-20">
      <img src="https://us.123rf.com/450wm/boy8888/boy88882305/boy8888230500015/205500967-businessman-using-mobile-online-banking-and-payments-digital-marketing-financial-and-banking.jpg?ver=6" alt="" className="rounded-lg shadow-md w-full h-96 object-cover md:w-2/3" />
    </div>
    
    {detailsAccount ? (
      <>
        <div className='mb-3 flex justify-center'>
          <CardAccount number={detailsAccount.number} creationDate={detailsAccount.creationDate} balance={detailsAccount.balance}  />
        </div>
        <div className='flex justify-around'>
          <TableMainDetailsAccount transactions={detailsAccount.transactions} />
        </div>
      </>
    ) : (
      <p>Loading account details...</p>
    )}
  </div>
);

}

export default MainDetailAccount
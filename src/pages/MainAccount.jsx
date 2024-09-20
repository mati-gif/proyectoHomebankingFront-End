import React, { useEffect, useState } from "react"

import CardAccount from '../components/AccountMainComponents/CardAccount'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'; // Importa SweetAlert2
import Button from "../components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { loadUser,createAccount } from '../redux/actions/authActions';

function MainAccount() {



  // // useState es un hook que me permite añadir un estado a un componente. Este estado va a controlar que el componente se renderice cada vez que se actualice account 
  // // Aca tengo un estado, y defino que ese estado inicialmente va a tener como valor un objeto vacio. El nombre de ese estado va a ser "arrayAccount", y va a tener un metodo 
  // // que me permite actualizar ese estado. Cada vez que se llama a ese estado React vuelve a renderizar el componente con el estado actualizado.
  const [arrayAccount, setArrayAccount] = useState([]);
  const [clientName, setClientName] = useState("");  // Nuevo estado para almacenar el nombre del cliente
  const navigate = useNavigate(); // Declara useNavigate
  const dispatch =  useDispatch();
  const { isLoggedIn, token,name, accounts } = useSelector((state) => state.auth);

  console.log(token);
  console.log(isLoggedIn);
  console.log(name);
  console.log(accounts);
  
  
  

  // const solicitarDatosCuenta = async () => {

  
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/auth/current', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setArrayAccount(response.data.accounts);
  //     setClientName(response.data.firstName); // Asigna el nombre del cliente al estado clientName
  //   } catch (error) {
  //     console.log("Error fetching account data:", error);
  //   }


  // }

  // useEffect es un hook que me permite ejecutar efectos secundarios. se ejecuta cuando el componente se monta (por primera vez) y cada vez que el array de dependencia cambia, el id 
  // En este caso va a renderizar ejecutar la funcion "requesAccountById()" el cual hace la solicitud http y me va a mostrar por consola la id que obtine de la ruta
  // useEffect tambien tiene un array de dependencia, el cual me indica que cada vez que el array se actualice, se va a renderizar de nuevo lo que hay dentro de use effect
  // En este caso depende de la id, que si cambia se ejecuta de nuevo
  useEffect(() => {
    if (isLoggedIn && token) {
      // solicitarDatosCuenta();
      console.log(accounts);
      // setArrayAccount(accounts);      
      dispatch(loadUser(token))
      .unwrap() .then((user) => {
        setArrayAccount(user.accounts);
      }) .catch((error) => {
        console.error('Error loading user:', error);
        navigate('/login');
      });

    } else {

      // Redirigir al usuario si no está autenticado
      navigate('/login'); // Cambia '/login' por la ruta de tu página de login

    }
  }, [isLoggedIn, dispatch, navigate,token]);//si tuviera una dependencia por ejemplo arrayAccount se va a ejecutar cuando se modifica arrayAccount por
  //primera vez el componente y se renderiza y cada vez que algunas de las dependencias cambian.




  const añadirAccountArray = () => {
    // Muestra la alerta de verificación usando SweetAlert2
    Swal.fire({
      title: 'Are you sure you want to create a new account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16A34A',
      cancelButtonColor: '#9CA3AF',
      confirmButtonText: 'Yes, generate',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {

        dispatch(createAccount()).unwrap()
        .then(() => {
          Swal.fire('Created!', 'Your account has been generated.', 'success');
          // Refresh the accounts after creating a new one
          dispatch(loadUser()).unwrap()
            .then((user) => {
              setArrayAccount(user.accounts);
            });
        })
        .catch((error) => {
          Swal.fire('Failed!', 'Could not create the account.', 'error');
        });
      }

    });
  };

  return (
    <div className="bg-[#E5EDF1] p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome, {name}!</h1>
      <div className="  flex justify-center mb-6">
        <img src="https://images.ctfassets.net/h7wmg0jhythh/59bBPtUVTa1ScIxYr6HZgZ/eb3e9026c052542f0df5cbf976f1d8da/2_AYUDA_708x275.webp" alt="" className="rounded-lg shadow-md w-full  md:w-2/3" />
      </div>
      <div className="flex justify-center  mb-6">
        <Button onClick={añadirAccountArray} className="bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded-full shadow-md"> Request Account </Button>
      </div>
      <div className=" flex justify-center flex-wrap  gap-10" >
        {arrayAccount.map((item) => (//Itera sobre arrayAccount y renderiza un componente CardAccount para cada cuenta.
          <Link to={`/accounts/${item.id}`} >
            <CardAccount key={item.id} number={item.number} balance={item.balance} creationDate={item.creationDate} />
            {/* Pasa los datos de la cuenta (number, balance, creationDate) al componente CardAccount para que se muestren. */}
          </Link>
        ))}
      </div>

      {/* <div className="flex justify-center flex-wrap gap-10">
        {accounts && accounts.length > 0 ? (
          accounts.map((account) => (
            <Link key={account.id} to={`/accounts/${account.id}`}>
              <CardAccount number={account.number} balance={account.balance} creationDate={account.creationDate} />
            </Link>
          ))
        ) : (
          <p>No accounts found.</p>
        )}
      </div> */}
    </div>


  )
}

export default MainAccount
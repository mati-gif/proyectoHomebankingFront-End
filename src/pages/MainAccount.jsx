import React, { useEffect, useState } from "react";

import CardAccount from "../components/AccountMainComponents/CardAccount";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, createAccount, fetchAccounts } from "../redux/actions/authActions";

function MainAccount() {
  // // useState es un hook que me permite añadir un estado a un componente. Este estado va a controlar que el componente se renderice cada vez que se actualice account
  // // Aca tengo un estado, y defino que ese estado inicialmente va a tener como valor un objeto vacio. El nombre de ese estado va a ser "arrayAccount", y va a tener un metodo
  // // que me permite actualizar ese estado. Cada vez que se llama a ese estado React vuelve a renderizar el componente con el estado actualizado.


  const navigate = useNavigate(); // Declara useNavigate
  const dispatch = useDispatch();

  // Acceder a los datos del usuario desde el estado global de Redux
  const { isLoggedIn, name, token } = useSelector(
    (state) => state.auth
  );

  const { accounts } = useSelector(
    (state) => state.accountReducer
  );

  // console.log(token);
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
    if (isLoggedIn && token || name == null) {
      // solicitarDatosCuenta();
      console.log(accounts);
      // setArrayAccount(accounts);
      dispatch(loadUser())
        .unwrap().then((user) => {
          dispatch(fetchAccounts())
        }).catch((error) => {
          console.error('Error loading user:', error);
          navigate('/login');
        });

    } else {

      // Redirigir al usuario si no está autenticado
      navigate('/login'); 

    }
  }, [isLoggedIn, dispatch, navigate, token]);//si tuviera una dependencia por ejemplo arrayAccount se va a ejecutar cuando se modifica arrayAccount por
  //primera vez el componente y se renderiza y cada vez que algunas de las dependencias cambian.

  // Función para crear una nueva cuenta(el sweet alert esta en createAccount)

  // if (!isLoggedIn) {

  // }


  // useEffect(() => {
  //   if (isLoggedIn) {
  //     console.log("Usuario logueado, cargando cuentas...");
  //     dispatch(fetchAccounts())
  //       .unwrap()
  //       .then(() => {
  //         console.log("Cuentas cargadas correctamente:", accounts);
  //       })
  //       .catch((error) => {
  //         console.error("Error al cargar cuentas:", error);
  //       });
  //   } else {
  //     navigate("/login");
  //   }
  // }, [isLoggedIn, dispatch, navigate]);







  // Si no está logueado, redirigimos al login
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate, dispatch]);


  // Monitorea el cambio de `accounts`
  // useEffect(() => {
  //   console.log("Cuentas actualizadas:", accounts); // Asegúrate de que este `console.log` muestre los cambios cuando se crea una nueva cuenta
  //   // dispatch(fetchAccounts())
  //   console.log("se cargo la nueva cuenta sin refres");

  // }, [accounts]);

  // Si no está logueado, redirigimos al login
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     console.log("Usuario logueado, cargando cuentas...");
  //     dispatch(fetchAccounts())
  //       .unwrap()
  //       .then(() => {
  //         console.log("Cuentas cargadas correctamente.");
  //       })
  //       .catch((error) => {
  //         console.error("Error al cargar cuentas:", error);
  //       });
  //   } else {
  //     navigate("/login");
  //   }
  // }, [isLoggedIn, dispatch, navigate]);




  //funciona correctamente,es la funcion original.Sigue mostrando el mensaje de cofirmacino antes de crear una cuarta cuenta y despues muestra el error.
  // const añadirAccountArray = () => {
  //   // Mostrar la alerta de confirmación antes de crear una cuenta
  //   Swal.fire({
  //     title: "Are you sure you want to create a new account?",
  //     text: "You can only have up to 3 accounts.",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#16A34A",
  //     cancelButtonColor: "#9CA3AF",
  //     confirmButtonText: "Yes, create it!",
  //     cancelButtonText: "Cancel",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Si el usuario confirma, intenta crear la cuenta
  //       dispatch(createAccount())
  //         .unwrap()
  //         .then((newAccount) => {
  //           // Refrescar la lista de cuentas después de crear una nueva
  //           console.log("La cuenta se creó con éxito");
  //           dispatch(fetchAccounts())
  //           console.log("se actualizo con la ueva cuenta ");
  //         })
  //         .catch((error) => {
  //           console.error("Error creating account:", error);
  //         });

  //     }
  //   });
  // };



//Funciona pero no se si esta correcto ya que despacha dos veces la accion de createAccount,pero no muestra el mensaje de confirmacion antes crear una cuarta cachea correctamente el error del back
  // const añadirAccountArray = () => {
  //   // Validar si el usuario ya tiene 3 cuentas
  //   if (accounts && accounts.length >= 3) {
  //     // Intentar crear la cuenta, pero sin mostrar la confirmación
  //     dispatch(createAccount())
  //       .unwrap()
  //       .then((newAccount) => {
  //         console.log("La cuenta se creó con éxito");
  //         dispatch(fetchAccounts());
  //       })
  //       .catch((error) => {
  //         // Manejar el error del backend
  //         console.error("Error al crear la cuenta:", error);
  //         Swal.fire({
  //           title: "Error",
  //           text: error || "You cannot create more than 3 accounts.",
  //           icon: "error",
  //           confirmButtonColor: "#d33",
  //         });
  //       });
  //   } else {
  //     // Mostrar la alerta de confirmación si no ha alcanzado el límite
  //     Swal.fire({
  //       title: "Are you sure you want to create a new account?",
  //       text: "You can only have up to 3 accounts.",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#16A34A",
  //       cancelButtonColor: "#9CA3AF",
  //       confirmButtonText: "Yes, create it!",
  //       cancelButtonText: "Cancel",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         // Intentar crear la cuenta
  //         dispatch(createAccount())
  //           .unwrap()
  //           .then((newAccount) => {
  //             console.log("La cuenta se creó con éxito");
  //             dispatch(fetchAccounts());
  //           })
  //           .catch((error) => {
  //             console.error("Error creating account:", error);
  //           });
  //       }
  //     });
  //   }
  // };
  
  console.log(accounts);

//Si elijo usar la funcion "que despacha dos veces create account" tengo que descomentar este return y comentar todo lo que esta debajo.
  // return (
  //   <div className="bg-[#E5EDF1] p-8 min-h-screen">
  //     <h1 className="text-3xl font-bold text-center mb-8">Welcome, {name}!</h1>
  //     <div className="  flex justify-center mb-6">
  //       <img
  //         src="https://images.ctfassets.net/h7wmg0jhythh/59bBPtUVTa1ScIxYr6HZgZ/eb3e9026c052542f0df5cbf976f1d8da/2_AYUDA_708x275.webp"
  //         alt=""
  //         className="rounded-lg shadow-md w-full  md:w-2/3"
  //       />
  //     </div>
  //     <div className="flex justify-center  mb-6">
  //       <Button
  //         onClick={añadirAccountArray}
  //         className="bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded-full shadow-md"
  //       >
  //         {" "}
  //         Request Account{" "}
  //       </Button>
  //     </div>
  //     <div className="flex justify-center flex-wrap gap-10">
  //       {accounts && accounts.length > 0 ? (
  //         accounts.map((account) => (
  //           <Link key={account.id} to={`/accounts/${account.id}`}>
  //             <CardAccount
  //               number={account.number}
  //               balance={account.balance}
  //               creationDate={account.creationDate}
  //             />
  //           </Link>
  //         ))
  //       ) : (
  //         <p className="text-lg font-bold text-center text-red-600">No accounts found.</p>
  //       )}
  //     </div>
  //   </div>
  // );
  
  
  const añadirAccountArray = () => {
    // Validar si el usuario ya tiene 3 cuentas antes de mostrar el Swal
    if (accounts && accounts.length >= 3) {
      // Mostrar un mensaje de error en vez del Sweet Alert
      console.error("No puedes tener más de 3 cuentas");
      return;
    }
  
    // Mostrar la alerta de confirmación antes de crear una cuenta
    Swal.fire({
      title: "Are you sure you want to create a new account?",
      text: "You can only have up to 3 accounts.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16A34A",
      cancelButtonColor: "#9CA3AF",
      confirmButtonText: "Yes, create it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, intenta crear la cuenta
        dispatch(createAccount())
          .unwrap()
          .then((newAccount) => {
            // Refrescar la lista de cuentas después de crear una nueva
            console.log("La cuenta se creó con éxito");
            dispatch(fetchAccounts());
            console.log("se actualizó con la nueva cuenta ");
          })
          .catch((error) => {
            console.error("Error creating account:", error);
          });
      }
    });
  };
  
  return (
    <div className="bg-[#E5EDF1] p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome, {name}!</h1>
      <div className="flex justify-center mb-6">
        <img
          src="https://images.ctfassets.net/h7wmg0jhythh/59bBPtUVTa1ScIxYr6HZgZ/eb3e9026c052542f0df5cbf976f1d8da/2_AYUDA_708x275.webp"
          alt=""
          className="rounded-lg shadow-md w-full md:w-2/3"
        />
      </div>
      <div className="flex justify-center mb-6">
        <Button
          onClick={añadirAccountArray}
          className={`${
            accounts && accounts.length >= 3
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          } focus:outline-none  text-white font-bold py-2 px-4 rounded-full shadow-md`}
          disabled={accounts && accounts.length >= 3}
        >
          Request Account
        </Button>
      </div>
      {accounts && accounts.length >= 3 && (
        <p className="text-lg font-bold text-center text-red-600">
          You cannot create more than 3 accounts.
        </p>
      )}
      <div className="flex justify-center flex-wrap gap-10">
        {accounts && accounts.length > 0 ? (
          accounts.map((account) => (
            <Link key={account.id} to={`/accounts/${account.id}`}>
              <CardAccount
                number={account.number}
                balance={account.balance}
                creationDate={account.creationDate}
              />
            </Link>
          ))
        ) : (
          <p className="text-lg font-bold text-center text-red-600">No accounts found.</p>
        )}
      </div>
    </div>
  );
  

}
export default MainAccount;

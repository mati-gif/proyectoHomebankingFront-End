import React, { useState } from 'react';
import ImputMainTransaction from './ImputMainTransaction';
import TransactionAmoutImput from './TransactionAmoutImput';
import TransactionDescriptionImput from './TransactionDescriptionImput';
import Button from '../Button';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction } from '../../redux/actions/authActions';
import { useNavigate } from "react-router-dom";


function TransactionForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accounts } = useSelector(state => state.auth); // Obtener cuentas del estado global
  const [formData, setFormData] = useState({
    sourceAccountNumber: '',
    destinationAccountNumber: '',
    amount: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // //Funciona,muestra la alerta de confirmacion si todos los campos estan llenos y ademas tambien cachea los errores del back pero no se si esta correcto porque despacha dos veces la accion createTransaccion.
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // Validar que todos los campos requeridos estén completos
  //     const { sourceAccountNumber, destinationAccountNumber, amount, description } = formData;

  //     // Validar existencia de cuentas
  //     const validSourceAccount = accounts.some(account => account.number === sourceAccountNumber);
  //     const validDestinationAccount = accounts.some(account => account.number === destinationAccountNumber);

  //     // Si algún campo está vacío o no es válido, dejamos que el backend maneje el error
  //     if (!validSourceAccount || !validDestinationAccount || !amount || !description) {
  //       console.log("Uno o más campos están incompletos o no válidos. Dejar que el backend gestione el error.");

  //       // Intentamos enviar una transacción simulada para que el backend maneje el error
  //       try {
  //         const invalidTransactionData = {
  //           sourceAccountNumber: validSourceAccount ? sourceAccountNumber : null,
  //           destinationAccountNumber: validDestinationAccount ? destinationAccountNumber : null,
  //           amount: amount ? amount : null,
  //           description: description ? description : null,
  //         };

  //         await dispatch(createTransaction(invalidTransactionData)).unwrap();
  //       } catch (error) {
  //         // Aquí capturamos el error del backend y mostramos el mensaje correspondiente
  //         console.error("Error capturado desde el backend:", error);

  //         Swal.fire({
  //           icon: "error",
  //           title: "Transaction Error",
  //           text: error, // Mostrar el mensaje del backend
  //         });
  //       }

  //       return; // Salir de la función si falta algún campo o hay un error
  //     }

  //     // Si todos los campos están completos y válidos, mostramos la alerta de confirmación
  //     try {
  //       const confirmResult = await Swal.fire({
  //         title: "Confirm Transaction",
  //         text: "Are you sure you want to proceed with the transaction?",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#16A34A",
  //         cancelButtonColor: "#9CA3AF",
  //         confirmButtonText: "Yes, proceed!",
  //         cancelButtonText: "No, cancel",
  //       });

  //       if (!confirmResult.isConfirmed) {
  //         // Si el usuario cancela la confirmación, no hacer nada
  //         return;
  //       }

  //       // Enviar los datos al backend para crear una transacción
  //       const resultAction = await dispatch(createTransaction(formData)).unwrap();

  //       Swal.fire({
  //         icon: "success",
  //         title: "Transaction Successful",
  //         text: "The transaction completed successfully.",
  //       });

  //       // Reiniciar el formulario después de la transacción exitosa
  //       setFormData({
  //         sourceAccountNumber: "",
  //         destinationAccountNumber: "",
  //         amount: "",
  //         description: "",
  //       });
  //     } catch (error) {
  //       // Capturar el error del backend
  //       console.error("Error al procesar la transacción:", error);

  //       Swal.fire({
  //         icon: "error",
  //         title: "Transaction Error",
  //         text: error, // Mostrar el mensaje devuelto desde el backend
  //       });
  //     }
  //   };


  // //Tambien funciona a medias .Si cachea los errores del back de la manera correcta,no muestra la alerta de confirmacion. en cambio esta el boton cancel
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar existencia de cuentas
    const validSourceAccount = accounts.some(account => account.number === formData.sourceAccountNumber);
    const validDestinationAccount = accounts.some(account => account.number === formData.destinationAccountNumber);

    try {

      // Enviar los datos al backend para crear una transacción
      const resultAction = await dispatch(createTransaction(formData)).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'Transaction Successful',
        text: 'The transaction completed successfully.',
      });

      // Reiniciar el formulario después de la transacción exitosa
      setFormData({
        sourceAccountNumber: '',
        destinationAccountNumber: '',
        amount: '',
        description: ''
      });

    } catch (error) {
      console.error('Error al procesar la transacción:', error);

        // // Capturar el error del backend
        let errorMessage = error
        console.log(errorMessage);

        Swal.fire({
          icon: 'error',
          title: 'Transaction Error',
          text: errorMessage, // Mostrar el mensaje devuelto desde el backend
        });

    }
  };

  //Funciona a medias (Es la original),valida los campos desde front por ende nunca llega a hacerse la solicitud entonces no cachea los errores del back.
  //pero si muestra el mensaje de confirmacion una vez que todos los campos estan llenos.
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validar campos vacíos (frontend)
  //   // if (!formData.sourceAccountNumber || !formData.destinationAccountNumber || !formData.amount || !formData.description) {
  //   //   Swal.fire({
  //   //     icon: 'error',
  //   //     title: 'Fields obligatory',
  //   //     text: 'Please complete all the fields of the form',
  //   //   });
  //   //   return;
  //   // }

  //   // Validar existencia de cuentas
  //   const validSourceAccount = accounts.some(account => account.number === formData.sourceAccountNumber);
  //   const validDestinationAccount = accounts.some(account => account.number === formData.destinationAccountNumber);

  //   // Mostrar alerta de confirmación
  //   if (!validSourceAccount) {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Source account',
  //             text: 'The source account must not be empty',
  //           });
  //           return;
  //         }

  //         if (!validDestinationAccount) {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Destination account',
  //             text: 'The destination account must not be empty',
  //           });
  //           return;
  //         }

  //         if(formData.amount <= 0){
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Amount',
  //             text: 'The amount is obligatory and must be greater than 0',
  //           });
  //           return;
  //         }

  //         if (!formData.description) {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Description',
  //             text: 'Description fields must not be empty',
  //           });
  //           return;

  //         }


  //       const result = await  Swal.fire({
  //         title: 'Confirm please',
  //         text: "You are about to make a transaction. Do you want to proceed?",
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#16A34A',
  //         cancelButtonColor: '#9CA3AF',
  //         confirmButtonText: 'Yes, make the transaction',
  //         cancelButtonText: 'No, cancel',
  //       })
  //   .then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {

  //         // Enviar los datos al backend para crear una transacción
  //         const resultAction = await dispatch(createTransaction(formData)).unwrap();

  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Transaction Successful',
  //           text: 'The transaction completed successfully.',
  //         });

  //         // Reiniciar el formulario después de la transacción exitosa
  //         setFormData({
  //           sourceAccountNumber: '',
  //           destinationAccountNumber: '',
  //           amount: '',
  //           description: ''
  //         });

  //       } catch (error) {
  //         console.error('Error al procesar la transacción:', error);

  //         // // Capturar el error del backend
  //         let errorMessage = error
  //         console.log(errorMessage);

  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Transaction Error',
  //           text: errorMessage, // Mostrar el mensaje devuelto desde el backend
  //         });
  //       }
  //     }
  //   });
  // };

  const handleCancel = () => {
    navigate('/');
  }
  return (
    <form className=' w-full rounded-lg p-6 flex  flex-col gap-10  bg-[#D4D9DD] ' onSubmit={handleSubmit}>
      <div className=' rounded-lg shadow-lg w-96 m-auto bg-[#F2F3F2] p-6 '>
        <ImputMainTransaction
          value={formData}
          onChange={handleChange}
        />
        <TransactionAmoutImput value={formData.amount} onChange={handleChange} name="amount" />
        <TransactionDescriptionImput value={formData.description} onChange={handleChange} name="description" />
        <div className="flex justify-between">
          <Button className=" w-40 bg-green-500 text-white font-bold py-2 px-4 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" type="submit">
            Tranfer
          </Button>
          <Button
            className="w-40 bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-[15px] hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>

      </div>

    </form>
  );
}

export default TransactionForm;
// if (!validSourceAccount || !validDestinationAccount) {
//   Swal.fire({
//     icon: 'error',
//     title: 'Invalid account',
//     text: 'The source account or destination account number is invalid.',
//   });
//   return;
// }

// // Validar que las cuentas de origen y destino no sean iguales
// if (formData.sourceAccountNumber === formData.destinationAccountNumber) {
//   Swal.fire({
//     icon: 'error',
//     title: 'Equals Accounts',
//     text: 'The source account and destination account cannot be the same.',
//   });
//   return;
// }


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // Validar campos vacíos (frontend)
//   if (!formData.sourceAccountNumber || !formData.destinationAccountNumber || !formData.amount || !formData.description) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Fields obligatory',
//       text: 'Plase complete all the fields of form',
//     });
//     return;
//   }

//   // Validar existencia de cuentas
//   const validSourceAccount = accounts.some(account => account.number === formData.sourceAccountNumber);
//   const validDestinationAccount = accounts.some(account => account.number === formData.destinationAccountNumber);

//   if (!validSourceAccount || !validDestinationAccount) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Invalid account',
//       text: 'The source account o destiny account number is invalid.',
//     });
//     return;
//   }

//   // Validar que las cuentas de origen y destino no sean iguales
//   if (formData.sourceAccountNumber === formData.destinationAccountNumber) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Equals Accounts',
//       text: 'The source account and destiny account could not be same',
//     });
//     return;
//   }

//   try {
//     // Enviar los datos al backend para crear una transacción
//     const resultAction = await dispatch(createTransaction(formData)).unwrap();

//     Swal.fire({
//       icon: 'success',
//       title: 'Transaction successfully',
//       text: 'The transaction complete successfully.',
//     });

//     // Reiniciar el formulario después de la transacción exitosa
//     setFormData({
//       sourceAccountNumber: '',
//       destinationAccountNumber: '',
//       amount: '',
//       description: ''
//     });

//   } catch (error) {
//     console.error('Error al procesar la transacción:', error);

//     // Captura el error del backend (maneja casos de cuenta inexistente, montos inválidos, etc.)
//     let errorMessage = 'An unexpected error ocurred,try again please';
//     if (error.response.data.message && error.response.data) {
//       errorMessage = error.response.data.message || error.response.data;
//     }

//     Swal.fire({
//       icon: 'error',
//       title: 'Error about transaction,please try again',
//       text: errorMessage, // Mostrar el mensaje devuelto desde el backend
//     });
//   }
// };
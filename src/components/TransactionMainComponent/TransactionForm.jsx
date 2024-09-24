import React, { useState } from 'react';
import ImputMainTransaction from './ImputMainTransaction';
import TransactionAmoutImput from './TransactionAmoutImput';
import TransactionDescriptionImput from './TransactionDescriptionImput';
import Button from '../Button';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction } from '../../redux/actions/authActions';

function TransactionForm() {
  const dispatch = useDispatch();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos vacíos (frontend)
    if (!formData.sourceAccountNumber || !formData.destinationAccountNumber || !formData.amount || !formData.description) {
      Swal.fire({
        icon: 'error',
        title: 'Fields obligatory',
        text: 'Please complete all the fields of the form',
      });
      return;
    }

    // Validar existencia de cuentas
    const validSourceAccount = accounts.some(account => account.number === formData.sourceAccountNumber);
    const validDestinationAccount = accounts.some(account => account.number === formData.destinationAccountNumber);

    if (!validSourceAccount || !validDestinationAccount) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid account',
        text: 'The source account or destination account number is invalid.',
      });
      return;
    }

    // Validar que las cuentas de origen y destino no sean iguales
    if (formData.sourceAccountNumber === formData.destinationAccountNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Equals Accounts',
        text: 'The source account and destination account cannot be the same.',
      });
      return;
    }

    // Mostrar alerta de confirmación
    Swal.fire({
      title: 'Confirm please',
      text: "You are about to make a transaction. Do you want to proceed?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16A34A',
      cancelButtonColor: '#9CA3AF',
      confirmButtonText: 'Yes, make the transaction',
      cancelButtonText: 'No, cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
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

          // Capturar el error del backend
          let errorMessage = 'An unexpected error occurred, please try again.';
          if (error.response && error.response.data.message) {
            errorMessage = error.response.data.message;
          }

          Swal.fire({
            icon: 'error',
            title: 'Transaction Error',
            text: errorMessage, // Mostrar el mensaje devuelto desde el backend
          });
        }
      } 
      // else {
      //   // Si el usuario cancela, mostrar un mensaje de cancelación
      //   Swal.fire({
      //     icon: 'info',
      //     title: 'Transaction Cancelled',
      //     text: 'You have cancelled the transaction.',
      //   });
      // }
    });
  };



  return (
    <form className=' w-full rounded-lg p-6 flex  flex-col gap-10  bg-[#D4D9DD] ' onSubmit={handleSubmit}>
      <div className=' rounded-lg shadow-lg w-96 m-auto bg-[#F2F3F2] p-6 '>
        <ImputMainTransaction
          value={formData}
          onChange={handleChange}
        />
        <TransactionAmoutImput value={formData.amount} onChange={handleChange} name="amount" />
        <TransactionDescriptionImput value={formData.description} onChange={handleChange} name="description" />
        <Button className=" w-52 bg-green-500 text-white font-bold py-2 px-4 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" type="submit">
          Tranfer
        </Button>
      </div>

    </form>
  );
}

export default TransactionForm;

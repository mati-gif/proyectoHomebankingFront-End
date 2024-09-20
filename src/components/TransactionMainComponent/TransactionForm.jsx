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


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos vacíos (frontend)
    if (!formData.sourceAccountNumber || !formData.destinationAccountNumber || !formData.amount || !formData.description) {
      Swal.fire({
        icon: 'error',
        title: 'Campos Requeridos',
        text: 'Por favor completa todos los campos del formulario',
      });
      return;
    }

    // Validar existencia de cuentas
    const validSourceAccount = accounts.some(account => account.number === formData.sourceAccountNumber);
    const validDestinationAccount = accounts.some(account => account.number === formData.destinationAccountNumber);

    if (!validSourceAccount || !validDestinationAccount) {
      Swal.fire({
        icon: 'error',
        title: 'Cuenta Inválida',
        text: 'El número de cuenta de origen o destino no es válido.',
      });
      return;
    }

    // Validar que las cuentas de origen y destino no sean iguales
    if (formData.sourceAccountNumber === formData.destinationAccountNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Cuentas Iguales',
        text: 'La cuenta de origen y la cuenta de destino no pueden ser la misma.',
      });
      return;
    }

    try {
      // Enviar los datos al backend para crear una transacción
      const resultAction = await dispatch(createTransaction(formData)).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'Transacción Exitosa',
        text: 'La transacción se realizó con éxito.',
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

      // Captura el error del backend (maneja casos de cuenta inexistente, montos inválidos, etc.)
      let errorMessage = 'Hubo un error al procesar la transacción';
      if (error.response.data.message && error.response.data) {
        errorMessage = error.response.data.message || error.response.data;
      }

      Swal.fire({
        icon: 'error',
        title: 'Error en la Transacción',
        text: errorMessage, // Mostrar el mensaje devuelto desde el backend
      });
    }
  };
  return (
    <form className='bg-gray-300 flex flex-col gap-10 p-6 rounded-lg md:w-6/12' onSubmit={handleSubmit}>

      <ImputMainTransaction
        value={formData}
        onChange={handleChange}
      />
      <TransactionAmoutImput value={formData.amount} onChange={handleChange} name="amount" />
      <TransactionDescriptionImput value={formData.description} onChange={handleChange} name="description" />
      <Button className="w-52 bg-green-500 text-white font-bold py-2 px-4 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" type="submit">
        Make
      </Button>
    </form>
  );
}

export default TransactionForm;

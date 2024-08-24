import React from 'react'
import ImputMainTransaction from './ImputMainTransaction'
import TransactionSelectAccountDestiny from './TransactionSelectAccountDestiny'
import TransactionAmoutImput from './TransactionAmoutImput'
import TransactionDescriptionImput from './TransactionDescriptionImput'
import Button from '../Button'
import Swal from 'sweetalert2'; // Importa SweetAlert2

function TransactionForm() {

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
        // Aquí debes realizar la lógica para generar la cuenta
        // Este es el lugar donde puedes hacer la llamada a la API para crear la cuenta
        // y actualizar el estado con la nueva cuenta.

        // Ejemplo de cómo podrías hacerlo:
        // setArrayAccount([...arrayAccount, { id: newId, number: 'newNumber', balance: 'newBalance', creationDate: 'newDate' }]);

        Swal.fire(
          'Creatted!',
          'Your account has been generated.',
          'success'
        );
      }
    });
  };
  return (

    <form className='  bg-gray-300 flex flex-col gap-10  p-6 rounded-lg md:w-6/12' action="">
      <ImputMainTransaction />
      <TransactionAmoutImput />
      <TransactionDescriptionImput />
      <Button onClick={añadirAccountArray} className="w-52 bg-green-500 text-white font-bold py-2 px-4 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" type="button">
        make
      </Button>
    </form>

  )
}

export default TransactionForm
import React from 'react';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import TransactionAmoutImput from '../TransactionMainComponent/TransactionAmoutImput';
import SelectLoan from './SelectLoan';
import LoanSelectAccountOrigen from './LoanSelectAccountOrigen';
import PaymentSelectLoan from './PaymentSelectLoan';
import Button from '../Button';


function LoanForm() {
  // Define la función handleApplyClick
  const handleApplyClick = () => {
    Swal.fire({
      title: 'Are you sure you want to create a new Loan?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16A34A',
      cancelButtonColor: '##9CA3AF',
      confirmButtonText: 'Yes, generate',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para generar el préstamo
        // Este es el lugar donde puedes hacer la llamada a la API para crear el préstamo
        // y actualizar el estado con el nuevo préstamo.
  
        // Ejemplo de cómo podrías hacerlo:
        // setArrayAccount([...arrayAccount, { id: newId, number: 'newNumber', balance: 'newBalance', creationDate: 'newDate' }]);
  
        Swal.fire(
          'Created!',
          'Your loan has been generated.',
          'success'
        );
      } else {
        // Lógica para manejar la cancelación, si es necesario
        Swal.fire(
          'Cancelled',
          'The loan was not generated.',
          'info'
        );
      }
    });
  };

  return (
    <form className='bg-[#d4d9dd] flex flex-col gap-10 p-6 rounded-lg md:w-6/12' action="">
      <SelectLoan />
      <LoanSelectAccountOrigen />
      <TransactionAmoutImput />
      <PaymentSelectLoan />

      <Button
        className="w-52 bg-green-500 text-white font-bold py-2 px-4 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        onClick={handleApplyClick} // Pasa la función handleApplyClick aquí
      >
        Apply
      </Button>
    </form>
  );
}

export default LoanForm;

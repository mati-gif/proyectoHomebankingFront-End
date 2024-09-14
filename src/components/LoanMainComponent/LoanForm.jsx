import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import TransactionAmoutImput from '../TransactionMainComponent/TransactionAmoutImput';
import SelectLoan from './SelectLoan';
import LoanSelectAccountOrigen from './LoanSelectAccountOrigen';
import PaymentSelectLoan from './PaymentSelectLoan';
import Button from '../Button';
import axios from 'axios';


function LoanForm() {
  // Estado para almacenar las cuentas
  const [accounts, setAccounts] = useState([]);
  const [loanSelected, setLoanSelected] = useState([])

  const allLoans = [{ typeLoan: "Hipotecario", cuotas: [12, 24, 36, 48, 60] },
  { typeLoan: "Personal", cuotas: [6, 12, 24] },
  { typeLoan: "Automotriz", cuotas: [6, 12, 24, 36] }
  ]

  const traerCuentas = () => {
    axios.get("http://localhost:8080/api/clients/1")
      .then((response) => {
        setAccounts(response.data.accounts)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log("SE EJECUTO EL USEeFFECT");
    traerCuentas();
  }, []);

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

  const handleLoan = (e) => {
    e.preventDefault();
    const loanSeleccionado = allLoans.filter((item) => item.typeLoan === e.target.value);
    if (loanSeleccionado.length > 0) {
      setLoanSelected(loanSeleccionado[0].cuotas);
      console.log(loanSeleccionado[0].cuotas);
    } else {
      setLoanSelected([]);
    }
    console.log(loanSelected);
  };

  return (
    <form className='bg-[#d4d9dd] flex flex-col gap-10 p-6 rounded-lg md:w-6/12' action="">
      <div className="mb-4 ">
        <label htmlFor="account" className=" block text-gray-700 text-lg font-bold mb-4">
          Select a Loan:
        </label>
        <select onChange={handleLoan} id="account" name="account" required className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none">
          <option value="">Select an Option</option>
          <option value="Hipotecario"> Hipotecario</option>
          <option value="Personal"> Personal</option>
          <option value="Automotriz"> Automotriz</option>
        </select>
      </div>
      <div className="mb-4 ">
        <label htmlFor="account" className=" block text-gray-700 text-lg font-bold mb-4">
          Source Account:
        </label>
        <select id="account" name="account" required className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none">
          <option value="">Select an Option</option>
          {accounts.map((item) => (
            <option key={item.id} value={item.number}>
              {item.number}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="account" className="block text-gray-700 text-lg font-bold mb-2">
          Amount
        </label>
        <input id="account" name="account" required className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2" type="number" />
      </div>
      <div className="mb-4 ">
        <label htmlFor="account" className=" block text-gray-700 text-lg font-bold mb-4">
          Payments
        </label>
        <select id="account" name="account" required className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none">
          <option value="">Select an Option</option>
          {loanSelected.map((cuota, index) => (
            <option key={index} value={cuota}>
              {cuota} months
            </option>
          ))}
        </select>
      </div>
      <Button //Renderiza un botón  que, cuando se hace clic, ejecuta la función handleApplyClick
        className="w-52 bg-green-500 text-white font-bold py-2 px-4 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        onClick={handleApplyClick} // Pasa la función handleApplyClick aquí
      >
        Apply
      </Button>
    </form>
  );
}

export default LoanForm;

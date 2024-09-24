import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import TransactionAmoutImput from '../TransactionMainComponent/TransactionAmoutImput';
import SelectLoan from './SelectLoan';
import PaymentSelectLoan from './PaymentSelectLoan';
import Button from '../Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { loadUser, fetchAvailableLoans, createLoan } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';


function LoanForm() {

  const [amount, setAmount] = useState('');
  const [payment, setPayment] = useState('');
  const [account, setAccount] = useState('');

  const [loanSelectedPayments, setLoanSelectedPayments] = useState([]); // Estado para las cuotas del préstamo seleccionado  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedLoan, setSelectedLoan] = useState(''); // Estado para manejar el préstamo seleccionado

  const { isLoggedIn, token, accounts, loansToSelect, status, error } = useSelector((state) => state.auth);

  console.log(loansToSelect);


  // Función para formatear el número con comas
  const formatNumberWithCommas = (num) => {
    if (!num) return '';
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');  // Agrega comas
    return parts.join('.');
  };

  // Función para limpiar el número, eliminando comas y espacios
  const cleanNumber = (num) => {
    return num.replace(/,/g, '').replace(/ /g, '');
  };


  // Manejar el cambio en el campo de entrada del monto
  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    const cleanValue = cleanNumber(inputValue);  // Elimina las comas del valor ingresado

    // Actualiza el estado formateando el número con comas
    setAmount(formatNumberWithCommas(cleanValue));
  };



  useEffect(() => {
    if (isLoggedIn && token) {
      // Solo si las cuentas están vacías, llamamos a loadUser
      if (accounts.length === 0) {
        dispatch(loadUser(token))
          .unwrap()
          .catch((error) => {
            console.error('Error al cargar usuario:', error);
            navigate('/login');
          });
      }
    } else {
      // Redirigir al usuario si no está autenticado
      navigate('/login');
    }
  }, [isLoggedIn, dispatch, navigate, token, accounts]);

  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(fetchAvailableLoans());
    }
  }, [dispatch, isLoggedIn, token]);

  useEffect(() => {
    if (error && error !== "No more loans available.") {
      Swal.fire({
        icon: 'error',
        title: 'Error fetching loans',
        text: error,
      });
    }
  }, [error]);









  // Manejar el cambio de selección de préstamo
  const handleLoanChange = (e) => {
    const selectedLoanName = e.target.value;
    setSelectedLoan(selectedLoanName); // Guardamos el préstamo seleccionado
    console.log(selectedLoanName);


    // Buscar el préstamo seleccionado
    const selectedLoan = loansToSelect.find((loan) => loan.name === selectedLoanName);
    console.log(selectedLoan);


    // Si se encuentra el préstamo, actualiza el estado con las cuotas (payments)
    if (selectedLoan) {
      setLoanSelectedPayments(selectedLoan.payments); // Guarda las cuotas del préstamo
      // Verifica el estado del préstamo seleccionado y cuotas
      console.log('Selected Loan:', selectedLoanName);
      console.log('Loan Selected Payments:', loanSelectedPayments);

    } else {
      setLoanSelectedPayments([]); // Si no hay préstamo seleccionado, limpia las cuotas
    }
  };



  // const handleApplyClick = (e) => {
  //   e.preventDefault();

  //   if (!selectedLoan || !amount  || !payment || !account) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Incomplete Form',
  //       text: 'Please, complete all the fields.',
  //     });
  //     return;
  //   }

  //   const selectedLoanData = loansToSelect.find((loan) => loan.name === selectedLoan);

  //   if (selectedLoanData) {
  //     const { id, maxAmount } = selectedLoanData;

  //     const amountValue = amount; // `amount` ya es numérico ahora
  //     const maxAmountValue = parseFloat(maxAmount);

  //     // Formateo del monto ingresado y el monto máximo
  //     const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amountValue);
  //     const formattedMaxAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(maxAmountValue);

  //     if (amountValue > maxAmountValue) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Excessive Amount',
  //         text: `The amount entered (${formattedAmount}) is greater than the maximum amount allowed (${formattedMaxAmount}).`,
  //       });
  //       return;
  //     }

  //     // Si todo es válido, crea el préstamo
  //     const loanData = {
  //       loanId: id,
  //       amount: amountValue, // Aquí usamos el valor numérico puro
  //       payments: parseInt(payment),
  //       destinationAccountNumber: account,
  //     };

  //     dispatch(createLoan(loanData))
  //       .unwrap()
  //       .then((response) => {
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Loan created successfully',
  //           text: 'Your loan has been created successfully.',
  //         }).then(() => {
  //           dispatch(fetchAvailableLoans()).then(() => {
  //             if (loansToSelect.length === 0) {
  //               Swal.fire({
  //                 icon: 'info',
  //                 title: 'There are no more loans available',
  //                 text: 'You have applied for all available loans',
  //               });
  //             }
  //           }).catch((error) => {
  //             console.error('Error al actualizar la lista de préstamos:', error);
  //           });
  //         });
  //       })
  //       .catch((error) => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error',
  //           text: error.message || 'An unexpected error occurred.',
  //         });
  //       });
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'The selected loan could not be found.',
  //     });
  //   }
  // };



  // const handleApplyClick = (e) => {
  //   e.preventDefault();




  //   if (!selectedLoan || !amount || !payment || !account) {
  //       Swal.fire({
  //           icon: 'error',
  //           title: 'Incomplete Form',
  //           text: 'Please, complete all the fields.',
  //       });
  //       return;
  //   }

  //   const selectedLoanData = loansToSelect.find((loan) => loan.name === selectedLoan);

  //   if (selectedLoanData) {
  //       const { id, maxAmount } = selectedLoanData;

  //       // Limpiar el monto antes de convertirlo a número
  //       const amountValue = parseFloat(amount.replace(/,/g, '').replace(/ /g, '')); 
  //       console.log(amountValue);

  //       const maxAmountValue = parseFloat(maxAmount);
  //       console.log(maxAmountValue);


  //       // Formateo del monto ingresado y el monto máximo
  //       const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amountValue);
  //       const formattedMaxAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(maxAmountValue);

  //       if (amountValue > maxAmountValue) {
  //           Swal.fire({
  //               icon: 'error',
  //               title: 'Excessive Amount',
  //               text: `The amount entered (${formattedAmount}) is greater than the maximum amount allowed (${formattedMaxAmount}).`,
  //           });
  //           return;
  //       }

  //       const loanData = {
  //           loanId: id,
  //           amount: amountValue,
  //           payments: parseInt(payment),
  //           destinationAccountNumber: account,
  //       };

  //       dispatch(createLoan(loanData))
  //           .unwrap()
  //           .then((response) => {
  //               Swal.fire({
  //                   icon: 'success',
  //                   title: 'Loan created successfully',
  //                   text: 'Your loan has been created successfully.',
  //               }).then(() => {
  //                   dispatch(fetchAvailableLoans()).then(() => {
  //                       if (loansToSelect.length === 0) {
  //                           Swal.fire({
  //                               icon: 'info',
  //                               title: 'There are no more loans available',
  //                               text: 'You have applied for all available loans',
  //                           });
  //                       }
  //                   }).catch((error) => {
  //                       console.error('Error al actualizar la lista de préstamos:', error);
  //                   });
  //               });
  //           })
  //           .catch((error) => {
  //             if (error.message.includes('amount grater than allowed')) {
  //               Swal.fire({
  //                 icon: 'error',
  //                 title: 'Monto excesivo',
  //                 text: `The amount entered (${formattedAmount}) is greater than the maximun amount allowed (${formattedMaxAmount}).`,
  //               });
  //             } else {
  //               Swal.fire({
  //                 icon: 'error',
  //                 title: 'Error',
  //                 text: error.message || 'Ha ocurrido un error inesperado.',
  //               });
  //             }
  //           });
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error',
  //           text: 'The selected loan could not be found.',
  //         });
  //       }
  //     };
  const handleApplyClick = (e) => {
    e.preventDefault();

    // Limpiar el valor de amount antes de usarlo (sin comas)
    const amountValue = parseFloat(cleanNumber(amount));

    // Mostrar alerta de confirmación con SweetAlert2
    Swal.fire({
      title: 'Confirm please',
      text: "You are about to apply for a loan. Do you want to proceed? ",
      icon: 'warning',
      showCancelButton: true, // Muestra el botón para cancelar
      confirmButtonColor: '#16A34A', // Color del botón de confirmar
      cancelButtonColor: '#9CA3AF ', // Color del botón de cancelar
      confirmButtonText: 'Yes, apply!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      // Si el usuario confirma
      if (result.isConfirmed) {
        // Verificar si los campos están completos
        if (!selectedLoan || !amount || !payment || !account) {
          Swal.fire({
            icon: 'error',
            title: 'Incomplete Form',
            text: 'Please, complete all the fields.',
          });
          return;
        }

        const selectedLoanData = loansToSelect.find((loan) => loan.name === selectedLoan);

        if (selectedLoanData) {
          const { id, maxAmount } = selectedLoanData;
          

          // // Limpiar el monto antes de convertirlo a número
          // const amountValue = parseFloat(amount.replace(/,/g, '').replace(/ /g, ''));
          // console.log(amountValue);

          const maxAmountValue = parseFloat(maxAmount);
          console.log(maxAmountValue);

          // // Formateo del monto ingresado y el monto máximo
          // const formattedAmount = new Intl.NumberFormat('en-US', {
          //   style: 'currency',
          //   currency: 'USD',
          //   minimumFractionDigits: 2,
          //   maximumFractionDigits: 2,
          // }).format(amountValue);

          // const formattedMaxAmount = new Intl.NumberFormat('en-US', {
          //   style: 'currency',
          //   currency: 'USD',
          //   minimumFractionDigits: 2,
          //   maximumFractionDigits: 2,
          // }).format(maxAmountValue);

          if (amountValue > maxAmountValue) {
            Swal.fire({
              icon: 'error',
              title: 'Excessive Amount',
              text: `The amount entered (${formatNumberWithCommas(amountValue)}) is greater than the maximum amount allowed (${formatNumberWithCommas(maxAmountValue)}).`,
            });
            return;
          }

          const loanData = {
            loanId: id,
            amount: amountValue,
            payments: parseInt(payment),
            destinationAccountNumber: account,
          };

          dispatch(createLoan(loanData))
            .unwrap()
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'Loan created successfully',
                text: 'Your loan has been created successfully.',
              }).then(() => {
                dispatch(fetchAvailableLoans()).then(() => {
                  if (loansToSelect.length === 0) {
                    Swal.fire({
                      icon: 'info',
                      title: 'There are no more loans available',
                      text: 'You have applied for all available loans.',
                    });
                  }
                }).catch((error) => {
                  console.error('Error al actualizar la lista de préstamos:', error);
                });
              });
            })
            .catch((error) => {
              if (error.message.includes('amount greater than allowed')) {
                Swal.fire({
                  icon: 'error',
                  title: 'Monto excesivo',
                  text: `The amount entered (${formattedAmount}) is greater than the maximum amount allowed (${formattedMaxAmount}).`,
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: error.message || 'An unexpected error occurred.',
                });
              }
            });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'The selected loan could not be found.',
          });
        }
      }
      // else {
      //   // Si el usuario cancela, no se hace nada
      //   Swal.fire({
      //     icon: 'info',
      //     title: 'Cancelled',
      //     text: 'You have cancelled the loan application.',
      //   });
      // }
    });
  };


  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(fetchAvailableLoans());
    }
  }, [dispatch, isLoggedIn, token]);




  // Condiciones para mostrar mensajes y formulario
  const isLoading = status === 'pending';
  const noLoansAvailable = loansToSelect.length === 0 && error === "No more loans available.";


  console.log('loansToSelect:', loansToSelect);



  //   function formatCurrency(input) {
  //     // Elimina todo excepto números, puntos y comas
  //     let value = input.value.replace(/[^0-9.,]/g, '');

  //     // Divide el valor en partes para manejar decimales
  //     const parts = value.split('.');

  //     // Si hay más de un punto decimal, no es válido
  //     if (parts.length > 2) {
  //         Swal.fire({
  //             icon: 'error',
  //             title: 'Invalid Amount',
  //             text: 'Please enter a valid amount.',
  //         });
  //         setAmount('');
  //         input.value = '';
  //         return;
  //     }

  //     // Formatear la parte entera con separadores de miles
  //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  //     // Limitar la parte decimal a dos dígitos
  //     if (parts[1] && parts[1].length > 2) {
  //         parts[1] = parts[1].substring(0, 2);
  //     }

  //     // Volver a unir la parte entera y la decimal
  //     let formattedValue = parts.join('.');

  //     // Actualizar el input con el formato correcto
  //     input.value = formattedValue;

  //     // Convertir a número eliminando comas y asegurando el formato correcto
  //     const numericValue = parseFloat(value.replace(/,/g, '').replace(/,/g, '.')) || 0;

  //     // Validaciones del monto ingresado
  //     if (numericValue <= 0) {
  //         Swal.fire({
  //             icon: 'error',
  //             title: 'Invalid Amount',
  //             text: 'Please enter a positive number greater than zero.',
  //         });
  //         setAmount('');
  //         input.value = '';
  //     } else {
  //         setAmount(numericValue);
  //     }
  // }






  return (


    <form className='bg-[#d4d9dd]    p-6 rounded-bl-lg rounded-tl-lg md:w-6/12' action="">
      <div className='shadow-2xl  w-96  m-auto p-3 bg-[#F2F3F2] rounded-lg'>
        <div className="mb-4  ">
          <label htmlFor="account" className=" block text-gray-700  text-lg font-bold mb-4">
            Select a Loan:
          </label>

          <select onChange={handleLoanChange} id="loan" name="loan" required className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none">
            {/* Verifica si hay préstamos disponibles */}
            {isLoading ? (
              <option>Loading...</option>
            ) : noLoansAvailable ? (
              <option value="">No more loans available</option>
            ) : loansToSelect.length === 0 ? (
              <option value="">No loans available</option>
            ) : (
              <>
                <option value="">Select an Option</option>
                {loansToSelect.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="account" className=" block text-gray-700 text-lg font-bold mb-4">
            Source Account:
          </label>
          <select id="account" name="account" value={account} onChange={(e) => setAccount(e.target.value)} required className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none">
            <option value="">Select an Option</option>
            {accounts.map((item) => (
              <option key={item.id} value={item.number}>
                {item.number}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 text-lg font-bold mb-2">
            Amount
          </label>
          <div className=' flex '>
            <span className="px-2 text-gray-700 font-bold text-3xl ">$</span>
            <input 
              id="amount"
              name="amount"
              value={amount}
              onChange={handleAmountChange}
              required
              className=" w-80 text-right border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-none border-black border-2"
              type="text"
              placeholder="0.00"
            />
          </div>
          {/* onInput={(e) => formatCurrency(e.target)} */}
        </div>
        <div className="mb-4 ">
          <label htmlFor="payment" className=" block text-gray-700 text-lg font-bold mb-4">
            Payments
          </label>
          <select id="payment" name="payment" value={payment} onChange={(e) => setPayment(e.target.value)} required className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none">
            <option value="">Select an Option</option>
            {/* Verifica si hay cuotas disponibles o si no se ha seleccionado un préstamo */}
            {selectedLoan === '' ? (
              <option value="">First select a loan to show  payments</option>
            ) : loanSelectedPayments.length === 0 ? (
              <option value="">No hay cuotas disponibles para este préstamo</option>
            ) : (
              <>

                {loanSelectedPayments.map((cuota, index) => (
                  <option key={index} value={cuota}>
                    {cuota} months
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <Button //Renderiza un botón  que, cuando se hace clic, ejecuta la función handleApplyClick
          className="w-52 bg-green-500 text-white font-bold py-2 px-4 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={handleApplyClick} // Pasa la función handleApplyClick aquí
        >
          Apply
        </Button>
      </div>
    </form>


  );
}

export default LoanForm;

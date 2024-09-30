import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2
import TransactionAmoutImput from "../TransactionMainComponent/TransactionAmoutImput";
import SelectLoan from "./SelectLoan";
import PaymentSelectLoan from "./PaymentSelectLoan";
import Button from "../Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  loadUser,
  fetchAvailableLoans,
  createLoan,
} from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { result } from "lodash";

function LoanForm() {
  const [amount, setAmount] = useState("");
  const [payment, setPayment] = useState("");
  const [account, setAccount] = useState("");
  const [maxLoanAmount, setMaxLoanAmount] = useState("");

  const [loanSelectedPayments, setLoanSelectedPayments] = useState([]); // Estado para las cuotas del préstamo seleccionado
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedLoan, setSelectedLoan] = useState(""); // Estado para manejar el préstamo seleccionado

  const { isLoggedIn, token, accounts, status, error } = useSelector(
    (state) => state.auth
  );

  const {
    loans,
    loansToSelect,
    loanStatus = status,
    loanError = error,
  } = useSelector((state) => state.loanReducer);
  console.log(loansToSelect);

  // Función para formatear el número con comas
  const formatNumberWithCommas = (num) => {
    if (!num) return "";
    const parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Agrega comas
    return parts.join(".");
  };

  // Función para limpiar el número, eliminando comas y espacios
  const cleanNumber = (num) => {
    return num.replace(/[$,-]/g, "").replace(/ /g, "");
  };

  // Manejar el cambio en el campo de entrada del monto
  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    const cleanValue = cleanNumber(inputValue); // Elimina las comas del valor ingresado

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
            console.error("Error al cargar usuario:", error);
            navigate("/login");
          });
      }
    } else {
      // Redirigir al usuario si no está autenticado
      navigate("/login");
    }
  }, [isLoggedIn, dispatch, navigate, token, accounts]);

  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(fetchAvailableLoans());
    }
  }, [dispatch, isLoggedIn, token]);

  useEffect(() => {
    if (error === "No more loans available.") {
      Swal.fire({
        icon: "error",
        title: "Error fetching loans",
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
    const selectedLoan = loansToSelect.find(
      (loan) => loan.name === selectedLoanName
    );
    console.log(selectedLoan);

    // Si se encuentra el préstamo, actualiza el estado con las cuotas (payments)
    if (selectedLoan) {
      setLoanSelectedPayments(selectedLoan.payments); // Guarda las cuotas del préstamo
      setMaxLoanAmount(selectedLoan.maxAmount); // Actualiza el monto máximo permitido
      // Verifica el estado del préstamo seleccionado y cuotas
      console.log("Selected Loan:", selectedLoanName);
      console.log("Loan Selected Payments:", loanSelectedPayments);
    } else {
      setLoanSelectedPayments([]); // Si no hay préstamo seleccionado, limpia las cuotas
      setMaxLoanAmount("");
    }
  };

  //Funciona pero no se si esta correcto (porque despatcha dos veces la funcion createLoan) .Pero de todas las que tengo es la que funciona bien por completo es decir cumple con los requisitos.
  // const handleApplyClick = async (e) => {
  //   e.preventDefault();

  //   // Limpiar el valor de amount antes de usarlo (sin comas)
  //   const amountValue = parseFloat(cleanNumber(amount));


  //       // Verificar si el tipo de préstamo no ha sido seleccionado
  //     if (!selectedLoan) {
  //       await Swal.fire({
  //         icon: "error",
  //         title: "Select a Loan",
  //         text: "Please ,first you have to select a loan.",
  //       });
  //       return; // Salir de la función si no se ha seleccionado un préstamo
  //     }

  //   // Verificar que todos los campos requeridos estén completos
  //   if (!selectedLoan || !account || !amount || !payment) {
  //     // Si algún campo está vacío, NO se muestra la alerta de confirmación
  //     console.log("Uno o más campos están vacíos. Se gestionará el error desde el backend.");

  //     // Dejar que el backend maneje el error, pero evitar la alerta de confirmación
  //     try {
  //       // Disparamos una solicitud simulada al backend para que maneje la falta de campos completos
  //       const loanData = {
  //         // loanId: id, // Se envía como nulo o inválido para provocar un error gestionado
  //         amount: amountValue,
  //         payments: parseInt(payment),
  //         destinationAccountNumber: account,
  //       };

  //       // Intentamos enviar con campos vacíos para provocar el error del backend
  //       await dispatch(createLoan(loanData)).unwrap();
  //     } catch (error) {
  //       // Aquí capturamos el error del backend y mostramos el mensaje correspondiente
  //       console.error("Error capturado desde el backend:", error);

  //       await Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: error,  // Muestra el mensaje del backend
  //       });
  //     }

  //     return; // Salir de la función
  //   }

  //   try {
  //     const selectedLoanData = loansToSelect.find(
  //       (loan) => loan.name === selectedLoan
  //     );

  //     if (selectedLoanData) {
  //       const { id, maxAmount } = selectedLoanData;
  //       const loanData = {
  //         loanId: id,
  //         amount: amountValue,
  //         payments: parseInt(payment),
  //         destinationAccountNumber: account,
  //       };

  //       // Si todos los campos están completos, mostrar la alerta de confirmación
  //       const confirmResult = await Swal.fire({
  //         title: "Confirm please",
  //         text: "You are about to apply for a loan. Do you want to proceed?",
  //         icon: "warning",
  //         showCancelButton: true, // Muestra el botón para cancelar
  //         confirmButtonColor: "#16A34A", // Color del botón de confirmar
  //         cancelButtonColor: "#9CA3AF", // Color del botón de cancelar
  //         confirmButtonText: "Yes, apply!",
  //         cancelButtonText: "No, cancel",
  //       });

  //       if (!confirmResult.isConfirmed) {
  //         // Si el usuario cancela la confirmación, no hacer nada
  //         return;
  //       }

  //       // Proceder con la creación del préstamo si el usuario confirmó
  //       await dispatch(createLoan(loanData)).unwrap();

  //       // Si la creación del préstamo es exitosa
  //       await Swal.fire({
  //         icon: "success",
  //         title: "Loan created successfully",
  //         text: "Your loan has been created successfully.",
  //       });

  //       const updatedLoansToSelect = await dispatch(fetchAvailableLoans()).unwrap();

  //       if (updatedLoansToSelect.length === 0) {
  //         await Swal.fire({
  //           icon: "info",
  //           title: "There are no more loans available",
  //           text: "You have applied for all available loans.",
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     // Manejo de errores global
  //     if (error.includes("the amount requested exceeds the maximum loan amount")) {
  //       await Swal.fire({
  //         icon: "error",
  //         title: "Excessive Amount",
  //         text: `The amount entered (${formatNumberWithCommas(
  //           amountValue
  //         )}) is greater than the maximum amount allowed.`,
  //       });
  //     } else {
  //       await Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: error,
  //       });
  //     }
  //   }
  // };






  // //Funciona,cachea los errores del back pero no muestra la alerta de confirmacion,en cambio ahora esta el bton de cancel.
  const handleApplyClick = async (e) => {
    e.preventDefault();

    // Verificar si el tipo de préstamo no ha sido seleccionado
    if (!selectedLoan) {
      await Swal.fire({
        icon: "error",
        title: "Select a Loan",
        text: "Please ,first you have to select a loan.",
      });
      return; // Salir de la función si no se ha seleccionado un préstamo
    }

    // if (!account) {
    //   await Swal.fire({
    //     icon: "error",
    //     title: "error",
    //     text: "The destination account must not be empty",
    //   });
    //   return;
    // }

    // if (amount <= 0) {
    //   await Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: "The amount is obligatory and must be grather tan 0",
    //   });
    //   return;
    // }
    // if (!payment) {
    //   await Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: "The payments is obligatory and must be grater than 0",
    //   });
    //   return;
    // }




    // Limpiar el valor de amount antes de usarlo (sin comas)
    const amountValue = parseFloat(cleanNumber(amount));

    try {
      // Verificar si los campos están completos
      // if (!selectedLoan || !account || !amountValue || amountValue <= 0 || !payment) {
      //   let errorMessage = 'Please, complete all the fields.';

      //   if (!selectedLoan) {
      //     errorMessage = 'Please select a loan.';
      //   }
      //   if (!account) {
      //     errorMessage = 'The source account must not be empty.';
      //   } else if (isNaN(amountValue) || amountValue <= 0) {
      //     errorMessage = 'The amount is obligatory and must be greater than 0.';
      //   } else if (!payment) {
      //     errorMessage = 'The payments must be obligatory and must be greater than 0.';
      //   }

      // Si falta información, muestra la alerta y termina la ejecución
      // await Swal.fire({
      //   icon: 'error',
      //   title: 'Incomplete Form',
      //   text: errorMessage,
      // });
      //   return;
      // }

      const selectedLoanData = loansToSelect.find((loan) => loan.name === selectedLoan
      );

      console.log("ESTO ES LO QUE HAY DENTRO DE SELECTEDlOANDATA", selectedLoanData);
      console.log("esto es lo que hay dentro e la variable loansToSelect", loansToSelect);


      if (selectedLoanData) {
        // Mostrar alerta de confirmación con SweetAlert2

        // Verificar si el monto excede el máximo permitido
        // if (amountValue > maxAmount) {
        //   await Swal.fire({
        //     icon: 'error',
        //     title: 'Excessive Amount',
        //     text: `The amount entered ($${formatNumberWithCommas(amountValue)}) is greater than the maximum amount allowed ($${formatNumberWithCommas(maxAmount)}).`,
        //   });
        //   return;
        // }

        // if (selectedLoanData) {
        //   setMaxLoanAmount(selectedLoanData.maxAmount); // Actualizamos el estado del monto máximo
        // }

        // 5. Mostrar alerta de confirmación

        const { id, maxAmount } = selectedLoanData;
        console.log(id);


        console.log(maxAmount);

        const loanData = {
          loanId: id,
          amount: amountValue,
          payments: parseInt(payment),
          destinationAccountNumber: account,
        };

        await dispatch(createLoan(loanData)).unwrap();


        // // Si la creación del préstamo es exitosa
        await Swal.fire({
          icon: "success",
          title: "Loan created successfully",
          text: "Your loan has been created successfully.",
        });


                setAmount('');
        setAccount('');
        setPayment('');
        setSelectedLoan('');
        setLoanSelectedPayments([]); // Limpia también las cuotas seleccionadas

        const updatedLoansToSelect = await dispatch(
          fetchAvailableLoans()
        ).unwrap();

        if (updatedLoansToSelect.length === 0) {
          await Swal.fire({
            icon: "info",
            title: "There are no more loans available",
            text: "You have applied for all available loans.",
          });
        }
      }
      // else {
      //   await Swal.fire({
      //     icon: 'error',
      //     title: 'Error',
      //     text: 'The selected loan could not be found.',
      //   });
      // }
    } catch (error) {
      // Manejo de errores global
      if (
        error.includes("the amount requested exceeds the maximum loan amount")
      ) {
        console.log(error);

        await Swal.fire({
          icon: "error",
          title: "Excessive Amount",
          text: `The amount entered (${formatNumberWithCommas(
            amountValue
          )}) is greater than the maximum amount allowed`,
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      }

      console.log(error);
    }
  };






//Esta es la funcion que hice con renzo que es parecida a 1ra ya que se despacha 2 veces el createLoan
  // const handleApplyClick = async (e) => {
  //   e.preventDefault();

  //   // Verificar si el tipo de préstamo no ha sido seleccionado
  //   if (!selectedLoan) {
  //     await Swal.fire({
  //       icon: "error",
  //       title: "Select a Loan",
  //       text: "Please ,first you have to select a loan.",
  //     });
  //     return; // Salir de la función si no se ha seleccionado un préstamo
  //   }

  //   // if (!account) {
  //   //   await Swal.fire({
  //   //     icon: "error",
  //   //     title: "error",
  //   //     text: "The destination account must not be empty",
  //   //   });
  //   //   return;
  //   // }

  //   // if (amount <= 0) {
  //   //   await Swal.fire({
  //   //     icon: "error",
  //   //     title: "Error",
  //   //     text: "The amount is obligatory and must be grather tan 0",
  //   //   });
  //   //   return;
  //   // }
  //   // if (!payment) {
  //   //   await Swal.fire({
  //   //     icon: "error",
  //   //     title: "Error",
  //   //     text: "The payments is obligatory and must be grater than 0",
  //   //   });
  //   //   return;
  //   // }





  //   // Limpiar el valor de amount antes de usarlo (sin comas)
  //   const amountValue = parseFloat(cleanNumber(amount));



  //   try {
  //     // Verificar si los campos están completos
  //     // if (!selectedLoan || !account || !amountValue || amountValue <= 0 || !payment) {
  //     //   let errorMessage = 'Please, complete all the fields.';

  //     //   if (!selectedLoan) {
  //     //     errorMessage = 'Please select a loan.';
  //     //   }
  //     //   if (!account) {
  //     //     errorMessage = 'The source account must not be empty.';
  //     //   } else if (isNaN(amountValue) || amountValue <= 0) {
  //     //     errorMessage = 'The amount is obligatory and must be greater than 0.';
  //     //   } else if (!payment) {
  //     //     errorMessage = 'The payments must be obligatory and must be greater than 0.';
  //     //   }

  //     // Si falta información, muestra la alerta y termina la ejecución
  //     // await Swal.fire({
  //     //   icon: 'error',
  //     //   title: 'Incomplete Form',
  //     //   text: errorMessage,
  //     // });
  //     //   return;
  //     // }

  //     const selectedLoanData = loansToSelect.find((loan) => loan.name === selectedLoan
  //     );

  //     console.log("KSJDKSJDKSDJ", selectedLoanData);
  //     console.log("esto es lo que hay dentro e la variable loansToSelect", loansToSelect);


  //     if (selectedLoanData) {
  //       // Mostrar alerta de confirmación con SweetAlert2

  //       // Verificar si el monto excede el máximo permitido
  //       // if (amountValue > maxAmount) {
  //       //   await Swal.fire({
  //       //     icon: 'error',
  //       //     title: 'Excessive Amount',
  //       //     text: `The amount entered ($${formatNumberWithCommas(amountValue)}) is greater than the maximum amount allowed ($${formatNumberWithCommas(maxAmount)}).`,
  //       //   });
  //       //   return;
  //       // }

  //       // if (selectedLoanData) {
  //       //   setMaxLoanAmount(selectedLoanData.maxAmount); // Actualizamos el estado del monto máximo
  //       // }

  //       // 5. Mostrar alerta de confirmación

  //       const { id, maxAmount } = selectedLoanData;
  //       console.log(id);


  //       console.log(maxAmount);

  //       const loanData = {
  //         loanId: id,
  //         amount: amountValue,
  //         payments: parseInt(payment),
  //         destinationAccountNumber: account,
  //       };

  //       if (!selectedLoan || !account || amount <= 0 || !payment) {

  //         //Me traigo los errores del bakc cuando apretro aplly y falta algun dato
  //         dispatch(createLoan(loanData));
  //       }else{


  //       const confirmResult = await Swal.fire({
  //         title: "Confirm please",
  //         text: "You are about to apply for a loan. Do you want to proceed?",
  //         icon: "warning",
  //         showCancelButton: true, // Muestra el botón para cancelar
  //         confirmButtonColor: "#16A34A", // Color del botón de confirmar
  //         cancelButtonColor: "#9CA3AF", // Color del botón de cancelar
  //         confirmButtonText: "Yes, apply!",
  //         cancelButtonText: "No, cancel",
  //       })

  //       if (!confirmResult.isConfirmed) {

  //         console.log("Hice click en cancelar");
  //         return;
  //       }
  //       // if(confirmResult.isConfirmed){
  //       //   console.log("hice click en aceptar");
  //       //   return;
  //       // }
  //       await dispatch(createLoan(loanData)).unwrap();

  //               // // Si la creación del préstamo es exitosa
  //       await Swal.fire({
  //         icon: "success",
  //         title: "Loan created successfully",
  //         text: "Your loan has been created successfully.",
  //       });



  //       setAmount('');
  //       setAccount('');
  //       setPayment('');
  //       setSelectedLoan('');
  //       setLoanSelectedPayments([]); // Limpia también las cuotas seleccionadas

  //     }






  //       const updatedLoansToSelect = await dispatch(
  //         fetchAvailableLoans()
  //       ).unwrap();

  //       if (updatedLoansToSelect.length === 0) {
  //         await Swal.fire({
  //           icon: "info",
  //           title: "There are no more loans available",
  //           text: "You have applied for all available loans.",
  //         });
  //       }
  //     }
  //     // else {
  //     //   await Swal.fire({
  //     //     icon: 'error',
  //     //     title: 'Error',
  //     //     text: 'The selected loan could not be found.',
  //     //   });
  //     // }
  //   } catch (error) {
  //     // Manejo de errores global
  //     if (
  //       error.includes("the amount requested exceeds the maximum loan amount")
  //     ) {
  //       console.log(error);

  //       await Swal.fire({
  //         icon: "error",
  //         title: "Excessive Amount",
  //         text: `The amount entered (${formatNumberWithCommas(
  //           amountValue
  //         )}) is greater than the maximum amount allowed.`,
  //       });
  //     } else {
  //       await Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: error,
  //       });
  //     }

  //     console.log(error);
  //   }
  // };






  //Esta es la funcion original que no funciona del todo bien ya que hago validaciones en el front y por eso no llega a cachearse el error del back pero si muestro la alerta de confirmacion del prestamo una vez que los campos esten llenos .pero funcioina mejor que todas las otras,asiqde ultima quedate con esta.
  // const handleApplyClick = async (e) => {
  //   e.preventDefault();

  //   // Verificar si el tipo de préstamo no ha sido seleccionado
  //   if (!selectedLoan) {
  //     await Swal.fire({
  //       icon: "error",
  //       title: "Select a Loan",
  //       text: "Please ,first you have to select a loan.",
  //     });
  //     return; // Salir de la función si no se ha seleccionado un préstamo
  //   }

  //   if (!account) {
  //     await Swal.fire({
  //       icon: "error",
  //       title: "error",
  //       text: "The destination account must not be empty",
  //     });
  //     return;
  //   }

  //   if (amount <= 0) {
  //     await Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "The amount is obligatory and must be grather tan 0",
  //     });
  //     return;
  //   }
  //   if (!payment) {
  //     await Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "The payments is obligatory and must be grater than 0",
  //     });
  //     return;
  //   }

  //   // Limpiar el valor de amount antes de usarlo (sin comas)
  //   const amountValue = parseFloat(cleanNumber(amount));

  //   // Validar que todos los campos estén completos


  //   try {
  //     const selectedLoanData = loansToSelect.find(
  //       (loan) => loan.name === selectedLoan
  //     );

  //     if (selectedLoanData) {
  //       // Mostrar alerta de confirmación solo si todos los campos están llenos
  //       const { id, maxAmount } = selectedLoanData;
  //       const loanData = {
  //         loanId: id,
  //         amount: amountValue,
  //         payments: parseInt(payment),
  //         destinationAccountNumber: account,
  //       };

  //       const confirmResult = await Swal.fire({
  //         title: "Confirm please",
  //         text: "You are about to apply for a loan. Do you want to proceed?",
  //         icon: "warning",
  //         showCancelButton: true, // Muestra el botón para cancelar
  //         confirmButtonColor: "#16A34A", // Color del botón de confirmar
  //         cancelButtonColor: "#9CA3AF", // Color del botón de cancelar
  //         confirmButtonText: "Yes, apply!",
  //         cancelButtonText: "No, cancel",
  //       });

  //       if (!confirmResult.isConfirmed) {
  //         return; // Si el usuario cancela, no hacer nada
  //       }

  //       // Proceder con la creación del préstamo si el usuario confirmó
  //       await dispatch(createLoan(loanData)).unwrap();

  //       // Si la creación del préstamo es exitosa
  //       await Swal.fire({
  //         icon: "success",
  //         title: "Loan created successfully",
  //         text: "Your loan has been created successfully.",
  //       });

  //       const updatedLoansToSelect = await dispatch(fetchAvailableLoans()).unwrap();

  //       if (updatedLoansToSelect.length === 0) {
  //         await Swal.fire({
  //           icon: "info",
  //           title: "There are no more loans available",
  //           text: "You have applied for all available loans.",
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     // Manejo de errores global
  //     if (error.includes("the amount requested exceeds the maximum loan amount")) {
  //       await Swal.fire({
  //         icon: "error",
  //         title: "Excessive Amount",
  //         text: `The amount entered (${formatNumberWithCommas(
  //           amountValue
  //         )}) is greater than the maximum amount allowed.`,
  //       });
  //     } else {
  //       await Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: error,
  //       });
  //     }
  //   }
  // };


  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(fetchAvailableLoans());
    }
  }, [dispatch, isLoggedIn, token]);

  // Condiciones para mostrar mensajes y formulario
  const isLoading = status === "pending";
  const noLoansAvailable = loansToSelect.length === 0;

  console.log("loansToSelect:", loansToSelect);

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

  useEffect(() => {
    console.log("Updated loansToSelect after loan creation:", loansToSelect);
  }, [loansToSelect]);



  const handleCancel = () => {
    navigate('/');
  }

  console.log("Este es el loan Seleccionado que esta en la variable SELECTEDlOAN", selectedLoan);


  return (
    <form
      className="bg-[#d4d9dd]    p-6 rounded-bl-lg rounded-tl-lg md:w-6/12"
      action=""
    >
      <div className="shadow-2xl  w-96  m-auto p-3 bg-[#F2F3F2] rounded-lg">
        <div className="mb-4  ">
          <label
            htmlFor="account"
            className=" block text-gray-700  text-lg font-bold mb-4"
          >
            Select a Loan:
          </label>

          <select
            onChange={handleLoanChange}
            id="loan"
            name="loan"
            required
            className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none"
          >
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
                    {item.name} - (Max Amount: $
                    {formatNumberWithCommas(item.maxAmount)})
                  </option>
                ))}
              </>
            )}
          </select>
          {/* Mostrar el monto máximo permitido si existe
          {maxLoanAmount && (
            <p className="text-gray-600 mt-2 text-sm">
              Max Loan Amount: ${formatNumberWithCommas(maxLoanAmount)}
            </p>
          )} */}
        </div>
        <div className="mb-4">
          <label
            htmlFor="account"
            className=" block text-gray-700 text-lg font-bold mb-4"
          >
            Destination Account:
          </label>
          <select
            id="account"
            name="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required
            className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none"
          >
            <option value="">Select an Option</option>
            {accounts.map((item) => (
              <option key={item.id} value={item.number}>
                {item.number}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            Amount
          </label>
          <div className=" flex ">
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
          <label
            htmlFor="payment"
            className=" block text-gray-700 text-lg font-bold mb-4"
          >
            Payments
          </label>
          <select
            id="payment"
            name="payment"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            required
            className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none"
          >
            <option value="">Select an Option</option>
            {/* Verifica si hay cuotas disponibles o si no se ha seleccionado un préstamo */}
            {selectedLoan === "" ? (
              <option value="">First select a loan to show payments</option>
            ) : loanSelectedPayments.length === 0 ? (
              <option value="">
                No hay cuotas disponibles para este préstamo
              </option>
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
        <div className="flex justify-between">
          <Button //Renderiza un botón  que, cuando se hace clic, ejecuta la función handleApplyClick
            className="w-40 bg-green-500 text-white font-bold py-2 px-4 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={handleApplyClick} // Pasa la función handleApplyClick aquí
          >
            Apply
          </Button>
          <Button
            className="w-40 bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-[15px] hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}

export default LoanForm;

// const handleApplyClick = (e) => { (esta funcion no va,no funcona directamente)
//   e.preventDefault();

//   // Limpiar el valor de amount antes de usarlo (sin comas)
//   const amountValue = parseFloat(cleanNumber(amount));

//   // Mostrar alerta de confirmación con SweetAlert2
//   Swal.fire({
//     title: 'Confirm please',
//     text: "You are about to apply for a loan. Do you want to proceed? ",
//     icon: 'warning',
//     showCancelButton: true, // Muestra el botón para cancelar
//     confirmButtonColor: '#16A34A', // Color del botón de confirmar
//     cancelButtonColor: '#9CA3AF ', // Color del botón de cancelar
//     confirmButtonText: 'Yes, apply!',
//     cancelButtonText: 'No, cancel',
//   }).then((result) => {
//     // Si el usuario confirma
//     if (result.isConfirmed) {
//       // Verificar si los campos están completos
//       if (!selectedLoan || !amount || !payment || !account) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Incomplete Form',
//           text: 'Please, complete all the fields.',
//         });
//         return;
//       }

//       const selectedLoanData = loansToSelect.find((loan) => loan.name === selectedLoan);

//       if (selectedLoanData) {
//         const { id, maxAmount } = selectedLoanData;

//         // // Limpiar el monto antes de convertirlo a número
//         // const amountValue = parseFloat(amount.replace(/,/g, '').replace(/ /g, ''));
//         // console.log(amountValue);

//         const maxAmountValue = parseFloat(maxAmount);
//         console.log(maxAmountValue);

//         // // Formateo del monto ingresado y el monto máximo
//         // const formattedAmount = new Intl.NumberFormat('en-US', {
//         //   style: 'currency',
//         //   currency: 'USD',
//         //   minimumFractionDigits: 2,
//         //   maximumFractionDigits: 2,
//         // }).format(amountValue);

//         // const formattedMaxAmount = new Intl.NumberFormat('en-US', {
//         //   style: 'currency',
//         //   currency: 'USD',
//         //   minimumFractionDigits: 2,
//         //   maximumFractionDigits: 2,
//         // }).format(maxAmountValue);

//         if (amountValue > maxAmountValue) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Excessive Amount',
//             text: `The amount entered (${formatNumberWithCommas(amountValue)}) is greater than the maximum amount allowed (${formatNumberWithCommas(maxAmountValue)}).`,
//           });
//           return;
//         }

//         const loanData = {
//           loanId: id,
//           amount: amountValue,
//           payments: parseInt(payment),
//           destinationAccountNumber: account,
//         };

//         dispatch(createLoan(loanData))
//           .unwrap()
//           .then((response) => {
//             Swal.fire({
//               icon: 'success',
//               title: 'Loan created successfully',
//               text: 'Your loan has been created successfully.',
//             }).then(() => {
//               dispatch(fetchAvailableLoans())
//               .unwrap()
//               .then((updatedLoansToSelect) => {
//                 if (updatedLoansToSelect.length === 0) {
//                   Swal.fire({
//                     icon: 'info',
//                     title: 'There are no more loans available',
//                     text: 'You have applied for all available loans.',
//                   });
//                 }
//               }).catch((error) => {
//                 console.error('Error al actualizar la lista de préstamos:', error);
//               });
//             });
//           })
//           .catch((error) => {
//             if (error.response.data.includes('the amount requested exceeds the maximum loan amount')) {
//               Swal.fire({
//                 icon: 'error',
//                 title: 'Monto excesivo',
//                 text: `The amount entered (${formattedAmount}) is greater than the maximum amount allowed (${formattedMaxAmount}).`,
//               });
//             } else {
//               Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: error.response.data ,
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
//     }
//     // else {
//     //   // Si el usuario cancela, no se hace nada
//     //   Swal.fire({
//     //     icon: 'info',
//     //     title: 'Cancelled',
//     //     text: 'You have cancelled the loan application.',
//     //   });
//     // }
//   });
// };
//
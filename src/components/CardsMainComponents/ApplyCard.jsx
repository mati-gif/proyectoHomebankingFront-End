import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import CardTypeSelector from './CardTypeSelector';
import CardMembershipSelector from './CardMembershipSelector';
import CardActionsButtons from './CardActionsButtons';
import { useDispatch, useSelector } from 'react-redux';
import { createCard } from '../../redux/actions/authActions';


function ApplyCard() {

  const [cardType, setCardType] = useState('');
  const [cardColor, setCardColor] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, cards } = useSelector((state) => state.auth);

  //esta funcon cumple con todo pero no se si de manera correcta ya que despacha dos vece la accion createCard.
  // const crearTarjeta = async () => {
  //   if (!cardType || !cardColor) {
  //     Swal.fire({
  //       title: 'Error',
  //       text: 'Please select both card type and color.',
  //       icon: 'error',
  //       confirmButtonText: 'Ok'
  //     });
  //     return;
  //   }

  //   // Verificar si ya tiene 3 tarjetas y evitar mostrar el Sweet Alert
  //   if (cards && cards.length >= 3) {
  //     try {
  //       await dispatch(createCard({ type: cardType, color: cardColor })).unwrap();
  //       Swal.fire({
  //         title: 'Success',
  //         text: 'Card created successfully.',
  //         icon: 'success',
  //         confirmButtonText: 'Ok'
  //       });
  //       navigate('/cards'); // Redirige a la lista de tarjetas
  //     } catch (error) {
  //       console.error('Error creating card:', error);
  //       Swal.fire({
  //         title: 'Error',
  //         text: error.message || 'You cannot create more than 3 cards.',
  //         icon: 'error',
  //         confirmButtonText: 'Ok'
  //       });
  //     }
  //     return;
  //   }

  //   // Mostrar Sweet Alert de confirmación si aún no ha alcanzado el límite
  //   const result = await Swal.fire({
  //     title: 'Confirm please',
  //     text: 'Are you sure you want to create a new card?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, apply',
  //     cancelButtonText: 'No',
  //     confirmButtonColor: "#16A34A",
  //   });

  //   if (result.isConfirmed) {
  //     try {
  //       await dispatch(createCard({ type: cardType, color: cardColor })).unwrap();
  //       Swal.fire({
  //         title: 'Success',
  //         text: 'Card created successfully.',
  //         icon: 'success',
  //         confirmButtonText: 'Ok'
  //       });
  //       navigate('/cards'); // Redirige a la lista de tarjetas
  //     } catch (error) {
  //       console.error('Error creating card:', error);
  //     }
  //   }
  // };

  //Esta es la funcion original . El return que esta aca adentro iria con la fucnion que despacha dos veces createCard.
  //   const crearTarjeta = async () => {
  //     if (!cardType || !cardColor) {
  //       Swal.fire({
  //         title: 'Error',
  //         text: 'Please select both card type and color.',
  //         icon: 'error',
  //         confirmButtonText: 'Ok'
  //       });
  //       return;
  //     }

  //     // Alerta de confirmación
  //     const result = await Swal.fire({
  //       title: 'Confirm please',
  //       text: '¿Are you sure want to create a new card?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'yes,apply',
  //       cancelButtonText: 'No',
  //       confirmButtonColor: "#16A34A",
  //     });

  //     if(result.isConfirmed){

  //     try {
  //       await dispatch(createCard({ type: cardType, color: cardColor })).unwrap();
  //       Swal.fire({
  //         title: 'Success',
  //         text: 'Card created successfully.',
  //         icon: 'success',
  //         confirmButtonText: 'Ok'
  //       });
  //       navigate('/cards'); // Redirige a la lista de tarjetas o al lugar deseado
  //     } catch (error) {
  //       console.error('Error creating card:', error);
  //     }
  //   };
  // }

  //   return (
  //     <div className="p-8 rounded-lg bg-gray-100 min-h-screen ">
  //       <h1 className="text-3xl font-bold text-center mb-8 mt-4">Apply for a Card</h1>
  //       <div className="flex flex-col  md:flex md:flex-row ">
  //         <div className="md:rounded-tl-lg md:rounded-bl-lg md:bg-[#d5d6d2]  md:shadow-lg md:w-6/12 md:flex md:flex-col md:gap-10  md:p-6 ">
  //           <div className=' md:shadow-lg md:rounded-lg  ' >
  //             <CardTypeSelector cardType={cardType} setCardTypeSelected={setCardType} />
  //             <CardMembershipSelector cardColor={cardColor} setCardColor={setCardColor} />
  //           </div>
  //           <CardActionsButtons crearTarjeta={crearTarjeta} navigate={navigate} />
  //         </div>
  //         <div style={{ backgroundImage: "url('https://www.canal26.com/media/image/2018/07/15/394053.jpg')", backgroundSize: 'cover' }} className="style={{ backgroundImage:   mt-10  flex flex-col justify-center gap-10  p-6 rounded-tr-lg rounded-br-lg md:w-6/12 md:mt-0">

  //         </div>
  //       </div>

  //     </div>
  //   );




console.log(cards);

// Filtrar tarjetas por tipo (crédito y débito)
const creditCards = cards.filter((card) => card.type === 'CREDIT') ;
const debitCards = cards.filter((card) => card.type === 'DEBIT') ;

console.log(creditCards);
console.log(debitCards);


// Validar si el usuario ha alcanzado el límite de 3 tarjetas de crédito y 3 de débito
const maxCreditCards = creditCards.length >= 3;
const maxDebitCards = debitCards.length >= 3;

console.log(maxCreditCards);
console.log(maxDebitCards);


// Función para crear tarjeta
const crearTarjeta = async () => {
  if (!cardType || !cardColor) {
    Swal.fire({
      title: 'Error',
      text: 'Please select both card type and color.',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
    return;
  }

  // Si ya tiene 3 tarjetas de crédito y 3 de débito, no permitir crear una nueva tarjeta
  if (maxCreditCards && maxDebitCards) {
    return; // Salir sin hacer nada
  }

  // Alerta de confirmación
  const result = await Swal.fire({
    title: 'Confirm please',
    text: 'Are you sure you want to create a new card?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, apply',
    cancelButtonText: 'No',
    confirmButtonColor: "#16A34A",
  });

  if (result.isConfirmed) {
    try {
      await dispatch(createCard({ type: cardType, color: cardColor })).unwrap();
      Swal.fire({
        title: 'Success',
        text: 'Card created successfully.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      navigate('/cards'); // Redirige a la lista de tarjetas
    } catch (error) {
      console.error('Error creating card:', error);
    }
  }
};

// Función para cancelar
const handleCancel = () => {
  navigate('/');
};

return (
  <div className="p-8 rounded-lg bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold text-center mb-8 mt-4">Apply for a Card</h1>
    <div className="flex flex-col md:flex md:flex-row">
      <div className="md:rounded-tl-lg md:rounded-bl-lg md:bg-[#d5d6d2] md:shadow-lg md:w-6/12 md:flex md:flex-col md:gap-10 md:p-6">
        <div className="md:shadow-lg md:rounded-lg">
          <CardTypeSelector cardType={cardType} setCardTypeSelected={setCardType} />
          <CardMembershipSelector cardColor={cardColor} setCardColor={setCardColor} />
        </div>
        <div className="flex space-x-2 mt-4">
          {/* Botón Apply que se deshabilita si el usuario tiene 3 tarjetas de crédito y 3 de débito */}
          <button
            onClick={crearTarjeta}
            className={`${
              maxCreditCards && maxDebitCards
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white font-bold py-2 px-4 rounded-full shadow-md w-40`}
            disabled={maxCreditCards && maxDebitCards}
          >
            Apply
          </button>
          
          {/* Botón Cancelar que siempre está activo */}
          <button
            onClick={handleCancel}
            type="button"
            className="text-white font-bold py-2 bg-gray-500 px-4 rounded-full shadow-md w-40"
          >
            Cancel
          </button>
        </div>

        {/* Mensaje de error cuando el usuario ya no puede crear más tarjetas */}
        {maxCreditCards && maxDebitCards && (
          <p className="text-lg font-bold text-center text-red-600 mt-2">
            You cannot create more than 3 credit and 3 debit cards.
          </p>
        )}
      </div>
      <div
        style={{
          backgroundImage: "url('https://www.canal26.com/media/image/2018/07/15/394053.jpg')",
          backgroundSize: 'cover',
        }}
        className="mt-10 flex flex-col justify-center gap-10 p-6 rounded-tr-lg rounded-br-lg md:w-6/12 md:mt-0"
      />
    </div>
  </div>
);
}









export default ApplyCard;

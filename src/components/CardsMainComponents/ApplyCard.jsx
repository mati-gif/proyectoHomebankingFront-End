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
  const { status, error } = useSelector((state) => state.auth);


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

    // Alerta de confirmación
    const result = await Swal.fire({
      title: 'Confirm please',
      text: '¿Are you sure want to create a new card?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'yes,apply',
      cancelButtonText: 'No',
      confirmButtonColor: "#16A34A",
    });

    if(result.isConfirmed){

    try {
      await dispatch(createCard({ type: cardType, color: cardColor })).unwrap();
      Swal.fire({
        title: 'Success',
        text: 'Card created successfully.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      navigate('/cards'); // Redirige a la lista de tarjetas o al lugar deseado
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };
}

  return (
    <div className="p-8 rounded-lg bg-gray-100 min-h-screen ">
      <h1 className="text-3xl font-bold text-center mb-8 mt-4">Apply for a Card</h1>
      <div className="flex flex-col  md:flex md:flex-row ">
        <div className="md:rounded-tl-lg md:rounded-bl-lg md:bg-[#d5d6d2]  md:shadow-lg md:w-6/12 md:flex md:flex-col md:gap-10  md:p-6 ">
          <div className=' md:shadow-lg md:rounded-lg  ' >
            <CardTypeSelector cardType={cardType} setCardTypeSelected={setCardType} />
            <CardMembershipSelector cardColor={cardColor} setCardColor={setCardColor} />
          </div>
          <CardActionsButtons crearTarjeta={crearTarjeta} navigate={navigate} />
        </div>
        <div style={{ backgroundImage: "url('https://www.canal26.com/media/image/2018/07/15/394053.jpg')", backgroundSize: 'cover' }} className="style={{ backgroundImage:   mt-10  flex flex-col justify-center gap-10  p-6 rounded-tr-lg rounded-br-lg md:w-6/12 md:mt-0">

        </div>
      </div>
      {/* {status === "failed" && error && (
                <div className="mt-4 text-red-500">
                    <p>{error}</p>
                </div>
            )} */}
    </div>
  );
}


export default ApplyCard;

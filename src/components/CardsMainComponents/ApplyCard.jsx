import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import CardTypeSelector from './CardTypeSelector';
import CardMembershipSelector from './CardMembershipSelector';
import CardActionsButtons from './CardActionsButtons';
import { useDispatch, useSelector } from 'react-redux';
import {createCard} from '../../redux/actions/authActions';


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


  return (
    <div className="p-8 rounded-lg bg-gray-100 min-h-screen border-4 border-green-200">
      <h1 className="text-3xl font-bold text-center mb-8 mt-4">Apply for a Card</h1>
      <div className="flex flex-col  md:flex md:flex-row ">
        <form className="md:w-6/12 md:bg-gray-200 md:flex md:flex-col md:gap-10  md:p-6 md:rounded-lg">
          <CardTypeSelector cardType={cardType} setCardTypeSelected={setCardType} />
          <CardMembershipSelector cardColor={cardColor} setCardColor={setCardColor} />
          <CardActionsButtons crearTarjeta={crearTarjeta}  navigate={navigate} />
        </form>
        <div className="mt-10  flex flex-col justify-center gap-10  p-6 rounded-lg md:w-6/12 md:mt-0">
          <img src="https://www.canal26.com/media/image/2018/07/15/394053.jpg" className="h-4/5" alt="Card Image" />
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

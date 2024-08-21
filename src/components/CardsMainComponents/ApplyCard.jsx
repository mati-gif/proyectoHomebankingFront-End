import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import CardTypeSelector from './CardTypeSelector';
import CardMembershipSelector from './CardMembershipSelector';
import CardActionsButtons from './CardActionsButtons';

function ApplyCard() {
  const navigate = useNavigate();
  const [cardTypeSelected, setCardTypeSelected] = useState('');
  const [cardColor, setCardColor] = useState('');
  // const [arrayDebitCards, setArrayDebitCards] = useState([]);
  // const [arrayCreditCards, setArrayCreditCards] = useState([]);

  // Solicita datos de tarjetas al cargar el componente
  // const solicitarDatosCards = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/clients/1');
  //     const tarjetasCredito = response.data.tarjetas.filter((item) => item.type === 'CREDITO');
  //     const tarjetasDebito = response.data.tarjetas.filter((item) => item.type === 'DEBITO');
  //     console.log(tarjetasCredito);
  //     console.log(tarjetasDebito);
      

  //     setArrayCreditCards(tarjetasCredito);
  //     setArrayDebitCards(tarjetasDebito);
  //   } catch (error) {
  //     console.error('Error al obtener las tarjetas:', error);
  //   }
  // };

  // useEffect(() => {
  //   solicitarDatosCards();
  //   console.log("entro en el useEfect");
    


  // }, []);

  // // // Maneja la creación de tarjetas
  // const handleCardCreation = async () => {
  //   if (cardType === 'debit' && arrayDebitCards.length >= 3) {
  //     Swal.fire('Solo puedes tener hasta tres tarjetas de débito.');
  //     return;
  //   } else if (cardType === 'credit' && arrayCreditCards.length >= 3) {
  //     Swal.fire('Solo puedes tener hasta tres tarjetas de crédito.');
  //     return;
  //   }

  //   try {
  //     const newCardData = {
  //       type: cardType,
  //       membership: cardMembership,
  //     };

  //     // const response = await axios.post('http://localhost:8080/api/clients', newCardData);
  //     // const newCard = response.data;

  //     // console.log(newCard);
  //     const response = await axios.post('http://localhost:8080/api/clients/new', newCardData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true    });


  //     //     if (cardType === 'debit') {
  //     //       setArrayDebitCards([...arrayDebitCards, newCard]);
  //     //     } else if (cardType === 'credit') {
  //     //       setArrayCreditCards([...arrayCreditCards, newCard]);
  //     //     }

  //     //     Swal.fire('Éxito!', 'Tu tarjeta ha sido creada.', 'success');
  //     //     navigate('/cards'); // Redirige a la vista de tarjetas o a donde sea necesario

  //   } catch (error) {
  //     console.error('Error al crear la tarjeta:', error);
  //     Swal.fire('Error', 'Hubo un problema al crear tu tarjeta. Inténtalo más tarde.', 'error');
  //   }
  // };


const crearTarjeta = async () =>{
  try {
  console.log(cardColor,cardTypeSelected);
console.log("se apreto el boton crear");
  
// const response = axios.post(`http://localhost:8080/api/clients/1?card=${cardTypeSelected}&color=${cardColor}`)
    // const tarjetasCredito = response.data.tarjetas.filter((item) => item.type === 'CREDITO');
    // const tarjetasDebito = response.data.tarjetas.filter((item) => item.type === 'DEBITO');
}  catch (error) {
      console.error('Error al obtener las tarjetas:', error);
    }
  }

  useEffect(() => {
    crearTarjeta();
    console.log("entro en el useEfect");
})

  return (
    <div className="p-8 rounded-lg bg-gray-100 min-h-screen border-4 border-green-200">
      <h1 className="text-3xl font-bold text-center mb-8 mt-4">Apply for a Card</h1>

      <div className="flex flex-col  md:flex md:flex-row ">
        <form className="md:w-6/12 md:bg-gray-200 md:flex md:flex-col md:gap-10  md:p-6 md:rounded-lg">
          <CardTypeSelector cardType={cardTypeSelected} setCardTypeSelected={setCardTypeSelected} />
          <CardMembershipSelector cardColor={cardColor} setCardColor={setCardColor}/>
          <CardActionsButtons crearTarjeta={crearTarjeta} navigate={navigate} />
        </form>
 
        <div className="mt-10  flex flex-col justify-center gap-10  p-6 rounded-lg md:w-6/12 md:mt-0">
          <img src="https://www.canal26.com/media/image/2018/07/15/394053.jpg" className="h-4/5" alt="Card Image" />
        </div>
      </div>
    </div>
  );
}


export default ApplyCard;

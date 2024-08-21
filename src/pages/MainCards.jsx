import React, { useEffect, useState } from 'react'
import CardsCard from '../components/CardsMainComponents/CardsCard'
import { Link } from 'react-router-dom'
import axios from "axios"
import Button from '../components/Button'


function MainCards() {

    // const cardsCreditdArray = [
    //     { id: 1, typeCard: "credit", cardColor: "Black", numberCard: "1234-3214-4563-6987", cvv: "123", firstName: "Melba", lastName: "Morel", fechaVencimiento: "25/03/2029 " },
    //     { id: 2, typeCard: "credit", cardColor: "Gold", numberCard: "1234-3214-4563-6987", cvv: "123", firstName: "Melba", lastName: "Morel", fechaVencimiento: "25/03/2029 " },
    //     { id: 3, typeCard: "credit", cardColor: "Platinum", numberCard: "1234-3214-4563-6987", cvv: "123", firstName: "Melba", lastName: "Morel", fechaVencimiento: "25/03/2029 " },
    // ]

    // const cardsDebitArray = [
    //     { id: 4, typeCard: "debit", cardColor: "Black", numberCard: "1234-3214-4563-6987", cvv: "654", firstName: "Melba", lastName: "Morel", fechaVencimiento: "25/03/2029 " },
    //     { id: 5, typeCard: "debit", cardColor: "Gold", numberCard: "1234-3214-4563-6987", cvv: "654", firstName: "Melba", lastName: "Morel", fechaVencimiento: "25/03/2029 " },
    //     { id: 6, typeCard: "debit", cardColor: "Platinum", numberCard: "1234-3214-4563-6987", cvv: "654", firstName: "Melba", lastName: "Morel", fechaVencimiento: "25/03/2029 " }
    // ]

    const [arrayDebitCards, setArrayDebitCards] = useState([])
    const [arrayCreditCards, setArrayCreditCards] = useState([])



    const solicitarDatosCards = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/clients/1');
            const tarjetasCredito = response.data.tarjetas.filter((item) => item.type === 'CREDITO');
            const tarjetasDebito = response.data.tarjetas.filter((item) => item.type === 'DEBITO');

            setArrayCreditCards(tarjetasCredito);
            setArrayDebitCards(tarjetasDebito);

            console.log('Tarjetas de crédito:', tarjetasCredito);
            console.log('Tarjetas de débito:', tarjetasDebito);
        } catch (error) {
            console.error('Error al obtener las tarjetas:', error);
        }
    };

    useEffect(() => {
        console.log('Se cargó el useEffect desde cards');
        solicitarDatosCards();
    }, []);








    return (
        <div className="bg-[#E5EDF1] p-8 min-h-screen ">
            <div className=' flex flex-col items-end justify-end'>
{/*                 <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-[10px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" type="button" >
                    <Link to="/applyCard">apply a new card</Link>
                </button> */}
                <Button  className="bg-green-500 text-white font-bold py-2 px-4 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" type="button">
                <Link to="/applyCard">apply a new card</Link>
                </Button>

                <h1 className="text-3xl font-bold text-center mb-8 mt-4 m-auto">Yours Cards</h1>
            </div>
            <h2 className="text-4xl font-bold mb-5">Credit Cards</h2>
            <div className=" flex justify-center gap-10 " >

                {arrayCreditCards.map((item) => ( 
                    <CardsCard key={item.id} typeCard={item.type} cardColor={item.color} numberCard={item.number} cvv={item.cvv} firstName={item.cardHolder} fechaVencimiento={item.thruDate} />
                ))} 
            </div>

            <h2 className="text-4xl font-bold mb-5 mt-8">Debit Cards</h2>
            <div className=" flex justify-center gap-10">
                {arrayDebitCards.map((item) => (
                    <CardsCard key={item.id} typeCard={item.type} cardColor={item.color} numberCard={item.number} cvv={item.cvv} firstName={item.cardHolder} fechaVencimiento={item.thruDate} />

                ))} 
            </div>


        </div>
    )
}

export default MainCards
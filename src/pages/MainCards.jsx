import React, { useEffect, useState } from 'react'
import CardsCard from '../components/CardsMainComponents/CardsCard'
import { Link } from 'react-router-dom' //Link: Importa un componente de navegación de react-router-dom para crear enlaces entre rutas.
import axios from "axios"
import Button from '../components/Button'


function MainCards() {

    const [arrayDebitCards, setArrayDebitCards] = useState([])
    const [arrayCreditCards, setArrayCreditCards] = useState([])

    const solicitarDatosCards = async () => {
        try {//si la solicitud tiene éxito, la promesa se resuelve con la respuesta del servidor, y await asigna el resultado a la variable response.
            const response = await axios.get('http://localhost:8080/api/clients/1');//axios.get('http://localhost:8080/api/clients/1') es una llamada asíncrona que retorna una promesa
            const tarjetasCredito = response.data.cards.filter((item) => item.type === 'CREDIT');
            const tarjetasDebito = response.data.cards.filter((item) => item.type === 'DEBIT');

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
    }, []);//[]: El array vacío indica que este useEffect solo debe ejecutarse una vez, cuando el componente se monta.

    return (
        <div className="bg-[#E5EDF1] p-8 min-h-screen ">
            <div className=' flex flex-col items-end justify-end'>
                <Button className="bg-green-500 text-white font-bold py-2 px-4 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" type="button">
                    <Link to="/applyCard">apply a new card</Link>
                </Button>
                <h1 className="text-3xl font-bold text-center mb-8 mt-4 m-auto">Yours Cards</h1>
            </div>
            <h2 className="text-4xl font-bold mb-5">Credit Cards</h2>
            <div className=" flex justify-center gap-10 " >
                {arrayCreditCards.map((item) => (  //map: Itera sobre arrayCreditCards para renderizar un componente CardsCard por cada tarjeta de crédito en el array.
                    <CardsCard key={item.id} typeCard={item.type} cardColor={item.color} numberCard={item.number} cvv={item.cvv} firstName={item.cardHolder} fechaVencimiento={item.thruDate} />
                    //Renderiza una tarjeta utilizando las props pasadas (typeCard, cardColor, numberCard, etc.).
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
import React from 'react'

function CardsCard(props) {

  console.log(props);
  
    const cardColors = {
        BLACK: 'bg-[#222] text-white',
        GOLD: 'bg-gradient-to-l from-[#CB9547] to-[#f9db5c] text-black',
        PLATINUM: 'bg-gradient-to-l from-[#95999c] to-[#d4d9dd] text-black',
    };
  return (
    <div className={` w-96 h-56 p-4 rounded-lg shadow-md ${cardColors[props.cardColor]}`}>
        <div className='flex  w-full border-black border-2 '>
        <h3 className="text-sm font-bold">Color Tarjeta: {props.cardColor}</h3>
        <h3 className=" text-2xl font-bold" >Tipo de tarjeta: {props.typeCard}</h3>
        </div>
<h3 className="text-sm font-bold">Numero Tarjeta: {props.numberCard}</h3>
<h3 className="text-sm font-bold">codigo de seguridad: {props.cvv}</h3>
<h3 className="text-sm font-bold">Nombre y apellido: {props.firstName}</h3>
<h3 className="text-sm font-bold">fecha vencimiento: {props.fechaVencimiento}</h3>

</div>
  )
}

export default CardsCard
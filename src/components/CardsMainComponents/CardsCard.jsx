import React from 'react'

function CardsCard(props) {
//CardsCard es una representación de una tarjeta en la UI.
  console.log(props);
  
    const cardColors = {
      PLATINUM: 'bg-gradient-to-l from-[#2f3131] to-[#020509] text-white',
        GOLD: 'bg-gradient-to-l from-[#CB9547] to-[#f9db5c] text-black',
        SILVER: 'bg-gradient-to-l from-[#95999c] to-[#d4d9dd] text-black',
    };
  return (
    <div className="perspective-1000 w-96 h-56">
    <div className={`card w-full h-full rounded-lg shadow-md ${cardColors[props.cardColor]}`}>
      <div className={`card-side card-front p-4`}>
        <div className='flex justify-between'>
        <div className='flex  items-start '>
          <img
            className={`w-12 h-10 object-cover rounded-[20%] ${cardColors[props.cardColor]}`}
            src="https://previews.123rf.com/images/miceking/miceking1603/miceking160300029/53109625-chip-de-la-tarjeta-de-cr%C3%A9dito-chip-de-la-tarjeta-sim.jpg"
            alt=""
          />
          </div>
          <div className=' flex flex-col   '>
          <h3 className="mt-4 text-2xl font-bold "> Card {props.typeCard}</h3>
          <div className=' flex justify-end '>
          <img className='w-10 h-8 object-cover rounded-[20%] ' src="https://previews.123rf.com/images/daboost/daboost2211/daboost221100084/193551686-ilustraci%C3%B3n-del-mapa-del-mundo-aislado-en-un-fondo-blanco.jpg" alt="" />
          </div>
          </div>
        </div>
        <div className=' text-center'> 
        <h3 className="mt-2 text-lg font-bold"> {props.numberCard}</h3>
        </div>
        <h3 className="mt-2 text-sm font-bold">Card Holder: {props.firstName}</h3>
        <h3 className="mt-2 text-sm font-bold">Due Date: {props.fechaVencimiento}</h3>
      </div>
      
      <div className={`card-side card-back p-4 ${cardColors[props.cardColor]}`}>
        <div className="flex flex-col justify-center items-center h-full gap-4">
          <div className="w-96 h-12 bg-black"></div>
          <div className='w-full h-12 bg-white flex justify-end items-center'>
          <h3 className={`text-xl font-bold ${props.cardColor === 'PLATINUM' ? 'text-black' : 'text-black'}`}>CVV: {props.cvv}</h3>
          </div>
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default CardsCard
import React from 'react'

function CardAccount(props) {

  console.log(props);
  
  return (
    <div className="bg-[#868686] w-80 flex flex-col justify-center items-center  border-black border-2  gap-10 bg-gray-200 p-4 rounded-lg shadow-md md:flex-col md:w-96" >
<h3 className="text-sm font-bold" >Nombre de la cuenta: {props.number}</h3>
<h3 className="text-2xl font-bold">Monto: ${props.balance}</h3>
<h3 className="text-sm font-bold">Fecha de creacion: {props.creationDate}</h3>
    </div>
  )
}

export default CardAccount
import React from 'react'

function CardAccount(props) {
  return (
    <div className=" flex flex-col justify-center items-center w-96 border-black border-2  gap-10 bg-gray-200 p-4 rounded-lg shadow-md" >
<h3 className="text-sm font-bold" >Nombre de la cuenta: {props.nombreCuenta}</h3>
<h3 className="text-2xl font-bold">Monto: {props.fondos}</h3>
<h3 className="text-sm font-bold">Fecha de creacion: {props.fechaCreacion}</h3>
    </div>
  )
}

export default CardAccount
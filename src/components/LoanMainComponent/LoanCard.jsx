import React from 'react'

function LoanCard(props) {
  return (
    <div className=" flex flex-col justify-center items-center w-96 border-black border-2  gap-10 bg-gray-200 p-4 rounded-lg shadow-md" >
<h3 className="text-sm font-bold" >Tipo de prestamo: {props.typeLoan}</h3>
<h3 className="text-2xl font-bold">Monto: {props.amount}</h3>
<h3 className="text-sm font-bold">Fecha de solicitud: {props.fechaSolicitud}</h3>
    </div>
  )
}

export default LoanCard
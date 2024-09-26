import React from 'react'
import { CalendarIcon, CreditCardIcon, DollarSignIcon } from "lucide-react"


function LoanCard(props) {

  // Función para formatear el monto con separadores de miles y dos decimales
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      // style: 'currency',
      // currency: 'USD',
      minimumFractionDigits: 2, // Asegura que siempre se muestren dos decimales
      maximumFractionDigits: 2, // Asegura que no se muestren más de dos decimales
    }).format(amount);
  };

  return (
    // <div className=" flex flex-col justify-center items-center  border-black border-2  gap-10 bg-gray-200 p-4 rounded-lg shadow-md md:w-96 md:h-52" >
    //   <h3 className="text-sm font-bold" >Type of Loan: {props.typeLoan}</h3>
    //   <h3 className="text-2xl font-bold">Amount: {formatAmount(props.amount)}</h3>
    // </div>






    <div className="w-full bg-white shadow-lg border  overflow-hidden        gap-10 rounded-lg shadow-md md:w-96 md:h-52">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
        <div className="text-xl font-bold text-white">Type of Loan</div>
        <p className="text-xl opacity-90 text-white">{props.typeLoan}</p>
      </div>
      <div className="p-4 bg-gradient-to-b from-white to-[#A7F3D0]/10">
        <div className="mb-4">
          <p className="text-lg text-gray-800 mb-1">Amount:</p>
          <p className="text-2xl font-bold text-gray-800 flex items-center">
          <DollarSignIcon className="h-6 w-6 text-green-500 mr-1" />

          {formatAmount(props.amount)}
          </p>
        </div>
        {/* <div className="flex items-center text-gray-600">
          <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
          <p className="text-sm">From date: </p>
          <p className="text-2xl font-bold text-gray-800 flex items-center">{props.fechaSolicitud}</p>
        </div> */}
      </div>
    </div>

  )
}

export default LoanCard
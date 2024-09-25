import React from 'react'
import { CalendarIcon, CreditCardIcon,DollarSignIcon  } from "lucide-react"

function CardAccount(props) { //permite pasar datos de un componente padre a un componente hijo

  console.log(props);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,  // Asegura que siempre se muestren dos decimales
      maximumFractionDigits: 2,  // Asegura que no se muestren más de dos decimales
    }).format(amount);
  };

  return (
    // <div className="bg-[#868686] w-80 flex flex-col justify-center items-center  border-black border-2  gap-10 bg-gray-200 p-4 rounded-lg shadow-md md:flex-col md:w-96" >
    //   <h3 className="text-sm font-bold" >Name  Account: {props.number}</h3>
    //   <h3 className="text-2xl font-bold">Amount: {formatAmount(props.balance)}</h3>
    //   <h3 className="text-sm font-bold">Date Created: {props.creationDate}</h3>
    // </div>

    <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-80 flex flex-col justify-between items-stretch border-gray-300 border rounded-xl shadow-lg overflow-hidden md:w-96">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-bold">{}</h2>
        <p className="text-sm opacity-80">Name  Account: {props.number}</p>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <DollarSignIcon className="text-green-600" />
          <div>
            <p className="text-sm text-gray-600">Amount:</p>
            <p className="text-2xl font-bold">{formatAmount(props.balance)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <CalendarIcon className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Date Created:</p>
            <p className="text-md">{props.creationDate}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <CreditCardIcon className="text-purple-600" />
          <div>
            <p className="text-sm text-gray-600">Tipo de Cuenta</p>
            <p className="text-md">Cuenta Corriente</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardAccount
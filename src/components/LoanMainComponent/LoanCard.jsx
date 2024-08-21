import React from 'react'

function LoanCard(props) {

  // Función para formatear el monto con separadores de miles y dos decimales
const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2, // Asegura que siempre se muestren dos decimales
    maximumFractionDigits: 2, // Asegura que no se muestren más de dos decimales
  }).format(amount);
};

  return (
    <div className=" flex flex-col justify-center items-center  border-black border-2  gap-10 bg-gray-200 p-4 rounded-lg shadow-md md:w-96 md:h-52" >
<h3 className="text-sm font-bold" >Type of Loan: {props.typeLoan}</h3>
<h3 className="text-2xl font-bold">Amount: {formatAmount(props.amount)}</h3>
    </div>
  )
}

export default LoanCard
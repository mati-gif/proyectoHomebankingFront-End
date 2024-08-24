import React from 'react'

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
    <div className="bg-[#868686] w-80 flex flex-col justify-center items-center  border-black border-2  gap-10 bg-gray-200 p-4 rounded-lg shadow-md md:flex-col md:w-96" >
      <h3 className="text-sm font-bold" >Name  Account: {props.number}</h3>
      <h3 className="text-2xl font-bold">Amount: {formatAmount(props.balance)}</h3>
      <h3 className="text-sm font-bold">Date Created: {props.creationDate}</h3>
    </div>
  )
}

export default CardAccount
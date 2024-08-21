import TableMainDetailsAccount from './TableMainDetailsAccount'
import CardAccount from './CardAccount'
import React, {useEffect, useState} from "react"
import axios from "axios"
import { useParams } from "react-router-dom";
import AccountTableDetailTransaction from './AccountTableDetailTransaction';

function MainDetailAccount() {
  const { id } = useParams();// hook que me va a retornar un objeto , me va a traer params de la ruta.
console.log(id);



const [detailsAccount,setDetailAccount] = useState([])
// const [selectedAccount, setSelectedAccount] = useState();



const solicitarDatosCuentaDetalle = async () => {
  try {
      const response = await axios.get(`http://localhost:8080/api/accounts/${id}`);
      console.log(response);
      
      setDetailAccount(response.data)
      console.log(response.data.transacciones);
      
      // const tarjetasCredito = response.data.tarjetas.filter((item) => item.type === 'CREDITO');
      // const tarjetasDebito = response.data.tarjetas.filter((item) => item.type === 'DEBITO');

      // setArrayCreditCards(tarjetasCredito);
      // setArrayDebitCards(tarjetasDebito);

// Buscar la cuenta específica por ID dentro del array "cuentas"
// const cuenta = response.data.find(cuenta => cuenta.id === parseInt(id));
// console.log(cuenta);

// setSelectedAccount(cuenta);

  } catch (error) {
      console.error('Error al obtener las cuentas:', error);
  }
};

useEffect(() => {
  console.log('Se cargó el useEffect desde cards');
  solicitarDatosCuentaDetalle();
}, []);





  
  return (
  

<div className="  bg-gray-100 p-8 min-h-screen flex  flex-col ">

<h1 className="text-3xl font-bold text-center mb-8">Your selected account!</h1>
<div className="  flex justify-center mb-20">
  <img src="https://us.123rf.com/450wm/boy8888/boy88882305/boy8888230500015/205500967-businessman-using-mobile-online-banking-and-payments-digital-marketing-financial-and-banking.jpg?ver=6" alt="" className="rounded-lg shadow-md w-full h-96 md:w-2/3" />
</div>

    

<div className='border-purple-500 border-2 mb-3  flex justify-center '>
<CardAccount  number={detailsAccount.number} balance={detailsAccount.balance} creationDate={detailsAccount.creationDate}/>

</div>

<div className=' border-red-500 border-2 flex justify-around '>


    <TableMainDetailsAccount transacciones={detailsAccount.transacciones} />


    </div>


  </div>
  )
}

export default MainDetailAccount
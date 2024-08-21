import React, {useEffect, useState} from "react"

import CardAccount from '../components/AccountMainComponents/CardAccount'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'; // Importa SweetAlert2

function MainAccount() {

  const navigate = useNavigate();//



  // const[cardAccounArray,setCardAccountArray] = useState([
  //     {id:1,nombreCuenta:"VIN001",fondos:"$250.000",fechaCreacion:"25/05/23"},
  //     {id:2,nombreCuenta:"VIN002",fondos:"$200.000",fechaCreacion:"25/05/23"}
    
  //   ])



const [arrayAccount,setArrayAccount] = useState([])
const [clientName, setClientName] = useState([]);  // Nuevo estado para almacenar el nombre del cliente

// https://hp-api.onrender.com/api/characters


const solicitarDatosCuenta = ()=>{


// let arrayAuxCuenta = []

axios.get("http://localhost:8080/api/clients/1")
.then((response)=>{
  // arrayAuxCuenta = response.data
  // console.log(arrayAuxCuenta);

  setArrayAccount(response.data.cuentas)
  console.log(response.data.cuentas);

  console.log(response.data.tarjetas);
  

  setClientName(response.data.firstName); // Asigna el nombre del cliente al estado clientName
})

.catch((error)=>{
  console.log(error);
  
})
}


useEffect(()=>{

console.log("Se cargo el useEffect De los personajes");


solicitarDatosCuenta()

// setArrayPersonajes(arrayPersonajes)



},[])


const añadirAccountArray = () => {
  // Muestra la alerta de verificación usando SweetAlert2
  Swal.fire({
    title: 'Are you sure you want to create a new account?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#16A34A',
    cancelButtonColor: '#9CA3AF',
    confirmButtonText: 'Yes, generate',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí debes realizar la lógica para generar la cuenta
      // Este es el lugar donde puedes hacer la llamada a la API para crear la cuenta
      // y actualizar el estado con la nueva cuenta.

      // Ejemplo de cómo podrías hacerlo:
      // setArrayAccount([...arrayAccount, { id: newId, number: 'newNumber', balance: 'newBalance', creationDate: 'newDate' }]);

      Swal.fire(
        'Creatted!',
        'Your account has been generated.',
        'success'
      );
    }
  });
};

// const añadirAccountArray = ()=>{
//   setCardAccountArray([...cardAccounArray,{id:3+(cardAccounArray.length+1),nombreCuenta:"VIN003"+(cardAccounArray.length+1),fondos:"$250.000"+(cardAccounArray.length+1),fechaCreacion:"25/05/23"+(cardAccounArray.length+1)}])
// }


// useEffect(()=>{
//   console.log("Se cargo el componente main");// se crea y se monta por primera vez solamente cuando se carga la app.(Sucede solo una vez)
//   //Se usa para hacer peticiones get porque queremos que los datos solamente se muentren una vez cuando se carga la app y no cada vez que haya un cambio de estado.
  

// },[cardAccounArray])//array de dependencias del useEffect que escucha los estados. Se va a ejecutar cuando se cree por primrera vez el componente
//y cuando se produzca un cambio en el estado de cardAccounArray.












  return (
    <div className="bg-[#E5EDF1] p-8 min-h-screen">

      <h1 className="text-3xl font-bold text-center mb-8">Welcome,{clientName}!</h1>
      <div className="  flex justify-center mb-6">
        <img src="https://images.ctfassets.net/h7wmg0jhythh/59bBPtUVTa1ScIxYr6HZgZ/eb3e9026c052542f0df5cbf976f1d8da/2_AYUDA_708x275.webp" alt="" className="rounded-lg shadow-md w-full  md:w-2/3" />
      </div>
      <div className="flex justify-center  mb-6">
    <button onClick={añadirAccountArray} className="bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded-full shadow-md">
      Request Account
    </button>
  </div>




  <div  className=" flex justify-center flex-wrap  gap-10" >   
      
      {arrayAccount.map((item)=>(//Itera sobre arrayAccount y renderiza un componente CardAccount para cada cuenta.

        <Link to={`/accounts/${item.id}`} >
        <CardAccount  key={item.id} number={item.number} balance={item.balance} creationDate={item.creationDate}/>
        {/* Pasa los datos de la cuenta (number, balance, creationDate) al componente CardAccount para que se muestren. */}

        </Link>

    
      ))}
        </div>
    </div>
    

  )
}

export default MainAccount
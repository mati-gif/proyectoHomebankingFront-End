import LoanCard from './LoanCard'
import axios from "axios"
import React, {useEffect, useState} from "react"


function LoanLoan() {

    const [allLoans, setAllLoans] = useState([])


    const solicitarDatosPrestamos = () => {

        // let arrayAuxCuenta = []

        axios.get("http://localhost:8080/api/clients/1")
            .then((response) => {
                // arrayAuxCuenta = response.data
                // console.log(arrayAuxCuenta);

                setAllLoans(response.data.loans)



            })

            .catch((error) => {
                console.log(error);

            })
    }


    useEffect(() => {

        console.log("Se cargo el useEffect De los personajes");


        solicitarDatosPrestamos()

        // setArrayPersonajes(arrayPersonajes)



    }, [])

    return (
        <div className="p-8  rounded-lg bg-[#E5EDF1] p-8 min-h-screen ">

            <h1 className="text-3xl font-bold text-center mb-8 mt-4">Yours Loans</h1>

            <div className='flex justify-center  md:w-full '>

                <div className=" gap-4 flex flex-col  md:flex md:flex-row md:justify-center md:gap-10" >

                    {allLoans.map((item) => (

                        <LoanCard key={item.id} typeLoan={item.name} amount={item.amount} fechaSolicitud={item.fechaSolicitud} />
                    ))}

                </div>
            </div>


        </div>
    )
}

export default LoanLoan
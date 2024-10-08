import LoanCard from './LoanCard'
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { loadUser } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { loadLoans } from '../../redux/actions/loanAction';




function LoanLoan() {

    const [allLoans, setAllLoans] = useState([])
    const navigate = useNavigate(); // Declara useNavigate
    const dispatch = useDispatch();

    const { isLoggedIn, token } = useSelector((state) => state.auth);
    const {loans} = useSelector ((state)=>state.loanReducer)

    // const solicitarDatosPrestamos = () => {

    //     axios.get("http://localhost:8080/api/clients/1")
    //         .then((response) => {
    //             setAllLoans(response.data.loans)
    //         })

    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    // useEffect(() => {
    //     console.log("Se cargo el useEffect De los personajes");

    //     solicitarDatosPrestamos()
    // }, [])

    useEffect(() => {
        if (isLoggedIn && token) {
            dispatch(loadLoans()).catch((error) => {
                    console.error('Error loading user:', error);
                    navigate('/login');
                });

        } else {

            // Redirigir al usuario si no está autenticado
            navigate('/login'); // Cambia '/login' por la ruta de tu página de login
        }
    }, [isLoggedIn, dispatch, navigate, token]);


    return (
        <div className="p-8  rounded-lg bg-[#E5EDF1] p-8 min-h-screen ">
            <h1 className="text-3xl font-bold text-center mb-8 mt-4">Yours Loans</h1>
            <div className='flex justify-center  md:w-full '>
                <div className="gap-4 flex flex-col md:flex md:flex-row md:justify-center md:gap-10">
                    {loans && loans.length > 0 ? (
                        loans.map((item) => (
                            <LoanCard key={item.id} typeLoan={item.name} amount={item.amount} fechaSolicitud={item.fechaSolicitud} />
                        ))
                    ) : (
                        <p className="text-red-500 text-xl font-bold text-center">
                            You don't have loans yet. Apply for one.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoanLoan
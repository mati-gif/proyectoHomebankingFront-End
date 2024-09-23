import React from 'react'
import LoanForm from '../components/LoanMainComponent/LoanForm'
import { Link } from 'react-router-dom'
import Button from '../components/Button'


function MainLoan() {
  return (
    <div className="    p-8  rounded-lg bg-[#E5EDF1] p-8 min-h-screen   ">
      <div className='flex flex-col items-end justify-end'>
        <Button className="bg-green-500 text-white font-bold py-2 px-4 rounded-[15px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" type="button">
          <Link to="/loanLoan"> View your Loans</Link>
        </Button>
        <h1 className="text-3xl font-bold text-center mb-8 mt-4 m-auto">Apply for a Loan</h1>
      </div>
      <div className='flex- flex-col   md:flex md:flex-row  '>
        <LoanForm />
        <div style={{ backgroundImage: "url('https://media.istockphoto.com/id/1145371340/es/foto/el-socio-ha-cometido-un-fraude-en-el-contrato-de-compraventa-y-le-han-entregado-un-dinero-y.jpg?s=612x612&w=0&k=20&c=dNzREG3bfU1GyZTpnBGP_Nu2LHW6d6geKG6wbY7piFo=')", backgroundSize: 'cover' }} className='    p-6 rounded-tr-lg rounded-br-lg md:w-6/12'>
        </div>
      </div>
    </div>
  )
}

export default MainLoan
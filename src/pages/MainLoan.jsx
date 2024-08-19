import React from 'react'
import LoanForm from '../components/LoanMainComponent/LoanForm'
import { Link } from 'react-router-dom'


function MainLoan() {
  return (
    <div className="    p-8  rounded-lg bg-[#E5EDF1] p-8 min-h-screen border-4 border-green-200 ">
      <div className='border-orange-500 border-2 flex flex-col items-end justify-end'>
    <button className='bg-green-500 text-white font-bold py-2 px-4 rounded-[10px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50' >
          <Link to="/loanLoan">view your loans</Link>
        </button>
        <h1 className="text-3xl font-bold text-center mb-8 mt-4 m-auto">Apply for a Loan</h1>
      </div>
      <div className='flex- flex-col   md:flex md:flex-row bg-[#48e] '>

        <LoanForm />

        <div className='  bg-[#d4d9dd] flex flex-col gap-10 border-black border-2 p-6 rounded-lg md:w-6/12'>
          <img src="https://us.123rf.com/450wm/itchaznong/itchaznong2307/itchaznong230711261/208220908-profesional-de-contabilidad-asi%C3%A1tico-que-calcula-las-facturas-del-hogar-revisa-y-analiza-las.jpg?ver=6" alt="" />
        </div>

      </div>


    </div>
  )
}

export default MainLoan
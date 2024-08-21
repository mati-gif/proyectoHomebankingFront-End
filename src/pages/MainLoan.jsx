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

        <div className='   flex flex-col justify-center gap-10  p-6 rounded-lg md:w-6/12'>
          <img src="https://us.123rf.com/450wm/itchaznong/itchaznong2307/itchaznong230711261/208220908-profesional-de-contabilidad-asi%C3%A1tico-que-calcula-las-facturas-del-hogar-revisa-y-analiza-las.jpg?ver=6" alt="" />
        </div>

      </div>


    </div>
  )
}

export default MainLoan
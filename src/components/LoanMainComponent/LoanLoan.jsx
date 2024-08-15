import React from 'react'
import LoanCard from './LoanCard'

function LoanLoan() {
    const loanArray = [
        {id:1,typeLoan:"Hipotecario",amount:"$200.000",fechaSolicitud:"25/05/23"},
        {id:2,typeLoan:"Personal",amount:"$100.000",fechaSolicitud:"25/05/24"}

    ]
  return (
    <div className="p-8  rounded-lg bg-gray-100 p-8 min-h-screen border-4 border-green-200">

    <h1  className="text-3xl font-bold text-center mb-8 mt-4">Yours Loans</h1>
    
    <div className='flex '>
    
    <div className=" flex justify-center gap-10" >   

    {loanArray.map((item)=>(

        <LoanCard key={item.id} typeLoan={item.typeLoan} amount={item.amount} fechaSolicitud={item.fechaSolicitud} />
    ))}
 
</div>
    </div>
    
    
        </div>
  )
}

export default LoanLoan
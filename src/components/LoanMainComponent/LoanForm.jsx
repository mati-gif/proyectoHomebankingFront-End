import React from 'react'
import TransactionAmoutImput from '../TransactionMainComponent/TransactionAmoutImput'
import SelectLoan from './SelectLoan'
import LoanSelectAccountOrigen from './LoanSelectAccountOrigen'
import PaymentSelectLoan from './PaymentSelectLoan'


function LoanForm() {
  return (
    <form className=' w-6/12 bg-gray-200 flex flex-col gap-10 border-black border-2 p-6 rounded-lg' action="">

        <SelectLoan/>
        <LoanSelectAccountOrigen/>

        <TransactionAmoutImput/> {/* Es un componente que esta en la carpeta Transaction component */}
        <PaymentSelectLoan/>


</form>

  )
}

export default LoanForm
import React from 'react'
import TransactionAmoutImput from '../TransactionMainComponent/TransactionAmoutImput'
import SelectLoan from './SelectLoan'
import LoanSelectAccountOrigen from './LoanSelectAccountOrigen'
import PaymentSelectLoan from './PaymentSelectLoan'
import Button from '../Button'


function LoanForm() {
  return (
    <form className='  bg-[#d4d9dd] flex flex-col gap-10 border-black border-2 p-6 rounded-lg md:w-6/12' action="">

        <SelectLoan/>
        <LoanSelectAccountOrigen/>

        <TransactionAmoutImput/> {/* Es un componente que esta en la carpeta Transaction component */}
        <PaymentSelectLoan/>

        <Button  text="apply" bgColor="bg-[#48e]"/>
</form>

  )
}

export default LoanForm
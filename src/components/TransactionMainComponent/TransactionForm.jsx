import React from 'react'
import ImputMainTransaction from './ImputMainTransaction'
import TransactionSelectAccountDestiny from './TransactionSelectAccountDestiny'
import TransactionAmoutImput from './TransactionAmoutImput'
import TransactionDescriptionImput from './TransactionDescriptionImput'

function TransactionForm() {
  return (

    <form className=' w-6/12 bg-gray-200 flex flex-col gap-10 border-black border-2 p-6 rounded-lg' action="">

        <ImputMainTransaction/>
        <TransactionSelectAccountDestiny/>
        <TransactionAmoutImput/>
        <TransactionDescriptionImput/>
    
    
    </form>
    
  )
}

export default TransactionForm
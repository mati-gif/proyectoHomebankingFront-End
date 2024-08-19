import React from 'react'
import ImputMainTransaction from './ImputMainTransaction'
import TransactionSelectAccountDestiny from './TransactionSelectAccountDestiny'
import TransactionAmoutImput from './TransactionAmoutImput'
import TransactionDescriptionImput from './TransactionDescriptionImput'
import Button from '../Button'

function TransactionForm() {
  return (

    <form className='  bg-gray-200 flex flex-col gap-10 border-black border-2 p-6 rounded-lg md:w-6/12' action="">

        <ImputMainTransaction/>
        <TransactionSelectAccountDestiny/>
        <TransactionAmoutImput/>
        <TransactionDescriptionImput/>
    
        <Button text="make" bgColor="bg-[#48e]"/>
    </form>
    
  )
}

export default TransactionForm
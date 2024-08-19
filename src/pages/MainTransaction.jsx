import React from 'react'
//import TransactionForm from '..components/TransactionMainComponent/TransactionForm'
import TransactionForm from "../components/TransactionMainComponent/TransactionForm"
function MainTransaction() {
  return (
    <div className="p-8  rounded-lg bg-[#E5EDF1] p-8 min-h-screen border-4 border-green-200">

    <h1  className="text-3xl font-bold text-center mb-8 mt-4">Make a Transaction</h1>
    
    <div className='flex- flex-col   md:flex md:flex-row bg-[#48e] bg-[#d4d9dd]'>
    
    <TransactionForm/>
    
    <div className='  bg-gray-200 flex flex-col gap-10 border-black border-2 p-6 rounded-lg md:w-6/12'>
        <img src="https://www.shutterstock.com/image-photo/businessman-hand-using-mobile-phone-600nw-2385062097.jpg" alt="" />
        </div>

    </div>
    
    
        </div>
  )
}

export default MainTransaction
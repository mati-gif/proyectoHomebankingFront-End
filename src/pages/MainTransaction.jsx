import React from 'react'
//import TransactionForm from '..components/TransactionMainComponent/TransactionForm'
import TransactionForm from "../components/TransactionMainComponent/TransactionForm"
function MainTransaction() {
  return (
    <div className="p-8   bg-[#E5EDF1]  min-h-screen  " >
      <h1 className="text-3xl font-bold text-center mb-8 mt-4">Make a Transaction</h1>
      <div className='flex- flex-col justify-center  bg-[#D5D6D2]    md:flex md:flex-row rounded-lg' >
        <TransactionForm />
        <div className=' w-full   flex flex-col p-6 bg-[#D4D9DD]'  >
        <div className='rounded-lg w-[550px] h-[650px]' style={{ backgroundImage: "url('https://cdn-icons-gif.flaticon.com/15579/15579001.gif')", backgroundSize: 'cover',backgroundPositionY:"top" }}>

        </div>
          {/* <div className=' text-[#000] mt-10 border-4 border-yellow-700 '>
            <p className='text-[40px] text-center'> We make it easier for you</p>
          </div> */}

        </div>
      </div>
    </div>
  )
}

export default MainTransaction
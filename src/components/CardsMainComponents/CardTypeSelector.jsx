import React from 'react'

function CardTypeSelector() {
  return (
    <div className=' bg-gray-200 h-40 w-full border-black border-4 flex flex-col  gap-5' >
    <label className=' ml-10 font-bold text-xl mt-4 ' htmlFor="cardType">Select card type</label>
    <select className=' bg-transparent  ml-10 p-3 w-96   border border-gray-400 rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-gray-600 bg-none' id="cardType" name="cardType">
      <option className='' value="">Select an option</option>
      <option value="">Debit</option>
      <option value="">Credit</option>
    </select>
  </div>
  )
}

export default CardTypeSelector
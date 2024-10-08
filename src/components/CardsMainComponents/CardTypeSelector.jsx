import React from 'react'

function CardTypeSelector({ cardType, setCardTypeSelected }) {
  return (
    <div className=' bg-[#fff]  opacity-70 h-40  flex flex-col  gap-5' >
      <label className=' ml-10 font-bold text-xl mt-4 ' htmlFor="cardType">Select card type</label>
      <select
        className=' bg-transparent ml-10 p-3 border border-gray-400 rounded-[10px] py-2 px-3 text-gray-700 focus:outline-none focus:border-gray-600 bg-none md:w-96'
        id="cardType"
        name="cardType"
        value={cardType}
        onChange={(e) => { setCardTypeSelected(e.target.value) }}
      >
        <option className='' value="">Select an option</option>
        <option value="DEBIT">DEBIT</option>
        <option value="CREDIT">CREDIT</option>
      </select>
    </div>
  )
}

export default CardTypeSelector
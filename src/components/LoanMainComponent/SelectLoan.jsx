import React from 'react'

function SelectLoan() {
  return (

    <div className="mb-4 ">
      <label htmlFor="account" className=" block text-gray-700 text-lg font-bold mb-4">
        Select a Loan:
      </label>
      <select id="account" name="account" required className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none">
        <option value="">Select an Option</option>
        <option value=""> Hipotecario</option>
        <option value=""> Personal</option>
        <option value=""> Automotriz</option>
      </select>
    </div>
  )
}

export default SelectLoan
import React from 'react'

function TransactionSelectAccountDestiny() {
  return (
    <div className="mb-4 ">
      <label htmlFor="account" className=" block text-gray-700 text-lg font-bold mb-4">
        Cuenta de origen:
      </label>
      <select id="account" name="account" className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none">
        <option value="">Select an Option</option>
        <option value=""> VIN001</option>
        <option value=""> VIN002</option>


        
      </select>
    </div>
  )
}

export default TransactionSelectAccountDestiny
import React from 'react'

function TransactionAmoutImput() {
  return (
    <div className="mb-4">
    <label htmlFor="account" className="block text-gray-700 text-lg font-bold mb-2">
      Amount
    </label>
      <input id="account" name="account" className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none border-black border-2" type="number" />

  </div>
  )
}

export default TransactionAmoutImput
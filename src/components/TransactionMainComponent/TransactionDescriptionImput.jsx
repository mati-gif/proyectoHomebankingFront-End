import React from 'react'

function TransactionDescriptionImput() {
  return (
    <div className="mb-4">
      <label htmlFor="description" className="block text-gray-700 text-lg font-bold mb-2">
        Description:
      </label>
      <input type="text" id="description" name="description" className="border rounded-[10px] w-full py-2 px-3 text-gray-700 focus:outline-none" />
    </div>
  )
}

export default TransactionDescriptionImput
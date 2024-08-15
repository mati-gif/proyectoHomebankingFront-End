import React from 'react'

function CardActionsButtons() {
  return (
    <div className="flex space-x-2 mt-4">
      <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-[10px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" type="button">Apply</button>
      <button className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-[10px] hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50" type="button">Cancel</button>
    </div>
  )
}

export default CardActionsButtons
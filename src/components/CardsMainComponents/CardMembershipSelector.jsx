import React from 'react'

function CardMembershipSelector({  setCardColor,cardColor }) {
  return (
    <div className=' bg-gray-200 h-40 w-full  flex flex-col  gap-5'>
        <label className=' ml-10 font-bold text-xl mt-4 ' htmlFor="cardMembership">Select card membership (color)</label>
        <select
        className='bg-transparent ml-10 p-3 border border-gray-400 rounded-[10px] py-2 px-3 text-gray-700 focus:outline-none focus:border-gray-600 bg-none md:w-96'
        id="cardMembership"
        name="cardMembership"
        value={cardColor}
        onChange={(e) => { setCardColor(e.target.value) 
        } }
        
      >
      
      {/* setCardMembership(console.log(e.target.value)) */}
    <option value="">Select an option</option>
    <option value="black"> Black</option>
    <option value="gold">Gold</option>
    <option value="platinum">Platinium</option>
    </select>
    </div>
  )
}

export default CardMembershipSelector
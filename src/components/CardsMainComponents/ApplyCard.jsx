import React from 'react'

import CardMembershipSelector from './CardMembershipSelector'
import CardTypeSelector from './CardTypeSelector'
import CardActionsButtons from './CardActionsButtons'

function ApplyCard() {
  return (
    <div className="p-8  rounded-lg bg-gray-100 p-8 min-h-screen border-4 border-green-200">

<h1  className="text-3xl font-bold text-center mb-8 mt-4">Apply for a card</h1>

<div className='flex flex-col  md:bg-[#900] md:flex md:flex-row  md:border-[#f4f] md:border-2'>
<form className=' md:w-6/12 md:bg-gray-200 md:flex md:flex-col md:gap-10 md:border-black md:border-2 md:p-6 md:rounded-lg' action="">
    <CardTypeSelector/>
    <CardMembershipSelector/>
    <CardActionsButtons/>

</form>


<div className=' mt-10  bg-gray-200 flex flex-col gap-10 border-[#48e] border-2 p-6 rounded-lg md:w-6/12 md:mt-0'>
    <img src="https://www.canal26.com/media/image/2018/07/15/394053.jpg" className='h-4/5' alt="" />
    </div>


</div>


    </div>
  )
}

export default ApplyCard
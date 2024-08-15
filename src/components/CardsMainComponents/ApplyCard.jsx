import React from 'react'

import CardMembershipSelector from './CardMembershipSelector'
import CardTypeSelector from './CardTypeSelector'
import CardActionsButtons from './CardActionsButtons'

function ApplyCard() {
  return (
    <div className="p-8  rounded-lg bg-gray-100 p-8 min-h-screen border-4 border-green-200">

<h1  className="text-3xl font-bold text-center mb-8 mt-4">Apply for a card</h1>

<div className='flex '>
<form className=' w-6/12 bg-gray-200 flex flex-col gap-10 border-black border-2 p-6 rounded-lg' action="">
    <CardTypeSelector/>
    <CardMembershipSelector/>
    <CardActionsButtons/>


</form>


<div className=' w-6/12 bg-gray-200 flex flex-col gap-10 border-black border-2 p-6 rounded-lg'>
    <img src="https://s3-alpha-sig.figma.com/img/636b/88c7/59cb4ffe6362b2a409e34bfe9f2a68a6?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ixxXheXTopMS0J7e2D5FNJ3sSFaF8zG9gHeLgbscW75Xp8T1c1voxhA1u4V0TOQl2gRRxnhW-rD3i-NQOqbgBJQBSXH3WPk5Ff0vAZt~br0rvmz4x5cLDyRSzDGIy4V8GFCamLjuoRW-ssvsQmu7PLCtLKClxkFjgC3L8mVda9JPlq7UAiqi3s~fGX~DSvbOvhKGWyHUBH9zPJWhOzAhZYMoZHzEj8XQrejxf~SdJOcnculdO9DOGJlW8Nd2y8be0hy4fh1zewzNyRLtIUIJ-WyfKfRb-tEZpxcQp5tJlL1ciklEAKzlFpHHVx7eEE~-JvZVkv7rIrmidkYTopWb5g__" alt="" />
    </div>
</div>


    </div>
  )
}

export default ApplyCard
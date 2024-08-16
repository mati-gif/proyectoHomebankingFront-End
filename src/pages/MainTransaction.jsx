import React from 'react'
//import TransactionForm from '..components/TransactionMainComponent/TransactionForm'
import TransactionForm from "../components/TransactionMainComponent/TransactionForm"
function MainTransaction() {
  return (
    <div className="p-8  rounded-lg bg-gray-100 p-8 min-h-screen border-4 border-green-200">

    <h1  className="text-3xl font-bold text-center mb-8 mt-4">Make a Transaction</h1>
    
    <div className='flex '>
    
    <TransactionForm/>
    
    <div className=' w-6/12 bg-gray-200 flex flex-col gap-10 border-black border-2 p-6 rounded-lg'>
        <img src="https://s3-alpha-sig.figma.com/img/d52e/95a9/3eea5a389f1b1f0cd4e363758f4ac0ac?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EEfajKIcEAyq5mWp4B-5~y~BM5gAIiS0jKDqyMauxhkvHmtB1pWTEtR9rkwPVHqHcbsX7Otu828rk1ktOckXNtHhKPdRI5ZlOGh1pp3QGPXCkVnPHFp4PVlIB63aqiulYXWxDYha8nw9SxPw916yZ5C2jIXwDQMygHJhBSWuSo6YZ2rMz15sAT6YQ8UIIDRU~eUjVhh9FqiuEzvIcgHtSfIM6tbfYw5bVIi0n-VrBcON99WS97rPkLh~YS-CWaUbw7aTCWpEtr91lIsB1Yr5PPa3iiW61S3-c0Cm-E8h~xsX57GaNtxNN51XnWIwDDveCEfT84ITKS5PvmvFBp-fLQ__" alt="" />
        </div>

    </div>
    
    
        </div>
  )
}

export default MainTransaction
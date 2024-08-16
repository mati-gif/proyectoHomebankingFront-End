import React from 'react'
import LoanForm from '../components/LoanMainComponent/LoanForm'

function MainLoan() {
  return (
    <div className="p-8  rounded-lg bg-gray-100 p-8 min-h-screen border-4 border-green-200">

    <h1  className="text-3xl font-bold text-center mb-8 mt-4">Apply for a Loan</h1>
    
    <div className='flex '>
    
    <LoanForm/>
    
    <div className=' w-6/12 bg-gray-200 flex flex-col gap-10 border-black border-2 p-6 rounded-lg'>
        <img src="https://s3-alpha-sig.figma.com/img/3e6c/c17f/f9b168707582f11d2c21597bf7892256?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UBQSWs-x3JMmQr0U~am6dYwFqkCr4HQQnsxipiOVKfD6vlp~6xPxmXYXwYsCqOp-xBbLsg~wDWOq8Zpx-u-5MEGqxNO0qHPM0j8K75nsdScYaJLCHGQ7-QXOIFu2RITuoqVjtOUY7ukmWSRDr2wFME1X3yJyd4k8phxJoTAPZlPKXtbyPo0--94p84dukm1U-JROrXHv6d1GhVImXi-mDR3w09fnOqHx-FSILgbvBvXCUjkIv6MIQ38DjAIFes-yevS~n0Jc7sR4g4dmihWeRYD~N-b1kfMHbu-rzSsKeeSK10NXT-82DwSMKxF1s0loxv2ZQMIeWQYuu1-xe8UBjQ__" alt="" />
        </div>

    </div>
    
    
        </div>
  )
}

export default MainLoan
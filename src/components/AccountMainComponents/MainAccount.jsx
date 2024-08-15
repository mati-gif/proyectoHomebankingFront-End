import React from 'react'
import CardAccount from './CardAccount'

function MainAccount() {

const cardAccounArray = [
  {id:1,nombreCuenta:"VIN001",fondos:"$250.000",fechaCreacion:"25/05/23"},
  {id:2,nombreCuenta:"VIN002",fondos:"$200.000",fechaCreacion:"25/05/23"}

]

  return (
    <div className="bg-gray-100 p-8 min-h-screen">

      <h1 className="text-3xl font-bold text-center mb-8">Welcome,Melba!</h1>
      <div className="  flex justify-center mb-6">
        <img src="https://s3-alpha-sig.figma.com/img/1589/ae70/d714bc526ccd7aa1c30fb9f94b47ed77?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mRMnJbrQqWrbMoSg2f2se1RMtCHt0HOs~7SCXldwdIJYW3ijOXec8f082xpKL3oyhU-6-XxlQrPOJqa7MVeZ-tK42o7py-7RPZlP7mP7YBc628jWW5uQeCnuEfpzav~t0PmFwiTzlosrLoejMRigTWA7pLGeF7Q-TMUBva4CoXMoM0mSijaNzxZg68M8NQEyMAYQ1vBgHC5Sm53kctBtOMart9qSFJ9q5qK-jvXCHpYMRnjjR8Qq1laVAExnMMvQpS9gARGrGNPjDiPVsAWMN5sipSRg-m79h5nsNJKdBRypdAzzUklH0p6KKBRZpRNLPpNuBKtOcTTACil6EEsgmw__" alt="" className="rounded-lg shadow-md w-full  md:w-2/3" />
      </div>
      <div className="flex justify-center mb-6">
    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md">
      Request Account
    </button>
  </div>




  <div className=" flex justify-center gap-10" >      
      {cardAccounArray.map((item)=>(

        
      <CardAccount  key={item.id} nombreCuenta={item.nombreCuenta} fondos={item.fondos} fechaCreacion={item.fechaCreacion}/>
    
      ))}
        </div>
    </div>
    

  )
}

export default MainAccount
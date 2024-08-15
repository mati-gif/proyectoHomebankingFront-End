import React from 'react'
import TableMainDetailsAccount from './TableMainDetailsAccount'
import CardAccount from './CardAccount'

function MainDetailAccount(props) {

  
  return (
  

<div className="bg-gray-100 p-8 min-h-screen">

<h1 className="text-3xl font-bold text-center mb-8">Your selected account!</h1>
<div className="  flex justify-center mb-20">
  <img src="https://s3-alpha-sig.figma.com/img/1589/ae70/d714bc526ccd7aa1c30fb9f94b47ed77?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mRMnJbrQqWrbMoSg2f2se1RMtCHt0HOs~7SCXldwdIJYW3ijOXec8f082xpKL3oyhU-6-XxlQrPOJqa7MVeZ-tK42o7py-7RPZlP7mP7YBc628jWW5uQeCnuEfpzav~t0PmFwiTzlosrLoejMRigTWA7pLGeF7Q-TMUBva4CoXMoM0mSijaNzxZg68M8NQEyMAYQ1vBgHC5Sm53kctBtOMart9qSFJ9q5qK-jvXCHpYMRnjjR8Qq1laVAExnMMvQpS9gARGrGNPjDiPVsAWMN5sipSRg-m79h5nsNJKdBRypdAzzUklH0p6KKBRZpRNLPpNuBKtOcTTACil6EEsgmw__" alt="" className="rounded-lg shadow-md w-full  md:w-2/3" />
</div>

    

    {/* <CardAccount /> */}
    
{/*     <CardAccount key={props.id} numeroCuenta={props.numeroCuenta} fondos={props.fondos} fechaCreacion={props.fechaCreacion}/>
 */}


<div className=' border-black border-2 flex justify-around gap-10 w-full'>
{/* <div className=" flex flex-col justify-center items-center w-96 border-black border-2  gap-10 bg-gray-200 p-4 rounded-lg shadow-md" >
<h3 className="text-sm font-bold" >Nombre de la cuenta: VIN002</h3>
<h3 className="text-2xl font-bold">Monto: $250.0000</h3>
<h3 className="text-sm font-bold">Fecha de creacion: 25/05/23</h3>

    </div> */}

    <CardAccount key={1} nombreCuenta={"VIN001"} fondos={"$250.000"} fechaCreacion={"25/03/23"}/>

    <TableMainDetailsAccount/>


    </div>
  </div>
  )
}

export default MainDetailAccount
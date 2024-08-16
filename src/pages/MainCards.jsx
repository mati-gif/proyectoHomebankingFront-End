import React from 'react'
import CardsCard from '../components/CardsMainComponents/CardsCard'

function MainCards() {

    const cardsCreditdArray =[
        {id:1,typeCard:"credit",cardColor:"Black",numberCard:"1234-3214-4563-6987",cvv:"123",firstName:"Melba",lastName:"Morel",fechaVencimiento:"25/03/2029 "},
        {id:2,typeCard:"credit",cardColor:"Gold",numberCard:"1234-3214-4563-6987",cvv:"123",firstName:"Melba",lastName:"Morel",fechaVencimiento:"25/03/2029 "},
        {id:3,typeCard:"credit",cardColor:"Platinum",numberCard:"1234-3214-4563-6987",cvv:"123",firstName:"Melba",lastName:"Morel",fechaVencimiento:"25/03/2029 "},
    ]

        const cardsDebitArray =[
        {id:4,typeCard:"debit",cardColor:"Black",numberCard:"1234-3214-4563-6987",cvv:"654",firstName:"Melba",lastName:"Morel",fechaVencimiento:"25/03/2029 "},
        {id:5,typeCard:"debit",cardColor:"Gold",numberCard:"1234-3214-4563-6987",cvv:"654",firstName:"Melba",lastName:"Morel",fechaVencimiento:"25/03/2029 "},
        {id:6,typeCard:"debit",cardColor:"Platinum",numberCard:"1234-3214-4563-6987",cvv:"654",firstName:"Melba",lastName:"Morel",fechaVencimiento:"25/03/2029 "}
        ]
        
  return (
    <div className="bg-gray-100 p-8 min-h-screen border-4 border-green-200">
      <h1 className="text-3xl font-bold text-center mb-8">Yours Cards</h1>

      <h2 className="text-4xl font-bold mb-5">Credit Cards</h2>
<div className=" flex justify-center gap-10" >

        {cardsCreditdArray.map((item)=>(
            <CardsCard key={item.id} typeCard={item.typeCard} cardColor={item.cardColor} numberCard={item.numberCard} cvv={item.cvv} firstName={item.firstName} lastName={item.lastName} fechaVencimiento={item.fechaVencimiento} />
        ))}
</div>

<h2 className="text-4xl font-bold mb-5 mt-8">Debit Cards</h2>
<div className=" flex justify-center gap-10">
    {cardsDebitArray.map((item)=>(
            <CardsCard key={item.id} typeCard={item.typeCard} cardColor={item.cardColor} numberCard={item.numberCard} cvv={item.cvv} firstName={item.firstName} lastName={item.lastName} fechaVencimiento={item.fechaVencimiento} />

    ))}
</div>


    </div>
  )
}

export default MainCards
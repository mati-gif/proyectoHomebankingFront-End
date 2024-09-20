import React from 'react'

function Footer() {
  return (

    <footer >
      <div className='h-[75px]  flex flex-col justify-evenly bg-[#B2B5E0] mt-auto md:flex-row'>
        <div className=' h-full gap-4 flex  justify-center items-center '>
          <p className=' font-inter text-[20px]  font-normal leading-[24.2px]   '>
            © 2024 - All rights reserved
          </p>
          <p className='text-[28px] font-bold'>|</p>
          <a className='text-[20px] font-inter font-normal leading-[24.2px] ' href="https://www.linkedin.com/in/matias-soria-8706a719b/" target='blank'>linkedin</a>
        </div>

        <div className='flex justify-center items-center gap-4'>
          <a href="http://instagram.com  " target='blank' >
            <img className='w-10 h-10 ' src="https://cdn-icons-png.flaticon.com/256/1216/1216929.png" alt="" />
          </a>
          <a href="http://facebook.com" target='blank'>
            <img className='w-10 h-10 ' src="https://cdn-icons-png.flaticon.com/256/20/20673.png" alt="" />
          </a>
          <a href="http://whatsapp.com" target='blank'>
            <img className='w-10 h-10 ' src="https://cdn-icons-png.flaticon.com/256/123/123741.png" alt="" />
          </a>
        </div>
      </div>
    </footer>



  )
}

export default Footer
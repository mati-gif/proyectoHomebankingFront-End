import React from 'react'
import Img from './Img'
import Nav from './nav';


function Header(props) {
  return (
    <header className="bg-[#D9D9D9] p-2 flex justify-between items-center border-4 border-black">
    
    {/* <Nav/> */}
    {props.children}
      {/*       https://png.pngtree.com/png-vector/20210827/ourlarge/pngtree-online-banking-icon-png-png-image_3827785.jpg
 */}
      <a className='px-3' href='#'>Logout
        <img className='w-14 h-12' src="https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png" alt="" />
      </a>

    </header>


  )
}

export default Header






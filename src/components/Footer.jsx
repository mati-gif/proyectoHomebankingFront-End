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
            <img className='w-10 h-10 ' src="https://s3-alpha-sig.figma.com/img/10cb/6299/5526c8c55a109d8877f56f59df9f553a?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Exn22E7s-BbJCOdHZ5HB3ggOW80UqbCeeTfa5sA7JrlONgH-ClVdMLeyZ8jQLiartLTKI9djCXQxkMZdXlQmRvJ72oMZj4qUeA7G6PrKN67TBcaTMiV8e4aAjrgn64RyMPcGvrJehz5k~AILBznBJ46hZGECXmu2JDbCA7x7bJti0DSH8TAMJ5c0T71nHTkUu~OSngwLjzTGZAiYTw90hTfjJDG6Cs4o8B7ICYSxOP6MuBdthsBPeSEvKNRo8CDolWxoSCStE~5OhJdAJvFAnc-ya42IoqqIlNwo7wX9EKtKYbL~4E4khTyoGxv6vmvCpdgEmUYKSGQ7iE9H80R4Gw__" alt="" />
          </a>
          <a href="http://facebook.com" target='blank'>
            <img className='w-10 h-10 ' src="https://s3-alpha-sig.figma.com/img/d7a1/6ab1/0f2c562a29fe1b87f2131f20a64ff2f7?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OjHaAeVgVwxudSjI-TCsRhUuHPj9EuRxBv9ksHaYtSaosjrJ~5IRIyPHOMxxEMXdK8pW9FJQmcMme7xVeFhoRJF~fa7DO8kI6Vz8oH0m3ajGU-AeUqfmuRGyuBrS2kUq9k6U-XaUblf6AbyRpmuJEmTIWRd7DJJVF7UwwKZyDU5hfUXgz4vhQ6MsAsy647EuqjHOZKnHxrsxexR3tyx~on~LnHJa0zaYw2LOoEhQ7w4L2au1avh-aqOX~ehdKW63zTFAqfjka5EtxfgHa4pwzGxm3G4MtEph2P7gq9GdFBl5WopVWAwdpddPkOj8HiHv30Cd0eM-teCfhyg9-ymCOQ__" alt="" />
          </a>
          <a href="http://whatsapp.com" target='blank'>
            <img className='w-10 h-10 ' src="https://s3-alpha-sig.figma.com/img/b52c/6dbd/b7e6585836d1a0a8612d521ab64e68a0?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VzoLu9FBg-9q61SZc1PX2dbWhHgrdYKn3TjPgVROWdqK10qpKnY~xZiIULb7haVioqFVG4zNsuXU3RyfMkA6sBPg0na3mPyZPNH4ri447pr6UMzFwxBR8PtNvu2Nx6ollJcFvXgn~kUfX-Ipt2E~A~lfyS8K3r8QULkKVrO1ApQ3kCSIYcFPt2oaR-8fEcGfGS-QO4qczx4QcbPc1rhci55izwA9qiOpqx0I12UI-Sp0bNnv2ZIZgBxgjMVfuxY0QHnvZFqZ0QLRG5rKYBceR1ybbQImAB9bsvPy2pqEyUZiI1Mja8hg11Gr0ForYgS27jXZX-fx7n3tfyE3~tb5-g__" alt="" />
          </a>
        </div>
      </div>

    </footer>



  )
}

export default Footer
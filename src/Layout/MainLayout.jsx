import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom'
import Nav from '../components/nav';


function MainLayout({ children }) {
    return (
        <div>
            <Header>
                <Nav/>
            </Header>
            {/* <main className="">
                {children}
            </main> */}
            
        <Outlet/>
            <Footer/>

        </div>
    )
}

export default MainLayout
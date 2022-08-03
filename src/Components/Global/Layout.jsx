import { Outlet } from 'react-router-dom'
import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Aside from "./Aside"

const Layout = () => {
    return (
        <>
            <Aside />
            <div className="main_content">
            <Header />

            <main>
                <Outlet/>
            </main>
            <Footer />
            </div>
        </>
    )
}

export default Layout

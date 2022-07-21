import { Outlet } from 'react-router-dom'
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet/>
            </main>
            <Footer />
        </>
    );
};

export default Layout;
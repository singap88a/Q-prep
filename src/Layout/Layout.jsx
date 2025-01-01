import React from 'react'
import { Outlet, Link } from "react-router-dom";

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';

const Layout = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Newsletter />
                <Footer />
            </footer>
        </div>
    )
}

export default Layout
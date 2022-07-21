import React from 'react';
import 'Components/ComponentStyle/Header.scss'
import logo from 'Assets/img/crs_logo.svg'
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <header>
            <Link className="logo" to="/"><img src={logo} alt="logo"/></Link>
            <div className="account">
                <Link to="/login">Login</Link>
                <Link to="/sign-up">Sign Up</Link>
            </div>
        </header>
    );
};

export default Header;

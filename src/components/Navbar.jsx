import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./navbar.css";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
// import Logo from "../../src/images/logo.svg";
import logo from '../../src/images/logo.png';
// import { ReactComponent as Logo } from ".../logo.png";

const Navbar = () => {
    const [mobile, setMobile] = useState(false)

    return (
        <nav className='navbar'>
            <img src={logo} className="App-logo" alt="logo" /> HRental App

                <ul className={mobile? "nav-links-mobile" : "nav-links"} onClick={() =>setMobile(false)}>
                    <Link to='/'>
                        <li className='lnkNavMenu'>Marketplace</li>
                    </Link>
                    <Link to='/about'>
                        <li>About</li>
                    </Link>
                    <Link to='/getstarted'>
                        <li>Get Started</li>
                    </Link>
                    <Link to='/contact'>
                        <li>Contact Us</li>
                    </Link>
                    {/* <Link to='/register'>
                        <li>Register</li>
                    </Link> */}
                    <Link to='/login'>
                        <li>Login</li>
                    </Link>
                </ul>
                <button className='mobile-menu-icon' onClick={()=>setMobile(!mobile)}>{mobile ? <ImCross /> : <FaBars />}
                    
                </button>
            
        </nav>
    )
}

export default Navbar;
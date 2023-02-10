import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
// import Logo from "../../src/images/logo.svg";
// import Logo from "../../images/logo.png"
// import { ReactComponent as Logo } from ".../logo.png";

const Navbar = () => {
    const [mobile, setMobile] = useState(false)

    return (
        <header>
            <nav className="navbar navbar-light bg-light navbar-expand-lg">
            <Link to="/" className="navbar-brand">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    Website<img src="../images/logo.png" alt="" />{/* <span className="navbar-toggler-icon"></span> */}
                </button>
            </Link>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className={mobile? "nav-links-mobile" : "nav-links"} onClick={() =>setMobile(false)}>
                    <a href="/"><img src="../images/logo.png" className="nav--logo" alt="logo" /></a>
                {/* <ul className="navbar-nav ml-auto"> */}
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">
                            Post Property Listing FREE!
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/marketplace" className="nav-link">
                            Marketplace
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-link">
                            Contact Us
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                </ul>
                <button className="mobile-menu-icon" onClick={()=>setMobile(!mobile)}>{mobile ? <ImCross /> : <FaBars />}

                </button>
            </div>
        </nav>
            {/* <nav className="navbar">
                    <ul className={mobile? "nav-links-mobile" : "nav-links"} onClick={() =>setMobile(false)}>
                        <a href="/"><img src="../images/logo.png" className="nav--logo" alt="logo" /></a>
                        <Link to="/register">
                            <li className="lnkNavMenu">Post Property Listing FREE!</li>
                        </Link>
                        <Link to="/marketplace">
                            <li className="lnkNavMenu">Marketplace</li>
                        </Link>
                        <Link to="/about">
                            <li className="lnkNavMenu">About</li>
                        </Link>
                        <Link to="/getstarted">
                            <li className="lnkNavMenu">Get Started</li>
                        </Link>
                        <Link to="/contact">
                            <li className="lnkNavMenu">Contact Us</li>
                        </Link>
                        <Link to="/login">
                            <li className="lnkNavMenu">Login</li>
                        </Link>
                    </ul>
                    <button className="mobile-menu-icon" onClick={()=>setMobile(!mobile)}>{mobile ? <ImCross /> : <FaBars />}

                    </button>
                    <div className=""></div>

            </nav> */}
        </header>
    )
}

export default Navbar;
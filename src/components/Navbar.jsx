import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Navbar = () => {
    const [mobile, setMobile] = useState(false)

    return (
        <header>
            <nav className="navbar navbar-light navbar-expand-lg">                
                <Link to="/" className="navbar-brand">                                    
                    <img src="../../images/hralogo.png" alt="HRental App-Rental Property Search and Marketplace" />
                </Link>                
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ml-auto">                        
                        <li className="nav-item">
                            <button className="btn btn-postlist">
                                <Link to="/register" className="post-list">
                                    Post Listing FREE!
                                </Link>
                            </button>
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
           
        </header>
    )
}

export default Navbar;
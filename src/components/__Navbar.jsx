import React, {useState} from "react";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import "./navbar.css";


export default function Navbar() {
    const [mobile, setMobile] = useState(false)

  return (
    <header>
        <nav className="navbar navbar-light bg-light navbar-expand-lg">
            <Link to="/" className="navbar-brand">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <img src="../images/hralogo.png" alt="" />{/* <span className="navbar-toggler-icon"></span> */}
                </button>
            </Link>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                {/* <ul className={mobile} "navbar-links-mobile"> */}
                <ul className={mobile? "nav-links-mobile" : "nav-links"} onClick={() =>setMobile(false)}>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">
                            Post Your Property Listing FREE!
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
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
  )
}

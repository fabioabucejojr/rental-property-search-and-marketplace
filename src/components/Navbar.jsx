import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div>
        <nav>
          <a href="/"><img src="../images/logo.png" className="nav--logo" alt="logo" /></a>
          <Link className="px-4" to="/register">Post Your Property Listing FREE!</Link>
          <Link className="px-4" to="/marketplace">Marketplace</Link>
          <Link className="px-4" to="/about">About</Link>
          <Link className="px-4" to="/contact">Contact</Link>
          <Link className="px-4" to="/login">Login</Link>
        </nav>
      </div>

    </div>
  )
}

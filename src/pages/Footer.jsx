import React from "react";
import "../pages/Home.css";

const year = new Date().getFullYear();
document.querySelectorAll(".js-year").forEach(el => el.innerText = year);

export default function Footer() {
  return (
    <>
      <footer className="footer-dark" >
        <small>© <span className=".js-year"></span> Fabio Jr Abucejo, All Rights Reserved</small>
      </footer>
    </>
  );
};


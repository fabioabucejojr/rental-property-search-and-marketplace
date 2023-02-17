import React from "react";

const year = new Date().getFullYear();
document.querySelectorAll(".js-year").forEach(el => el.innerText = year);

export default function Footer() {
  return (
    <>
      <footer className="" >
        <small>© <span className="js-year"></span> Fabio Jr Abucejo, All Rights Reserved</small>
      </footer>
    </>
  );
};


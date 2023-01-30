import React from "react";

const year = new Date().getFullYear();
document.querySelectorAll(".js-year").forEach(el => el.innerText = year);

export default function Footer() {
  return (
    <>
      <footer>
        <small>© <span class="js-year"></span> RSDMF Digital Marketing Services, All Rights Reserved</small>
      </footer>
    </>
  );
};


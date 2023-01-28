import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import SearchBar from "../components/Marketplace";

function Home() {
  return (
    <>
    <SearchBar />
    <div className="home">
      <div className="inner">
        <div className="result">
          <div className="resbox"></div>
        </div>
      </div>
      <div className="btns">

      </div>
    </div>
    </>

  )
}

export default Home;
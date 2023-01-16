import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import Search from "../components/Search"


function Home() {
  return (
    <>
    <Search />
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
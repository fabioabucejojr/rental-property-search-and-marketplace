
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import SearchBar from "../components/PropertySearch";

function Home() {
  return (
    <>

    <div className="home">
      <div className="inner">
        <div className="result">
          <div className="resbox"></div>
          <SearchBar />
        </div>
      </div>
      <div className="btns">

      </div>
    </div>
    </>

  )
}

export default Home;
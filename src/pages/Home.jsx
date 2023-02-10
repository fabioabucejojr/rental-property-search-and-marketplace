import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import searchFilters from "../components/PropertySearch";
// import SearchBar from "../components/SearchBar";
// import Map from "../components/Map";
// import PropertyList from "../dashboard/AddPropertyListing";
import Footer from "../components/Footer";
// import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  return (
      <>
        <div>
          <section className="section--hero">>
            <a href="/"><img src="../images/logo.png" alt="hrental app"/></a>
          </section>
          <div>
          <div className="nav--logo">
          </div>
          <div className="search-bar">
            <input className="form-control me-2" type={"search"} placeholder={"Rental Property Search"} aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </div>
          <div>
            <button className="btn btn-outline-success" type="submit">Property Search</button>
            <button className="btn btn-outline-success" type="submit" value="I'm Feeling Lucky">I'm Feeling Lucky</button>
          </div>
          <div className="search-filters">
              {/* <searchFilters /> */}
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
};

export default Home

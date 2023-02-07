import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
import searchFilters from "../components/PropertySearch";
// import SearchBar from "../components/SearchBar";
// import Map from "../components/Map";
// import PropertyList from "../dashboard/AddPropertyListing";
import Footer from "../components/Footer";
// import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  return (
    <div>
        <div className="nav--logo">
          <a href="/"><img src="../images/logo.png" alt="hrental app"/></a>
        </div>
        <div className="search-filters">
          <searchFilters />
        </div>
        <div className="search-bar">
          <input className="form-control me-2" type={"search"} placeholder={"Rental Property Search"} aria-label="Search" />

            <label className="container">City
              <input type="checkbox" checked="checked" />
              <span className="checkmark"></span>
            </label>
            <label className="container">State
              <input type="checkbox" checked="checked" />
              <span className="checkmark"></span>
            </label>
            <label className="container">Zip Code
              <input type="checkbox" checked="checked" />
              <span className="checkmark"></span>
            </label>

            <label className="container">Rental Price
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>

            <label className="container">Bedrooms
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>

            <label className="container">Bathrooms
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>

            <label className="container">Lot Size
              <input type="checkbox" checked="checked" />
              <span className="checkmark"></span>
            </label>

            <label className="container">Lease Terms
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>

            <label className="container">Flooring
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>

            <label className="container">Amenities
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>

          <button className="btn btn-outline-success" type="submit">Property Search</button>
          <button className="btn btn-outline-success" type="submit" value="I'm Feeling Lucky">I'm Feeling Lucky</button>
      </div>
      <Footer />
    </div>
  )
}

export default Home

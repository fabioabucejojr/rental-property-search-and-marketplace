import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import searchFilters from "../components/PropertySearch";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import SearchIcon from '@mui/icons-material/Search';
import PropertySearch from "../components/PropertySearch";

function Home() {
  const [location, setLocation] = React.useState(null);
  const [properties, setProperties] = React.useState([]);

  const handleSearch = (location) => {
    setLocation(location);
    // Fetch properties near the location
    // ...
    // Set the properties in the state
    setProperties(properties);
  };



// const Home = () => {
  return (
      <>
        <div>          
          <section className="homepage">
            <Link to="/" className="home-logo">
              <img src="../images/hralogo.png" alt="HRental App-Rental Property Search and Marketplace"/>
            </Link>
            <p className=""></p>
          </section>
          <section className="search-page">       
              <div className="search-box">
              
                  <input                 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Custom Rental Property Search"
                    aria-label="Search"                     
                  />                
                <button 
                  className="btn btn-outline-success" 
                  type="submit" 
                  onClick={""}><SearchIcon />
                </button>                
                <br/>
                <form 
                  className="search-form"
                  id="search form"
                  name=""
                  method="get"
                  action="">                
                  <p className="prop-form">
                    <label title="all" htmlFor="property-type" accessKey="">
                      <input id="" onClick={"rmAll()"} type="checkbox" checked/>
                      All
                    </label>
                    <label title="Room" htmlFor="property-type" accessKey="">
                      <input id="" onClick={"rmAll()"} type="checkbox" />
                      Room
                    </label>
                    <label title="House" htmlFor="property-type" accessKey="">
                      <input id="" onClick={"rmAll()"} type="checkbox" />
                      House
                    </label>
                    <label title="Townhouse" htmlFor="property-type" accessKey="">
                      <input id="" onClick={"rmAll()"} type="checkbox" />
                      Townhouse
                    </label>
                    <label title="Apartment" htmlFor="property-type" accessKey="">
                      <input id="" onClick={"rmAll()"} type="checkbox" />
                      Apartment
                    </label>
                    <label title="Condominium" htmlFor="property-type" accessKey="">
                      <input id="" onClick={"rmAll()"} type="checkbox" />
                      Condominium
                    </label>
                  </p>
                </form>
              </div>
              
              <div className="search-buttons">
                <button 
                  className="btn btn-outline-success" 
                  type="submit">Property Search
                </button>
                <button 
                  className="btn btn-outline-success" 
                  type="submit" 
                  value="I'm Feeling Lucky">I'm Feeling Lucky
                </button>            
              </div>            
          </section>
          <div>
            <div className="nav--logo">
            </div>
          
          <div className="search-filters">
              {/* <Carousel /> */}
          </div>
          
        </div>
      </div>
    </>
  )
};

export default Home

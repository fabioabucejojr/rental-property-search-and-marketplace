import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { Link } from "react-router-dom";
// import { Button } from "@material-ui/core";
import SearchBar from "../components/PropertySearch";
import Map from "../components/Map";
import PropertyList from "../components/AddPropertyListing";
import Footer from "../components/Footer";
import SearchIcon from '@mui/icons-material/Search';

function BgVideo() {
  return (
    <div className="bg-video">
      <video className="bg-video__content" autoPlay muted loop />
    </div>
  )
}

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

  return (
    <>
    <div className="home">
      <h1>Still On A Budget?</h1><br/>
      <h2>Search Your Next Home Away From Home...</h2>
      <SearchBar onSearch={handleSearch} />
        <div className="home_header">
          <div className="home_headerLeft">
            <Link to="/about">About</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="home_headerRight">
            <Link to="/about">About</Link>
            <Link to="/about">About</Link>
            <Link to="/about">About</Link>


          </div>
        </div>
        <div className="home_body">

        </div>
      </div>

    </>
  );
};



export default Home;

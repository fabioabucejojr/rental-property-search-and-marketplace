import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { Link } from "react-router-dom";
// import { Button } from "@material-ui/core";
import SearchBar from "../components/PropertySearch";
// import Map from "../components/Map";
// import PropertyList from "../dashboard/AddPropertyListing";
// import Footer from "../components/Footer";
// import SearchIcon from '@mui/icons-material/Search';
import videoBg from "../assets/videoBg.mp4";

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
        <div className="home__container">
          {/* <div className="home__search">
            <h1 className="">Still On A Budget?</h1><br/>
            <h2 className="">Search Your Next Home Away From Home...</h2>
            <SearchBar onSearch={handleSearch} />
          </div> */}
          <div className="home__content">
          <BgVideo />
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import SearchBar from "../components/PropertySearch";
import Map from "../components/Map";
import PropertyList from "../components/AddPropertyListing";

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
        <div className="inner">
          <div className="result">
            <div className="resbox">
              {location ? (
                <>
                  <Map location={location} />
                  <PropertyList properties={properties} />
                </>
              ) : (
                <SearchBar onSearch={handleSearch} />
              )}
            </div>
          </div>
        </div>
        <div className="btns">
          {location && (
            <>
              <button>Filter by price</button>
              <button>Filter by type</button>
              <button>Filter by size</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;

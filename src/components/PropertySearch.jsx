import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import "./PropertySearch.css";
// import data from "./data"

const PropertySearch = () => {
  const [searchFilters, setSearchFilters] = useState({
    property_type: "",
    price: "",
    size: "",
    amenities: "",
    availability: "",
    availability_date: "",
    date_listed: "",
    flooring: "",
    images: "",
    age: "",
    latitude: "",
    longitude: "",
    city: "",
    state: "",
    zip_code: "",
    bedrooms: "",
    bathrooms: "",
  });

  const [properties, setProperties] = useState([]);

    const handleChange = (e) => {
    setSearchFilters({...searchFilters, [e.target.name]: e.target.value});
  };

  const handleSearch = useCallback(async (e) => {
    if (e) e.preventDefault();
    // console.log(handleSearch)
    try {
      const {data} = await axios.post("/api/properties/search", searchFilters);
      setProperties(data);
    } catch (err) {
      console.error(err.message);
    }
  });

  // useEffect(() => {
  //   handleSearch();
  // }, []);

  return (
    <div>
      <form onSubmit={handleSearch}>
      <input className="form-control me-2" type={"search"} placeholder={"Rental Property Search"} aria-label="Search"
      />
        <input
          type="text"
          name="property_type"
          placeholder="Property Type"
          value={searchFilters.property_type}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={searchFilters.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="size"
          placeholder="Sqft"
          value={searchFilters.size}
          onChange={handleChange}
        />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities"
          value={searchFilters.amenities}
          onChange={handleChange}
        />
        <input
          type="text"
          name="availability"
          placeholder="Availability"
          value={searchFilters.availability}
          onChange={handleChange}
        />
        <input
          type="text"
          name="date_listed" placeholder="Date Listed"
          value={searchFilters.date_listed}
          onChange={handleChange}
        />
        <input
          type="text"
          name="flooring"
          placeholder="Flooring Type"
          value={searchFilters.flooring}
          onChange={handleChange}
        />
        <input
          type="text"
          name="images"
          placeholder="Images"
          value={searchFilters.images}
          onChange={handleChange}
        />
        <input
          type="text"
          name="age"
          placeholder="Days on Market"
          value={searchFilters.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={searchFilters.latitude}
          onChange={handleChange}
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={searchFilters.longitude}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={searchFilters.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={searchFilters.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="zip_code"
          placeholder="Zip"
          value={searchFilters.zip_code}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bedrooms"
          placeholder="Bedrooms"
          value={searchFilters.bedrooms}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bathrooms"
          placeholder="Bathrooms"
          value={searchFilters.bathrooms}
          onChange={handleChange}
        />
        <input
          type="date"
          name="availability_date"
          placeholder="Availability Date"
          value={searchFilters.availability_date}
          onChange={handleChange}
        />
        <button className="search" type="submit">Search</button>
      </form>
      <div>
        {properties.map((property) => (
          <div key={property.prop_id}>
            <h1>{property.property_type}</h1>
            <h2>{property.price}</h2>
            <h3>{property.size}</h3>
            <h3>{property.amenities}</h3>
            <h3>{property.availability}</h3>
            <h3>{property.date_listed}</h3>
            <h3>{property.flooring}</h3>
            <h3>{property.images}</h3>
            <h3>{property.age}</h3>
            <h3>{property.latitude}</h3>
            <h3>{property.longitude}</h3>
            <h3>{property.city}</h3>
            <h3>{property.state}</h3>
            <h3>{property.zip_code}</h3>
            <h3>{property.bedrooms}</h3>
            <h3>{property.bathrooms}</h3>
            <h3>{property.availability_date}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertySearch;
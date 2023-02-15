import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import "./PropertySearch.css";
// import data from "./data"

const PropertySearch = () => {
  const [searchFilters, setSearchFilters] = useState({
      property_type: "",
      property_name: "",
      city: "",
      state: "",
      zip_code: "",
      bedrooms: "",
      bathrooms: "",
      size: "",
      price: "",
      flooring: "",
      availability: "",
      availability_date: "",
      date_listed: "",
      age: "",
      images: "",
      lease_terms: "",
      pet_friendly: "",
      no_smoking: "",
      air_conditioning: "",
      wheelchair_accessible: "",
      ratings: "",
      review_count: "",
      reviews: ""
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

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div>
      <form onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type={"search"}
        placeholder={"Rental Property Search"}
        aria-label="Search"
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
          name="property_name"
          placeholder="Property Name"
          value={searchFilters.property_name}
          onChange={handleChange}
        />
        <input
          type="float"
          name="price"
          placeholder="Price"
          value={searchFilters.price}
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
          type="number"
          name="zip_code"
          placeholder="Zip Code"
          value={searchFilters.zip_code}
          onChange={handleChange}
        />
        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          value={searchFilters.bedrooms}
          onChange={handleChange}
        />
        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          value={searchFilters.bathrooms}
          onChange={handleChange}
        />
        <input
          type="float"
          name="size"
          placeholder="Sqft"
          value={searchFilters.size}
          onChange={handleChange}
        />
        {/* <input
          type="text"
          name="amenities"
          placeholder="Amenities"
          value={searchFilters.amenities}
          onChange={handleChange}
        /> */}
        <input
          type="text"
          name="flooring"
          placeholder="Flooring Type"
          value={searchFilters.flooring}
          onChange={handleChange}
        />
        <input
          type="boolean"
          name="availability"
          placeholder="Availability"
          value={searchFilters.availability}
          onChange={handleChange}
        />
        <input
          type="date"
          name="availability_date"
          placeholder="Availability Date"
          value={searchFilters.availability_date}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date_listed" placeholder="Date Listed"
          value={searchFilters.date_listed}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Days on Market"
          value={searchFilters.age}
          onChange={handleChange}
        />
        <input
          type="image"
          alt="property images"
          name="images"
          placeholder="Images"
          value={searchFilters.images}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lease_terms"
          placeholder="Lease Terms"
          value={searchFilters.lease_terms}
          onChange={handleChange}
        />
        <input
          type="boolean"
          name="pet_friendly"
          placeholder="Pet Friendly"
          value={searchFilters.pet_friendly}
          onChange={handleChange}
        />
        <input
          type="boolean"
          name="no_smoking"
          placeholder="No Smoking"
          value={searchFilters.no_smoking}
          onChange={handleChange}
        />
        <input
          type="boolean"
          name="wheelchair_accessible"
          placeholder="Wheelchair Accessible"
          value={searchFilters.wheelchair_accessible}
          onChange={handleChange}
        />
        <input
          type="boolean"
          name="air_conditioning"
          placeholder="Air Conditioning"
          value={searchFilters.air_conditioning}
          onChange={handleChange}
        />
        <input
          type="number"
          name="ratings"
          placeholder="Ratings"
          value={searchFilters.ratings}
          onChange={handleChange}
        />
        <input
          type="number"
          name="review_count"
          placeholder="Review Count"
          value={searchFilters.review_count}
          onChange={handleChange}
        />
        <input
          type="text"
          name="reviews"
          placeholder="Reviews"
          value={searchFilters.reviews}
          onChange={handleChange}
        />

        <button className="search" type="submit">Search</button>
      </form>
      <div>
        {properties.map((property) => (
          <div key={property.prop_id}>
            <h1>{property.property_type}</h1>
            <h1>{property.property_name}</h1>
            <h2>{property.price}</h2>
            <h3>{property.city}</h3>
            <h3>{property.state}</h3>
            <h3>{property.zip_code}</h3>
            <h3>{property.bedrooms}</h3>
            <h3>{property.bathrooms}</h3>
            <h3>{property.size}</h3>
            <h3>{property.flooring}</h3>
            <h3>{property.availability}</h3>
            <h3>{property.availability_date}</h3>
            <h3>{property.date_listed}</h3>
            <h3>{property.age}</h3>
            <h3>{property.images}</h3>
            <h3>{property.lease_terms}</h3>
            <h3>{property.pet_friendly}</h3>
            <h3>{property.no_smoking}</h3>
            <h3>{property.air_conditioning}</h3>
            <h3>{property.wheelchair_accessible}</h3>
            <h3>{property.ratings}</h3>
            <h3>{property.review_count}</h3>
            <h3>{property.reviews}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertySearch;
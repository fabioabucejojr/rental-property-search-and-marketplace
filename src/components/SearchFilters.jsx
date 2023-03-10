import React, { useState } from "react";
import axios from "axios";

const SearchFilters = () => {
  const [searchParams, setSearchParams] = useState({
    property_type: "",
    min_price: "",
    max_price: "",
    size: "",
    amenities: [],
    availability: "",
    country: "",
    city: "",
    state: "",
    zip_code: "",
    bedrooms: "",
    bathrooms: "",
    pets_ok: false,
    no_smoking: false,
    wheelchair_accessible: false,
    air_conditioning: false
  });

  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearch = event => {
    event.preventDefault();

    axios
      .get("/api/properties/search", { params: searchParams })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSearch}>
      <div>
        <label>
          Property Type:
          <select name="property_type" onChange={handleInputChange}>
            <option value="">Any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Price Range:
          <input
            type="number"
            name="min_price"
            onChange={handleInputChange}
            placeholder="Min Price"
          />
          -
          <input
            type="number"
            name="max_price"
            onChange={handleInputChange}
            placeholder="Max Price"
          />
        </label>
      </div>

      <div>
        <label>
          Size (sq. ft.):
          <input
            type="number"
            name="size"
            onChange={handleInputChange}
            placeholder="Size"
          />
        </label>
      </div>

      <div>
        <label>
          Amenities:
          <input
            type="checkbox"
            name="amenities"
            value="pool"
            onChange={handleInputChange}
          />
          Pool
          <input
            type="checkbox"
            name="amenities"
            value="gym"
            onChange={handleInputChange}
          />
          Gym
        </label>
      </div>

      <div>
        <label>
          Availability:
          <select name="availability" onChange={handleInputChange}>
            <option value="">Any</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Country:
          <input
            type="text"
            name="country"
            onChange={handleInputChange}
            placeholder="Country"
          />
        </label>
      </div>

      <div>
        <label>
          City:
          <input
            type="text"
            name="city"
            onChange={handleInputChange}
            placeholder="City"
          />
        </label>
      </div>

      <div>
        <label>
          State:
          <input
            type="text"
            name="state"
            onChange={handleInputChange}
            placeholder="State"
          />
        </label>
      </div>

      <div>
        <label>
          Zip Code:
          <input
            type="text"
            name="zip_code"
            onChange={handleInputChange}
            placeholder="Zip Code"
          />
        </label>
      </div>

      <div>
        <label>
          Bedrooms:
          <input
            type="number"
            name="bedrooms"
            onChange={handleInputChange}
            placeholder="Bedrooms"
          />
        </label>
      </div>

      <div>
        <label>
          Bathrooms:
          <input
            type="number"
            name="bathrooms"
            onChange={handleInputChange}
            placeholder="Bathrooms"
          />
        </label>
      </div>

      <div>
        <label>
          Pets OK:
          <input
            type="checkbox"
            name="pets_ok"
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div>
        <label>
          No Smoking:
          <input
            type="checkbox"
            name="no_smoking"
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div>
        <label>
          Wheelchair Accessible:
          <input
            type="checkbox"
            name="wheelchair_accessible"
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div>
        <label>
          Air Conditioning:
          <input
            type="checkbox"
            name="air_conditioning"
            onChange={handleInputChange}
          />
        </label>
      </div>

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchFilters;

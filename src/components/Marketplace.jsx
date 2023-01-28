import React, {useState, useEffect} from "react";
import axios from "axios";

const PropertySearch = () => {
  const [searchFilters, setSearchFilters] = useState({
    propertyType: "",
    city: "",
    state: "",
    zip: "",
    beds: "",
    baths: "",
    sqft: "",
    price: "",
    yearBuilt: "",
    lotSize: "",
    daysOnMarket: "",
  });

  const [properties, setProperties] = useState([]);

    const handleChange = (e) => {
    setSearchFilters({...searchFilters, [e.target.name]: e.target.value});
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    try {
      const {data} = await axios.post("/api/properties/search", searchFilters);
      setProperties(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);
  
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="propertyType" placeholder="Property Type" value={searchFilters.propertyType} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={searchFilters.city} onChange={handleChange} />
        <input type="text" name="state" placeholder="State" value={searchFilters.state} onChange={handleChange} />
        <input type="text" name="zip" placeholder="Zip" value={searchFilters.zip} onChange={handleChange} />
        <input type="text" name="beds" placeholder="Beds" value={searchFilters.beds} onChange={handleChange} />
        <input type="text" name="baths" placeholder="Baths" value={searchFilters.baths} onChange={handleChange} />
        <input type="text" name="sqft" placeholder="Sqft" value={searchFilters.sqft} onChange={handleChange} />
        <input type="text" name="price" placeholder="Price" value={searchFilters.price} onChange={handleChange} />
        <input type="text" name="yearBuilt" placeholder="Year Built" value={searchFilters.yearBuilt} onChange={handleChange} />
        <input type="text" name="lotSize" placeholder="Lot Size" value={searchFilters.lotSize} onChange={handleChange} />
        <input type="text" name="daysOnMarket" placeholder="Days On Market" value={searchFilters.daysOnMarket} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <div>
        {properties.map((property) => (
          <div key={property.property_id}>
            <h1>{property.property_type}</h1>
            <h2>{property.address}</h2>
            <h3>{property.city}</h3>
            <h3>{property.state}</h3>
            <h3>{property.zip}</h3>
            <h3>{property.beds}</h3>
            <h3>{property.baths}</h3>
            <h3>{property.sqft}</h3>
            <h3>{property.price}</h3>
            <h3>{property.year_built}</h3>
            <h3>{property.lot_size}</h3>
            <h3>{property.days_on_market}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
export default PropertySearch;
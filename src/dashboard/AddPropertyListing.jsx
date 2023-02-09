// AddPropertyListing.js
import React, { useState } from 'react';
import { ReactDOM } from 'react-dom/client';
import axios from 'axios';
import { createRoot } from 'react-dom/client';



// const AddPropertyList = ({ properties }) => {
  // return (
  //   <ul className="property-list">
  //     {properties.map((property) => (
  //       <li key={property.id} className="property">
  //         <h3>{property.title}</h3>
  //         <p>{property.description}</p>
  //         <p>Price: {property.price}</p>
  //       </li>
  //     ))}
  //   </ul>
  // );

const AddPropertyList = (properties) => {
  const [propertyType, setPropertyType] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [amenities, setAmenities] = useState('');
  const [availability, setAvailability] = useState('');
  const [availabilityDate, setAvailabilityDate] = useState('');
  const [dateListed, setDateListed] = useState('');
  const [flooring, setFlooring] = useState('');
  const [images, setImages] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [petsOk, setPetsOk] = useState(false);
  const [noSmoking, setNoSmoking] = useState(false);
  const [wheelchairAccessible, setWheelchairAccessible] = useState(false);
  const [airConditioning, setAirConditioning] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/properties/user_id', {
        property_type: propertyType,
        price,
        size,
        amenities,
        availability,
        availability_date: availabilityDate,
        date_listed: dateListed,
        flooring,
        images,
        age,
        city,
        state,
        zip_code: zipCode,
        bedrooms,
        bathrooms,
        pets_ok: petsOk,
        no_smoking: noSmoking,
        wheelchair_accessible: wheelchairAccessible,
        air_conditioning: airConditioning
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="propertyType">Property Type:</label>
        <input type="text" id="propertyType" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label htmlFor="size">Size:</label>
        <input type="number" id="size" value={size} onChange={(e) => setSize(e.target.value)} />
      </div>
      <div>
        <label htmlFor="amenities">Amenities:</label>
        <input type="text" id="amenities" value={amenities} onChange={(e) => setAmenities(e.target.value)} />
      </div>
      <div>
        <label htmlFor="availability">Availability:</label>
        <input type="number" id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)} />
      </div>
      <div>
        <label htmlFor="availability_date">Availability Date:</label>
        <input type="number" id="availability_date" value={availabilityDate} onChange={(e) => setAvailabilityDate(e.target.value)} />
      </div>
      <div>
        <label htmlFor="date_listed">Date Listed:</label>
        <input type="text" id="date_listed" value={dateListed} onChange={(e) => setDateListed(e.target.value)} />
      </div>
      <div>
        <label htmlFor="flooring">Flooring:</label>
        <input type="number" id="flooring" value={flooring} onChange={(e) => setFlooring(e.target.value)} />
      </div>
      <div>
        <label htmlFor="images">Images:</label>
        <input type="number" id="images" value={images} onChange={(e) => setImages(e.target.value)} />
      </div>
      <div>
        <label htmlFor="age">Days on the Market:</label>
        <input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input type="number" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <div>
        <label htmlFor="state">State:</label>
        <input type="number" id="state" Statee={state} Stateange={(e) => setState(e.target.value)} />
      </div>
      <div>
        <label htmlFor="zip_code">Zip Code:</label>
        <input type="text" id="zip_code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
      </div>
      <div>
        <label htmlFor="bedrooms">Bedrooms:</label>
        <input type="number" id="bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
      </div>
      <div>
        <label htmlFor="bathrooms">Bathrooms:</label>
        <input type="number" id="bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
      </div>
      <div>
        <label htmlFor="pets_ok">Pets OK:</label>
        <input type="text" id="pets_ok" value={petsOk} onChange={(e) => setPetsOk(e.target.value)} />
      </div>
      <div>
        <label htmlFor="no_smoking">No Smoking:</label>
        <input type="number" id="no_smoking" value={noSmoking} onChange={(e) => setNoSmoking(e.target.value)} />
      </div>
      <div>
        <label htmlFor="wheelchair_accessible">Wheelchair Accessible:</label>
        <input type="number" id="wheelchair_accessible" value={wheelchairAccessible} onChange={(e) => setWheelchairAccessible(e.target.value)} />
      </div>
      <div>
        <label htmlFor="air_conditioning">Airconditioning:</label>
        <input type="number" id="air_conditioning" value={airConditioning} onChange={(e) => setAirConditioning(e.target.value)} />
      </div>
    </form>)
};



const root = createRoot(document.getElementById('root'));
root.render(<AddPropertyList />);

export default AddPropertyList;

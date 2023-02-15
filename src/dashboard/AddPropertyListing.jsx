// AddPropertyListing.js
import React, { useState } from 'react';
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
  const [property_type, setPropertyType] = useState('');
  const [property_name, setPropertyName] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [size, setSize] = useState('');
  const [flooring, setFlooring] = useState('');
  const [availability, setAvailability] = useState('');
  const [availability_date, setAvailabilityDate] = useState('');
  const [date_listed, setDateListed] = useState('');
  const [age, setAge] = useState('');
  const [images, setImages] = useState('');
  const [lease_terms, setLeaseTerms] = useState('');
  const [pet_friendly, setPetFriendly] = useState(false);
  const [no_smoking, setNoSmoking] = useState(false);
  const [air_conditioning, setAirConditioning] = useState(false);
  const [wheelchair_accessible, setWheelchairAccessible] = useState(false);
  const [ratings, setRatings] = useState('');
  const [review_count, setReviewCount] = useState('');
  const [reviews, setReviews] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/property/user_id', {
      property_type,
      property_name,
      city,
      state,
      zip_code,
      bedrooms,
      bathrooms,
      size,
      price,
      flooring,
      availability,
      availability_date,
      date_listed,
      age,
      images,
      lease_terms,
      pet_friendly,
      no_smoking,
      air_conditioning,
      wheelchair_accessible,
      ratings,
      review_count,
      reviews
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="property_type">Property Type:</label>
        <input
          type="text"
          id="property_type"
          value={property_type}
          onChange={(e) => setPropertyType(e.target.value)} />
      </div>
      <div>
        <label htmlFor="property_name">Property Name:</label>
        <input
          type="text"
          id="property_name"
          value={property_name}
          onChange={(e) => setPropertyName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="float"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input
        type="text"
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)} />
      </div>
      <div>
        <label htmlFor="state">State:</label>
        <input
        type="text"
        id="state"
        State={state}
        onChange={(e) => setState(e.target.value)} />
      </div>
      <div>
        <label htmlFor="zip_code">Zip Code:</label>
        <input
        type="number"
        id="zip_code"
        value={zip_code}
        onChange={(e) => setZipCode(e.target.value)} />
      </div>
      <div>
        <label htmlFor="bedrooms">Bedrooms:</label>
        <input
        type="number"
        id="bedrooms"
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)} />
      </div>
      <div>
        <label htmlFor="bathrooms">Bathrooms:</label>
        <input
        type="number"
        id="bathrooms"
        value={bathrooms}
        onChange={(e) => setBathrooms(e.target.value)} />
      </div>
      <div>
        <label htmlFor="size">Size:</label>
        <input
          type="float"
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)} />
      </div>
      <div>
        <label htmlFor="flooring">Flooring:</label>
        <input
        type="text"
        id="flooring"
        value={flooring}
        onChange={(e) => setFlooring(e.target.value)} />
      </div>
      <div>
        <label htmlFor="availability">Availability:</label>
        <input
          type="boolean"
          id="availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)} />
      </div>
      <div>
        <label htmlFor="availability_date">Availability Date:</label>
        <input
        type="date"
        id="availability_date"
        value={availability_date}
        onChange={(e) => setAvailabilityDate(e.target.value)} />
      </div>
      <div>
        <label htmlFor="date_listed">Date Listed:</label>
        <input
        type="date"
        id="date_listed"
        value={date_listed}
        onChange={(e) => setDateListed(e.target.value)} />
      </div>
      <div>
        <label htmlFor="age">Days on the Market:</label>
        <input
        type="number"
        id="age"
        value={age}
        onChange={(e) => setAge(e.target.value)} />
      </div>
      <div>
        <label htmlFor="images">Images:</label>
        <input
        type="image"
        id="images"
        alt='property images'
        value={images}
        onChange={(e) => setImages(e.target.value)} />
      </div>
      <div>
        <label htmlFor="lease_terms">Lease Terms:</label>
        <input
        type="text"
        id="lease_terms"
        value={lease_terms}
        onChange={(e) => setLeaseTerms(e.target.value)} />
      </div>
      <div>
        <label htmlFor="pet_friendly">Pet Friendly:</label>
        <input
        type="boolean"
        id="pet_friendly"
        value={pet_friendly}
        onChange={(e) => setPetFriendly(e.target.value)} />
      </div>
      <div>
        <label htmlFor="no_smoking">No Smoking:</label>
        <input
        type="boolean"
        id="no_smoking"
        value={no_smoking}
        onChange={(e) => setNoSmoking(e.target.value)} />
      </div>
      <div>
        <label htmlFor="wheelchair_accessible">Wheelchair Accessible:</label>
        <input
        type="boolean"
        id="wheelchair_accessible"
        value={wheelchair_accessible}
        onChange={(e) => setWheelchairAccessible(e.target.value)} />
      </div>
      <div>
        <label htmlFor="air_conditioning">Airconditioning:</label>
        <input
        type="boolean"
        id="air_conditioning"
        value={air_conditioning}
        onChange={(e) => setAirConditioning(e.target.value)} />
      </div>
      <div>
        <label htmlFor="ratings">Ratings:</label>
        <input
        type="number"
        id="ratings"
        value={ratings}
        onChange={(e) => setRatings(e.target.value)} />
      </div>
      <div>
        <label htmlFor="review_count">Review Count:</label>
        <input
        type="number"
        id="review_count"
        value={review_count}
        onChange={(e) => setReviewCount(e.target.value)} />
      </div>
      <div>
        <label htmlFor="reviews">Reviews:</label>
        <input
        type="text"
        id="reviews"
        value={reviews}
        onChange={(e) => setReviews(e.target.value)} />
      </div>
    </form>)
};



const root = createRoot(document.getElementById('root'));
root.render(<AddPropertyList />);

export default AddPropertyList;

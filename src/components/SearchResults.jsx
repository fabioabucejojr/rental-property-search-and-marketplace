import React, { useState } from 'react';
import axios from 'axios';

const RentalPropertiesSearch = () => {
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
  const [properties, setProperties] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.get('/api/properties', {
      params: {
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
      }
    });
    setProperties(res.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="property_type"
          value={property_type}
          onChange={e => setPropertyType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Property Name"
          value={property_name}
          onChange={e => setPropertyName(e.target.value)}
        />
        <input
          type="float"
          placeholder="Price"
          value={price}
		      onChange={e => setPrice(e.target.value)}
		    />
        <input
          type="text"
          placeholder="city"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={e => setState(e.target.value)}
        />
        <input
          type="number"
          placeholder="zip_code"
          value={zip_code}
          onChange={e => setZipCode(e.target.value)}
        />
        <input
          type="number"
          placeholder="Bedrooms"
          value={bedrooms}
          onChange={e => setBedrooms(e.target.value)}
        />
        <input
          type="number"
          placeholder="Bathrooms"
          value={bathrooms}
		  onChange={e => setBathrooms(e.target.value)}
		/>
        <input
          type="float"
          placeholder="Sqft"
          value={size}
          onChange={e => setSize(e.target.value)}
        />
        <input
          type="text"
          placeholder="Flooring Type"
          value={flooring}
          onChange={e => setFlooring(e.target.value)}
        />
        <input
          type="boolean"
          placeholder="Availability"
          value={availability}
          onChange={e => setAvailability(e.target.value)}
        />
        <input
          type="date"
          placeholder="Availability Date"
          value={availability_date}
          onChange={e => setAvailabilityDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date Listed"
          value={date_listed}
		  onChange={e => setDateListed(e.target.value)}
		/>
        <input
          type="number"
          placeholder="Days on Market"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
        <input
          type="image"
          alt="Property Images"
          placeholder="Property Images"
          value={images}
          onChange={e => setImages(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lease Terms"
          value={lease_terms}
          onChange={e => setLeaseTerms(e.target.value)}
        />
        <input
          type="boolean"
          placeholder="Pet Friendly"
          value={pet_friendly}
          onChange={e => setPetFriendly(e.target.value)}
        />
        <input
          type="boolean"
          placeholder="No Smoking"
          value={no_smoking}
		  onChange={e => setNoSmoking(e.target.value)}
		/>
        <input
          type="boolean"
          placeholder="Wheelchair Accessible"
          value={wheelchair_accessible}
          onChange={e => setWheelchairAccessible(e.target.value)}
        />
        <input
          type="boolean"
          placeholder="Air Conditioning"
          value={air_conditioning}
          onChange={e => setAirConditioning(e.target.value)}
        />
        <input
          type="number"
          placeholder="Ratings"
          value={ratings}
          onChange={e => setRatings(e.target.value)}
        />
        <input
          type="number"
          placeholder="Review Count"
          value={review_count}
          onChange={e => setReviewCount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Reviews"
          value={reviews}
		      onChange={e => setReviews(e.target.value)}
		    />

        <button type="submit">Search</button>
        </form>
            <ul>
                {properties.map(property => (
                <li key={property.id}>
                {property.location} - ${property.price}/month - {property.bedrooms} bedrooms - {property.bathrooms} bathrooms
            </li>
        ))}
    </ul>
</div>
);
};

export default RentalPropertiesSearch;
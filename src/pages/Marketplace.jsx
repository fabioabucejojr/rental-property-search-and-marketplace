import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoBg from "../assets/videoBg.mp4";
import Card from "../components/PropertyCard";
import Data from "../components/Data";
import "./marketplace.css";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

const MarketplacePage = () => {
  const [properties, setProperties] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");

  // Fetch properties from API
  useEffect(() => {
    axios
      .get("/user/properties")
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);

  // Sort properties based on selected criteria
  const handleSort = event => {
    setSortBy(event.target.value);
  };

  // Filter properties based on selected criteria
  const handleFilter = event => {
    setFilterBy(event.target.value);
  };

  const card = Data.map(item => {
    return (
      <Card
        img={item.images}
        rating={item.stats.rating}
        review_count={item.stats.review_count}
        property_type={item.property_type}
        property_name={item.property_name}
        city={item.city}
        state={item.state}
        bedrooms={item.bedrooms}
        bathrooms={item.bathrooms}
        size={item.size}
        price={item.price}
        prop_id={item.lease_terms}
      />
    )
  })

  return (
    <div>
      <section className="navbar--header">
        <Navbar />
      </section>
      {/* ============= Hero Section ============= --> */}
      <section id="hero" className="d-flex align-items-center">
        <video autoPlay loop muted>
          <source src={VideoBg} type="video/mp4" />
        </video>
      </section>
        {/* <div className="container position-relative" data-aos="fade-up" data-aos-delay="500">
          <h1>Find Your Next Home</h1>
          <h2>Search from over 1000+ properties</h2>
          <a href="#about" className="btn-get-started scrollto">Get Started</a>
        </div> */}
      {/* </section><!-- End Hero --> */}
      <section className="marketplace--search--filters">
        <div className="filter-sort">
          <select onChange={handleSort}>
            <option value="">Sort By</option>
            <option value="priceAsc">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
            <option value="dateNew">Newest Listing</option>
            <option value="dateOld">Oldest Listing</option>
          </select>
          <select onChange={handleFilter}>
            <option value="">Filter By</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
          </select>
          {properties
          .filter(property => {
            if (!filterBy) return true;
            return property.availability === filterBy;
          })
          .sort((a, b) => {
            switch (sortBy) {
              case "priceAsc":
                return a.price - b.price;
              case "priceDesc":
                return b.price - a.price;
              case "dateNew":
                return new Date(b.dateListed) - new Date(a.dateListed);
              case "dateOld":
                return new Date(a.dateListed) - new Date(b.dateListed);
              default:
                return;
            }
          })
          .map(property => (
            <div className="property-card" key={property._id}>
              {/* Property information */}
            </div>
          ))}
          <section className="property_cards-list">
            {card}
          </section>
        </div>
      </section>
      <div className="marketplace--page">


      </div>
    </div>
  );
};


export default MarketplacePage;

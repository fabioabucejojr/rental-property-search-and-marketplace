import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

// export default function Carousel() {
//   return (
//     <section className="carousel">
//         <img src={`https://source.unsplash.com/random/?RealEstate&2${prop.img}`} alt="property2" />        
//     </section>
//   )
// }

function PropertyCarousel(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const renderCarouselItems = () => {
    return props.properties.map((property) => (
      <Carousel.Item key={property.prop_id}>
        <img
          className="d-block w-100"
          src={property.image}
          alt={property.name}
        />
        <Carousel.Caption>
          <h3>{property.name}</h3>
          <p>{property.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ));
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {renderCarouselItems()}
    </Carousel>
  );
}

export default PropertyCarousel;


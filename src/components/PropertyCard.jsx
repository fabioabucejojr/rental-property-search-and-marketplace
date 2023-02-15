import React from "react"

export default function Card(props) {
  return (
    <div className="card">
        <img src={`../../src/img/${props.images}`} className="card--image" alt=""/>
        <div className="card__stats">
            <img src="../img/star.png" className="card--star" alt=""/>
            <span>{props.ratings}</span>
            <span className="gray">({props.review_count}) • </span>
            <span className="gray">{props.property_type}</span>
            <span className="gray">{props.property_name}</span>
            <span className="gray">{props.city}</span>
            <span className="gray">{props.state}</span>
            <span className="gray">{props.bedrooms}</span>
            <span className="gray">{props.bathrooms}</span>
            <span className="gray">{props.size}</span>
        </div>
        <p>{props.property_name}</p>
        <p><span className="bold">Php{props.price}</span> / month</p>

    </div>
  )
}



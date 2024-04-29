import { Link } from "react-router-dom";
import "./card.css";
import { useState } from "react";
import PropertyService from "../../services/PropertyService";

function Card({ item }) {
    console.log("Item::", item);
    const [saved, setSaved] = useState(item.saved);

    const handleSave = (propertyId) => {
      PropertyService.saveOrUnsaveProperty(propertyId)
        .then((response) => {
          setSaved(!saved);
          console.log("Property saved:", response);
        })
        .catch((error) => {
          // Handle the error as needed.
          console.error("Error saving property:", error);
        });
    };
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={`${item.images[0]}`} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.name}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address.city}</span>
        </p>
        <p className="description">
          <span>{item.description}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img onClick={()=>handleSave(item.id)} src="/save.png" alt="" />
              <caption>{saved ? "Unsave " : "Save"}</caption>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

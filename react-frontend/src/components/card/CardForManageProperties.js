import { Link } from "react-router-dom";
import "./card.css";

function CardForManageProperties({ item }) {
  if (!item) {
    return null; // or some loading indicator
  }
    console.log("Item::::::::::::::::::::", item);
  return (
    <div className="card">
      <Link to={``} className="imageContainer">
        <img src={`${item.images[0]}`} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/manage/${item.id}`}>{item.name}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address.location}</span>
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
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardForManageProperties;

import { Link } from "react-router-dom";
import "./card.css";

function CardForManagePropertyView({ item }) {
    if (!item) {
        console.log("Item::in null", item);
        return null; // or some loading indicator
      }
    console.log("Item::in latest", item);
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={`${item.images[0]}`} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/manage/${item.id}`}>{item.name}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address.city}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <p>Total Applications: 1</p>
      </div>
    </div>
  );
}

export default CardForManagePropertyView;

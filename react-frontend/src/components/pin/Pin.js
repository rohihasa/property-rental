import { Marker, Popup } from "react-leaflet";
import "./pin.css";
import { Link } from "react-router-dom";

function Pin({ item }) {
    console.log("Item in Pin::", item.address.latitude, item.address.longitude);
  return (
    <Marker position={[item.address.latitude, item.address.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img  src={`${item.images[0]}`} alt="" />
          <div className="textContainer"> 
            <Link to={`/${item.id}`}>{item.name}</Link>
            <span>{item.bedrooms} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;

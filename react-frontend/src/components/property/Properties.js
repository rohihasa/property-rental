import "./properties.css";
import { useState, useEffect } from "react";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { useLocation } from "react-router-dom";
import PropertyService from "../../services/PropertyService";
import Navbar from "../navBar/Navbar";

function Properties() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedLocation = queryParams.get("location");
  const minPrice = queryParams.get("minPrice");
  const maxPrice = queryParams.get("maxPrice");

  useEffect(() => {
    PropertyService.getPropertiesByFilters(selectedLocation, minPrice, maxPrice)
      .then((response) => {
        console.log("Response::", response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log("Data::", data);
      console.log(data.length);
      console.log("Data::", data.length !== 0);
    }
  }, [data, loading]);

  return (
    <div className="listPage">
       
      <div className="listContainer">
      <Navbar/>
        <div className="wrapper">
          <Filter
            selectedLocation={selectedLocation}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
          {data.length !== 0 &&
            data.map((item) => <Card key={item.id} item={item} />)}
        </div>
      </div>
       <div className="mapContainer">
        {data.length !== 0 && <Map items={data} />}
      </div> 
    </div>
  );
}

export default Properties;

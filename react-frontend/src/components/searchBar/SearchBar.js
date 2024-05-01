import { useState, useEffect } from "react";
import "./searchBar.css";
import PropertyService from "../../services/PropertyService";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    PropertyService.getPropertyLocations()
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    e.preventDefault();
    navigate(
      `/user/properties?location=${selectedLocation}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  };

  return (
    <div className="searchBar">
      <form>
        <select value={selectedLocation} onChange={handleChange}>
          <option value="">Select a location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min Price"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
        />
        <button
         onClick={handleSearch}>
          <img src="/search.png" alt="" />
         
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

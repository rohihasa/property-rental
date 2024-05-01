import SearchBar from "../../components/searchBar/SearchBar";
import "./home.css";

function Home() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">RENT-IT ,Find the perfect properties for rentals</h1>
          <p>
            Find the perfect properties for rentals in your city. We have
            thousands of properties available for rent.
          </p>
          <SearchBar />
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Home;

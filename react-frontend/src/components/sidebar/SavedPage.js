import React, { useEffect ,useState} from "react";
import Card from "../card/Card";
import UserService from "../../services/UserService";
import {CircularProgress} from "@material-ui/core";

function SavedPage() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(false); // Add this line
  useEffect(() => {
    setLoading(true); // Set loading to true before the API call
    UserService.getSavedProperties()
      .then((response) => {
        setLoading(false); // Set loading to false after the API call
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        setLoading(false); // Set loading to false after the API call
        console.log(error);
        setData(null);
      });
  }, []);

  return (
    <div>
        {loading&&<CircularProgress/>}
      {data&&data.map((item) => (
        <Card key={item.id} item={item} />
      ))}
      {(!data||data.length===0)&&<h1>No Saved Properties</h1>}
    </div>
  );
}

export default SavedPage;

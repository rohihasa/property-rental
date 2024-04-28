import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
} from "@material-ui/core";
import Terms from "./Terms";
import Applications from "./Applications";
import PropertyService from "../../services/PropertyService";
import { useParams } from "react-router-dom";
import CardForManagePropertyView from "../card/CardForManagePropertyView";
import Navbar from "../navBar/Navbar";

function ManageProperty() {
  const [activeTab, setActiveTab] = useState("Terms");
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    console.log("Active Tab::", activeTab);
    console.log("Property Id::", propertyId);
    PropertyService.getPropertyById(propertyId)
      .then((response) => {
        console.log("Property Response::", response.data);
        setProperty(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [activeTab, propertyId]);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Grid
          container
          spacing={3}
          style={{ padding: "20px", marginBottom: "10px" }}
        >
          <Grid style={{margin:"10px 10px 10px 10px"}} container spacing={3}>
            <Grid item xs={4}>
              {property && <CardForManagePropertyView item={property} />}
            </Grid>
            <Grid
              item
              xs={4}
              style={{ marginLeft: "120px", marginTop: "70px" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleTabChange("Terms")}
                style={{ margin: "10px" }}
              >
                Terms
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleTabChange("Applications")}
                style={{ margin: "10px" }}
              >
                Applications
              </Button>
            </Grid>
            <Grid item xs={8}>
              <div style={{ marginLeft: "500px" }}>
                {activeTab === "Terms" ? <Terms /> : <Applications />}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ManageProperty;

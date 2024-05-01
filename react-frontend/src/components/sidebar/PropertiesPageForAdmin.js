import React, { useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import UserService from "../../services/UserService";

function PropertiesPageForAdmin() {
  // Replace this with actual data

  const [properties, setProperties] = React.useState([]);

  const handleApproveOrReject = (id, action) => {
    UserService.approveOrRejectProperty(id, action)
      .then((data) => {
        console.log(data);
        setProperties(properties.filter((property) => property.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    UserService.getAllPendingProperties()
      .then((data) => {
        setProperties(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      {properties &&
        properties.map((property) => (
          <Grid item xs={4} key={property.id}>
            <Card sx={{ width: "300px" }}>
              <CardMedia
                component="img"
                height="200"
                image={property.images[0]}
                alt={property.name}
                sx={{ width: "150px", marginLeft: "80px", marginTop: "10px" }}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {property.name}
                </Typography>
                <Button
                  style={{ margin: "10px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleApproveOrReject(property.id, "approve");
                  }}
                >
                  Verify
                </Button>
                <Button
                  onClick={() => {
                    handleApproveOrReject(property.id, "reject");
                  }}
                  variant="contained"
                  color="secondary"
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}

export default PropertiesPageForAdmin;

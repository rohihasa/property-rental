import React, { useEffect } from "react";
import UserService from "../../services/UserService";
import {
  CircularProgress,
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@material-ui/core";
import Card from "../card/Card";
import { Typography } from "@mui/material";
import { set } from "mongoose";

function ApplicationsPage() {
  const [selectedProperty, setSelectedProperty] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [transactionRequest, setTransactionRequest] = React.useState({
    propertyId: "",
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    type: "Credit Card",
    name: "User Credit Card",
    cvv: "",
  });
  const handleClickOpen = (property) => {
    setOpen(true);
    console.log("Property::::::::::", property);  
    setSelectedProperty(property);
    setTransactionRequest((prevState) => ({
      ...prevState,
      propertyId: property.property.id,
    }));
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDownload = () => {
    console.log("Download");
  };

  const handleView = () => {
    console.log("View");
  };

  const handleAccept = () => {
    console.log("Accept");
    UserService.acceptOrRejectApplicationByUser(
      selectedProperty.id,
      "MOVED_IN",
      transactionRequest
    )
      .then((response) => {
        console.log("Response::", response.data);
        alert("Application accepted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Error accepting application");
      });

    setOpen(false);
  };

  const handleReject = () => {
    console.log("Reject");
    UserService.acceptOrRejectApplicationByUser(
      selectedProperty.id,
      "CANCELLED",
      transactionRequest
    )
      .then(() => {
        alert("Application rejected successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Error rejecting application");
      });
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    setTransactionRequest((prevState) => ({ ...prevState, [field]: value }));
  };

  const [appliedProperties, setAppliedProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    UserService.getAppliedProperties()
      .then((response) => {
        setAppliedProperties(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setAppliedProperties(null);
      });
  }, []);

  useEffect(() => {
    console.log("Applied Properties::", appliedProperties);
  }, [appliedProperties]);
  return (
    <div>
      {loading && <CircularProgress />}
      {appliedProperties &&
        appliedProperties.map(
          (property, index) => (
            console.log("PROP", property),
            (
              <Box
                key={index}
                style={{
                  backgroundColor: "lightgrey",
                  margin: "10px",
                  padding: "10px",
                  maxWidth: "80%",
                  height: "250px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {property.property && (
                      <Card key={index} item={property.property} />
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        maxWidth: "60%",
                        marginLeft: "110px",
                        height: "150px",
                      }}
                    >
                      {property.status === "PENDING" && (
                        <b>
                          <p>STATUS: {property.status}</p>
                        </b>
                      )}
                      {property.status === "MOVED_IN" && (
                        <b>
                          <p>STATUS: YOU ARE ALREADY IN THIS PROPERTY</p>
                        </b>
                      )}
                      {property.status === "PROCESS_COMPLETED" && (
                        <b><p>This Property is Already Occupied</p></b>
                      )}
                      {property.status === "REJECTED" && (
                        <b>
                          <p>STATUS: {property.status}</p>
                        </b>
                      )}
                      {property.status === "APPROVED" && (
                        <div>
                          <b>
                            <p>Owner approved.</p>
                          </b>
                          <b>
                            <p> Please Accept terms and conditions.</p>
                          </b>
                          <Button
                            onClick={() => handleClickOpen(property)}
                            style={{
                              backgroundColor: "#FFC000",
                              color: "black",
                            }}
                            variant="contained"
                            color="primary"
                          >
                            View Agreement
                          </Button>

                          <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Agreement</DialogTitle>
                            <DialogContent>
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  {/* Grid item content */}
                                  <div className="attachment-card-2">
                                    <div>
                                      <p className="attachment-text-2">
                                        Rental Agreement
                                      </p>
                                    </div>
                                    <div>
                                      <button
                                        onClick={handleDownload}
                                        className="attachment-button-2 download-button"
                                      >
                                        Download
                                      </button>
                                      <button
                                        style={{ marginLeft: "10px" }}
                                        onclick={handleView}
                                        className="attachment-button-2 view-button"
                                      >
                                        View
                                      </button>
                                    </div>
                                  </div>
                                </Grid>
                                <Grid item xs={6}>
                                  {/* Grid item content */}
                                  <p>Payment Details</p>
                                  <Typography>
                                    Rent per Month: ${" "}
                                    {selectedProperty.property &&
                                      selectedProperty.property.price}
                                  </Typography>
                                  <Typography>
                                    Deposit: ${" "}
                                    {Number(
                                      selectedProperty.property &&
                                        selectedProperty.property.price
                                    ) * 2}
                                  </Typography>
                                  <Typography>
                                    Total: ${" "}
                                    {Number(
                                      selectedProperty.property &&
                                        selectedProperty.property.price
                                    ) * 3}
                                  </Typography>
                                  <Typography>
                                    Payment Due: 5th of every month
                                  </Typography>
                                </Grid>
                              </Grid>
                              <form>
                                <form>
                                  <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                      <TextField
                                        style={{ margin: "10px 0" }}
                                        label="Card Number"
                                        fullWidth
                                        onChange={(e) =>
                                          handleInputChange(
                                            "cardNumber",
                                            e.target.value
                                          )
                                        }
                                        value={transactionRequest.cardNumber}
                                        InputProps={{
                                          style: { backgroundColor: "" },
                                        }}
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                      <TextField
                                        style={{ margin: "10px 0" }}
                                        label="Name on Card"
                                        onChange={(e) =>
                                          handleInputChange(
                                            "cardHolderName",
                                            e.target.value
                                          )
                                        }
                                        value={
                                          transactionRequest.cardHolderName
                                        }
                                        fullWidth
                                        InputProps={{
                                          style: { backgroundColor: "" },
                                        }}
                                      />
                                    </Grid>
                                    <Grid item xs={6}>
                                      <TextField
                                        style={{ margin: "10px 0" }}
                                        label="Expiry Date"
                                        fullWidth
                                        value={transactionRequest.expiryDate}
                                        onChange={(e) =>
                                          handleInputChange(
                                            "expiryDate",
                                            e.target.value
                                          )
                                        }
                                        inputProps={{
                                          style: { backgroundColor: "" },
                                        }}
                                      />
                                    </Grid>
                                    <Grid item xs={6}>
                                      <TextField
                                        style={{ margin: "10px 0" }}
                                        label="CVV"
                                        fullWidth
                                        type="password"
                                        onChange={(e) =>
                                          handleInputChange(
                                            "cvv",
                                            e.target.value
                                          )
                                        }
                                        value={transactionRequest.cvv}
                                        InputProps={{
                                          style: { backgroundColor: "" },
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                  <Button
                                    style={{ margin: "10px 0" }}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAccept}
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    style={{ margin: "10px" }}
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleReject}
                                  >
                                    Drop Application
                                  </Button>
                                </form>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )
          )
        )}
    </div>
  );
}

export default ApplicationsPage;

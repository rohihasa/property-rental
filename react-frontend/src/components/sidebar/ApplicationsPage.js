import React, { useEffect, useState } from "react";
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

function ApplicationsPage() {
  const [selectedProperty, setSelectedProperty] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState({
    review: "",
    propertyId: "",
  });
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
  const handleAddReviewModal = (id, message) => {
    setReview({ ...review, propertyId: id, review: message });
    UserService.reviewProperty(review)
      .then((response) => {
        console.log("Response::", response.data);
        alert("Review added successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Error adding review");
      });
    setShowModal(false);
  };

  const handlePayRent = () => {
    console.log("Pay Rent");
    UserService.payRent()
      .then((response) => {
        console.log("Response::", response.data);
        alert("Rent paid successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Error paying rent");
      });
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

  return (
    <div>
      {loading && <CircularProgress />}
      {appliedProperties &&
        appliedProperties.map((property, index) => (
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
                    <div>
                      <b>
                        <p>STATUS: YOU ARE ALREADY IN THIS PROPERTY</p>
                      </b>
                      <button onClick={handlePayRent}>Pay</button>
                      <button onClick={() => setShowModal(true)}>
                        Add Review
                      </button>

                      {showModal && (
                        <div
                          style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#fff",
                            padding: "50px",
                            borderRadius: "10px",
                            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
                            width: "80%",
                            maxWidth: "500px",
                          }}
                        >
                          <h2 style={{ marginBottom: "20px" }}>Add review</h2>
                          <textarea
                            style={{
                              width: "100%",
                              minHeight: "100px",
                              padding: "10px",
                              marginBottom: "20px",
                              border: "1px solid #ddd",
                              borderRadius: "5px",
                            }}
                            onChange={(e) =>
                              setReview({
                                ...review,
                                review: e.target.value,
                                propertyId: property.id,
                              })
                            }
                            value={review.review}
                          />
                          <button
                            style={{
                              marginRight: "10px",
                              padding: "10px 20px",
                              border: "none",
                              borderRadius: "5px",
                              backgroundColor: "#f0f0f0",
                              cursor: "pointer",
                            }}
                            onClick={() => setShowModal(false)}
                          >
                            Cancel
                          </button>
                          <button
                            style={{
                              padding: "10px 20px",
                              border: "none",
                              borderRadius: "5px",
                              backgroundColor: "#007BFF",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleAddReviewModal(property.id, review.review)
                            }
                          >
                            Send
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {property.status === "PROCESS_COMPLETED" && (
                    <b>
                      <p>This Property is Already Occupied</p>
                    </b>
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
                                    onClick={()=>handleView()}
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
                                  value={transactionRequest.cardHolderName}
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
                                    handleInputChange("cvv", e.target.value)
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
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
    </div>
  );
}

export default ApplicationsPage;

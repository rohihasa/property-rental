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

function ApplicationsPage() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [appliedProperties, setAppliedProperties] = React.useState([
    {
      id: 1,
      name: "Property 1",
      location: "Location",
      status: "accepted",
    },
    {
      id: 2,
      name: "Property 2",
      location: "Location",
      status: "Inprogress",
    },
  ]);
  const [loading, setLoading] = React.useState(false);
  // useEffect(() => {
  //   UserService.getAppliedProperties()
  //     .then((response) => {
  //       setAppliedProperties(response.data);
  //       console.log(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.log(error);
  //       setAppliedProperties(null);
  //     });
  // }, []);
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
              height: "200px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {property.id && property.cand && (
                  <Card key={property.id} item={property} />
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
                  {property.status === "Inprogress" && (
                    <b>
                      {" "}
                      <p>{property.status}</p>
                    </b>
                  )}
                  {property.status === "accepted" && (
                    <div>
                      <b>
                        <p>Owner approved.</p>
                      </b>
                      <b>
                        <p> Please Accept terms and conditions.</p>
                      </b>
                      <Button
                        onClick={handleClickOpen}
                        style={{ backgroundColor: "#FFC000", color: "black" }}
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
                              <p>AGREEMENT VIEW BOX</p>
                            </Grid>
                            <Grid item xs={6}>
                              {/* Grid item content */}
                              <p>PAYMENT BOX</p>
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
                                    InputProps={{
                                      style: { backgroundColor: "" },
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    style={{ margin: "10px 0" }}
                                    label="Name on Card"
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
                              >
                                Accept
                              </Button>
                              <Button
                                style={{ margin: "10px" }}
                                variant="contained"
                                color="secondary"
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
        ))}
    </div>
  );
}

export default ApplicationsPage;

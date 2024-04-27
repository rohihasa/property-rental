import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import CardForManageProperties from "../card/CardForManageProperties";
import {
  CircularProgress,
  Dialog,
  ButtonDialog,
  FormLabel,
  Checkbox,
  Grid,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropertyService from "../../services/PropertyService";

const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: "green", // Change this to your desired color
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green", // Change this to your desired color
    },
  },
});
function ListingsPage() {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [uploaded, setUploaded] = React.useState(false);
  const [propertyPostRequest, setPropertyPostRequest] = useState({
    name: null,
    price: 0,
    address: {
      street: "",
      city: "",
      zipCode: "",
    },
    description: null,
    bedrooms: 0,
    bathrooms: 0,
    size: "",
    yearBuilt: "",
    petsAllowed: false,
    isAvalilable: false,
    isFurnished: false,
    type: "",
    amenities: [],
    images: [],
    propertyDetails: {
      leaseStartDate: "",
      leaseEndDate: "",
      applicationDeadline: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [role, setRole] = React.useState("");
  const [optionInput, setOptionInput] = useState("");
  const [verified, setVerified] = React.useState(false);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  function handleImageChange(event) {
    const files = Array.from(event.target.files);
    const fileReaders = files.map((file) => {
      return new Promise((resolve, reject) => {
        setUploaded(true);
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders)
      .then((base64Files) => {
        setPropertyPostRequest({
          ...propertyPostRequest,
          images: base64Files,
        });
      })
      .catch((error) => {
        console.error("Error reading files: ", error);
      });
  }

  const handlePostNewProperty = () => {
    console.log("Post Request", propertyPostRequest);
    PropertyService.postProperty(propertyPostRequest)
      .then((response) => {
        console.log(response.data);
        alert("Property Posted Successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Error Posting Property");
      });
  };

  const handleOptionInputChange = (event) => {
    setOptionInput(event.target.value);
    console.log("Option Input", event.target.value);
  };

  const handleOptionInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setPropertyPostRequest({
        ...propertyPostRequest,
        amenities: [...propertyPostRequest.amenities, optionInput],
      });
      console.log("Post Request", propertyPostRequest);
      setOptionInput("");
    }
  };

  const handleDeleteOption = (optionToDelete) => () => {
    setPropertyPostRequest({
      ...propertyPostRequest,
      amenities: propertyPostRequest.amenities.filter(
        (option) => option !== optionToDelete
      ),
    });
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApplyToOwer = () => {
    UserService.applyForOwner()
      .then((response) => {
        console.log(response.data);
        alert("Application Sent Successfully, Please wait for approval");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Error Sending Application");
      });
  }
  useEffect(() => {
    UserService.getUserById(userDetails.id)
      .then((response) => {
        console.log(response.data);
        setRole(response.data.role);
        setVerified(response.data.verified);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(true); // Set loading to true before the API call
    UserService.getListedProperties()
      .then((response) => {
        console.log("LISTED::::",response.data);
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
      {loading && <CircularProgress />}
      {/* {data &&
        data.map((item) => (
          <CardForManageProperties key={item.id} item={item} />
        ))} */}
      {!data && <h1>No Listed Properties</h1>}
      {role === "ROLE_OWNER" && verified && (
        <Button onClick={handleClickOpen}>Post New Property</Button>
      )}
      {role === "ROLE_USER"}
      {/* {role === "ROLE_USER" && <Button>Apply</Button>} */}
      <Button onClick={handleApplyToOwer}>Apply for Owner</Button>
      <Button onClick={handleClickOpen}>Post New Property</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Post New Property</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  style={{ margin: "10px 0" }}
                  label="Name"
                  fullWidth
                  value={propertyPostRequest.name}
                  onChange={(event) =>
                    setPropertyPostRequest({
                      ...propertyPostRequest,
                      name: event.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  style={{ margin: "10px 0" }}
                  label="Price"
                  fullWidth
                  value={propertyPostRequest.price}
                  onChange={(event) =>
                    setPropertyPostRequest({
                      ...propertyPostRequest,
                      price: event.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  style={{ margin: "10px 0" }}
                  label="Street"
                  fullWidth
                  value={propertyPostRequest.address.street}
                  onChange={(event) =>
                    setPropertyPostRequest({
                      ...propertyPostRequest,
                      address: {
                        ...propertyPostRequest.address,
                        street: event.target.value,
                      },
                    })
                  }
                />

                <TextField
                  required
                  style={{ margin: "10px 0" }}
                  label="City"
                  fullWidth
                  value={propertyPostRequest.address.city}
                  onChange={(event) =>
                    setPropertyPostRequest({
                      ...propertyPostRequest,
                      address: {
                        ...propertyPostRequest.address,
                        city: event.target.value,
                      },
                    })
                  }
                />
                <TextField
                  required
                  style={{ margin: "10px 0" }}
                  label="Zip Code"
                  fullWidth
                  value={propertyPostRequest.address.zipCode}
                  onChange={(event) =>
                    setPropertyPostRequest({
                      ...propertyPostRequest,
                      address: {
                        ...propertyPostRequest.address,
                        zipCode: event.target.value,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  style={{ margin: "10px 0" }}
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={propertyPostRequest.description}
                  onChange={(event) =>
                    setPropertyPostRequest({
                      ...propertyPostRequest,
                      description: event.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  style={{ margin: "10px 0" }}
                  label="No. of Bedrooms"
                  type="number"
                  fullWidth
                  value={propertyPostRequest.bedrooms}
                  onChange={(event) =>
                    setPropertyPostRequest({
                      ...propertyPostRequest,
                      bedrooms: event.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  style={{ margin: "10px 0" }}
                  label="No. of Bathrooms"
                  type="number"
                  fullWidth
                  value={propertyPostRequest.bathrooms}
                  onChange={(event) =>
                    setPropertyPostRequest({
                      ...propertyPostRequest,
                      bathrooms: event.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  style={{ margin: "10px 0" }}
                  label="Size"
                  fullWidth
                  value={propertyPostRequest.size}
                  onChange={(event) =>
                    setPropertyPostRequest({
                      ...propertyPostRequest,
                      size: event.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  style={{ margin: "10px 0" }}
                  label="Year Built"
                  fullWidth
                  value={propertyPostRequest.yearBuilt}
                  onChange={(event) =>
                    setPropertyPostRequest({
                      ...propertyPostRequest,
                      yearBuilt: event.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  style={{ margin: "10px 0" }}
                  label="Building Type"
                  fullWidth
                  value={propertyPostRequest.type}
                  onChange={(event) =>
                    setPropertyPostRequest({
                      ...propertyPostRequest,
                      type: event.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={propertyPostRequest.petsAllowed}
                      onChange={(event) =>
                        setPropertyPostRequest({
                          ...propertyPostRequest,
                          petsAllowed: event.target.checked,
                        })
                      }
                      name="petsAllowed"
                      color="primary"
                    />
                  }
                  label="Pets Allowed"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  style={{ margin: "10px 0", width: "100%" }}
                  component="fieldset"
                >
                  <FormLabel component="legend">Currently Available</FormLabel>
                  <RadioGroup
                    value={propertyPostRequest.isAvailable ? "Yes" : "No"}
                    onChange={(event) =>
                      setPropertyPostRequest({
                        ...propertyPostRequest,
                        isAvailable: event.target.value === "Yes",
                      })
                    }
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  style={{ margin: "10px 0", width: "100%" }}
                  component="fieldset"
                >
                  <FormLabel component="legend">Furnished</FormLabel>
                  <RadioGroup
                    value={propertyPostRequest.isFurnished ? "Yes" : "No"}
                    onChange={(event) =>
                      setPropertyPostRequest({
                        ...propertyPostRequest,
                        isFurnished: event.target.value === "Yes",
                      })
                    }
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  style={{ margin: "10px 0" }}
                  label="Lease Start"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={propertyPostRequest.propertyDetails.leaseStartDate}
                  onChange={(event) =>
                    setPropertyPostRequest({
                      ...propertyPostRequest,
                      propertyDetails: {
                        ...propertyPostRequest.propertyDetails,
                        leaseStart: event.target.value,
                      },
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  style={{ margin: "10px 0" }}
                  label="Lease End"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={propertyPostRequest.propertyDetails.leaseEndDate}
                  onChange={(event) =>
                    setPropertyPostRequest({
                      ...propertyPostRequest,
                      propertyDetails: {
                        ...propertyPostRequest.propertyDetails,
                        leaseEnd: event.target.value,
                      },
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  style={{ margin: "10px 0" }}
                  label="Deadline"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    propertyPostRequest.propertyDetails.applicationDeadline
                  }
                  onChange={(event) =>
                    setPropertyPostRequest({
                      ...propertyPostRequest,
                      propertyDetails: {
                        ...propertyPostRequest.propertyDetails,
                        deadline: event.target.value,
                      },
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl style={{ margin: "10px 0", width: "100%" }}>
                  {propertyPostRequest &&
                    propertyPostRequest.amenities.map((option) => (
                      <Chip
                        style={{
                          marginBottom: "15px",
                          marginRight: "5px",
                          maxWidth: "18%",
                        }}
                        key={option}
                        label={option}
                        onDelete={handleDeleteOption(option)}
                      />
                    ))}
                  <Grid item xs={12}>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="raised-button-file">
                      <Button variant="outlined" component="span">
                        {uploaded ? "Uploaded" : "Upload Images"}
                      </Button>
                    </label>
                  </Grid>
                  <TextField
                    required
                    value={optionInput}
                    onChange={handleOptionInputChange}
                    onKeyDown={handleOptionInputKeyDown}
                    label="Add Amenities"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  style={{ margin: "10px 0" }}
                  variant="contained"
                  color="primary"
                  onClick={handlePostNewProperty}
                >
                  Post
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ListingsPage;

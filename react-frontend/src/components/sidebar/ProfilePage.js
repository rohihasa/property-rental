import {
  Button,
  TextField,
  Paper,
  Grid,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [item, setItem] = useState(null); // Add this line
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false); // Add this line
  const [updateProfile, setUpdateProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactDetails: {
      phoneNumber: "",
      secondaryPhone: "",
      address: {
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
  }); // Add this line

  useEffect(() => {
    setUpdateProfile({
      firstName: userDetails.firstName || "",
      lastName: userDetails.lastName || "",
      email: userDetails.email || "",
      contactDetails: {
        phoneNumber: userDetails.contactDetails?.phoneNumber || "",
        secondaryPhone: userDetails.contactDetails?.secondaryPhone || "",
        address: {
          address: userDetails.contactDetails?.address?.address || "",
          city: userDetails.contactDetails?.address?.city || "",
          state: userDetails.contactDetails?.address?.state || "",
          zipCode: userDetails.contactDetails?.address?.zipCode || "",
          country: userDetails.contactDetails?.address?.country || "",
        },
      },
    });
    setItem(userDetails.currentProperty);
  }, [userDetails]);

  const userDetailsFromStorage = JSON.parse(
    localStorage.getItem("userDetails")
  );

  console.log("User Details::", userDetailsFromStorage);
  const userId =
    userDetailsFromStorage !== null ? userDetailsFromStorage.id : "";
  console.log("User Id::", userId);

  const handleSubmit = () => {
    UserService.updateUser(updateProfile)
      .then((response) => {
        console.log("Response::", response);
        alert("Profile Updated Successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error::", error);
      });
  };

  useEffect(() => {
    setLoading(true); // Set loading to true before the API call
    UserService.getUserById(userId)
      .then((response) => {
        setUserDetails(response.data);
        setLoading(false); // Set loading to false after the API call
      })
      .catch((error) => {
        // Handle error here
        setLoading(false); // Set loading to false after the API call
      });
  }, []);

  const handleEditProfile = () => {
    setLoading(true); // Set loading to true before the API call
    UserService.getUserById(userId)
      .then((response) => {
        setUserDetails(response.data);
        setLoading(false); // Set loading to false after the API call
      })
      .catch((error) => {
        // Handle error here
        setLoading(false); // Set loading to false after the API call
      });
  };
  const handleFieldChange = (field, value) => {
    const fields = field.split(".");
    if (fields.length > 1) {
      setUpdateProfile((prevState) => ({
        ...prevState,
        [fields[0]]: {
          ...prevState[fields[0]],
          [fields[1]]: value,
        },
      }));
    } else {
      setUpdateProfile((prevState) => ({ ...prevState, [field]: value }));
    }
  };
  return (
  <div>
    {item && <div className="card">
    <Link to={""} className="imageContainer">
      <img src={`${item.images[0]}`} alt="" />
    </Link>
    <div className="textContainer">
      <h2 className="title">
        <Link to={``}>{item.name}</Link>
      </h2>
      <p className="address">
        <img src="/pin.png" alt="" />
        <span>{item.address.address}</span>
      </p>
      <p className="price">$ {item.price}</p>
    </div>
  </div>}
  {item===null && <h1>No Current Property</h1>}
      <Button
        style={{ marginBottom: "10px" }}
        onClick={handleEditProfile}
        variant="outlined"
        color="primary"
      >
        Edit Profile
      </Button>
      <Backdrop style={{ color: "#fff", zIndex: 2 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Paper
        style={{
          padding: "20px",
          marginTop: "20px",
          maxWidth: "40%",
          marginLeft: "180px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <p>First Name:</p>
            <TextField
              style={{
                padding: "3px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              value={updateProfile.firstName}
              onChange={(e) => handleFieldChange("firstName", e.target.value)}
              fullWidth
            />

            <p>Last Name:</p>
            <TextField
              style={{
                margin: "1px 0",
                padding: "3px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              value={updateProfile.lastName}
              onChange={(e) => handleFieldChange("lastName", e.target.value)}
              fullWidth
            />

            <p>Address:</p>
            <TextField
              style={{
                padding: "3px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              value={
                updateProfile.contactDetails &&
                updateProfile.contactDetails.address &&
                updateProfile.contactDetails.address.address
              }
              onChange={(e) =>
                handleFieldChange(
                  "contactDetails.address.address",
                  e.target.value
                )
              }
              fullWidth
            />

            <p>City:</p>
            <TextField
              style={{
                padding: "3px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              value={
                updateProfile.contactDetails &&
                updateProfile.contactDetails.address &&
                updateProfile.contactDetails.address.city
              }
              onChange={(e) =>
                handleFieldChange("contactDetails.address.city", e.target.value)
              }
              fullWidth
            />

            <p>State:</p>
            <TextField
              style={{
                padding: "3px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              value={
                updateProfile.contactDetails &&
                updateProfile.contactDetails.address &&
                updateProfile.contactDetails.address.state
              }
              onChange={(e) =>
                handleFieldChange(
                  "contactDetails.address.state",
                  e.target.value
                )
              }
              fullWidth
            />

            <p>Zip:</p>
            <TextField
              style={{
                padding: "3px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              value={
                updateProfile.contactDetails &&
                updateProfile.contactDetails.address &&
                updateProfile.contactDetails.address.zipCode
              }
              onChange={(e) =>
                handleFieldChange(
                  "contactDetails.address.zipCode",
                  e.target.value
                )
              }
              fullWidth
            />
            <p>Country:</p>
            <TextField
              style={{
                padding: "3px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              value={
                updateProfile.contactDetails &&
                updateProfile.contactDetails.address &&
                updateProfile.contactDetails.address.country
              }
              onChange={(e) =>
                handleFieldChange(
                  "contactDetails.address.country",
                  e.target.value
                )
              }
              fullWidth
            />

            <p>Phone Number:</p>
            <TextField
              style={{
                padding: "3px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              value={
                updateProfile.contactDetails &&
                updateProfile.contactDetails.phoneNumber
              }
              onChange={(e) =>
                handleFieldChange("contactDetails.phoneNumber", e.target.value)
              }
              fullWidth
            />

            <p>Secondary Phone Number:</p>
            <TextField
              style={{
                padding: "3px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              value={
                updateProfile.contactDetails &&
                updateProfile.contactDetails.secondaryPhone
              }
              onChange={(e) =>
                handleFieldChange(
                  "contactDetails.secondaryPhone",
                  e.target.value
                )
              }
              fullWidth
            />

            <p>Email:</p>
            <TextField
              value={updateProfile.email}
              fullWidth
              style={{
                margin: "5px 0",
                padding: "3px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              onChange={(e) => handleFieldChange("email", e.target.value)}
            />
          </Grid>
          <Grid item xs={8}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => window.location.reload()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "10px" }}
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default ProfilePage;

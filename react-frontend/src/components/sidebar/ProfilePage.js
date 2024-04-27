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

function ProfilePage() {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false); // Add this line

  const userDetailsFromStorage = JSON.parse(
    localStorage.getItem("userDetails")
  );
  const userId =
    userDetailsFromStorage !== null ? userDetailsFromStorage.userId : ""; // Get userId from userDetails
  const handleEdit = () => {
    setEdit(!edit);
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
  const [edit, setEdit] = React.useState(false);
  return (
    <div>
      <div>
        <h1>PropertyCard</h1>
      </div>
      <Button
        style={{ marginBottom: "10px" }}
        onClick={handleEdit}
        variant="outlined"
        color="primary"
      >
        Edit Profile
      </Button>
      <Backdrop style={{ color: "#fff", zIndex: 2 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {edit && (
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
              <TextField
                label="First Name"
                style={{
                  margin: "5px 0",
                  padding: "3px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                defaultValue={userDetails.firstName}
                fullWidth
              />
              <TextField
                label="Last Name"
                style={{
                  margin: "5px 0",
                  padding: "3px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                defaultValue={userDetails.lastName}
                fullWidth
              />
              <TextField
                label="Email"
                defaultValue={userDetails.email}
                fullWidth
                style={{
                  margin: "5px 0",
                  padding: "3px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Address"
                defaultValue={userDetails.address}
                fullWidth
                style={{
                  margin: "5px 0",
                  padding: "3px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <TextField
                style={{
                  margin: "5px 0",
                  padding: "3px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                label="Current Password"
                type="password"
                fullWidth
              />
              <TextField
                style={{
                  margin: "5px 0",
                  padding: "3px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                label="New Password"
                type="password"
                fullWidth
              />
              <TextField
                style={{
                  margin: "5px 0",
                  padding: "3px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                label="Confirm New Password"
                type="password"
                fullWidth
              />
            </Grid>
            <Grid item xs={8}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleEdit}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "10px" }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
}

export default ProfilePage;

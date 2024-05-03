import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@mui/material/CircularProgress";
import UserService from "../../services/UserService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${require("../../static/images/bg.png")})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    width: "60%",
    maxWidth: 800,
  },
}));

const Signup = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
    profileImage: "",
    additionalDetails: {
      firstName: "",
      lastName: "",
      dob: "",
      ssn: "",
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
        city: "",
      },
    },
  });

  const handleSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log(data);
    // UserService.userSignup(data)
    //   .then((response) => {
    //     setLoading(false);
    //     alert("Account created successfully"); // Show a popup
    //     navigate("/login"); // Navigate to "/signin"
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     setError(error.message);
    //   });
  };

  const handleChange = (path, value) => {
    setData((prevState) => {
      const newState = { ...prevState };
      let keyPath = path.split(".");
      let lastKey = keyPath.pop();
      keyPath.reduce((nestedObject, key) => {
        if (!nestedObject[key]) nestedObject[key] = {};
        return nestedObject[key];
      }, newState)[lastKey] = value;
      return newState;
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setData({ ...data, profileImage: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Box sx={{ p: 2, m: 2 }}>
              <Typography style={{ marginLeft: "150px" }} variant="h4">
                WELCOME TO RENT-IT
              </Typography>
              <Typography style={{ marginLeft: "177px" }} variant="h6">
                Please Create Account to Continue!
              </Typography>
              {loading && <CircularProgress />}
              <TextField
                required
                id="username"
                label="Username"
                onChange={(e) => handleChange("username", e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                id="email"
                label="Email"
                onChange={(e) => handleChange("email", e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                onChange={(e) => handleChange("password", e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                sx={{
                  mb: 2,
                  width: '100%', // Full width
                  backgroundColor: '#fff', // White background
                  borderRadius: '4px', // Rounded corners
                }}
              />
            </Box>
            <Box sx={{ p: 2, m: 2 }}>
              <TextField
                required
                id="firstName"
                label="First Name"
                onChange={(e) =>
                  handleChange("additionalDetails.firstName", e.target.value)
                }
                sx={{ mb: 2 }}
              />
              <TextField
                required
                id="lastName"
                label="Last Name"
                onChange={(e) =>
                  handleChange("additionalDetails.lastName", e.target.value)
                }
                sx={{ mb: 2 }}
              />
              <TextField
                required
                id="phoneNumber"
                label="Phone Number"
                onChange={(e) =>
                  handleChange(
                    "additionalDetails.contactDetails.phoneNumber",
                    e.target.value
                  )
                }
                sx={{ mb: 2 }}
              />
              <TextField
                id="secondaryPhone"
                label="Secondary Phone"
                onChange={(e) =>
                  handleChange(
                    "additionalDetails.contactDetails.secondaryPhone",
                    e.target.value
                  )
                }
                sx={{ mb: 2 }}
              />
         
              <TextField
                id="dob"
                label="Date of birth (dd-mm-yyyy)"
                onChange={(e) =>
                  handleChange(
                    "additionalDetails.dob",
                    e.target.value
                  )
                }
                sx={{ mb: 2 }}
              />
              <TextField
                id="ssn"
                label="ssn number"
                onChange={(e) =>
                  handleChange(
                    "additionalDetails.ssn",
                    e.target.value
                  )
                }
                sx={{ mb: 2 }}
              />
            </Box>
            <Box sx={{ p: 2, m: 2 }}>
              <TextField
                required
                id="address"
                label="Address"
                onChange={(e) =>
                  handleChange(
                    "additionalDetails.contactDetails.address.address",
                    e.target.value
                  )
                }
                sx={{ mb: 2 }}
              />
              <TextField
                required
                id="city"
                label="City"
                onChange={(e) =>
                  handleChange(
                    "additionalDetails.contactDetails.address.city",
                    e.target.value
                  )
                }
                sx={{ mb: 2 }}
              />
              <TextField
                required
                id="state"
                label="State"
                onChange={(e) =>
                  handleChange(
                    "additionalDetails.contactDetails.address.state",
                    e.target.value
                  )
                }
                sx={{ mb: 2 }}
              />
              <TextField
                required
                id="zipCode"
                label="Zip Code"
                onChange={(e) =>
                  handleChange(
                    "additionalDetails.contactDetails.address.zipCode",
                    e.target.value
                  )
                }
                sx={{ mb: 2 }}
              />
              <TextField
                required
                id="country"
                label="Country"
                onChange={(e) =>
                  handleChange(
                    "additionalDetails.contactDetails.address.country",
                    e.target.value
                  )
                }
                sx={{ mb: 2 }}
              />
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span>choose profile image</span>
                <input type="file" onChange={handleImageUpload} />
              </div>



            </Box>
            <Box sx={{ p: 2, m: 2 }}>
              <Button onClick={handleSubmit} variant="contained">
                SIGN UP
              </Button>
            </Box>
          </Box>
          <Box sx={{ p: 2, m: 2 }}>
            <Typography variant="body1" className={classes.error}>
              {error}
            </Typography>
            <Typography variant="h6">
              Already have an account? <Link to="/login">LOG IN</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;

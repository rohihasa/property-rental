import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import UserService from "../../services/UserService";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "700vh",
    backgroundImage: `url(${require("../../static/images/bg.png")})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  formContainer: {
    padding: theme.spacing(4),
    backgroundColor: "rgba(255, 255, 255, 1)", // Updated transparency value
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[3],
  },
  formTitle: {
    marginBottom: theme.spacing(2),
  },
  formInput: {
    marginBottom: theme.spacing(2),
  },
  formButton: {
    marginTop: theme.spacing(2),
  },
  error: {
    color: "red",
    marginBottom: theme.spacing(2),
  },
}));

function Login() {
  const classes = useStyles();

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    UserService.userLogin(data)
      .then((response) => {
        setLoading(false);
        console.log("response:::::::", response);
        const jwtToken = response.headers["x-jwt-token"];
        console.log("jwtToken::::::", jwtToken);
        localStorage.setItem("jwtToken", jwtToken);
        const { role } = response.data;
        localStorage.setItem("userDetails", JSON.stringify(response.data));
        if (role === "ROLE_USER") {
          window.location = "/user/home";
        } else if (role === "ROLE_OWNER") {
          window.location = "user/home";
        } else if (role === "ROLE_ADMIN") {
          window.location = "/user/home/test";
        } else {
          console.error("Unknown role received from API:", role);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setError(error.message);
        console.log("error:::::::", error);
      });
  };
  return (
    <Container className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4}>
          <Box className={classes.formContainer}>
          <Typography variant="h4">RENT-IT</Typography>
            <Typography variant="h6" className={classes.formTitle}>
              Login to Your Account
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                type="email"
                label="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                fullWidth
                className={classes.formInput}
              />
              <TextField
                type="password"
                label="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                fullWidth
                className={classes.formInput}
              />
              {error && (
                <Typography className={classes.error}>{error}</Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.formButton}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Sign In"}
              </Button>
            </form>
            <Typography variant="body1" align="center">
              New Here? <Link to="/signup">Sign Up</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;

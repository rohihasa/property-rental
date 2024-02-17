import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
    width: "100vw",
    backgroundImage: `url(${require("../../static/images/property-background.png")})`,
    backgroundSize: "cover",
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

  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const headers = {
    "Content-Type": "application/json",
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = "http://localhost:8080/api/auth/signin";
      const { data: res } = await axios.post(url, data, { headers: headers });

      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
    setLoading(false);
  };

  return (
    <Container className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4}>
          <Box className={classes.formContainer}>
            <Typography variant="h5" className={classes.formTitle}>
              Login to Your Account
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                type="username"
                label="Username"
                name="username"
                onChange={handleChange}
                value={data.username}
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

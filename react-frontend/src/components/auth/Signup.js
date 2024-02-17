import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(6),
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing(2),
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
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
  input: {
    marginBottom: theme.spacing(2),
  },
  error: {
    color: "red",
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
    color: "#333",
    fontWeight: "bold",
  },
  roleLabel: {
    marginBottom: theme.spacing(1),
    color: "#555",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    user: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // Define the setError function

    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <Container className={classes.container}>
      <form className={classes.formContainer} onSubmit={handleSubmit}>
        <Typography variant="h5">Create Account</Typography>
        <TextField
          type="text"
          label="Name"
          name="name"
          onChange={handleChange}
          value={data.firstName}
          required
          fullWidth
          className={classes.input}
        />
        <TextField
          type="email"
          label="Email"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
          fullWidth
          className={classes.input}
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          onChange={handleChange}
          value={data.password}
          required
          fullWidth
          className={classes.input}
        />
        <Typography variant="p">Choose Role Type</Typography>
        <RadioGroup
          aria-label="user-role"
          name="user"
          value={data.user}
          onChange={handleChange}
          fullWidth
          className={classes.input}
        >
          <FormControlLabel value="male" control={<Radio />} label="User" />
          <FormControlLabel value="female" control={<Radio />} label="Owner" />
        </RadioGroup>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Sign Up
        </Button>
        <Typography variant="body1" className={classes.error}>
          {error}
        </Typography>
        <Typography variant="body2">
          Already have an account? <Link to="/login">Log in</Link>
        </Typography>
      </form>
    </Container>
  );
};

export default Signup;

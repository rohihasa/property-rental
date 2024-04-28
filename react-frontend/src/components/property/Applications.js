import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Applications() {
  // Replace this with your actual data
  const applications = [
    { username: "User1", avatar: "url1" },
    { username: "User2", avatar: "url2" },
    // ...
  ];

  return (
    <Grid container spacing={3}>
      {applications.map((application, index) => (
        <Grid key={index} item xs={12} sm={12}>
          <Box p={2} m={1} style={{ border: "1px solid black" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box p={1}>
                  <Avatar alt={application.username} src={application.avatar} />
                  <div>{application.username}</div>
                  <Box p={1} m={1} style={{ border: "1px solid black" }}>
                    <Typography variant="caption">Credit Report</Typography>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <GetAppIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box p={1}>
                  <Button variant="contained" color="primary">
                    Accept
                  </Button>
                  <Button variant="contained" color="secondary">
                    Reject
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default Applications;

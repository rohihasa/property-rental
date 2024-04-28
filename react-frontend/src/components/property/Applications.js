import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import UserService from "../../services/UserService";
import "./terms.css";
import { useParams } from "react-router-dom";

function Applications() {
  const [applications, setApplications] = React.useState([]);
  const { propertyId } = useParams();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    UserService.getApplicationsByPropertyId(propertyId)
      .then((response) => {
        if (response.status === 204) {
          setError(true);
        }
        console.log("Response::", response.data);
        setApplications(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setError(true);
      });
  }, []);

  const handleDownload = (type, id) => {
    if (type === "credit") {
      try {
        const url = UserService.viewOrDownloadAttachment("credit", id, false);
        console.log("Resume URL:", url);
        window.open(url, "_blank");
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    } else {
      try {
        const url = UserService.viewOrDownloadAttachment("id", id, false);
        console.log("Resume URL:", url);
        window.open(url, "_blank");
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    }
    console.log("Download");
  };

  const handleView = (type, id) => {
    if (type === "credit") {
      const url = UserService.viewOrDownloadAttachment("credit", id, true);
      console.log("Resume URL:", url);
      window.open(url, "_blank");
    } else {
      const url = UserService.viewOrDownloadAttachment("id", id, true);
      console.log("Resume URL:", url);
      window.open(url, "_blank");
    }
    console.log("View");
  };

  const handleAccept = (applicationId) => {
    console.log("Accept");
    UserService.acceptOrRejectApplicationByOwner(applicationId, "APPROVED")
      .then((response) => {
        console.log("Response::", response.data);
        alert("Application accepted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Error accepting application");
      });
  };

  const handleReject = (applicationId) => {
    console.log("Reject");
    UserService.acceptOrRejectApplicationByOwner(applicationId, "REJECTED")
      .then((response) => {
        console.log("Response::", response.data);
        alert("Application rejected successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Error rejecting application");
      });
  };

  return (
    <Grid container spacing={3}>
      {error && <h1>Property was already Occupied</h1>}
      {applications &&
        applications.map((application, index) => (
          <Grid key={index} item xs={12} sm={12}>
            <Box p={2} m={1} style={{ border: "1px solid black" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box p={1}>
                    <Avatar
                      alt={application.user.username}
                      src={application.user.profileImage}
                    />
                    <div>{application.user.username}</div>
                    <div className="attachment-card-1">
                      <div>
                        <p className="attachment-text-1">CREDIT REPORT</p>
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            handleDownload("credit", application.user.id)
                          }
                          className="attachment-button-1 download-button-1"
                        >
                          Download
                        </button>
                        <button
                          onClick={() =>
                            handleView("credit", application.user.id)
                          }
                          className="attachment-button-1 view-button-1"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </Box>
                </Grid>
                <Grid style={{ marginTop: "65px" }} item xs={6}>
                  <div className="attachment-card-1">
                    <div>
                      <p className="attachment-text-1">IDENTITY PROOF</p>
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          handleDownload("id", application.user.id)
                        }
                        className="attachment-button-1 download-button-1"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleView("id", application.user.id)}
                        className="attachment-button-1 view-button-1"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <Box p={4}>
                    <Button
                      style={{ marginBottom: "20px" }}
                      variant="contained"
                      color="primary"
                      onClick={() => handleAccept(application.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleReject(application.id)}
                    >
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

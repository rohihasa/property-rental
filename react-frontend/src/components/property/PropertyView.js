import React, { useEffect, useState } from "react";
import "./propertyView.css";
import Slider from "../../components/slider/Slider";
import PropertyService from "../../services/PropertyService";
import { useParams } from "react-router-dom";
import UserService from "../../services/UserService";
import Navbar from "../navBar/Navbar";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileService from "../../services/FileService";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function PropertyView() {
  const { propertyId } = useParams();
  const [messageRequest, setMessageRequest] = useState({
    propertyId: propertyId,
    message: "",
  });
  const [otherOpen, setOtherOpen] = useState(false);
  const [singlePostData, setSinglePostData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [open, setOpen] = useState(false);
  const [disableIdProof, setDisableIdProof] = useState(false);
  const [disableCreditReport, setDisableCreditReport] = useState(false);
  const [files, setFiles] = useState({
    creditReport: "",
    idProof: "",
    propertyId: propertyId,
  });
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails")).id
    : null;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    console.log("PropertyView::::::::::::");
    UserService.getUserById(userId)
      .then((response) => {
        setUserData(response.data);
        console.log("User response::", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    PropertyService.getPropertyById(propertyId)
      .then((response) => {
        setSinglePostData(response.data);
        console.log("Property response::", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    console.log("SinglePostData::", singlePostData);
  }, [singlePostData]);
  useEffect(() => {
    console.log("UserData::", userData);
  }, [userData]);

  const handleSaveProperty = () => {
    PropertyService.saveOrUnsaveProperty(propertyId)
      .then((response) => {
        console.log("Property saved:", response);
      })
      .catch((error) => {
        // Handle the error as needed.
        console.error("Error saving property:", error);
      });
  };

  const handleOpen = () => {
    setOtherOpen(true);
  };

  const handleClose = () => {
    setOtherOpen(false);
  };

  const handleChatButton = () => {
    setOpen(true);
    console.log("Chat button clicked");
  };

  const handlePropertyApply = () => {
    PropertyService.applyForProperty(files)
      .then((response) => {
        console.log("Property applied:", response);
        setIsApplied(true);
        handleClose();
      })
      .catch((error) => {
        alert("Error applying for property");
        console.log("Error applying for property:", error);
      });
  };

  const handleUploadCreditReport = (event) => {
    console.log("File:::", event.target.files[0]);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    console.log("formData", formData.get("file"));
    setLoading(true);
    FileService.uploadFile(formData)
      .then((response) => {
        console.log("File uploaded successfully:", response.data.id);
        setFiles({ ...files, creditReport: response.data.id });
        setDisableCreditReport(true);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  const handleUploadIdProof = (event) => {
    console.log("File:::", event.target.files[0]);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    console.log("formData", formData.get("file"));
    setLoading(true);
    FileService.uploadFile(formData)
      .then((response) => {
        console.log("File uploaded successfully:", response.data.id);
        setFiles({ ...files, idProof: response.data.id });
        setDisableIdProof(true);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  const handleSend = () => {
    console.log(message);
    setLoading(true);
    setMessageRequest.message = message;
    console.log("Message::", messageRequest.message);
    PropertyService.sendMessageToOwner(messageRequest)
      .then((response) => {
        setLoading(false);
        setSuccess(true);
        console.log("Message sent:", response);
        setTimeout(() => {
          setSuccess(false);
          setOpen(false);
          setMessage("");
        }, 2000);
        setMessage("");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error sending message:", error);
      });
  };

  return (
    <div className="singlePage">
      <div className="details">
        <Navbar />
        <div
          style={{ marginTop: "25px", marginLeft: "20px" }}
          className="wrapper"
        >
          {singlePostData && singlePostData.images && (
            <Slider images={singlePostData.images} />
          )}
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData && singlePostData.name}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>
                    {singlePostData && singlePostData.address.address}
                  </span>
                </div>
                <div className="price">
                  $ {singlePostData && singlePostData.price}
                </div>
              </div>
              <div className="user">
                {userData && (
                  <>
                    <img
                      src={`data:image/jpeg;base64,${userData.profileImage}`}
                      alt=""
                    />
                    <span>{userData.username}</span>
                  </>
                )}
              </div>
            </div>
            <div className="bottom">
              {singlePostData && singlePostData.description}
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>Pets Allowed</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{singlePostData && singlePostData.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{singlePostData && singlePostData.bedrooms} Bedroom</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{singlePostData && singlePostData.bathrooms} Bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>250m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>200m away</p>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button onClick={handleChatButton}>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button onClick={handleSaveProperty}>
              <img src="/save.png" alt="" />
              Save the Place
            </button>

            <button 
               disabled={isApplied}
            onClick={handleOpen}>
           
              <img src="/restaurant.png" alt="" />
              {isApplied ? "Applied" : "Apply"}
            </button>
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Send Message</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="message"
                  label="Message"
                  type="text"
                  fullWidth
                  value={messageRequest.message}
                  onChange={(e) =>
                    setMessageRequest({
                      ...messageRequest,
                      message: e.target.value,
                    })
                  }
                />
              </DialogContent>
              <DialogActions>
                {loading ? (
                  <CircularProgress />
                ) : success ? (
                  <CheckCircleIcon />
                ) : (
                  <IconButton color="primary" onClick={handleSend}>
                    <SendIcon />
                  </IconButton>
                )}
              </DialogActions>
            </Dialog>

            <Dialog open={otherOpen} onClose={handleClose}>
              <DialogTitle>APPLY FOR THE PROPERTY</DialogTitle>
              <DialogContent>
                <Typography variant="body2">
                  <b>CONTACT DETAILS</b>
                </Typography>
                <Typography variant="subtitle1">
                  Email: {userData && userData.email}
                </Typography>
                <Typography variant="subtitle1">
                  Phone: {userData && userData.phone}
                </Typography>
                <br></br>
                <Typography style={{ margin: "5px" }} variant="body2">
                  {" "}
                  CREDIT REPORT
                </Typography>
                <TextField
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleUploadCreditReport(e)}
                />
                {disableCreditReport && (
                  <CheckCircleIcon style={{ margin: "15px" }} />
                )}
                <br></br>
                <br></br>
                <Typography style={{ margin: "5px" }} variant="body2">
                  {" "}
                  ID PROOF
                </Typography>
                <TextField
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => handleUploadIdProof(e)}
                />
                {disableIdProof && (
                  <CheckCircleIcon style={{ margin: "15px" }} />
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handlePropertyApply} color="primary">
                  Apply
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyView;

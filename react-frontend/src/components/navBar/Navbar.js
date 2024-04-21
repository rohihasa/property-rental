import { useState, useEffect } from "react";
import "./navbar.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoneIcon from "@mui/icons-material/Done";
import NotificationService from "../../services/NotificationService";
import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Badge,
  ListItemIcon,
  Button,
} from "@mui/material";
import UserService from "../../services/UserService";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [userData, setUserData] = useState({});
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const user = userDetails && userDetails.id;
  const handleClickNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("jwtToken");
    alert("Logged out successfully");
  };

  useEffect(() => {
    NotificationService.getNotifications()
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleTick = (notificationId) => {
    NotificationService.updateNotification(notificationId)
      .then((response) => {
        setNotifications(
          notifications.filter(
            (notification) => notification.id !== notificationId
          )
        );
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    UserService.getUserById(user)
      .then((response) => {
        setUserData(response.data);
        console.log("User response::", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <nav>
      <div className="left">
        <img src="/logo.png" alt="" />
        <h2>RENT-IT</h2>
        <Button href="/user/home">Home</Button>
        <Button href="/user/profile">Profile</Button>
        <Button onClick={handleLogout} href="/login">
          Logout
        </Button>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img
              src={`data:image/jpeg;base64,${userData && userData.profileImage}`}
              alt=""
            />
            <span>{userData && userData.username}</span>
            <div>
              <IconButton
                color="inherit"
                onClick={handleClickNotifications}
                style={{ marginLeft: "20px" }}
              >
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={anchorElNotifications}
                open={Boolean(anchorElNotifications)}
                onClose={handleCloseNotifications}
                sx={{
                  "& .MuiPaper-root": {
                    width: "45ch", // adjust width as needed
                    height: "10ch", // adjust height as needed
                  },
                }}
              >
                {notifications.length === 0 ? (
                  <MenuItem>No new notifications</MenuItem>
                ) : (
                  notifications.map((notification) => (
                    <MenuItem key={notification.id}>
                      <ListItemIcon>
                        <DoneIcon onClick={() => handleTick(notification.id)} />
                      </ListItemIcon>
                      <ListItemText primary={notification.message} />
                    </MenuItem>
                  ))
                )}
              </Menu>
            </div>
          </div>
        ) : (
          <>
            <a href="/">Sign in</a>
            <a href="/" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">Profile</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

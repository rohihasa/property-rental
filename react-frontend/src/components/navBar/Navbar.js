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
  Button
} from "@mui/material";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const user = userDetails && userDetails.id;
  const handleClickNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
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
        // Handle the response here
        // For example, you might want to remove the notification from the list
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

  return (
    <nav>
      <div className="left">
        <img src="/logo.png" alt="" />
        <h2>RENT-IT</h2>
        <Button href="/user/home">Home</Button>
        <Button href="/profile">Profile</Button>
        <Button href="/">Logout</Button>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Doe</span>
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

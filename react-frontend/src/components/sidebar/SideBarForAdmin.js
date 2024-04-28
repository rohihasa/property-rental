import React from "react";
import { Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";

const SidebarForAdmin = ({ onItemClick }) => {
  const menuItems = ["DashBoard", "Owners", "Properties","Logout"];

  return (
    <div>
      <Drawer variant="permanent" anchor="left">
        <Typography variant="h6" sx={{ textAlign: 'center', padding: '10px' }}>Admin Panel</Typography>
        <List sx={{ width: "250px"}}>
          {menuItems.map((text, index) => (
            <ListItem
              sx={{
                margin: "10px",
                padding: "10px",
                backgroundColor: "#f5f5f5", // Change this to your desired color
                "&:hover": {
                  backgroundColor: "#e0e0e0", // Change this to your desired color
                },
              }}
              button
              key={text}
              onClick={() => onItemClick(index)}
            >
              <ListItemText sx={{ textAlign: 'center' ,padding:'10px'}}  primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default SidebarForAdmin;

import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const Sidebar = ({ onItemClick }) => {
  const menuItems = ["Profile", "Listings", "Applications", "Saved","Transactions"];

  return (
    <div>
      <Drawer variant="permanent" anchor="left">
        <List sx={{ width: "200px", marginY: "100px" }}>
          {menuItems.map((text, index) => (
            <ListItem
              sx={{
                margin: "10px",
                padding: "100px",
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

export default Sidebar;

import React, { useState } from "react";
import Navbar from "../navBar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "./profile.css";
import SideBarContent from "../sidebar/SideBarContent";

function Profile() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleItemClick = (index) => {
    setSelectedMenu(index);
  };

  return (
    <div className="container" >
      <div className="nav-bar">
      <Navbar />
      </div>
      
      <div  className="content">
        <Sidebar onItemClick={handleItemClick} />
        <div className="content-container">
        <SideBarContent selectedMenu={selectedMenu} />
          </div>
        
      </div>
    </div>
  );
}

export default Profile;

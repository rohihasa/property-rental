import React, {useState } from 'react'
import SidebarForAdmin from '../sidebar/SideBarForAdmin';
import SideBarContentForAdmin from '../sidebar/SideBarContentForAdmin';


function AdminPage() {
    

    const [selectedMenu, setSelectedMenu] = useState(0);

    const handleItemClick = (index) => {
      setSelectedMenu(index);
    };
  return (
    <div>
        <SidebarForAdmin  onItemClick={handleItemClick}/>
        <div style={{marginLeft:"300px",marginTop:"20px"}}>
        <SideBarContentForAdmin selectedMenu={selectedMenu} />
            </div>
        
    </div>
  )
}

export default AdminPage
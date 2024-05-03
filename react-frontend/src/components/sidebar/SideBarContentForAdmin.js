import React from 'react'
import UsersPageForAdmin from './UsersPageForAdmin';
import PropertiesPageForAdmin from './PropertiesPageForAdmin';
import TransactionsForAdmin from './TransactionsForAdmin';
import LogoutForAdmin from './LogoutForAdmin';
import AdminPanelPage from './AdminPanelPage';


function SideBarContent({selectedMenu}) {
    let Component;
    switch (selectedMenu) {
        case 0:
            Component = AdminPanelPage;
            break;
        case 1:
            Component = UsersPageForAdmin;
            break;
        case 2:
            Component = PropertiesPageForAdmin;
            break;
        case 3:
            Component = TransactionsForAdmin;
            break;
        default:
            Component = LogoutForAdmin;
    }
    return (
        <div>
            <Component />
        </div>
    )
}

export default SideBarContent
import React from 'react'
import ProfilePage from './ProfilePage'
import OrdersPage from './OrdersPage'
import ListingsPage from './ListingsPage'
import ApplicationsPage from './ApplicationsPage'
import SavedPage from './SavedPage'

function SideBarContent({selectedMenu}) {
    let Component;
    switch (selectedMenu) {
        case 0:
            Component = ProfilePage;
            break;
        case 1:
            Component = ListingsPage;
            break;
        case 2:
            Component = ApplicationsPage;
            break;
        case 3:
            Component = SavedPage;
            break;
        default:
            Component = ProfilePage;
    }
    return (
        <div>
            <Component />
        </div>
    )
}

export default SideBarContent
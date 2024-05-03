import React from 'react'
import ProfilePage from './ProfilePage'
import OrdersPage from './OrdersPage'
import ListingsPage from './ListingsPage'
import ApplicationsPage from './ApplicationsPage'
import SavedPage from './SavedPage'
import TransactionsForUser from './TransactionsForUser'

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
        case 4:
            Component = TransactionsForUser; // Make sure to import this at the top
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
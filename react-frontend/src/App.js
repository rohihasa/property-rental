import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import PrivateRouter from "./components/auth/PrivateRouter";
import LandingPage from "./components/user/landingPage/LandingPage";
import Properties from "./components/property/Properties";
import PropertyView from "./components/property/PropertyView";
import Profile from "./components/profile/Profile";
import ManageProperty from "./components/property/ManageProperty";
import AdminPage from "./components/admin/AdminPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRouter />}>
          <Route path="/manage/:propertyId" element={<ManageProperty />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/home" element={<LandingPage />} />
          <Route path="/user/properties" element={<Properties />} />
          <Route path="/:propertyId" element={<PropertyView />} />
          <Route path="/user/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

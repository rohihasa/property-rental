import { Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRoute() {
  const user = localStorage.getItem("jwtToken");
  const location = useLocation();

  if (
    !user &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup"
  ) {
    alert("You need to be logged in to access this page");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
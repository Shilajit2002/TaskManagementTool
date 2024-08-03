import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import Navbar from "../Components/Navbar/Navbar";
import Profile from "../Pages/Profile/Profile";
import React from "react";

interface ProtectedRouteProps {
  element: JSX.Element;
  navbarComponent: React.ComponentType<{ element: JSX.Element }>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  navbarComponent: NavbarComponent,
}) => {
  const authed = localStorage.getItem("taskToken");

  if (authed) {
    return <NavbarComponent element={element} />;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute navbarComponent={Navbar} element={<Profile />} />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute navbarComponent={Navbar} element={<Dashboard />} />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardPpc from "../Dashboard/Dashboadpage/DashboardPpc";
import SignIn from "../SignIn/SignIn";

function PrivateRoute(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      let login = localStorage.getItem("token");
      if (!login) {
        // navigate("/");
        const newUrl = "/signin"; // Replace with your desired URL
      
        navigate(newUrl);
      }
    };
  }, [navigate]);
  return <>{localStorage.getItem("token") ? <Component /> : <SignIn />}</>;
}

export default PrivateRoute;

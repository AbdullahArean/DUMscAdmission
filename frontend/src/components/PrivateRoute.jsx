/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const loggedIn = false;
  if (loggedIn === true) {
    return children;
  } else return <Navigate to="/login" state={"redirected"}></Navigate>;
};

export default PrivateRoute;

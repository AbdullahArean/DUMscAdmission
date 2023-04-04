/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Forgot from "./pages/Forgot";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import Reset from "./pages/Reset";
import Verification from "./pages/Verification";
import Submission from "./pages/Submission";
import Profile from "./pages/Profile";
import ViewProfile from "./pages/ViewProfile";
import Apply from "./pages/Apply";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import api from "./api";
import { useGlobalState } from "./components/UserContext";
import Spinner from "./components/Spinner";
import Confirmation from "./pages/Confirmation";
import Report from "./pages/Report";

function App() {
  const [user, setUser] = useGlobalState("user");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const [jwt, setJwt] = useGlobalState("jwt");

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setLoading(true);
      api
        .get("/account.php", {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        })
        .then((res) => {
          let toUpdateKeys = [
            "id",
            "name",
            "phone",
            "mail",
            "verified",
            "role",
            "profile",
          ];
          let profile = res.data.message;
          Object.keys(user).forEach((k) => {
            if (toUpdateKeys.includes(k)) {
              user[k] = profile[k];
            }
          });
          setUser(user);
          setIsLoggedIn(true);
          setJwt(localStorage.getItem("jwt"));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  if (loading === true)
    return (
      <div>
        <Spinner />
      </div>
    );
  else
    return (
      <div className="App font-body" id="outer-container">
        <div id="page-wrap">
          <BrowserRouter>
            <Sidebar id="sidebar" />
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route
                  path="profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="viewprofile"
                  element={
                    <PrivateRoute>
                      <ViewProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="submission"
                  element={
                    <PrivateRoute>
                      <Submission />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="application"
                  element={
                    <PrivateRoute>
                      <Apply />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="report"
                  element={
                    <PrivateRoute>
                      <Report />
                    </PrivateRoute>
                  }
                />
                <Route path="success" element={<Confirmation />} />
                <Route path="verify" element={<Verification />} />
                <Route path="forgot" element={<Forgot />} />
                <Route path="reset" element={<Reset />} />
                <Route path="registration" element={<Registration />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    );
}

export default App;

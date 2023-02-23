import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Forgot from "./pages/Forgot";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import Reset from "./pages/Reset";
import Verification from "./pages/Verification";
import Confirmation from "./pages/Confirmation";
import Submission from "./pages/Submission";
import Profile from "./pages/Profile";
import Notice from "./pages/Notice";
import ViewProfile from "./pages/ViewProfile";
import Apply from "./pages/Apply";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App font-body" id="outer-container">
      <div id="page-wrap">
        <BrowserRouter>
          <Sidebar
            id="sidebar"
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
          />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="viewprofile" element={<ViewProfile />} />
              <Route path="submission" element={<Submission />} />
              <Route path="notice" element={<Notice />} />
              <Route path="application" element={<Apply />} />
              <Route path="confirm" element={<Confirmation />} />
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

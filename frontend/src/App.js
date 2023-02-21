import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="registration" element={<Registration />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="reset" element={<Reset />} />
          <Route path="profile" element={<Profile />} />
          <Route path="verify" element={<Verification />} />
          <Route path="confirm" element={<Confirmation />} />
          <Route path="submission" element={<Submission />} />
          <Route path="notice" element={<Notice />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

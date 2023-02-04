import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Application from "./pages/application/Application";
import Home from "./pages/home/Home";
import Forgot from "./pages/forgot/Forgot";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import Registration from "./pages/registration/Registration";
import Reset from "./pages/reset/Reset";

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
          <Route path="application" element={<Application />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

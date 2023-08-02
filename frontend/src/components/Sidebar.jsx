/* eslint-disable no-unused-vars */
import React from "react";
import { slide as Menu } from "react-burger-menu";
import "../index.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { useGlobalState } from "./UserContext";
import { Modal } from "antd";

const Sidebar = () => {
  //TODO : Sidebar opening by default
  const nav = useNavigate();
  let location = useLocation();
  const [user, setUser] = useGlobalState("user");
  const [modal2Open, setModal2Open] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const [isOpen, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState();

  const toggleTheme = () => {
    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }

    setTheme();
  };

  const setTheme = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  };

  useEffect(() => {
    setTheme();
  }, [isDarkMode]);

  const to = (address) => {
    setOpen(false);
    nav(`/${address}`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    nav("/login");
    setModal2Open(false);
  };

  return (
    <div
      className={`${
        location.pathname === "/confirm" ||
        location.pathname === "/verify" ||
        location.pathname === "/forgot" ||
        location.pathname === "/reset" ||
        location.pathname === "/registration" ||
        location.pathname === "/login" ||
        location.pathname === "*"
          ? "hideButton"
          : ""
      }`}
    >
      <Menu
        right
        isOpen={isOpen}
        onOpen={() => setOpen(!isOpen)}
        onClose={() => setOpen(!isOpen)}
      >
        <div onClick={() => to("home")} className="menu-item">
          Home
        </div>
        <div onClick={() => to("submission")} className="menu-item">
          {user.role === "admin" ? "Submissions" : "My Submissions"}
        </div>
        {user.role === "student" ? (
          <div onClick={() => to("info")} className="menu-item">
            Information
          </div>
        ) : (
          ""
        )}
        {user.role === "admin" ? (
          <div onClick={() => to("report")} className="menu-item">
            Report
          </div>
        ) : (
          ""
        )}

        <div
          onClick={() => {
            user.profile === "1" ? to("viewprofile") : to("profile");
          }}
          className="menu-item"
        >
          Profile
        </div>
        {isLoggedIn ? (
          <li>
            <div
              onClick={() => {
                setModal2Open(true);
                setOpen(false);
              }}
              className="menu-item"
            >
              Logout
            </div>
          </li>
        ) : (
          <li>
            <div onClick={() => to("login")} className="menu-item">
              Login
            </div>
          </li>
        )}
        <Modal
          title="Confirmation"
          style={{ top: 350 }}
          open={modal2Open}
          okText={"Log out"}
          onOk={logout}
          onCancel={() => setModal2Open(false)}
        >
          <div>Are you sure you want to log out?</div>
        </Modal>
        <div className="block md:mt-1 text-gray-700 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="themeSwitch"
              value=""
              className="sr-only peer"
              checked={isDarkMode === true ? "checked" : ""}
              onChange={() => {
                toggleTheme();
                setOpen(false);
              }}
            />
            <span className="mr-2 text-black dark:text-gray-300">
              <MdDarkMode className="h-4 w-4" />
            </span>
            <div className="w-9 h-4 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:-top-0.5 after:left-[22px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </Menu>
    </div>
  );
};

export default Sidebar;

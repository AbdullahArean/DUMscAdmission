/* eslint-disable no-unused-vars */
import React from "react";
import { slide as Menu } from "react-burger-menu";
import "../index.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const [theme, setTheme] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const to = (address) => {
    setOpen(false);
    navigate(`/${address}`);
  };

  const signout = () => {
    navigate("/login");
    setOpen(false);
  };

  return (
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
        My Submissions
      </div>
      <div
        onClick={() =>
          to(`${profileComplete === true ? "viewprofile" : "profile"}`)
        }
        className="menu-item"
      >
        Profile
      </div>
      <div onClick={() => to("notice")} className="menu-item">
        Notice
      </div>
      {localStorage.getItem("jwt") !== "" ? (
        <div onClick={signout} className="menu-item">
          Logout
        </div>
      ) : (
        <div></div>
      )}
      <div className="block md:mt-1 text-gray-700 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="themeSwitch"
            value=""
            className="sr-only peer"
            checked={theme === "dark" ? "checked" : ""}
            onChange={() => {
              handleThemeSwitch();
              setOpen(false);
            }}
          />
          <span className="mr-2 text-gray-300">
            <MdDarkMode className="h-4 w-4" />
          </span>
          <div className="w-9 h-4 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:-top-0.5 after:left-[22px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </Menu>
  );
};

export default Sidebar;

/* eslint-disable no-unused-vars */
import React from "react";
import "../index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import Logo from "../resources/logo.png";
import { Modal } from "antd";
import { useGlobalState } from "./UserContext";

const Navbar = ({ active }) => {
  const nav = useNavigate();
  var mobile = window.matchMedia("(max-width: 700px)");

  const [modal2Open, setModal2Open] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");

  // const toggleTheme = () => {
  //   console.log(localStorage.getItem("theme"));
  //   console.log("HERE");
  //   document.documentElement.classList.toggle("dark");

  //   if (localStorage.getItem("theme") === "dark") {
  //     localStorage.setItem("theme", "light");
  //     setTheme("light");
  //   } else {
  //     localStorage.setItem("theme", "dark");
  //     setTheme("dark");
  //   }
  //   console.log(localStorage.getItem("theme"));
  // };

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
  }, []);

  const logout = () => {
    localStorage.removeItem("jwt");
    nav("/login");
  };
  let location = useLocation();
  return (
    <div className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div onClick={() => nav("/home")} className="flex items-center">
          <img
            src={Logo}
            className="h-6 mr-3 sm:h-9 cursor-pointer"
            alt="CSEDU Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap cursor-pointer dark:text-white">
            M.Sc Admission
          </span>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <div
                onClick={() => {
                  nav("/home");
                }}
                className={
                  active === "home"
                    ? "block cursor-pointer py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    : "block cursor-pointer py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                }
              >
                Home
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  nav("/submission");
                }}
                className={
                  active === "submission"
                    ? "block cursor-pointer py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    : "block cursor-pointer py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                }
              >
                My Submissions
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  user.profile === "1" ? nav("/viewprofile") : nav("/profile");
                }}
                className={
                  active === "profile"
                    ? "block cursor-pointer py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    : "block cursor-pointer py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                }
              >
                Profile
              </div>
            </li>

            {isLoggedIn ? (
              <li>
                <div
                  onClick={() => setModal2Open(true)}
                  className="block cursor-pointer py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Logout
                </div>
              </li>
            ) : (
              <li></li>
            )}
            <Modal
              title="Confirmation"
              centered
              open={modal2Open}
              okText={"Log out"}
              onOk={logout}
              onCancel={() => setModal2Open(false)}
            >
              <div>Are you sure you want to log out?</div>
            </Modal>
            <li className="block py-2 md:mt-1 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="themeSwitch"
                  value=""
                  className="sr-only peer"
                  checked={isDarkMode}
                  onChange={toggleTheme}
                />
                <span className="text-gray-900 mr-2 dark:text-gray-300">
                  <MdDarkMode className="h-4 w-4" />
                </span>
                <div className="w-9 h-4 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:-top-0.5 after:left-[22px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </li>
          </ul>
        </div>
        <button
          type="button"
          onClick={() => nav("/application")}
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ${
            mobile.matches ? "px-3 py-1" : "px-5 py-2.5"
          } text-center mr-14 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            location.pathname === "/application" ? "invisible" : "block"
          }`}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Navbar;

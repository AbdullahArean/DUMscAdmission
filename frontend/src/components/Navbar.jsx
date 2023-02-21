import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";

const Navbar = ({ active }) => {
  const nav = useNavigate();
  const [theme, setTheme] = useState(null);
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
  const signout = () => {
    nav("/login");
  };
  let location = useLocation();
  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div onClick={() => nav("/home")} className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 mr-3 sm:h-9 cursor-pointer"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap cursor-pointer dark:text-white">
            M.Sc Admission
          </span>
        </div>
        <div className="flex md:order-2">
          <button
            type="button"
            onClick={() => nav("/application")}
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${location.pathname === "/application" ? "hidden" : "block"}`}
          >
            Apply Now
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
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
            {/* <li>
              <div
                onClick={() => {
                  nav("/notice");
                }}
                className={
                  active === "notice"
                    ? "block cursor-pointer py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    : "block cursor-pointer py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                }
              >
                Notice
              </div>
            </li> */}
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
                Submission
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  nav("/profile");
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
            <li>
              <div
                onClick={signout}
                className="block cursor-pointer py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Logout
              </div>
            </li>
            <li className="block py-2 md:mt-1 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="themeSwitch"
                  value=""
                  className="sr-only peer"
                  checked={theme === "dark" ? "checked" : ""}
                  onChange={handleThemeSwitch}
                />
                <span className="text-gray-900 mr-2 dark:text-gray-300">
                  <MdDarkMode className="h-4 w-4" />
                </span>
                <div className="w-9 h-4 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:-top-0.5 after:left-[22px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

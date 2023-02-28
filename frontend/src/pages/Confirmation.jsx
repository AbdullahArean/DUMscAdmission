import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Confirmation = () => {
  const [theme, setTheme] = useState(null);
  const nav = useNavigate();
  const verified = true;
  const toLogin = () => {
    nav("/login");
  };
  const toVerify = () => {
    nav("/verify");
  };
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
  return (
    <div>
      {verified === true ? (
        <section className="bg-white dark:bg-gray-900 h-screen flex flex-col justify-center">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
                Success!
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                Your email has been verified
              </p>
              <button
                onClick={toLogin}
                className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4"
              >
                Go to Login
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white dark:bg-gray-900 h-screen flex flex-col justify-center">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-red-600 dark:text-red-500">
                Failed!
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                Your email could not be verified
              </p>
              <button
                onClick={toVerify}
                className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4"
              >
                Try again
              </button>
            </div>
          </div>
        </section>
      )}
      <label className="fixed top-5 right-5 md:top-10 md:right-10 inline-flex items-center mb-4 cursor-pointer">
        <input
          type="checkbox"
          id="themeSwitch"
          value=""
          className="sr-only peer"
          checked={theme === "dark" ? "checked" : ""}
          onChange={handleThemeSwitch}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Dark Mode
        </span>
      </label>
    </div>
  );
};

export default Confirmation;
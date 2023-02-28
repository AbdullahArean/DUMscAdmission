/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalState } from "../components/UserContext.jsx";

const Login = () => {
  const nav = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = useGlobalState("user");
  const [jwt, setJwt] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
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
    if (isLoggedIn) nav("/home");
    setTheme();
  }, [isDarkMode]);

  const toReg = () => {
    nav("/registration");
  };
  const toChange = () => {
    nav("/forgot");
  };
  const login = () => {
    nav("/verify");
  };
  const toProfile = () => {
    nav("/home");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let dataToPost = new FormData();
    dataToPost.set("email", e.target.email.value);
    dataToPost.set("password", e.target.password.value);

    api
      .post("/login.php", dataToPost)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("jwt", res.data["jwt"]);

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
              toProfile();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login Failed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="colored"
      />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleLogin}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={toChange}
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  transition-all duration-200 ease-in-out"
              >
                Log in
              </button>

              <div className="flex justify-between">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Need an account?
                </p>
                <button
                  onClick={toReg}
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
        <label className="fixed top-5 right-5 md:top-10 md:right-10 inline-flex items-center mb-4 cursor-pointer">
          <input
            type="checkbox"
            id="themeSwitch"
            value=""
            className="sr-only peer"
            checked={isDarkMode === true ? "checked" : ""}
            onChange={toggleTheme}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Dark Mode
          </span>
        </label>
      </div>
    </section>
  );
};

export default Login;

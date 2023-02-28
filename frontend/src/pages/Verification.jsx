/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalState } from "../components/UserContext.jsx";
import { CgSpinner } from "react-icons/cg";
import api from "../api";

const Verification = () => {
  const nav = useNavigate();
  const [user, setUser] = useGlobalState("user");
  const [jwt, setJwt] = useGlobalState("user");
  const [loading, setLoading] = useState(false);
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
    setTheme();
  }, [isDarkMode]);

  const verify = (e) => {
    e.preventDefault();
    setLoading(true);

    let dataToPost = new FormData();
    dataToPost.set("code", e.target.code.value);
    api
      .post("/verifyAccount.php", dataToPost, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })

      .then((res) => {
        if (res.status === 200) {
          setLoading(false);

          api
            .get("/account.php", {
              headers: {
                Authorization: localStorage.getItem("jwt"),
              },
            })
            .then((resAcc) => {
              setLoading(false);

              let toUpdateKeys = [
                "id",
                "name",
                "phone",
                "mail",
                "verified",
                "role",
                "profile",
              ];
              let profile = resAcc.data.message;
              Object.keys(user).forEach((k) => {
                if (toUpdateKeys.includes(k)) {
                  user[k] = profile[k];
                }
              });
              setUser(user);
              setIsLoggedIn(true);
              setJwt(localStorage.getItem("jwt"));
              toHome();
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        }
      })

      .catch((err) => {
        console.log(err);
        toast.error("Verification failed");
        setLoading(false);
      });
  };

  const resend = () => {
    api
      .post(
        "resend.php",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        toast.success("Email sent");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to send email.");
      });
  };

  const toHome = () => {
    nav("/home");
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
            <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Verify your Email Address
            </div>
            <div className="text-sm leading-tight tracking-tight text-gray-900 md:text-lg dark:text-gray-400">
              Enter the code sent to you by email
              <span className="block text-xs text-gray-500">
                *you may need to check spam folder
              </span>
            </div>
            <form
              onSubmit={verify}
              className="space-y-4 md:space-y-3"
              action="#"
            >
              <div>
                <label
                  htmlFor="code"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  OTP
                </label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-between">
                <div className="text-gray-500">
                  OTP expires in
                  <Countdown daysInHours date={Date.now() + 300000} />
                </div>
                <button
                  onClick={resend}
                  type="button"
                  className="text-blue-500 hover:underline"
                >
                  Resend code
                </button>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <div className="flex justify-center">
                  {loading === true ? (
                    <CgSpinner className="animate-spin h-5 w-5 self-center" />
                  ) : (
                    <p>Create account</p>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
        <label className="fixed top-5 right-5 md:top-10 md:right-10 inline-flex items-center mb-4 cursor-pointer">
          <input
            type="checkbox"
            id="themeSwitch"
            value=""
            className="sr-only peer"
            checked={toHome}
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

export default Verification;

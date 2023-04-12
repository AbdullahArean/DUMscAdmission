/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api";
import "../index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalState } from "../components/UserContext";
import Footer from "../components/Footer";

const ViewProfile = () => {
  const [user, setUser] = useGlobalState("user");
  const [profile, setProfile] = useState({});

  const getProfile = () => {
    api
      .get("/profile.php", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        setProfile(response.data.message);
        console.log(response.data.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="bg-white relative min-h-screen h-full dark:bg-gray-900 flex flex-col">
      <Navbar active="" />
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
      <div className="mt-24 mb-20 lg:my-24 mx-4 lg:mx-16">
        <div>
          <div className="text-black dark:text-white mb-6 my-8 text-center text-xl">
            Personal Information
          </div>
          <div className="lg:flex lg:gap-x-10 lg:items-center">
            <div className="">
              <div
                className="img-fluid picThumb mx-auto mb-6 lg:mb-0 w-1/3 lg:w-48"
                style={{
                  backgroundImage: `url(${
                    /\s/g.test(profile.A_PICPATH)
                      ? profile.A_PICPATH.replace(/\s/g, "%20")
                      : profile.A_PICPATH
                  })`,
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
            <div className="w-full">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  defaultValue={profile.A_NAME}
                  disabled={profile.A_NAME ? true : false}
                />
                <label
                  htmlFor="fullname"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Full Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  defaultValue={profile.F_NAME}
                  disabled={profile.F_NAME ? true : false}
                />
                <label
                  htmlFor="fname"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Father's Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="mname"
                  id="mname"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  defaultValue={profile.M_NAME}
                  disabled={profile.M_NAME ? true : false}
                />
                <label
                  htmlFor="mname"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Mother's Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  defaultValue={profile.A_MAIL}
                  disabled={profile.A_MAIL ? true : false}
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Email address
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="dob"
                    id="dob"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    defaultValue={profile.A_DOB}
                    disabled={profile.A_DOB ? true : false}
                  />
                  <label
                    htmlFor="dob"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                  >
                    Date of Birth
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    defaultValue={profile.A_PHONE}
                    disabled={profile.A_PHONE ? true : false}
                  />
                  <label
                    htmlFor="phone"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    Phone
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="text-black dark:text-white mb-6 my-8 text-center text-xl">
            Educational Information
          </div>

          {/* SSC */}

          <div>
            <div className="text-black dark:text-white mb-6 my-8 ml-5">
              SSC / Equivalent
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-5">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="ssc_roll"
                  id="ssc_roll"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  defaultValue={profile.SSC_ROLL}
                  disabled={profile.SSC_ROLL ? true : false}
                />
                <label
                  htmlFor="ssc_roll"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Roll No.
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="ssc_board1"
                  id="ssc_board1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  defaultValue={
                    profile.HSC_BOARD === "10"
                      ? "Dhaka"
                      : profile.HSC_BOARD === "11"
                      ? "Cumilla"
                      : profile.HSC_BOARD === "12"
                      ? "Rajshahi"
                      : profile.HSC_BOARD === "13"
                      ? "Jashore"
                      : profile.HSC_BOARD === "14"
                      ? "Chattogram"
                      : profile.HSC_BOARD === "15"
                      ? "Barishal"
                      : profile.HSC_BOARD === "16"
                      ? "Sylhet"
                      : profile.HSC_BOARD === "17"
                      ? "Dinajpur"
                      : profile.HSC_BOARD === "18"
                      ? "Madrasah"
                      : profile.HSC_BOARD === "19"
                      ? "Mymensingh"
                      : profile.HSC_BOARD === "52"
                      ? "Vocational"
                      : profile.HSC_BOARD === "53"
                      ? "Business Managemen"
                      : profile.HSC_BOARD === "54"
                      ? "Diploma In Commerce"
                      : profile.HSC_BOARD === "60"
                      ? "GCE or Others"
                      : ""
                  }
                  disabled={profile.SSC_BOARD ? true : false}
                />
                <label
                  htmlFor="ssc_board1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Board
                </label>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-5">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="ssc_year1"
                  id="ssc_year1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  defaultValue={profile.SSC_YEAR}
                  disabled={profile.SSC_YEAR ? true : false}
                />
                <label
                  htmlFor="ssc_year1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Passing Year
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="ssc_result"
                  id="ssc_result"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  defaultValue={profile.SSC_RESULT}
                  disabled={profile.SSC_RESULT ? true : false}
                />
                <label
                  htmlFor="ssc_result"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  GPA (Out of 5.00)
                </label>
              </div>
            </div>
          </div>

          {/* HSC */}

          <div>
            <div className="text-black dark:text-white mb-6 my-8 ml-5">
              HSC / Equivalent
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-5">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="hsc_roll"
                  id="hsc_roll"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  defaultValue={profile.HSC_ROLL}
                  disabled={profile.HSC_ROLL ? true : false}
                />
                <label
                  htmlFor="hsc_roll"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Roll No.
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="hsc_board"
                  id="hsc_board"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  defaultValue={
                    profile.HSC_BOARD === "10"
                      ? "Dhaka"
                      : profile.HSC_BOARD === "11"
                      ? "Cumilla"
                      : profile.HSC_BOARD === "12"
                      ? "Rajshahi"
                      : profile.HSC_BOARD === "13"
                      ? "Jashore"
                      : profile.HSC_BOARD === "14"
                      ? "Chattogram"
                      : profile.HSC_BOARD === "15"
                      ? "Barishal"
                      : profile.HSC_BOARD === "16"
                      ? "Sylhet"
                      : profile.HSC_BOARD === "17"
                      ? "Dinajpur"
                      : profile.HSC_BOARD === "18"
                      ? "Madrasah"
                      : profile.HSC_BOARD === "19"
                      ? "Mymensingh"
                      : profile.HSC_BOARD === "52"
                      ? "Vocational"
                      : profile.HSC_BOARD === "53"
                      ? "Business Managemen"
                      : profile.HSC_BOARD === "54"
                      ? "Diploma In Commerce"
                      : profile.HSC_BOARD === "60"
                      ? "GCE or Others"
                      : ""
                  }
                  disabled={profile.HSC_BOARD ? true : false}
                />
                <label
                  htmlFor="hsc_board"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Board
                </label>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-5">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="hsc_year"
                  id="hsc_year"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  defaultValue={profile.HSC_YEAR}
                  disabled={profile.HSC_YEAR ? true : false}
                />
                <label
                  htmlFor="hsc_year"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Passing Year
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="hsc_result"
                  id="hsc_result"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  defaultValue={profile.HSC_RESULT}
                  disabled={profile.HSC_RESULT ? true : false}
                />
                <label
                  htmlFor="hsc_result"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  GPA (Out of 5.00)
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-black dark:text-white mb-6 my-8 ml-5">
            Undergraduate
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-5">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="ug_type"
                id="ug_type"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                defaultValue={profile.UG_TYPE}
                disabled={profile.UG_TYPE ? true : false}
              />
              <label
                htmlFor="ug_type"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Graduation Type
              </label>
            </div>
            <div
              className={`relative ${
                !profile.UG_REG && !profile.UG_UNI ? "md:col-span-2" : ""
              } z-0 w-full mb-6 group`}
            >
              <input
                type="text"
                name="ug_institution"
                id="ug_institution"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                defaultValue={profile.UG_INSTITUTION}
                disabled={profile.UG_INSTITUTION ? true : false}
              />
              <label
                htmlFor="ug_institution"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Institution
              </label>
            </div>
            <div
              className={`relative ${
                profile.UG_REG ? "block" : "hidden"
              } z-0 w-full mb-6 group`}
            >
              <input
                type="text"
                name="ug_reg"
                id="ug_reg"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                defaultValue={profile.UG_REG}
                disabled={profile.UG_REG ? true : false}
                required
              />
              <label
                htmlFor="ug_reg"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                DU Registration Number
              </label>
            </div>
            <div
              className={`relative ${
                profile.UG_UNI ? "block" : "hidden"
              } z-0 w-full mb-6 group`}
            >
              <input
                type="text"
                name="ug_uni"
                id="ug_uni"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                defaultValue={profile.UG_UNI}
                disabled={profile.UG_UNI ? true : false}
                required
              />
              <label
                htmlFor="ug_uni"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Institution Name
              </label>
            </div>
          </div>
          <div
            className={`md:grid ${
              profile.UG_SUB ? "md:grid-cols-4" : "md:grid-cols-3"
            }  md:gap-5`}
          >
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="ug_subject"
                id="ug_subject"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                defaultValue={profile.UG_SUBJECT}
                disabled={profile.UG_SUBJECT ? true : false}
              />
              <label
                htmlFor="ug_subject"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Subject
              </label>
            </div>
            <div
              className={`relative ${
                profile.UG_SUB ? "block" : "hidden"
              } z-0 w-full mb-6 group`}
            >
              <input
                type="text"
                name="ug_sub"
                id="ug_sub"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                defaultValue={profile.UG_SUB}
                disabled={profile.UG_SUB ? true : false}
                required
              />
              <label
                htmlFor="ug_sub"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Subject Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="ug_pass_year"
                id="ug_pass_year"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                defaultValue={profile.UG_PASS_YEAR}
                disabled={profile.UG_PASS_YEAR ? true : false}
              />
              <label
                htmlFor="ug_pass_year"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Passing Year
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="ug_cgpa"
                id="ug_cgpa"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                defaultValue={profile.UG_CGPA}
                disabled={profile.UG_CGPA ? true : false}
              />
              <label
                htmlFor="ug_cgpa"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                CGPA (Out of 4.00)
              </label>
            </div>
          </div>
          <div className="w-full mt-8 mb-4">
            <div className="text-black dark:text-white mb-6 my-8 ml-5">
              Uploaded files
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-4 gap-x-20">
              <a
                className="hover:underline text-center bg-gray-100 border"
                href={profile.A_PICPATH}
                target="blank"
              >
                Picture
              </a>
              <a
                className="hover:underline text-center bg-gray-100 border"
                href={profile.A_SIGPATH}
                target="blank"
              >
                Signature
              </a>
              <a
                className="hover:underline text-center bg-gray-100 border"
                href={profile.SSC_TRANSCRIPT_PATH}
                target="blank"
              >
                SSC Transcript
              </a>
              <a
                className="hover:underline text-center bg-gray-100 border"
                href={profile.HSC_TRANSCRIPT_PATH}
                target="blank"
              >
                HSC Transcript
              </a>
              <a
                className="hover:underline text-center bg-gray-100 border"
                href={profile.UG_TRANSCRIPT_PATH}
                target="blank"
              >
                Undergraduate Transcript
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewProfile;

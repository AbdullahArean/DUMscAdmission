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
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="bg-white min-h-screen h-full dark:bg-gray-900 flex flex-col">
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
      <div className="my-12 lg:my-24 mx-4 lg:mx-16">
        <div>
          <div className="text-black dark:text-white mb-6 my-8 text-center text-xl">
            Personal Information
          </div>
          <div className="lg:flex lg:gap-x-10 lg:items-center">
            <div className="">
              <div
                className="picThumb mb-6 lg:mb-0 w-1/2 lg:w-64"
                style={{
                  backgroundImage: `url(${profile.A_PICPATH})`,
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
            <div className="text-black dark:text-white mb-6 my-8 ml-5">SSC</div>
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
                  defaultValue={profile.SSC_BOARD}
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
            <div className="text-black dark:text-white mb-6 my-8 ml-5">HSC</div>
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
                  defaultValue={profile.HSC_BOARD}
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
            <div className="relative md:col-span-2 z-0 w-full mb-6 group">
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
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-5">
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
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;

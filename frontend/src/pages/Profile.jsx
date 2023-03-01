/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import "../index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalState } from "../components/UserContext";
import { Modal } from "antd";

//TODO: fix logic

const Profile = () => {
  const [page, setPage] = useState("1");
  const [modal2Open, setModal2Open] = useState(false);
  const incomplete = useLocation();
  const nav = useNavigate();
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");

  const [university, setUniversity] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [page1complete, setPage1Complete] = useState(false);
  const [page2complete, setPage2Complete] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [fetchedData, setFetchedData] = useState({
    name: "",
    f_name: "",
    m_name: "",
    a_dob: "",
    ssc_roll: "",
    ssc_year: "",
    ssc_board: "",
    ssc_result: "",

    hsc_roll: "",
    hsc_year: "",
    hsc_board: "",
    hsc_result: "",
  });

  const [firstFormData, setFirstFormData] = useState({
    ssc_roll: "",
    ssc_year: "",
    ssc_board: "",
    hsc_roll: "",
    hsc_year: "",
    hsc_board: "",
  });

  const [secondFormData, setSecondFormData] = useState({
    a_name: "", //a_name
    f_name: "", // f_name
    m_name: "",
    a_pic: "",
    a_sig: "",
    a_dob: "",
    a_phone: "",
    a_mail: "",
    ssc_result: "",
    ssc_reg: "",
    hsc_reg: "",
    hsc_result: "",
    ssc_transcript: "",
    hsc_transcript: "",
  });

  const [thirdFormData, setThirdFormData] = useState({
    ug_type: "",
    ug_institution: "", // ug_institution
    ug_subject: "", // ug_subject
    ug_pass_year: "",
    ug_cgpa: "",
    ug_transcript: "",
  });

  const page1 = () => {
    setPage("1");
  };

  const page2 = () => {
    // if (page1complete) setPage("2");
    // else {
    //   toast.warning("Please fill-up the current page");
    //   setPage("1");
    // }
    setPage("2");
  };

  const page3 = () => {
    // if (page1complete && page2complete) setPage("3");
    // else {
    //   toast.warning("Please fill-up the current page");
    //   setPage("1");
    // }
    setPage("3");
  };

  const boards = [
    {
      name: "Dhaka",
      code: "10",
    },
    {
      name: "Rajshahi",
      code: "11",
    },
    {
      name: "Comilla",
      code: "12",
    },
    {
      name: "Jessore",
      code: "13",
    },
    {
      name: "Chittagong",
      code: "14",
    },
    {
      name: "Barisal",
      code: "15",
    },
    {
      name: "Sylhet",
      code: "16",
    },
    {
      name: "Dinajpur",
      code: "17",
    },
    {
      name: "Mymensingh",
      code: "19",
    },
  ];

  const getSubjects = () => {
    api
      .get("/subjects.php")
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getUniversities = () => {
    api
      .get("/universities.php")
      .then((response) => {
        setUniversity(response.data);
      })
      .catch((err) => console.log(err));
  };

  const page2Donee = (e) => {
    e.preventDefault();

    setSecondFormData({
      a_name: e.target.a_name.value,
      f_name: e.target.f_name.value,
      m_name: e.target.m_name.value,
      a_pic: e.target.a_pic.files[0],
      a_sig: e.target.a_sig.files[0],
      a_dob: e.target.a_dob.value,
      a_phone: e.target.a_phone.value,
      a_mail: e.target.a_mail.value,
      ssc_result: e.target.ssc_result.value,
      ssc_reg: e.target.ssc_roll.value,
      hsc_reg: e.target.hsc_roll.value,
      hsc_result: e.target.hsc_result.value,
      ssc_transcript: e.target.ssc_transcript.files[0],
      hsc_transcript: e.target.hsc_transcript.files[0],
    });

    page3();
  };

  const page3Donee = (e) => {
    e.preventDefault();
    setThirdFormData({
      ug_type: e.target.ug_type.value,
      ug_institution: e.target.ug_institution.value, // ug_institution
      ug_subject: e.target.ug_subject.value, // ug_subject
      ug_pass_year: e.target.ug_pass_year.value,
      ug_cgpa: e.target.ug_cgpa.value,
      ug_transcript: e.target.ug_transcript.files[0],
    });
  };

  const submitProfile = (e) => {
    // e.preventDefault();
    let dataToPost = new FormData();
    dataToPost.set("a_name", secondFormData.a_name);
    dataToPost.set("f_name", secondFormData.f_name);
    dataToPost.set("m_name", secondFormData.m_name);
    dataToPost.set("a_dob", secondFormData.a_dob);
    dataToPost.set("a_phone", secondFormData.a_phone);
    dataToPost.set("a_mail", secondFormData.a_mail);
    dataToPost.set("ssc_roll", firstFormData.ssc_roll);
    dataToPost.set("ssc_reg", firstFormData.ssc_roll);
    dataToPost.set("ssc_board", firstFormData.ssc_board);
    dataToPost.set("ssc_year", firstFormData.ssc_year);
    dataToPost.set("ssc_result", secondFormData.ssc_result);
    dataToPost.set("hsc_roll", firstFormData.hsc_roll);
    dataToPost.set("hsc_reg", firstFormData.hsc_roll);
    dataToPost.set("hsc_board", firstFormData.hsc_board);
    dataToPost.set("hsc_year", firstFormData.hsc_year);
    dataToPost.set("hsc_result", secondFormData.hsc_result);
    dataToPost.set("ug_institution", thirdFormData.ug_institution);
    dataToPost.set("ug_subject", thirdFormData.ug_subject);
    dataToPost.set("ug_type", thirdFormData.ug_type);
    dataToPost.set("ug_cgpa", thirdFormData.ug_cgpa);
    dataToPost.set("ug_pass_year", thirdFormData.ug_pass_year);

    dataToPost.set("a_pic", secondFormData.a_pic);
    dataToPost.set("a_sig", secondFormData.a_sig);
    dataToPost.set("ssc_transcript", secondFormData.ssc_transcript);
    dataToPost.set("hsc_transcript", secondFormData.hsc_transcript);
    dataToPost.set("ug_transcript", thirdFormData.ug_transcript);
    api
      .post("/profile.php", dataToPost, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })

      .then((res) => {
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
              "a_phone",
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
            toast.success("Profile Submitted");
            window.location.replace("/application");
            // nav("/application");
            setModal2Open(false);
          })
          .catch((err) => {
            console.log(err);
          });

        // setPage2Complete(true);
      });
  };

  const fetchSscHscData = (e) => {
    e.preventDefault();

    setFirstFormData({
      ssc_roll: e.target.ssc_roll1.value,
      ssc_year: e.target.ssc_year.value,
      ssc_board: e.target.ssc_board.value,
      hsc_roll: e.target.hsc_roll1.value,
      hsc_year: e.target.hsc_year.value,
      hsc_board: e.target.hsc_board.value,
    });

    /* RETRIEVE DATA */
    let hsid =
      e.target.hsc_board.value +
      e.target.hsc_year.value.slice(-2) +
      e.target.hsc_roll1.value;
    let requestBody = `<dupgwp>
    <header>
    <pgwkey>abcd</pgwkey>
    <pgwreqid>12</pgwreqid>
    </header>
    <body>
    <requestdata>
    <service>
    <gentime>20191023193141</gentime>
    <priority>OT</priority>
    </service>
    <params>
    <param>
    <query-data>
    <hsid>${hsid}</hsid>
    </query-data>
    </param>
    </params>
    </requestdata>
    </body>
    </dupgwp>`;
    axios
      .post(
        "https://regservices.eis.du.ac.bd/edusections/preregistration/getboarddata",
        requestBody,
        {
          headers: {
            "Content-Type": "text/xml",
            Accept: "application/xml",
          },
        }
      )
      .then((res) => {
        const parser = new DOMParser();
        const data = parser.parseFromString(res.data, "application/xml");
        console.log(
          data.getElementsByTagName("ssc-roll")[0].childNodes[0].nodeValue !=
            e.target.ssc_roll1.value
        );
        if (
          data.getElementsByTagName("ssc-roll")[0].childNodes[0].nodeValue !=
          e.target.ssc_roll1.value
        ) {
          toast.error("Invalid Data");
        } else {
          setFetchedData({
            name: data.getElementsByTagName("name")[0].childNodes[0].nodeValue,
            m_name:
              data.getElementsByTagName("mother")[0].childNodes[0].nodeValue,
            f_name:
              data.getElementsByTagName("father")[0].childNodes[0].nodeValue,
            a_dob: data.getElementsByTagName("a_dob")[0].childNodes[0].nodeValue,

            hsc_roll: e.target.hsc_roll1.value,
            hsc_year: e.target.hsc_year.value,
            hsc_board: e.target.hsc_board.value,

            hsc_result:
              data.getElementsByTagName("hsc-gpa")[0].childNodes[0].nodeValue,
            ssc_roll:
              data.getElementsByTagName("ssc-roll")[0].childNodes[0].nodeValue,
            ssc_year:
              data.getElementsByTagName("ssc-passyr")[0].childNodes[0]
                .nodeValue,
            ssc_board:
              data.getElementsByTagName("ssc-board")[0].childNodes[0].nodeValue,
            ssc_result:
              data.getElementsByTagName("ssc-gpa")[0].childNodes[0].nodeValue,
          });

          // setPage1Complete(true);
          page2();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Data");
      });
  };

  useEffect(() => {
    if (!isLoggedIn) nav("/login");
    else if (user.verified == "0") nav("/verify");
    else if (user.profile == "1") nav("/viewprofile");
    else {
      getUniversities();
      getSubjects();
      if (incomplete.state === "incomplete") {
        toast.error("Please complete your profile");
      }
    }
  }, []);
  return (
    <div className="bg-white dark:bg-gray-900 flex flex-col justify-center">
      <Navbar active="profile" />
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
      {/*page 1 information*/}

      {page === "1" ? (
        <div className="bg-white h-screen dark:bg-gray-900">
          <form
            onSubmit={fetchSscHscData}
            className="w-4/5 mx-auto mt-14 mb-10 md:mt-24 md:mb-20"
          >
            <div>
              <ul className="flex justify-evenly w-full">
                <li className="mr-2">
                  <button
                    onClick={() => page1()}
                    className={
                      page === "1"
                        ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500 transition-all duration-200 ease-in-out"
                        : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                    }
                  >
                    Information
                  </button>
                </li>
                <li className="">
                  <button
                    onClick={() => page2()}
                    className={
                      page === "2"
                        ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500  transition-all duration-200 ease-in-out"
                        : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                    }
                  >
                    Preview
                  </button>
                </li>
                <li className="">
                  <button
                    onClick={() => page3()}
                    className={
                      page === "3"
                        ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500  transition-all duration-200 ease-in-out"
                        : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                    }
                  >
                    Undergraduate
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <div className="md:flex md:justify-evenly">
                <div className="w-full mb-16 md:mb-0 md:mx-10">
                  <div className="text-black text-center md:text-start text-xl dark:text-white mb-8 my-8 md:ml-5">
                    SSC
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="ssc_roll1"
                      id="ssc_roll1"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="ssc_roll1"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                    >
                      Roll No.
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="ssc_board" className="sr-only">
                      Underline select
                    </label>
                    <select
                      id="ssc_board"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option defaultValue>Board</option>
                      {boards.map((board, index) => {
                        return (
                          <option key={index} value={board.code}>
                            {board.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="ssc_year" className="sr-only">
                      Underline select
                    </label>
                    <select
                      id="ssc_year"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option defaultValue>Passing Year</option>
                      <option value="17">2017</option>
                      <option value="16">2016</option>
                      <option value="15">2015</option>
                      <option value="14">2014</option>
                      <option value="13">2013</option>
                      <option value="12">2012</option>
                      <option value="11">2011</option>
                      <option value="10">2010</option>
                      <option value="09">2009</option>
                      <option value="08">2008</option>
                      <option value="07">2007</option>
                      <option value="06">2006</option>
                      <option value="05">2005</option>
                      <option value="04">2004</option>
                      <option value="03">2003</option>
                      <option value="02">2002</option>
                      <option value="01">2001</option>
                      <option value="00">2000</option>
                      <option value="99">1999</option>
                      <option value="98">1998</option>
                      <option value="97">1997</option>
                      <option value="96">1996</option>
                      <option value="95">1995</option>
                      <option value="94">1994</option>
                      <option value="93">1993</option>
                      <option value="92">1992</option>
                      <option value="91">1991</option>
                    </select>
                  </div>
                </div>
                <div></div>
                <div className="w-full md:mx-10">
                  <div className="text-black text-xl text-center md:text-start dark:text-white mb-8 my-8 md:ml-5">
                    HSC
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="hsc_roll1"
                      id="hsc_roll1"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="hsc_roll1"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                    >
                      Roll No.
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="hsc_board" className="sr-only">
                      Underline select
                    </label>
                    <select
                      id="hsc_board"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option defaultValue>Board</option>
                      {boards.map((board, index) => {
                        return (
                          <option key={index} value={board.code}>
                            {board.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="hsc_year" className="sr-only">
                      Underline select
                    </label>
                    <select
                      id="hsc_year"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option defaultValue>Passing Year</option>
                      <option value="19">2019</option>
                      <option value="18">2018</option>
                      <option value="17">2017</option>
                      <option value="16">2016</option>
                      <option value="15">2015</option>
                      <option value="14">2014</option>
                      <option value="13">2013</option>
                      <option value="12">2012</option>
                      <option value="11">2011</option>
                      <option value="10">2010</option>
                      <option value="09">2009</option>
                      <option value="08">2008</option>
                      <option value="07">2007</option>
                      <option value="06">2006</option>
                      <option value="05">2005</option>
                      <option value="04">2004</option>
                      <option value="03">2003</option>
                      <option value="02">2002</option>
                      <option value="01">2001</option>
                      <option value="00">2000</option>
                      <option value="99">1999</option>
                      <option value="98">1998</option>
                      <option value="97">1997</option>
                      <option value="96">1996</option>
                      <option value="95">1995</option>
                      <option value="94">1994</option>
                      <option value="93">1993</option>
                      <option value="92">1992</option>
                      <option value="91">1991</option>
                    </select>
                  </div>
                </div>
                <div></div>
              </div>
              <div className="flex justify-center mt-16">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg w-full sm:w-auto px-5 py-2.5 md:px-10 md:py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Next Page
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}

      {/*page 2 preview*/}

      {page === "2" ? (
        <form
          onSubmit={page2Donee}
          className="w-4/5 mx-auto mt-14 mb-10 md:mt-24 md:mb-20"
        >
          <ul className="flex justify-evenly w-full">
            <li className="mr-2">
              <button
                onClick={() => page1()}
                className={
                  page === "1"
                    ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500 transition-all duration-200 ease-in-out"
                    : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                }
              >
                Information
              </button>
            </li>
            <li className="">
              <button
                onClick={() => page2()}
                className={
                  page === "2"
                    ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500  transition-all duration-200 ease-in-out"
                    : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                }
              >
                Preview
              </button>
            </li>
            <li className="">
              <button
                onClick={() => page3()}
                className={
                  page === "3"
                    ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500  transition-all duration-200 ease-in-out"
                    : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                }
              >
                Undergraduate
              </button>
            </li>
          </ul>
          <div>
            <div className="text-black dark:text-white mb-3 my-8 text-center text-xl">
              Personal Information
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="a_name"
                id="a_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                defaultValue={fetchedData.name}
                disabled={fetchedData.name ? true : false}
              />
              <label
                htmlFor="a_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Full Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="f_name"
                id="f_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                defaultValue={fetchedData.f_name}
                disabled={fetchedData.f_name ? true : false}
              />
              <label
                htmlFor="f_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Father's Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="m_name"
                id="m_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                defaultValue={fetchedData.m_name}
                disabled={fetchedData.m_name ? true : false}
              />
              <label
                htmlFor="m_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Mother's Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="a_mail"
                id="a_mail"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                defaultValue={user.mail}
                required
              />
              <label
                htmlFor="a_mail"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Email address
              </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="a_dob"
                  id="a_dob"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  defaultValue={fetchedData.a_dob}
                  disabled={fetchedData.a_dob ? true : false}
                />
                <label
                  htmlFor="a_dob"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                >
                  Date of Birth
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="a_phone"
                  id="a_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  defaultValue={user.a_phone}
                  required
                />
                <label
                  htmlFor="a_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Phone
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="file"
                  name="a_pic"
                  id="a_pic"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="a_pic"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Picture (Passport Size)
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="file"
                  name="a_sig"
                  id="a_sig"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="a_sig"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Signature
                </label>
              </div>
            </div>
            <div className="text-black dark:text-white mb-3 my-8 text-center text-xl">
              Educational Information
            </div>

            {/* SSC */}

            <div>
              <div className="text-black dark:text-white mb-3 my-8 ml-5">
                SSC
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
                    defaultValue={fetchedData.ssc_roll}
                    disabled={fetchedData.ssc_roll ? true : false}
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
                    defaultValue={fetchedData.ssc_board}
                    disabled={fetchedData.ssc_board ? true : false}
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
                    defaultValue={fetchedData.ssc_year}
                    disabled={fetchedData.ssc_year ? true : false}
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
                    defaultValue={fetchedData.ssc_result}
                    disabled={fetchedData.ssc_result ? true : false}
                  />
                  <label
                    htmlFor="ssc_result"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    GPA (Out of 5.00)
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="file"
                  name="ssc_transcript"
                  id="ssc_transcript"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="ssc_transcript"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Transcript
                </label>
              </div>
            </div>

            {/* HSC */}

            <div>
              <div className="text-black dark:text-white mb-3 my-8 ml-5">
                HSC
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
                    defaultValue={fetchedData.hsc_roll}
                    disabled={fetchedData.hsc_roll ? true : false}
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
                    defaultValue={fetchedData.hsc_board}
                    disabled={fetchedData.hsc_board ? true : false}
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
                    defaultValue={fetchedData.hsc_year}
                    disabled={fetchedData.hsc_year ? true : false}
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
                    defaultValue={fetchedData.hsc_result}
                    disabled={fetchedData.hsc_result ? true : false}
                  />
                  <label
                    htmlFor="hsc_result"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    GPA (Out of 5.00)
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="file"
                  name="hsc_transcript"
                  id="hsc_transcript"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="hsc_transcript"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Transcript
                </label>
              </div>
            </div>
            <div className="flex justify-center mt-16">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg w-full sm:w-auto px-5 py-2.5 md:px-10 md:py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Next Page
              </button>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}

      {/* Undergraduate */}
      {page === "3" ? (
        <div className="bg-white h-screen dark:bg-gray-900">
          <form
            onSubmit={page3Donee}
            className="w-4/5 mx-auto mt-14 mb-10 md:mt-24 md:mb-20"
          >
            <ul className="flex justify-evenly w-full">
              <li className="mr-2">
                <button
                  onClick={() => page1()}
                  className={
                    page === "1"
                      ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500 transition-all duration-200 ease-in-out"
                      : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                  }
                >
                  Information
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => page2()}
                  className={
                    page === "2"
                      ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500  transition-all duration-200 ease-in-out"
                      : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                  }
                >
                  Preview
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => page3()}
                  className={
                    page === "3"
                      ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500  transition-all duration-200 ease-in-out"
                      : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                  }
                >
                  Undergraduate
                </button>
              </li>
            </ul>
            <div>
              <div className="text-black dark:text-white mb-3 my-8 ml-5">
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
                  />
                  <label
                    htmlFor="ug_type"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    Graduation Type
                  </label>
                </div>
                <div className="relative md:col-span-2 z-0 w-full mb-6 group">
                  <label htmlFor="ug_institution" className="sr-only">
                    Institution
                  </label>
                  <select
                    id="ug_institution"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option defaultValue>Institution</option>
                    {university.map((uni, index) => {
                      return (
                        <option key={index} value={uni.id}>
                          {uni.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="md:grid md:grid-cols-3 md:gap-5">
                <div className="relative z-0 w-full mb-6 group">
                  <label htmlFor="ug_subject" className="sr-only">
                    Subject
                  </label>
                  <select
                    id="ug_subject"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option defaultValue>Subject</option>
                    {subjects.map((sub, index) => {
                      return (
                        <option key={index} value={sub.id}>
                          {sub.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="ug_pass_year"
                    id="ug_pass_year"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
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
                  />
                  <label
                    htmlFor="ug_cgpa"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    CGPA (Out of 4.00)
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="file"
                  name="ug_transcript"
                  id="ug_transcript"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="ug_transcript"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Transcript
                </label>
              </div>
              <div className="flex justify-center mt-16">
                <button
                  type="submit"
                  onClick={() => setModal2Open(true)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg w-full sm:w-auto px-5 py-2.5 md:px-10 md:py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
                <Modal
                  title="Confirmation"
                  centered
                  open={modal2Open}
                  okText={"Submit"}
                  onOk={submitProfile}
                  onCancel={() => setModal2Open(false)}
                >
                  <div>Are you sure you want to submit?</div>
                </Modal>
              </div>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;

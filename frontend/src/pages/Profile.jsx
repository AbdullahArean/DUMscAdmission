/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import "../index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [page, setPage] = useState("1");
  const nav = useNavigate();
  const [university, setUniversity] = useState([]);
  const [page1complete, setPage1Complete] = useState(false);
  const [page2complete, setPage2Complete] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [fetchedData, setFetchedData] = useState({
    name: "",
    fname: "",
    mname: "",
    dob: "",
    ssc_roll: "",
    ssc_year: "",
    ssc_board: "",
    ssc_result: "",

    hsc_roll: "",
    hsc_year: "",
    hsc_board: "",
    hsc_result: "",
  });

  const page1 = () => {
    setPage("1");
  };

  const page2 = () => {
    /* if (page1complete) setPage("2");
    else {
      toast.warning("Please fill-up the current page", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      setPage("1");
    } */
    setPage("2");
  };

  const page3 = () => {
    /* if (page1complete && page2complete) setPage("3");
    else {
      toast.warning("Please fill-up the current page", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      setPage("1");
    } */
    setPage("3");
  };

  const subjects = [{ label: "Computer Engineering", id: "1" }];

  const boards = [
    {
      name: "Dhaka",
      code: "10",
    },
    {
      name: "Rajshahi",
      code: "10",
    },
    {
      name: "Comilla",
      code: "10",
    },
    {
      name: "Jessore",
      code: "10",
    },
    {
      name: "Chittagong",
      code: "10",
    },
    {
      name: "Barisal",
      code: "10",
    },
    {
      name: "Sylhet",
      code: "10",
    },
    {
      name: "Dinajpur",
      code: "10",
    },
    {
      name: "Mymensingh",
      code: "10",
    },
  ];

  const universities = [
    { label: "Bangladesh Agricultural University", id: "45" },
    { label: "Bangladesh University of Engineering Technology", id: "46" },
    { label: "University of Chittagong", id: "47" },
    { label: "Jahangirnagar University", id: "48" },
    { label: "Islamic University, Bangladesh", id: "49" },
    { label: "Shahjalal University of Science Technology", id: "50" },
    { label: "Khulna University", id: "51" },
    { label: "National University", id: "52" },
    { label: "Bangladesh Open University", id: "53" },
    { label: "Bangabandhu Sheikh Mujib Medical University", id: "54" },
    {
      label: "Bangabandhu Sheikh Mujibur Rahman Agricultural University",
      id: "55",
    },
    { label: "Hajee Mohammad Danesh Science Technology University", id: "56" },
    { label: "Mawlana Bhashani Science Technology University", id: "57" },
    { label: "Patuakhali Science And Technology University", id: "58" },
    { label: "Sher-e-Bangla Agricultural University", id: "59" },
    { label: "Chittagong University of Engineering Technology", id: "60" },
    { label: "Rajshahi University of Engineering Technology", id: "61" },
    { label: "Khulna University of Engineering Technology", id: "62" },
    { label: "Dhaka University of Engineering Technology", id: "63" },
    { label: "Noakhali Science Technology University", id: "64" },
    { label: "Jagannath University", id: "65" },
    { label: "Comilla University", id: "66" },
    { label: "Jatiya Kabi Kazi Nazrul Islam University", id: "67" },
    { label: "Chittagong Veterinary and Animal Sciences University", id: "68" },
    { label: "Sylhet Agricultural University", id: "69" },
    { label: "Jessore University of Science Technology", id: "70" },
    { label: "Pabna University of Science and Technology", id: "71" },
    { label: "Begum Rokeya University, Rangpur", id: "72" },
    { label: "Bangladesh University of Professionals", id: "73" },
    {
      label: "Bangabandhu Sheikh Mujibur Rahman Science Technology University",
      id: "74",
    },
    { label: "Bangladesh University of Textiles", id: "75" },
    { label: "University of Barishal", id: "76" },
    { label: "Rangamati Science and Technology University", id: "77" },
    {
      label:
        "Bangabandhu Sheikh Mujibur Rahman Maritime University, Bangladesh",
      id: "78",
    },
    { label: "Islamic Arabic University", id: "79" },
    { label: "Chittagong Medical University", id: "80" },
    { label: "Rajshahi Medical University", id: "81" },
    { label: "Rabindra University,Bangladesh", id: "82" },
    {
      label: "Bangabandhu Sheikh Mujibur Rahman Digital University,Bangladesh",
      id: "83",
    },
    { label: "Sheikh Hasina University", id: "84" },
    { label: "Khulna Agricultural University", id: "85" },
    { label: "University of Dhaka", id: "43" },
    { label: "University of Rajshahi", id: "44" },
    {
      label:
        "Bangamata Sheikh Fojilatunnesa Mujib Science and Technology University",
      id: "86",
    },
    { label: "Sylhet Medical University", id: "87" },
    {
      label:
        "Bangabandhu Sheikh Mujibur Rahman Aviation And Aerospace University (BSMRAAU)",
      id: "88",
    },
    { label: "Chandpur Science and Technology University", id: "89" },
    {
      label: "Bangabandhu Sheikh Mujibur Rahman University, Kishoreganj",
      id: "90",
    },
    { label: "Hobiganj Agricultural University", id: "91" },
    { label: "Sheikh Hasina Medical University, Khulna", id: "92" },
    { label: "Kurigram Agricultural University", id: "93" },
    { label: "Sunamganj Science and Technology University", id: "94" },
    {
      label:
        "Bangabandhu Sheikh Mujibur Rahman Science Technology University,Pirojpur",
      id: "95",
    },
  ];

  const uni = () => {
    api
      .get("/universities.php")
      .then((response) => {
        setUniversity(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  const submitInformation = (e) => {
    page3();
  };

  const submitProfile = (e) => {
    e.preventDefault();
    let dataToPost = new FormData();
    dataToPost.set("a_name", fetchedData.name);
    dataToPost.set("f_name", fetchedData.fname);
    dataToPost.set("m_name", fetchedData.mname);
    dataToPost.set("a_dob", "02-Jan-2001");
    dataToPost.set("a_phone", "01782267068");
    dataToPost.set("a_mail", "iam.reduan@gmail.com");
    dataToPost.set("ssc_roll", fetchedData.ssc_roll);
    dataToPost.set("ssc_reg", 1410970171);
    dataToPost.set("ssc_board", "Dhaka");
    dataToPost.set("ssc_year", 2017);
    dataToPost.set("ssc_result", fetchedData.ssc_result);
    dataToPost.set("hsc_roll", fetchedData.hsc_roll);
    dataToPost.set("hsc_reg", 1410970171);
    dataToPost.set("hsc_board", "Dhaka");
    dataToPost.set("hsc_year", 2019);
    dataToPost.set("hsc_result", fetchedData.hsc_result);
    dataToPost.set("ug_institution", 45);
    dataToPost.set("ug_subject", 1);
    dataToPost.set("ug_type", "Bsc");
    dataToPost.set("ug_cgpa", 3.99);
    dataToPost.set("ug_pass_year", 2023);
    api
      .post("/profile.php", dataToPost, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })

      .then((res) => {
        toast.success("Profile Submitted");
        nav("/application");
      });
  };

  const fetchSscHscData = (e) => {
    e.preventDefault();
    // let hsid = 1311406473;
    let hsid =
      "10" +
      e.target.underline_select2.value.slice(-2) +
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
          toast.error("Invalid Data", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        } else {
          console.log("HAERE");
          setFetchedData({
            name: data.getElementsByTagName("name")[0].childNodes[0].nodeValue,
            mname:
              data.getElementsByTagName("mother")[0].childNodes[0].nodeValue,
            fname:
              data.getElementsByTagName("father")[0].childNodes[0].nodeValue,
            dob: data.getElementsByTagName("dob")[0].childNodes[0].nodeValue,

            hsc_roll: e.target.hsc_roll1.value,
            hsc_year: e.target.underline_select2.value,
            hsc_board: "Dhaka",

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

          page2();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Data", {
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

  useEffect(() => {
    uni();
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
                    <label htmlFor="underline_select" className="sr-only">
                      Underline select
                    </label>
                    <select
                      id="underline_select"
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
                    <label htmlFor="underline_select3" className="sr-only">
                      Underline select
                    </label>
                    <select
                      id="underline_select3"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option defaultValue>Passing Year</option>
                      <option value="13">2013</option>
                      <option value="14">2014</option>
                      <option value="15">2015</option>
                      <option value="16">2016</option>
                      <option value="17">2017</option>
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
                    <label htmlFor="underline_select1" className="sr-only">
                      Underline select
                    </label>
                    <select
                      id="underline_select1"
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
                    <label htmlFor="underline_select2" className="sr-only">
                      Underline select
                    </label>
                    <select
                      id="underline_select2"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option defaultValue>Passing Year</option>
                      <option value="15">2015</option>
                      <option value="16">2016</option>
                      <option value="17">2017</option>
                      <option value="18">2018</option>
                      <option value="19">2019</option>
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
          onSubmit={submitInformation}
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
                name="fullname"
                id="fullname"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                defaultValue={fetchedData.name}
                disabled={fetchedData.name ? true : false}
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
                defaultValue={fetchedData.fname}
                disabled={fetchedData.fname ? true : false}
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
                defaultValue={fetchedData.mname}
                disabled={fetchedData.mname ? true : false}
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
                  defaultValue={fetchedData.dob}
                  disabled={fetchedData.dob ? true : false}
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
                />
                <label
                  htmlFor="phone"
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
                  name="pic"
                  id="pic"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="pic"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Picture (Passport Size)
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="file"
                  name="sign"
                  id="sign"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="sign"
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
            onSubmit={submitProfile}
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
                  onClick={() => setPage("2")}
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
                  onClick={() => setPage("3")}
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
                  <label htmlFor="underline_select4" className="sr-only">
                    Underline select
                  </label>
                  <select
                    id="underline_select4"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option defaultValue>Institution</option>
                    {universities.map((uni, index) => {
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
                  <label htmlFor="underline_select5" className="sr-only">
                    Underline select
                  </label>
                  <select
                    id="underline_select5"
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
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg w-full sm:w-auto px-5 py-2.5 md:px-10 md:py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import "../index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FcOk, FcCancel } from "react-icons/fc";
import { BiTimeFive } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";
import { Space, Table } from "antd";
import { Modal } from "antd";
import Column from "antd/es/table/Column";
import { useGlobalState } from "../components/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import Footer from "../components/Footer";

const Submission = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const { state } = useLocation();
  const [data, setData] = useState([]);

  // Filter
  const [paymentFilter, setPaymentFilter] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState("");

  function handlePaymentFilterChange(event) {
    const newPaymentFilter = event.target.value;
    setPaymentFilter(newPaymentFilter);
    fetchData(newPaymentFilter, verifiedFilter);
  }

  function handleVerifiedFilterChange(event) {
    const newVerifiedFilter = event.target.value;
    setVerifiedFilter(newVerifiedFilter);
    fetchData(paymentFilter, newVerifiedFilter);
  }

  // Action
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [profile, setProfile] = useState({});

  const [smsModalOpen, setSmsModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const [smsLoading, setSmsLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedUID, setSelectedUID] = useState(null);
  const [message, setMessage] = useState("");

  const [verificationLoading, setVerificationLoading] = useState(false);

  // Verify Application
  const verifyApplication = (record) => {
    if (!verificationLoading) {
      // console.log("Verification");
      const dataToPost = new FormData();
      dataToPost.set("app_id", record["APP_ID"]);
      setVerificationLoading(true);

      api
        .post("/approveApplication.php", dataToPost, {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        })
        .then((response) => {
          toast.success(`Application Verified.`);
          toast.success(`SMS status: ${response.data["sms"]}`);
          setVerificationLoading(false);
          fetchData(paymentFilter, verifiedFilter);
        })
        .catch((err) => {
          toast.error("Failed to verify");
          setVerificationLoading(false);
          console.log(err);
        });
    }
  };

  const showDetails = (record) => {
    if (!detailsLoading) {
      setProfile({});

      setDetailsLoading(true);
      api
        .get(`/applications.php?id=${record["APP_ID"]}`, {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        })
        .then((response) => {
          setProfile(response.data.message);
          setDetailsLoading(false);
          setDetailsModalOpen(true); // Open Modal
        })
        .catch((err) => {
          setDetailsLoading(false);
          toast.error("Failed to load data");
          console.log(err);
        });
    }
  };

  // Edit Profile

  const [editAccessModalOpen, setEditAccessModalOpen] = useState(false);

  const confirmEditAccess = (record) => {
    setSelectedApp(record["APP_ID"]);
    setSelectedUID(record["U_ID"]);
    setEditAccessModalOpen(true);
  };

  const grantEditAccess = () => {
    let dataToPost = new FormData();
    dataToPost.set("app_id", selectedApp);
    dataToPost.set("u_id", selectedUID);

    api
      .post("/editGrant.php", dataToPost, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setSmsLoading(false);
        toast.success(`Access Granted`);
        fetchData(paymentFilter, verifiedFilter);
        setEditAccessModalOpen(false);
      })
      .catch((err) => {
        toast.error("Access grant failed");
        console.log(err);
        setEditAccessModalOpen(false);
      });
  };

  const revokeEditAccess = (record) => {
    let dataToPost = new FormData();
    dataToPost.set("app_id", record["APP_ID"]);
    dataToPost.set("u_id", record["U_ID"]);

    api
      .post("/editRevoke.php", dataToPost, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setSmsLoading(false);
        toast.success(`Access Revoked`);
        fetchData(paymentFilter, verifiedFilter);
      })
      .catch((err) => {
        toast.error("Access Revoke failed");
        console.log(err);
      });
  };

  const [editProfileModalOpen, setEditProfileModalOpen] = useState();
  const [loadingEditProfile, setLoadingEditProfile] = useState(false);

  const [editProfile_pic, setEditProfile_pic] = useState(null);
  const [editProfile_sig, setEditProfile_sig] = useState(null);
  const [editProfile_ssc, setEditProfile_ssc] = useState(null);
  const [editProfile_hsc, setEditProfile_hsc] = useState(null);
  const [editProfile_bsc, setEditProfile_bsc] = useState(null);

  const openEditProfile = (record) => {
    setSelectedUID(record["U_ID"]);
    setEditProfileModalOpen(true);
  };

  const editProfile = () => {
    if (!loadingEditProfile) {
      if (editProfile_pic == null) {
        toast.error("Select a picture.");
      } else if (editProfile_sig == null) {
        toast.error("Select signature.");
      } else if (editProfile_ssc == null) {
        toast.error("Select ssc transcript.");
      } else if (editProfile_hsc == null) {
        toast.error("Select hsc transcript.");
      } else if (editProfile_bsc == null) {
        toast.error("Select undergraduate transcript.");
      } else {
        // Submit the profile
        setLoadingEditProfile(true);
        const dataToPost = new FormData();
        dataToPost.set("a_pic", editProfile_pic);
        dataToPost.set("a_sig", editProfile_sig);
        dataToPost.set("ssc_transcript", editProfile_ssc);
        dataToPost.set("hsc_transcript", editProfile_hsc);
        dataToPost.set("ug_transcript", editProfile_bsc);
        dataToPost.set("u_id", selectedUID);
        api
          .post("/editProfile.php", dataToPost, {
            headers: {
              Authorization: localStorage.getItem("jwt"),
              Accept: "*/*",
            },
          })
          .then((res) => {
            console.log(res.data);
            toast.success("Successful");
            setLoadingEditProfile(false);
            setEditProfileModalOpen(false);
            fetchData(paymentFilter, verifiedFilter);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Try again.");
            setLoadingEditProfile(false);
          });
      }
    }
  };
  // Communication
  const openSMSModal = (record) => {
    setSelectedApp(record["APP_ID"]);
    setSmsModalOpen(true);
  };

  const openEmailModal = (record) => {
    setSelectedApp(record["APP_ID"]);
    setEmailModalOpen(true);
  };

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  const sendSMS = () => {
    if (!smsLoading) {
      setSmsLoading(true);
      let dataToPost = new FormData();
      dataToPost.set("app_id", selectedApp);
      dataToPost.set("message", message);
      api
        .post("/sms.php", dataToPost, {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        })
        .then((res) => {
          setSmsLoading(false);
          toast.success(`SMS sent: ${res.data["sms"]}`);
          setSmsModalOpen(false);
        })
        .catch((err) => {
          setSmsLoading(false);
          toast.error("SMS Failed");
          console.log(err);
        });
    }
  };

  const sendEmail = () => {
    if (!emailLoading) {
      setEmailLoading(true);
      let dataToPost = new FormData();
      dataToPost.set("app_id", selectedApp);
      dataToPost.set("message", message);
      api
        .post("/email.php", dataToPost, {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        })
        .then((res) => {
          setEmailLoading(false);
          toast.success(`Email sent: ${res.data["email"]}`);
          setEmailModalOpen(false);
        })
        .catch((err) => {
          setEmailLoading(false);
          setEmailModalOpen(false);
          toast.error("Email Failed");
          console.log(err);
        });
    }
  };

  const toPayment = (app_id) => {
    toast.error("Deadline over.")
    /*
    let dataToPost = new FormData();
    setApiLoading(true);
    dataToPost.set("app_id", app_id);
    api
      .post("/initiatePayment.php", dataToPost, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setApiLoading(false);
        window.location.replace(`${res.data}`);
      })
      .catch((err) => {
        setApiLoading(false);
        console.log(err);
      });
      */
  };

  const fetchData = (paymentFilter, verifiedFilter) => {
    api
      .get(
        `/applications.php?payment=${paymentFilter}&verified=${verifiedFilter}`,
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load data");
      });
  };

  // BULK SMS / EMAIL

  const [selectedAppIds, setSelectedAppIds] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let appIdArr = [];
      for (let i = 0; i < selectedRows.length; i++) {
        appIdArr.push(selectedRows[i].APP_ID);
      }
      setSelectedAppIds(appIdArr);
    },
  };

  const bulkEmail = () => {
    let csAppId = "";
    for (let i = 0; i < selectedAppIds.length; i++) {
      csAppId += `${selectedAppIds[i]},`;
    }
    setSelectedApp(csAppId.slice(0, -1));
    setEmailModalOpen(true);
  };

  const bulkSMS = () => {
    let csAppId = "";
    for (let i = 0; i < selectedAppIds.length; i++) {
      csAppId += `${selectedAppIds[i]},`;
    }
    setSelectedApp(csAppId.slice(0, -1));
    setSmsModalOpen(true);
  };

  useEffect(() => {
    if (!isLoggedIn) nav("/login", { state: "redirected" });
    else if (user.verified === "0") nav("/verify");
    if (state === "applied") toast.success("Application Successful.");

    fetchData("", "");
  }, []);

  return (
    <div className="bg-white relative min-h-screen h-full dark:bg-gray-900 flex flex-col">
      <Navbar active="submission" />
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

      <div className="mt-20 lg:mt-24 mx-2 mb-20 lg:mx-10 relative">
        {/* Filter */}
        {user.role === "admin" ? (
          <>
            <div className="flex flex-row justify-between gap-5 mb-10">
              {/* Send SMS */}
              <div className="flex flex-row items-center">
                {selectedAppIds.length > 0 ? (
                  <>
                    <div className="flex flex-row justify-start gap-5 mb-10 mt-8">
                      <button
                        onClick={bulkSMS}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200 "
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                          SMS
                        </span>
                      </button>
                    </div>

                    <div className="flex flex-row justify-start gap-5 mb-10 mt-8">
                      <button
                        onClick={bulkEmail}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200 "
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                          Email
                        </span>
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="flex flex-row gap-5">
                {/* Payment Status */}
                <div>
                  <label
                    htmlFor="payment_filter"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Payment status
                  </label>
                  <select
                    id="payment_filter"
                    value={paymentFilter}
                    onChange={handlePaymentFilterChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">All</option>
                    <option value="0">Unpaid</option>
                    <option value="1">Paid</option>
                  </select>
                </div>

                {/* Verification Status */}
                <div>
                  <label
                    htmlFor="verification_filter"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Verification status
                  </label>
                  <select
                    id="verification_filter"
                    value={verifiedFilter}
                    onChange={handleVerifiedFilterChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">All</option>
                    <option value="0">Pending</option>
                    <option value="1">Verified</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <Table
          loading={loading}
          dataSource={data}
          rowKey="APP_ID"
          style={{ overflowX: "auto" }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
        >
          {user.role === "admin" ? (
            <Column title="User ID" dataIndex="U_ID"></Column>
          ) : (
            ""
          )}
          <Column
            title="Department"
            dataIndex="DEPT_NAME"
            render={(approved, record) => (
              <div>Computer Science & Engineering</div>
            )}
          ></Column>
          <Column
            title="Applied at"
            dataIndex="CREATED_ON"
            render={(approved, record) => (
              <div>{record.CREATED_ON.slice(0, 9)}</div>
            )}
          ></Column>

          <Column
            title="Payment"
            dataIndex="APP_PAYMENT"
            render={(payment, record) => (
              <div>
                {record.APP_PAYMENT === "1" ? (
                  <div className="flex gap-1 items-center">
                    <FcOk />
                    <p>Paid</p>
                  </div>
                ) : user.role === "admin" ? (
                  <div className="flex gap-1 items-center">
                    <FcCancel />
                    <p>Unpaid</p>
                  </div>
                ) : (
                  <div className="">
                    <button
                      onClick={() => {
                        toPayment(record.APP_ID);
                      }}
                      disabled={apiLoading ? true : false}
                      className={`${
                        apiLoading ? "cursor-not-allowed" : ""
                      }text-white bg-blue-500 px-4 py-1 rounded-lg font-medium`}
                    >
                      <div className="flex justify-center">
                        {apiLoading === true ? (
                          <CgSpinner className="animate-spin h-5 w-5 self-center" />
                        ) : (
                          <p>Pay now</p>
                        )}
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}
          ></Column>
          <Column
            title="Verification"
            dataIndex="APP_VERIFIED"
            render={(approved, record) => (
              <div>
                {record.APP_VERIFIED === "0" ? (
                  <div className="flex gap-1 items-center">
                    <BiTimeFive />
                    <p>Pending</p>
                  </div>
                ) : record.APP_ADMIT === "0" ? (
                  <div className="flex gap-1 items-center">
                    <FcOk />
                    <p>Approved</p>
                  </div>
                ) : (
                  <div className="flex gap-1 items-center">
                    <FcOk />
                    <p>Download Admit</p>
                  </div>
                )}
              </div>
            )}
          ></Column>

          {user.role === "student" ? (
            <>
              <Column
                title="Admit"
                dataIndex="APP_PAYMENT"
                render={(payment, record) => (
                  <div className="flex gap-1 items-center">
                    <BiTimeFive />
                    <p>Not yet publisehd</p>
                  </div>
                )}
              ></Column>

              <Column
                title="Action"
                dataIndex="id"
                render={(payment, record) => (
                  <>
                    {record.EDIT_ACCESS ? (
                      <button
                        onClick={() => openEditProfile(record)}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200 "
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                          Edit Profile
                        </span>
                      </button>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              ></Column>
            </>
          ) : (
            <></>
          )}

          {user.role === "admin" ? (
            <>
              <Column
                title="Action"
                dataIndex="id"
                render={(id, record) => (
                  <div>
                    <button
                      onClick={() => showDetails(record)}
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200 "
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        {detailsLoading ? "Loading" : "Details"}
                      </span>
                    </button>

                    <button
                      onClick={() => openSMSModal(record)}
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200 "
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        SMS
                      </span>
                    </button>

                    <button
                      onClick={() => openEmailModal(record)}
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200 "
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        Email
                      </span>
                    </button>

                    {record.APP_VERIFIED == "0" && record.APP_PAYMENT == "1" ? (
                      <button
                        onClick={() => verifyApplication(record)}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200 "
                      >
                        <span className="flex  items-center  justify-between gap-2 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                          {verificationLoading == true ? (
                            <>Processing</>
                          ) : (
                            <>
                              Verify <FcOk />
                            </>
                          )}
                        </span>
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              ></Column>
              <Column
                title="Edit Access"
                dataIndex="id"
                render={(id, record) => (
                  <div>
                    {record.EDIT_ACCESS ? (
                      <button
                        onClick={() => revokeEditAccess(record)}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200 "
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                          Revoke
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => confirmEditAccess(record)}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200 "
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                          Grant
                        </span>
                      </button>
                    )}
                  </div>
                )}
              ></Column>
            </>
          ) : (
            <></>
          )}
        </Table>

        {/* View Details Modal */}
        <Modal
          title="Details"
          centered
          open={detailsModalOpen}
          onOk={() => setDetailsModalOpen(false)}
          onCancel={() => setDetailsModalOpen(false)}
          okText="Close"
          cancelButtonProps={{ style: { display: "none" } }}
          width={1000}
          className="dark:bg-black"
        >
          <div className=" ">
            <div>
              <div className="text-black  mb-6 my-8 text-center text-xl">
                Personal Information
              </div>
              <div className="lg:flex lg:gap-x-10 lg:items-center">
                {/* <div className="">
                  {profile.hasOwnProperty('A_PICPATH') ? <div
                    className="img-fluid picThumb mx-auto mb-6 lg:mb-0 w-1/3 lg:w-48"
                    style={{
                      backgroundImage: `url(${
                        /\s/g.test(profile.A_PICPATH)
                          ? profile.A_PICPATH.replace(/\s/g, "%20")
                          : profile.A_PICPATH
                      })`,
                      backgroundSize: "cover",
                    }}
                  ></div> : <></>}
                  
                </div> */}
                <div className="w-full">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="fullname"
                      id="fullname"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      required
                      disabled
                      value={profile.A_NAME}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={profile.F_NAME}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={profile.M_NAME}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={profile.A_MAIL}
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
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="DD/MM/YYYY"
                        required
                        value={profile.A_DOB}
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
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="Ex. 01234567890"
                        required
                        value={profile.A_PHONE}
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

              {/* Files */}
              <div className="w-full mt-8 mb-4">
                <div className="text-black  mb-6 my-8 ml-5">Uploaded files</div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-4 gap-x-20">
                  <a
                    className="hover:underline text-center bg-gray-100 border"
                    href={
                      /\s/g.test(profile.A_PICPATH)
                        ? profile.A_PICPATH.replace(/\s/g, "%20")
                        : profile.A_PICPATH
                    }
                    target="blank"
                  >
                    Picture
                  </a>
                  <a
                    className="hover:underline text-center bg-gray-100 border"
                    href={
                      /\s/g.test(profile.A_SIGPATH)
                        ? profile.A_SIGPATH.replace(/\s/g, "%20")
                        : profile.A_SIGPATH
                    }
                    target="blank"
                  >
                    Signature
                  </a>
                  <a
                    className="hover:underline text-center bg-gray-100 border"
                    href={
                      /\s/g.test(profile.SSC_TRANSCRIPT_PATH)
                        ? profile.SSC_TRANSCRIPT_PATH.replace(/\s/g, "%20")
                        : profile.SSC_TRANSCRIPT_PATH
                    }
                    target="blank"
                  >
                    SSC Transcript
                  </a>
                  <a
                    className="hover:underline text-center bg-gray-100 border"
                    href={
                      /\s/g.test(profile.HSC_TRANSCRIPT_PATH)
                        ? profile.HSC_TRANSCRIPT_PATH.replace(/\s/g, "%20")
                        : profile.HSC_TRANSCRIPT_PATH
                    }
                    target="blank"
                  >
                    HSC Transcript
                  </a>
                  <a
                    className="hover:underline text-center bg-gray-100 border"
                    href={
                      /\s/g.test(profile.UG_TRANSCRIPT_PATH)
                        ? profile.UG_TRANSCRIPT_PATH.replace(/\s/g, "%20")
                        : profile.UG_TRANSCRIPT_PATH
                    }
                    target="blank"
                  >
                    Undergraduate Transcript
                  </a>
                </div>
              </div>

              <div>
                <div className="text-black  mb-6 my-8 ml-5">Undergraduate</div>
                <div className="md:grid md:grid-cols-3 md:gap-5">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="ug_type"
                      id="ug_type"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Ex. BSc or Bachelor of Science"
                      required
                      value={profile.UG_TYPE}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={profile.UG_INSTITUTION}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={profile.UG_REG}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={profile.UG_UNI}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={profile.UG_SUBJECT}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Ex. Computer Science and Engineering"
                      value={profile.UG_SUB}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Ex. 2022"
                      required
                      value={profile.UG_PASS_YEAR}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={profile.UG_CGPA}
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

              <div className="text-black  mb-6 my-8 text-center text-xl">
                Educational Information
              </div>

              {/* SSC */}

              <div>
                <div className="text-black  mb-6 my-8 ml-5">
                  SSC / Equivalent
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-5">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="ssc_roll"
                      id="ssc_roll"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={profile.SSC_ROLL}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={
                        profile.SSC_BOARD === "10"
                          ? "Dhaka"
                          : profile.SSC_BOARD === "11"
                          ? "Cumilla"
                          : profile.SSC_BOARD === "12"
                          ? "Rajshahi"
                          : profile.SSC_BOARD === "13"
                          ? "Jashore"
                          : profile.SSC_BOARD === "14"
                          ? "Chattogram"
                          : profile.SSC_BOARD === "15"
                          ? "Barishal"
                          : profile.SSC_BOARD === "16"
                          ? "Sylhet"
                          : profile.SSC_BOARD === "17"
                          ? "Dinajpur"
                          : profile.SSC_BOARD === "18"
                          ? "Madrasah"
                          : profile.SSC_BOARD === "19"
                          ? "Mymensingh"
                          : profile.SSC_BOARD === "52"
                          ? "Vocational"
                          : profile.SSC_BOARD === "53"
                          ? "Business Managemen"
                          : profile.SSC_BOARD === "54"
                          ? "Diploma In Commerce"
                          : profile.SSC_BOARD === "60"
                          ? "GCE or Others"
                          : profile.SSC_BOARD
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={profile.SSC_YEAR}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={profile.SSC_RESULT}
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
                <div className="text-black  mb-6 my-8 ml-5">
                  HSC / Equivalent
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-5">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="hsc_roll"
                      id="hsc_roll"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={profile.HSC_ROLL}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={
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
                          : profile.HSC_BOARD
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={profile.HSC_YEAR}
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={profile.HSC_RESULT}
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
          </div>
        </Modal>

        {/* Send SMS Modal */}
        <Modal
          title="Send SMS"
          centered
          open={smsModalOpen}
          onOk={() => sendSMS()}
          onCancel={() => setSmsModalOpen(false)}
          okText={smsLoading ? "Sending" : "Send"}
        >
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write message here..."
              onChange={handleMessageChange}
              value={message}
            ></textarea>
          </div>
        </Modal>

        {/* Send Email Modal */}
        <Modal
          title="Send Email"
          centered
          open={emailModalOpen}
          onOk={() => sendEmail()}
          onCancel={() => setEmailModalOpen(false)}
          okText={emailLoading ? "Sending" : "Send"}
        >
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write message here..."
              onChange={handleMessageChange}
              value={message}
            ></textarea>
          </div>
        </Modal>

        {/* Edit Profile Modal */}
        <Modal
          title="Edit Profile"
          centered
          open={editProfileModalOpen}
          onOk={() => editProfile()}
          onCancel={() => setEditProfileModalOpen(false)}
          okText={loadingEditProfile ? "Submitting" : "Submit"}
          width={1000}
          className="dark:bg-black"
        >
          <div>
            <div className="relative z-0 w-full my-6 group">
              <div className="text-md">
                {" "}
                <span className="font-bold"> Picture</span> (named: photo.jpg,
                size: under 1MB)
              </div>
              <input
                type="file"
                name="a_pic"
                id="a_pic"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) => setEditProfile_pic(e.target.files[0])}
              />
            </div>

            <div className="relative z-0 w-full my-6 group">
              <div className="text-md">
                {" "}
                <span className="font-bold"> Signature </span> (named:
                signature.jpg, size: under 1MB)
              </div>
              <input
                type="file"
                name="a_sig"
                id="a_sig"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) => setEditProfile_sig(e.target.files[0])}
              />
            </div>

            <div className="relative z-0 w-full my-6 group">
              <div className="text-md">
                {" "}
                <span className="font-bold"> SSC Transcript</span> (named:
                ssc.jpg/ssc.pdf, size: under 1-2MB)
              </div>
              <input
                type="file"
                name="ssc_transcript"
                id="ssc_transcript"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) => setEditProfile_ssc(e.target.files[0])}
              />
            </div>

            <div className="relative z-0 w-full my-6 group">
              <div className="text-md">
                {" "}
                <span className="font-bold"> HSC Transcript</span> (named:
                hsc.jpg/hsc.pdf, size: under 1-2MB)
              </div>
              <input
                type="file"
                name="hsc_transcript"
                id="hsc_transcript"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) => setEditProfile_hsc(e.target.files[0])}
              />
            </div>

            <div className="relative z-0 w-full my-6 group">
              <div className="text-md">
                {" "}
                <span className="font-bold">
                  {" "}
                  Undergraduate Transcript
                </span>{" "}
                (named: ug.jpg/ug.pdf, size: under 1-3MB)
              </div>
              <input
                type="file"
                name="ug_transcript"
                id="ug_transcript"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) => setEditProfile_bsc(e.target.files[0])}
              />
            </div>
          </div>
        </Modal>

        {/* Grant Access Confirm */}
        <Modal
          title="Grant Access"
          centered
          open={editAccessModalOpen}
          onOk={() => grantEditAccess()}
          onCancel={() => setEditAccessModalOpen(false)}
          okText={loadingEditProfile ? "Submitting" : "Submit"}
          width={1000}
          className="dark:bg-black"
        >
          <div>
            Are your sure want to grant edit access to this applicant?
            <br />
            Applicant will receive both SMS & EMAIL to reupload files with
            instructions.
          </div>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default Submission;

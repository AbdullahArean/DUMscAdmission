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
import { GiSandsOfTime } from "react-icons/gi";
import "react-toastify/dist/ReactToastify.css";
import { Space, Table } from "antd";
import Column from "antd/es/table/Column";
import { useGlobalState } from "../components/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";

const Submission = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const { state } = useLocation();
  const [data, setData] = useState([]);

  const toPayment = (app_id) => {
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
        setApiLoading(false)
        console.log(err);
      });
  };

  const fetchData = () => {
    api
      .get("/applications.php", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load data");
      });
  };

  useEffect(() => {
    if (!isLoggedIn) nav("/login", {state: "redirected"});
    else if (user.verified === "0") nav("/verify");
    if (state === "applied") toast.success("Application Successful.");

    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen h-full dark:bg-gray-900 flex flex-col">
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

      <div className="mt-20 lg:mt-24 mx-2 lg:mx-10 relative">
        <Table
          loading={loading}
          dataSource={data}
          style={{ overflowX: "auto" }}
        >
          <Column title="Department" dataIndex="DEPT_NAME"></Column>

          <Column
            title="Applied at"
            dataIndex="CREATED_ON"
            render={(approved, record) => (
              <div>{record.CREATED_ON.slice(0, 9)}</div>
            )}
          ></Column>
          <Column
            title="Status"
            dataIndex="APP_VERIFIED"
            render={(approved, record) => (
              <div>
                {record.APP_VERIFIED === "0" ? (
                  <div className="flex gap-1 items-center">
                    <GiSandsOfTime />
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
                ) : (
                  <div className="">
                    <button
                      onClick={() => {
                        toPayment(record.APP_ID);
                      }}
                      className="text-white bg-blue-500 px-4 py-1 rounded-lg font-medium"
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
        </Table>
      </div>
    </div>
  );
};

export default Submission;

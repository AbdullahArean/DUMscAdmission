/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "antd";
import { useGlobalState } from "../components/UserContext";
import Footer from "../components/Footer";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const [jwt, setJwt] = useGlobalState("jwt");
  const [reports, setReports] = useState(null);

  const getReports = () => {
    api
      .get("/reports.php", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        setLoading(false);
        setReports(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getReports();
  }, []);

  if (loading) return <br />;
  else
    return (
      <div className="bg-white relative min-h-screen h-full dark:bg-gray-900 flex flex-col">
        <Navbar active="admin" />
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
        <div className="mt-16 lg:mt-24 mb-8 flex items-center">
          <hr className="w-1/6 border border-black"></hr>
          <div className="text-xl lg:text-3xl mx-2">Report</div>
          <hr className="w-5/6 border border-black"></hr>
        </div>
        <div className="mb-20 mx-6 lg:mx-24 grid grid-cols-1 gap-x-24 gap-y-3 lg:grid-cols-4 relative">
          <Card title="Accounts opened" bordered={true} key={"Accounts"}>
            <p className="text-5xl text-center">
              {reports.account_opened ? reports.account_opened : "0"}
            </p>
          </Card>
          <Card
            title="Total applications"
            key={"idapplications2"}
            bordered={true}
          >
            <p className="text-5xl text-center">
              {reports.applied ? reports.applied : "0"}
            </p>
          </Card>
          <Card title="Total payments" key={"payments"} bordered={true}>
            <p className="text-5xl text-center">
              {reports.payment_no ? reports.payment_no : "0"}
            </p>
          </Card>
          <Card title="Total amount" key={"amount"} bordered={true}>
            <p className="text-5xl text-center">
              {reports.payment_amount ? reports.payment_amount : "0"}
            </p>
          </Card>
        </div>
        <div className="mt-8 mb-6 flex items-center">
          <hr className="w-1/6 border border-gray-500"></hr>
          <div className="text-xl lg:text-3xl mx-2">Result</div>
          <hr className="w-5/6 border border-black"></hr>
        </div>
        <div className="mx-6 lg:mx-24 flex justify-center">
          <buttton
            type="button"
            className=" cursor-pointer text-xl lg:text-3xl bg-blue-500 p-4 text-white rounded-lg hover:scale-105 hover:bg-blue-600 transition-all duration-300"
          >
            Unpublish result
          </buttton>
        </div>
        <Footer />
      </div>
    );
};

export default Admin;

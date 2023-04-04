/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalState } from "../components/UserContext";
import { Space, Table, Select, Dropdown, Pagination } from "antd";
import Footer from "../components/Footer";
import Column from "antd/es/table/Column";

const Report = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const [jwt, setJwt] = useGlobalState("jwt");

  const columns = [
    {
        title:"Accounts opened",
        dataIndex: "account"
    },
    {
        title:"Applied",
        dataIndex: "applied"
    },
    {
        title:"Paid",
        dataIndex: "payment"
    },
    {
        title:"Total Amount",
        dataIndex: "paymentTotal"
    },
  ]

  const data = [
    {
      account: "82",
      applied: "0",
      payment: "0",
      paymentTotal: "0",
    },
  ];

  return (
    <div className="bg-white relative min-h-screen h-full dark:bg-gray-900 flex flex-col">
      <Navbar active="report" />
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
      <div className="mt-24 mx-10 relative overflow-x-auto">
        <Table
          columns={columns}
          loading={loading}
          dataSource={data}
          style={{ overflowX: "auto" }}
          rowKey="id"
        ></Table>
      </div>
      <Footer />
    </div>
  );
};

export default Report;

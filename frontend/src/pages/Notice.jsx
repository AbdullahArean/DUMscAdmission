/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Table } from "antd";
import Column from "antd/es/table/Column";
import { useGlobalState } from "../components/UserContext";

const Notice = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");

  const getNotices = () => {
    console.log(localStorage.getItem("jwt"));
    api
      .get("/notice.php", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };

  useEffect(() => {
    getNotices();
  }, []);

  return (
    <div className="bg-white h-screen dark:bg-gray-900 flex flex-col">
      <Navbar active="notice" />
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

      <div className="mt-24 mx-10">
        <div className="flex flex-row justify-end mb-10">
          <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-smtext-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add Notice
          </Button>
        </div>
        <Table dataSource={data}>
          <Column title="Title" dataIndex="title" key="id"></Column>
          <Column title="Body" dataIndex="body" key="id"></Column>
          <Column title="Created By" dataIndex="created_by" key="id"></Column>
          {user.role === "admin" ? (
            <Column
              title="Action"
              dataIndex="id"
              key="id"
              render={(_, record) => <Button>Delete</Button>}
            ></Column>
          ) : (
            <></>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Notice;

/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FcOk, FcCancel } from "react-icons/fc";
import "react-toastify/dist/ReactToastify.css";
import { Space, Table } from "antd";
import Column from "antd/es/table/Column";
import { useGlobalState } from "../components/UserContext";

const Submission = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useGlobalState("user");

  const data = [
    {
      dept_name: "Computer Science and Engineering",
      undergrad: "EEE",
      approved: true,
    },
  ];

  return (
    <div className="bg-white h-screen dark:bg-gray-900 flex flex-col">
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

      <div className="mt-24 mx-10 relative overflow-x-auto">
        <Table
          loading={loading}
          dataSource={data}
          style={{ overflowX: "auto" }}
        >
          <Column title="Department" dataIndex="dept_name"></Column>
          {user.role === "admin" ? (
            <Column title="Subject" dataIndex="undergrad"></Column>
          ) : (
            <div></div>
          )}

          {user.role === "admin" ? (
            <Column
              title="Action"
              dataIndex="id"
              render={(id, record) => (
                <Space size="middle">
                  <button
                    onClick={() => {}}
                    className="text-white bg-green-500 px-2 py-1 rounded-lg font-medium"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {}}
                    className="text-white bg-red-500 px-2 py-1 rounded-lg font-medium"
                  >
                    Reject
                  </button>
                </Space>
              )}
            ></Column>
          ) : (
            <Column
              title="Status"
              dataIndex="approved"
              render={(approved, record) => (
                <div>
                  {approved === true ? (
                    <div className="flex gap-1 items-center">
                      <FcOk />
                      <p>Approved</p>
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center">
                      <FcCancel />
                      <p>Rejected</p>
                    </div>
                  )}
                </div>
              )}
            ></Column>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Submission;

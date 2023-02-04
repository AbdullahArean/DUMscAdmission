import React from "react";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 h-screen">
      <Navbar active={"home"}/>
    </div>
  );
};

export default Home;

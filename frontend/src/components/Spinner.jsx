/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

function Spinner() {
  let [color, setColor] = useState("#111827");
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <SyncLoader
        color={color}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;

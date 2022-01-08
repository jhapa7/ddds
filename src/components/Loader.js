import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ size }) => {
  return (
    <ClipLoader
      color="yellow"
      loading="true"
      css={{ display: "block", margin: "0 auto", borderWidth: "10px" }}
      size={size}
    />
  );
};

export default Loader;

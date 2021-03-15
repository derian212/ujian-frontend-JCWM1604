import React from "react";
import Loader from "react-loader-spinner";

function Loading() {
  return (
    <div
      style={{ height: "90vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Loader
        type="ThreeDots"
        color="#101111"
        height={50}
        width={50}
        radius={5}
      />
    </div>
  );
}

export default Loading;

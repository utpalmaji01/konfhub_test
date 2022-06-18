import React from "react";

export const Loader = () => {
  return (
    <div className="text-center pt-5">
      <div className="spinner-grow th-bg-blue mr-3"></div>
      <div className="spinner-grow th-bg-yellow mr-3"></div>
      <div className="spinner-grow th-bg-primary"></div>
    </div>
  );
};

export default Loader;

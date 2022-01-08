import React, { useEffect } from "react";

const Error = () => {
  useEffect(() => {
    document.title = `Something went wrong | Cinemify`;
  }, []);
  return (
    <div className="bg-slate-800 flex justify-center items-center h-[80vh]">
      <div>
        <h1 className="text-center font-bold text-5xl text-yellow-200">
          Something went wrong!
        </h1>
      </div>
    </div>
  );
};

export default Error;

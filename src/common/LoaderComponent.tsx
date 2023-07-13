import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoaderComponent = () => {
  return (
    <div className="w-full flex justify-center items-center py-12">
      <RotatingLines strokeColor="rgb(42,2,2)" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
    </div>
  );
};

export default LoaderComponent;

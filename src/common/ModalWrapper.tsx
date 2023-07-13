import React from "react";

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-black/50 fixed top-0 h-screen w-screen flex items-center flex-col justify-center">{children}</div>;
};

export default ModalWrapper;

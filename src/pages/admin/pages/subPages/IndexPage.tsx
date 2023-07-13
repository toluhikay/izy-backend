import React from "react";
import { GiCommercialAirplane } from "react-icons/gi";

const IndexPage = () => {
  return (
    <div className="w-full bg-authBg min-h-[750px] px-[15px] flex-col text-center text-white bg-cover bg-center bg-blend-darken bg-primary-1/60 flex items-center justify-center">
      <h1 className="text-2xl font-semibold">Manage your content with ease</h1>
      <p className="flex flex-col my-6 items-center">
        What you see is what you get - in essence what you type in here is what is displayed on
        <a href="https://izyair.com" target="_blank" rel={"noreferrer"} className="text-white flex items-center mt-3 ml-2 font-bold text-2xl">
          Izy Air Website <GiCommercialAirplane className="text-white ml-3" />
        </a>
      </p>

      <p className="py-20 text-gray-200">To get started click the links to each page above</p>
    </div>
  );
};

export default IndexPage;

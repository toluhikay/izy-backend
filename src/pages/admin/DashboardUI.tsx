import React from "react";
import DashboardNav from "../../components/DashBaordNav";
import { Route, Routes } from "react-router-dom";
import Pages from "./pages/Pages";
import Blogs from "./blogs/Blogs";
import Media from "../media/Media";

const DashboardUI = () => {
  return (
    <div className="flex bg-primary-1/10 w-full overflow-y-auto overflow-x-hidden h-screen">
      <DashboardNav />
      <div className=" w-[calc(100vw-228px)] relative flex">
        <Routes>
          <Route index element />
          <Route path="pages/*" element={<Pages />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="media" element={<Media />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardUI;
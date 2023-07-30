import React from "react";
import DashboardNav from "../../components/DashBaordNav";
import { Route, Routes } from "react-router-dom";
import Pages from "./pages/Pages";
import Blogs from "./blogs/Blogs";
import Media from "../media/Media";
import DashboardLanding from "./pages/subPages/DashboardLanding";
import AccountSetting from "./accountSetting/AccountSetting";
import Subscribers from "./subscribers/Subscribers";
import EditBlog from "./blogs/EditBlog";

const DashboardUI = () => {
  return (
    <div className="flex bg-primary-1/10 w-full overflow-y-auto overflow-x-hidden h-screen">
      <DashboardNav />
      <div className=" w-[calc(100vw-228px)] relative flex">
        <Routes>
          <Route index element={<DashboardLanding />} />
          <Route path="pages/*" element={<Pages />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="media" element={<Media />} />
          <Route path="subscribers-news" element={<Subscribers />} />
          <Route path="account-setting" element={<AccountSetting />} />
          <Route path="blog/:reference" element={<EditBlog />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardUI;

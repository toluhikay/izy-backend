import React from "react";
import Logo from "../assets/images/Logo.svg";
import { FiSearch } from "react-icons/fi";
import { SettingsIcon, PagesIcon, NotificationIcon, ExitIcon, OverviewIcon } from "../assets/svgs/NavSvgs";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { logOutAdmin } from "../features/adminSlice";

const DashboardNav = () => {
  const location = useLocation();
  const dispatch: any = useAppDispatch();
  const NavRoutesData = [
    { id: 1, name: "overview", link: "overview", icon: <OverviewIcon /> },
    { id: 6, name: "pages", link: "pages", icon: <PagesIcon /> },
    { id: 6, name: "blogs", link: "blogs", icon: <PagesIcon /> },
    { id: 6, name: "media", link: "media", icon: <PagesIcon /> },
    { id: 9, name: "subscribers", link: "subscribers-news", icon: <NotificationIcon /> },
    { id: 10, name: "account setting", link: "account-setting", icon: <SettingsIcon /> },
  ];

  return (
    <div className="sticky flex border-r border-natural-2 flex-col justify-between items-start w-[288px] py-8 px-6 top-0 h-screen bg-white">
      <div className="mb-8 h-[90%]">
        <img className="w-20 h-10 mb-8" src={Logo} alt="" />
        {/* <div className=" border border-natural-2 bg-white rounded-[4px] mt-6 mb-3 flex items-center justify-between py-[11px] px-[13px]">
          <FiSearch />
          <input className="text outline-none text-xs ml-2" type="text" placeholder="Search" />
        </div> */}
        <div className="h-[90%] flex flex-col justify-start">
          {NavRoutesData.map((item, index) => {
            return (
              <Link to={item.link === "overview" ? `/dashboard` : item.link} key={index}>
                <div className={`flex items-center p-[10px] ${location.pathname === "/dashboard" && item.link === "overview" ? "bg-primary-1/10 text-primary-1" : location.pathname === `/dashboard/${item.link}` ? " bg-primary-1/10 text-primary-1" : ""} ${index === 6 ? "mb-[70px]" : "mb-3"}`}>
                  <span>{item.icon}</span>
                  <p className="font-medium capitalize ml-3">{item.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center w-full border-t pt-4 border-[#D3CED0] justify-between">
        <div className="flex items-center relative">
          {/* <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" className="w-[40px] h-[40px] rounded-full object-cover" alt="" /> */}
          <div className="ml-3">
            <p className="font-medium">Admin</p>
            <p className="text-natural-1">Log Out</p>
          </div>
        </div>
        <div className=" cursor-pointer" onClick={() => dispatch(logOutAdmin())}>
          <ExitIcon />
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;

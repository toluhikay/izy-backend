import React, { useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import { result } from "../Test";
import { pageDummyData } from "../../../constants/pageDummyData";
import { createPortal } from "react-dom";
import { IzyAdminApis } from "../../../api/Query";
import { portals } from "../blogs/Blogs";
import DeletePageModal from "../../../modals/DeletePageModal";
import IndexPage from "./subPages/IndexPage";
import OurCompany from "./subPages/OurCompany";
import Fleet from "./subPages/Fleet";
import Charter from "./subPages/Charter";
import AircraftPurchase from "./subPages/AircraftPurchase";
import AircraftManagement from "./subPages/AircraftManagement";
import AircraftImportation from "./subPages/AircraftImportation";
import Careers from "./subPages/Careers";

const Pages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const params = { page: page, limit: limit };
  const getPages = IzyAdminApis.useGetPagesQuery(params);

  const [addPage, addPageResults] = IzyAdminApis.useAddPageMutation();

  const pagesList = getPages?.data?.data?.page_data;
  // console.log("pages", pagesList);

  const HandleCreatePage = async (e: any) => {
    e.preventDefault();
    try {
      await addPage(pageDummyData).unwrap();
    } catch (error) {}
  };

  const PagesData = [
    { id: 1, page: "Our Company", link: "our-company" },
    { id: 1, page: "Fleet", link: "fleet" },
    { id: 1, page: "Charter", link: "charter" },
    { id: 1, page: "aircraft purchase", link: "aircraft-purchase" },
    { id: 1, page: "aircraft management", link: "aircraft-management" },
    { id: 1, page: "aircraft importation", link: "aircraft-importation" },
    { id: 1, page: "careers", link: "careers" },
  ];

  return (
    <div className="w-full">
      <div className="p-8 w-full">
        <h2 className="text-[28px] font-medium mb-2">Pages</h2>
        <div className="flex justify-between mb-8 items-center w-full">
          <p className="text-natural-1">Manage Contents on these pages </p>
          <button className="bg-primary-1 text-white rounded-[4px] py-[10px] px-4" onClick={HandleCreatePage}>
            NEW PAGE +
          </button>
        </div>
        <div className="flex items-center border-b border-primary-1 pb-3 justify-between">
          {PagesData.map((item, index) => {
            return (
              <div className={`border-b ${location.pathname === `/dashboard/pages/${item.link}` ? "bg-primary-1 text-white" : ""} capitalize  py-3 px-4 border-primary-1`} key={index}>
                <Link to={item.link}>
                  <p>{item.page}</p>
                </Link>
              </div>
            );
          })}
        </div>
        <div>
          <Routes>
            <Route index element={<IndexPage />} />
            <Route path="our-company" element={<OurCompany />} />
            <Route path="fleet" element={<Fleet />} />
            <Route path="charter" element={<Charter />} />
            <Route path="aircraft-purchase" element={<AircraftPurchase />} />
            <Route path="aircraft-management" element={<AircraftManagement />} />
            <Route path="aircraft-importation" element={<AircraftImportation />} />
            <Route path="careers" element={<Careers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Pages;

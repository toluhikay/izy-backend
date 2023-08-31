import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Auth from "../auth/Auth";
import DashboardUI from "../pages/admin/DashboardUI";
import SEO from "../common/Seo";

const Router = () => {
  return (
    <div>
      <SEO
        title="Private Jet Charter"
        description="The Choice is.....Izy Aircraft Purchase No 1 Private Jet Charter in Nigeria Private Jet  Vistajet  Execujet  Business Aviation Luxury Alex Izinyon  Luxury travels Aircraft Charter Private Jet Charter Private Jet Charter in Nigeria Business Charter Jet charter Best Private Jet Nigeria Aviation Cuisine Inflight Experience Inflight Entertainment pet travel kids travel Medevac Medevac Aircraft Management Aircraft management  Aircraft Maintenance Aircraft maintenance"
        name="Adozillion Homes"
        type="website"
      />
      <Routes>
        <Route index element={<Login />} />
        <Route element={<Auth />}>
          <Route path="/dashboard/*" element={<DashboardUI />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Router;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Auth from "../auth/Auth";
import DashboardUI from "../pages/admin/DashboardUI";

const Router = () => {
  return (
    <div>
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

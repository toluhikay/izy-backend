import React from "react";
import useAuthToken from "../hooks/useAuthToken";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardUI from "../pages/admin/DashboardUI";

const Auth = () => {
  const token = useAuthToken();
  return token ? (
    <Routes>
      <Route path="/dashboard/*" element={<DashboardUI />} />
    </Routes>
  ) : (
    <Navigate to={"/"} replace={true} />
  );
};

export default Auth;

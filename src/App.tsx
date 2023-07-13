import React from "react";
import { BrowserRouter as WebAppRouter } from "react-router-dom";
import Router from "./router/Router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="">
      <WebAppRouter>
        <Router />
      </WebAppRouter>
      <Toaster />
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as WebAppRouter } from "react-router-dom";
import Router from "./router/Router";
import { Toaster } from "react-hot-toast";
import SEO from "./common/Seo";

function App() {
  return (
    <div className="">
      <SEO
        title="Private Jet Charter"
        description="The Choice is.....Izy Aircraft Purchase No 1 Private Jet Charter in Nigeria Private Jet  Vistajet  Execujet  Business Aviation Luxury Alex Izinyon  Luxury travels Aircraft Charter Private Jet Charter Private Jet Charter in Nigeria Business Charter Jet charter Best Private Jet Nigeria Aviation Cuisine Inflight Experience Inflight Entertainment pet travel kids travel Medevac Medevac Aircraft Management Aircraft management  Aircraft Maintenance Aircraft maintenance"
        name="Adozillion Homes"
        type="website"
      />
      <WebAppRouter>
        <Router />
      </WebAppRouter>
      <Toaster />
    </div>
  );
}

export default App;

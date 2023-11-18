import React from "react";
import { Routes, Route } from "react-router-dom";

import Routesignin from "../Pages/Auth/Index";
import Home from "../Pages/Dashboard/Home";



const Routing= () => {
  return (
    
    <Routes>
      <Route>
        <Route path="/*" element={<Routesignin />} />
        <Route path="/home/*" element={<Home />} />
      </Route>
    </Routes>
    
  );
};

export default Routing;
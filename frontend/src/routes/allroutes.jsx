import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Create from "../pages/create/create";
import Display from "../pages/display/display";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Create />}></Route>
      <Route path="/display" element={<Display/>} ></Route>
    </Routes>
  );
};

export default AllRoutes;

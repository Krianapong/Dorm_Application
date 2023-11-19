import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./admin/Dashboard";

const AdminPages = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin/home/" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default AdminPages;

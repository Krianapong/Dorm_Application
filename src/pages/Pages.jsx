import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/home/HomePage';
import Header from '../components/common/header/Header';


const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/home" element={<Home />} />

        </Routes>
      </Router>
    </>
  );
};

export default Pages;

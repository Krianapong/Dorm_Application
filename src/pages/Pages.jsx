import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/home/HomePage";
import Header from "../components/common/header/Header";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import NewsPage from "../components/news/Newpage";
import Form from "./From";

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Form />} />
          {/* <Route path="/signup" element={<Form />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default Pages;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//guest_menu
import Home from "../components/home/HomePage";
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import Blog from "../components/blog/Blog";
import Form from "./From";
import Profile from "../components/profile/Profile";
import Room from "../components/room/Room";
import Service from "../components/services/services";
import ServiceUser from "../components/services/security/security";
import HousewifeUser from "../components/services/housewife/housewife";
import RepairUser from "../components/services/repairt/repairt";
import DetailsRoom from "../components/room/DetailsRoom";
import Cost from "../components/cost/CostCard";
import Calendar from "../components/calendar/CalendarCard";
import Chat from "../components/chat/Chat";
// import Chat from "../components/chat/Chat";

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Form />} />
          <Route path="/signup" element={<Form />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/room" element={<Room />} /> 
          <Route path="/services" element={<Service />} />
          <Route path="/security" element={<ServiceUser />} />
          <Route path="/housewife" element={<HousewifeUser />} />
          <Route path="/repairt" element={<RepairUser />} />
          <Route path="/roomdetail" element={<DetailsRoom />} />
          <Route path="/cost" element={<Cost />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/chat" element={<Chat />} />
          
          {/* <Route path="/chat" element={<Chat /> }/>  */}
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
};

export default Pages;

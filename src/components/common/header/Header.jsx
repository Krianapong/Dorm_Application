import React, { useState } from "react";
import { list, nav } from "../../../data/Data";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [navList, setNavList] = useState(false);

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img src="./images/logo.png" alt="" />
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="button flex">
            <Link to="/login" className="btn0">
              Sign In
            </Link>
            {/* <button className="btn1">
              <i className="fa fa-sign-out"></i> Sign Up
            </button> */}
            <Link to="/login" className="btn1">
              <i className="fa fa-sign-out"></i> Sign Up
            </Link>
          </div>

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

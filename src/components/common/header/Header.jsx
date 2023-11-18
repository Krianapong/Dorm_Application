import React, { useState, useEffect } from "react";
import { list, nav } from "../../../data/Data";
import "./header.css";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase listener to track user authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      // Unsubscribe the listener when the component unmounts
      unsubscribe();
    };
  }, []);

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

              {user && (
                <>
                  <li>
                    <Link to="/book-room">Book a Room</Link>
                  </li>
                  <li>
                    <Link to="/service">Service</Link>
                  </li>
                  <li>
                    <Link to="/cost-of-utilities">Cost of Utilities</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {user ? (
            // If user is authenticated, show a logout button
            <div className="button flex">
              <button onClick={() => auth.signOut()} className="btn1">
                Sign Out
              </button>
            </div>
          ) : (
            // If user is not authenticated, show a sign-in link
            <div className="button flex">
              <Link to="/signin" className="btn0">
                Sign In
              </Link>
              <Link to="/signup" className="btn1">
                <i className="fa fa-sign-out"></i> Sign Up
              </Link>
              {/* Add SignUp logic or link here if needed */}
            </div>
          )}

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

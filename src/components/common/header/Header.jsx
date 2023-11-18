import React, { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import { list, nav } from "../../../data/Data";
import "./header.css";
import { auth } from "../../../firebase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import imgProfile from "../../../images/profiles.jpg";
import Logo from "../../../images/Logo.png"
const Header = () => {
  const [navList, setNavList] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // Add this line

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

  const handleSignOut = () => {
    auth.signOut();
    setAnchorEl(null);
  };

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img src={Logo} alt="" />
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
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {user ? (
            // If user is authenticated, show a logout button
            <div className="button flex">

              <Avatar
                variant="text"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleDropdownClick}
                alt="Profile"
                src={imgProfile}
              />

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Avatar alt="Profile" src={imgProfile} />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>Chat</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
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

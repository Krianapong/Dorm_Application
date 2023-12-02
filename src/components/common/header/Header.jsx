import React, { useState, useEffect } from "react";
import "./header.css";
import { nav } from "../../../data/Data";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Avatar from "@mui/material/Avatar";
import imgProfile from "../../../images/profiles.jpg";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [user, setUser] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null); // State for user's avatar
  const [userName, setUserName] = useState(""); // State for user's name
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      if (user) {
        // User is logged in
        console.log("User is logged in");
        const userId = user.uid;
        const userRef = firestore.collection("profiles").doc(userId);

        userRef.onSnapshot((doc) => {
          if (doc.exists) {
            const avatarURL = doc.data().avatar;
            setUserAvatar(avatarURL);
            setUserName(doc.data().name);
          }
        });
      } else {
        // User is not logged in
        console.log("User is not logged in");
      }
    });

    return () => {
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

  const handleProfileClick = () => {
    // Handle the logic for navigating to the Profile page
    navigate("/profile");
    // handleClose();
  };

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img src="./images/logo-light.png" alt="" />
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
                    <Link to="/room">Book a Room</Link>
                  </li>
                  <li>
                    <Link to="/services">Service</Link>
                  </li>
                  <li>
                    <Link to="/cost">Cost of Utilities</Link>
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
                src={userAvatar || imgProfile}
              />
              <span>{userName}</span>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ zIndex: 9999999 }}
              >
                <MenuItem onClick={handleProfileClick}>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ChatIcon />
                  </ListItemIcon>
                  Chat
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  Sign Out
                </MenuItem>
              </Menu>
            </div>
          ) : (
            // If user is not authenticated, show sign-in and sign-up options
            <div className="button flex">
              <Link to="/signin" className="btn0">
                <span><i className="fa fa-sign-in"></i></span>Sign In
              </Link>
              <Link to="/signup">
                <button className="btn6">
                  <i className="fa fa-user-plus"></i> Sign Up
                </button>
              </Link>
            </div>
          )}

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

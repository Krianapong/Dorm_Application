// App.js
import React, { useState } from "react";
import "./form.css";

const Form = () => {
  const [isRegisterActive, setRegisterActive] = useState(false);

  const handleRegisterClick = () => {
    setRegisterActive(true);
  };

  const handleLoginClick = () => {
    setRegisterActive(false);
  };

  return (
    <>
      <div id="Themepage">
        <div
          className={`containers ${isRegisterActive ? "active" : ""}`}
          id="containers"
        >
          <div className="form-container sign-up">
            <form>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="tel" placeholder="Phone" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
              <button>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in">
            <form>
              <h1>Sign In</h1>
              <span>or use your email password</span>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#">Forget Your Password?</a>
              <button>Sign In</button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div
                className={`toggle-panel toggle-left ${
                  isRegisterActive ? "hidden" : ""
                }`}
              >
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button
                  onClick={handleLoginClick}
                  className="hidden"
                  id="login"
                >
                  Sign In
                </button>
              </div>
              <div
                className={`toggle-panel toggle-right ${
                  isRegisterActive ? "" : "hidden"
                }`}
              >
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all of site
                  features
                </p>
                <button
                  onClick={handleRegisterClick}
                  className="hidden"
                  id="register"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;

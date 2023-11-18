import React ,{ useState } from "react";
import "./form.css";
import { auth, firestore } from "../firebase";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [isRegisterActive, setRegisterActive] = useState(false);
  const navigate = useNavigate();

  const addUserDataToFirestore = async (userId, name, phone, email) => {
    try {
      const userCollection = firestore.collection("profiles");

      await userCollection.doc(userId).set({
        name,
        phone,
        email,
      });

      console.log("User data added to Firestore successfully!");
    } catch (error) {
      console.error("Error adding user data to Firestore:", error);
    }
  };

  const handleRegisterClicks= () =>{
    setRegisterActive(true);
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();

    try {
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      // Basic form validation
      if (!name || !phone || !email || !password || !confirmPassword) {
        throw new Error("All fields are required");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Create a new user with email and password
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      // Update user profile (optional)
      await auth.currentUser.updateProfile({
        displayName: name,
      });

      // Add user data to Firestore
      await addUserDataToFirestore(user.uid, name, phone, email);

      // Display SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Thank you for registering. You can now log in.',
      });

      console.log("Registration successful!");
    } catch (error) {
      // Display SweetAlert error message
      Swal.fire({
        icon: 'error',
        title: 'Registration Error',
        text: error.message,
      });

      console.error("Registration error:", error.message);
    }
  };
  

  const handleLoginClick = () => {
    setRegisterActive(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // Use Firebase authentication to sign in
      await auth.signInWithEmailAndPassword(email, password);

      const user = auth.currentUser;

      // Check if the user is an admin based on their UID
      if (user && user.uid === "C7rnc048XDgYgrqRB6aY1q9ZqLM2") {
        console.log("Admin login successful!");
        // Perform actions specific to admin login
      } else {
        console.log("User login successful!");
        // Perform actions specific to regular user login
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
  
    try {
      const email = document.getElementById("loginEmail").value;
  
      if (!email) {
        throw new Error('Email is required');
      }
  
      // Send a password reset email
      await auth.sendPasswordResetEmail(email);
  
      // Display SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Password Reset Email Sent!',
        text: 'Check your email inbox for further instructions.',
      });
    } catch (error) {
      // Display SweetAlert error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
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
              <input type="text" id="name" placeholder="Name" />
              <input
                type="tel"
                id="phone"
                placeholder="Phone"
                pattern="[0-9]{10}"
              />
              <input type="email" id="email" placeholder="Email" />
              <input type="password" id="password" placeholder="Password" />
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
              />
              <button onClick={handleRegisterClick}>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in">
            <form>
              <h1>Sign In</h1>
              <span>or use your email password</span>
              <input type="email" id="loginEmail" placeholder="Email" />
              <input
                type="password"
                id="loginPassword"
                placeholder="Password"
              />
              <a href="#" onClick={handleForgotPassword}>
                Forget Your Password?
              </a>
              <button onClick={handleLogin}>Sign In</button>
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
                  onClick={handleRegisterClicks}
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

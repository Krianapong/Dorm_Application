import { useState } from "react";
import "./form.css";
import { auth, firestore } from "../firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [isRegisterActive, setRegisterActive] = useState(false);
  const navigate = useNavigate();

  const addUserDataToFirestore = async (
    userId,
    firstName,
    lastName,
    phone,
    email
  ) => {
    try {
      const userCollection = firestore.collection("profiles");
  
      // Use the user's UID as the document ID
      await userCollection.doc(userId).set({
        uid: userId, // Add user UID to the document
        firstName,
        lastName,
        phone,
        email,
        role: "user",
      });
  
      console.log("User data added to Firestore successfully!");
    } catch (error) {
      console.error("Error adding user data to Firestore:", error);
    }
  };

  const handleRegisterClicks = () => {
    setRegisterActive(true);
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();

    try {
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      // Basic form validation
      if (
        !firstName ||
        !lastName ||
        !phone ||
        !email ||
        !password ||
        !confirmPassword
      ) {
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
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Update user profile (optional)
      await auth.currentUser.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });

      // Add user data to Firestore
      await addUserDataToFirestore(user.uid, firstName, lastName, phone, email);

      // Display SweetAlert success message
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Thank you for registering. You can now log in.",
      });

      console.log("Registration successful!");
    } catch (error) {
      // Display SweetAlert error message
      Swal.fire({
        icon: "error",
        title: "Registration Error",
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
      if (user && user.uid === "GebDyCR4ciTtQVf7Qj5ougzDSNx2") {
        console.log("Admin login successful!");
        // Perform actions specific to admin login
        navigate("/admin/home/");
      } else {
        console.log("User login successful!");
        // Perform actions specific to regular user login
        navigate("/");
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
        throw new Error("Email is required");
      }

      // Send a password reset email
      await auth.sendPasswordResetEmail(email);

      // Display SweetAlert success message
      Swal.fire({
        icon: "success",
        title: "Password Reset Email Sent!",
        text: "Check your email inbox for further instructions.",
      });
    } catch (error) {
      // Display SweetAlert error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <>
      <div id="Themepage">
        <div
          className={`containers-from ${isRegisterActive ? "active-from" : ""}`}
          id="containers-from"
        >
          <div className="form-container-from sign-up-from">
            <form>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>

              <input type="text" id="firstName" placeholder="First Name" />
              <input type="text" id="lastName" placeholder="Last Name" />

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
          <div className="form-container-from sign-in-from">
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
          <div className="toggle-container-from">
            <div className="toggle-from">
              <div
                className={`toggle-panel-from toggle-left-from ${
                  isRegisterActive ? "hidden-from" : ""
                }`}
              >
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button
                  onClick={handleLoginClick}
                  className="hidden-from"
                  id="login-from"
                >
                  Sign In
                </button>
              </div>
              <div
                className={`toggle-panel-from toggle-right-from ${
                  isRegisterActive ? "" : "hidden-from"
                }`}
              >
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all of site
                  features
                </p>
                <button
                  onClick={handleRegisterClicks}
                  className="hidden-from"
                  id="register-from"
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

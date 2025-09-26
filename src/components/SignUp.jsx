import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/SignUp.css";
import signupImg from "../assets/signup/left.png";

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // ✅ Login validations
      if (!userName || !password) {
        setError("All fields are required");
        return;
      }

      const storedUsers = JSON.parse(localStorage.getItem("user")) || [];
      const foundUser = storedUsers.find(
        (u) => u.userName === userName && u.password === password
      );

      if (foundUser) {
        login(foundUser);
        navigate("/home");
      } else {
        setError("Invalid username or password");
      }
    } else {
      // ✅ Signup validations
      if (!userName || !email || !password || !confirmPassword) {
        setError("All fields are required");
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Enter a valid email address");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      const storedUsers = JSON.parse(localStorage.getItem("user")) || [];

      // ✅ Check username uniqueness
      const usernameExists = storedUsers.some((u) => u.userName === userName);
      if (usernameExists) {
        setError("Username already exists. Please choose a different username.");
        return;
      }

      const smallEmail = email.toLowerCase();

      // ✅ Check email usage limit (max 2 accounts per email)
      const emailCount = storedUsers.filter((u) => u.email === smallEmail).length;
      if (emailCount >= 2) {
        setError("Please use a different email.");
        return;
      }

      // ✅ Add new user
      const newUser = {
        id: Date.now(),
        userName,
        email:smallEmail,
        password,
      };

      localStorage.setItem("user", JSON.stringify([...storedUsers, newUser]));

      alert("Signup successful! Please login.");
      setIsLogin(true);
      setError("");
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="page-bg">
      <div className="signup-container">
        {/* Left image */}
        <div className="left-image-signup">
          <img src={signupImg} alt="Signup visual" />
        </div>

        {/* Right form */}
        <div className="form-container">
          <p className="login-header">{isLogin ? "Login" : "Sign Up"}</p>
          {error && <p className="error">*{error}</p>}

          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />

          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          )}

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          )}

          <button className="signup-btn" onClick={handleSubmit}>
            {isLogin ? "Login" : "Create Account"}
          </button>

          <p className="login-text">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <span onClick={() => setIsLogin(false)} className="act-btn-login">
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already signed up?{" "}
                <span onClick={() => setIsLogin(true)} className="act-btn-login">
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

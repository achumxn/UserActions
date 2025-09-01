import React, { useEffect, useState } from 'react'
import '../Styles/SignUp.css'
import catImg from '../assets/signup/flower.jpeg'
import { Navigate, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [users, setUser] = useState([])
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfimPassword] = useState("")
  const [error, setError] = useState("")
  const [isLogin, setIsLogin] = useState(false) // toggle state

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isLogin) {
      // login logic (username + password)
      const storedUsers = JSON.parse(localStorage.getItem("user")) || []
      const foundUser = storedUsers.find(
        (u) => u.userName === userName && u.password === password
      )
      if (foundUser) {
        alert("Login Successful")
        navigate ("/home")
        setError("")
        setUserName("")
        setPassword("")

      } else {
        setError("Invalid username or password")
      }
    } else {
      // signup logic
      if (password !== confirmPassword) {
        setError("Passwords do not match")
      } else if (password.length < 6) {
        setError("Password must be at least 6 characters")
      } else {
        setError("")
        alert("Signup Successful")

        const newUser = {
          id: Date.now(),
          userName,
          email,
          password,
        }

        setUser((prevUser) => [...prevUser, newUser])
        localStorage.setItem("user", JSON.stringify([...users, newUser]))

        setUserName("")
        setEmail("")
        setPassword("")
        setConfimPassword("")

        setIsLogin(true);
      }
    }
  }

  useEffect(() => {
    console.log(users)
  }, [users])

  return (
    <div className="page-bg">
      <div className="signup-container">
        <div className="left-image-signup">
          <img src={catImg} alt="signup visual" />
        </div>
        <div className="form-container">
          <p className="login-header">{isLogin ? "Login" : "Sign Up"}</p>
          {error && <p className="error">*{error}</p>}

          {/* Username field (for both login & signup) */}
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />

          {/* Email field only in signup */}
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
              onChange={(e) => setConfimPassword(e.target.value)}
              value={confirmPassword}
            />
          )}

          <button className="signup-btn" onClick={handleSubmit}>
            {isLogin ? "Login" : "Create Account"}
          </button>

          {/* Toggle text */}
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
  )
}

export default SignUp

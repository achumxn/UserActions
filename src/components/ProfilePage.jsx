import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Styles/ProfilePage.css";
import userimg from "../assets/profile/user.png";
import Navbar from "./Navbar";

const ProfilePage = () => {
  const { user, updateUser, deleteUser, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editedUser, setEditedUser] = useState(user || { userName: "", email: "" });

  // password states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Sync editedUser when user changes (for example, after login)
  useEffect(() => {
    if (user) setEditedUser(user);
  }, [user]);

  if (!user) {
    return <p>No user logged in. Please log in first.</p>;
  }

  // Handle profile input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile changes
  const saveChanges = () => {
    const storedUsers = JSON.parse(localStorage.getItem("user")) || [];

    // Check username uniqueness (excluding current user)
    const usernameExists = storedUsers.some(
      (u) => u.userName === editedUser.userName && u.id !== user.id
    );
    if (usernameExists) {
      setError("Username already exists. Choose a different one.");
      return;
    }

    // Check email usage limit (max 2 accounts per email, excluding current user)
    const smallEmail = editedUser.email.toLowerCase();
    const emailCount = storedUsers.filter(
      (u) => u.email === smallEmail && u.id !== user.id
    ).length;
    if (emailCount >= 2) {
      setError("This email is already used for 2 accounts. Please use a different email.");
      return;
    }

    // Update user
    updateUser({ ...editedUser, email: smallEmail });
    setIsEditing(false);
    setError("");
    alert("Profile updated successfully!");
  };

  // Save password changes
  const savePassword = () => {
    if (oldPassword !== user.password) {
      setError("Old password is incorrect");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    updateUser({ ...user, password: newPassword });
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsChangingPassword(false);
    setError("");
    alert("Password updated successfully!");
  };

  // Delete user account
  const handleDelete = () => {
    deleteUser();
    navigate("/"); // redirect to signup/login
  };

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-info">
          {isEditing ? (
            <>
              {error && <p className="error">* {error}</p>}
              <input
                type="text"
                name="userName"
                value={editedUser.userName}
                onChange={handleChange}
                className="edit-input"
              />
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                className="edit-input"
              />
              <div className="buttons">
                <button className="btn save-btn" onClick={saveChanges}>
                  Save
                </button>
                <button
                  className="btn cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : isChangingPassword ? (
            <>
              {error && <p className="error">* {error}</p>}
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="edit-input"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="edit-input"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="edit-input"
              />
              <div className="buttons">
                <button className="btn save-btn" onClick={savePassword}>
                  Update Password
                </button>
                <button
                  className="btn cancel-btn"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setError("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : confirmDelete ? (
            <div className="delete-confirm">
              <p>Are you sure you want to delete your account?</p>
              <div className="dlt-confirm">
                <button className="btn delete-btn" onClick={handleDelete}>
                  Yes, Delete
                </button>
                <button
                  className="btn cancel-btn"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="username">{user.userName}</h2>
              <p className="email">{user.email}</p>
              <div className="buttons">
                <button
                  className="btn edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Details
                </button>
                <button
                  className="btn password-btn"
                  onClick={() => setIsChangingPassword(true)}
                >
                  Change Password
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => setConfirmDelete(true)}
                >
                  Delete Account
                </button>
                <button className="btn logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>

        <div className="profile-image">
          <img src={userimg} alt="Profile" />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

import React, { useState } from "react";
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

  const [editedUser, setEditedUser] = useState(user);

  // password states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (!user) {
    return <p>No user logged in. Please log in first.</p>;
  }

  // ✅ Handle profile input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save profile changes
  const saveChanges = () => {
    updateUser(editedUser);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  // ✅ Save password changes
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

  // ✅ Delete user account
  const handleDelete = () => {
    deleteUser();
    navigate("/"); // redirect to signup/login
  };

  // ✅ Logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Navbar/>
      <div className="profile-container">
        <div className="profile-info">
          {/* ---------------- Profile Edit Mode ---------------- */}
          {isEditing ? (
            <>
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
            /* ---------------- Change Password Mode ---------------- */
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
            /* ---------------- Confirm Delete Mode ---------------- */
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
            /* ---------------- Default View Mode ---------------- */
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

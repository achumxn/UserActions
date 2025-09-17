import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load logged in user on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Sync logged user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("loggedUser");
    }
  }, [user]);

  // ✅ Login
  const login = (userData) => {
    setUser(userData);

    // also ensure user is stored in users list
    const storedUsers = JSON.parse(localStorage.getItem("user")) || [];
    const exists = storedUsers.some((u) => u.id === userData.id);
    if (!exists) {
      localStorage.setItem("user", JSON.stringify([...storedUsers, userData]));
    }
  };

  // ✅ Logout
  const logout = () => setUser(null);

  // ✅ Update user details (profile + password)
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("loggedUser", JSON.stringify(updatedUser));

    const storedUsers = JSON.parse(localStorage.getItem("user")) || [];
    const updatedUsers = storedUsers.map((u) =>
      u.id === updatedUser.id ? { ...u, ...updatedUser } : u
    );
    localStorage.setItem("user", JSON.stringify(updatedUsers));
  };

  // ✅ Delete user
  const deleteUser = () => {
    if (!user) return;

    const storedUsers = JSON.parse(localStorage.getItem("user")) || [];
    const updatedUsers = storedUsers.filter((u) => u.id !== user.id);
    localStorage.setItem("user", JSON.stringify(updatedUsers));

    setUser(null);
    localStorage.removeItem("loggedUser");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateUser, deleteUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

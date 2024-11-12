import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  const clearUserData = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");

    // Clear any cached content
    if ("caches" in window) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => caches.delete(cacheName));
      });
    }

    // Update logged-in status
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const handleStorageChange = () => setIsLoggedIn(!!localStorage.getItem("user"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

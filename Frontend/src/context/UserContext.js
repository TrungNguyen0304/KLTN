import React, { createContext, useState, useEffect } from "react";

// Create the UserContext
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  // Initialize the isLoggedIn state based on localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  // Function to clear user data (localStorage and caches)
  const clearUserData = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userid");

    // Clear any cached content
    if ("caches" in window) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => caches.delete(cacheName));
      });
    }

    // Update logged-in status
    setIsLoggedIn(false);
  };

  // Effect to handle changes in localStorage (when another tab or window modifies it)
  useEffect(() => {
    const handleStorageChange = () => setIsLoggedIn(!!localStorage.getItem("user"));
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Provide context values
  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

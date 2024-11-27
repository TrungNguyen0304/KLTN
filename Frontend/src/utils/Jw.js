// jwtUtils.js

// Function to decode the JWT token
export const decodeToken = (token) => {
    if (!token) return null;
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
    return decoded;
  };
  
  // Function to check if the JWT token has expired
  export const isTokenExpired = (token) => {
    if (!token) return true;
  
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
  
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    return Date.now() > expirationTime; // Return true if expired
  };
  
  // Function to save the token and user data to localStorage
  export const saveToken = (token, user, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userid", userId);
  };
  
  // Function to get the token from localStorage
  export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  // Function to clear all the authentication data
  export const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userid");
  };
  
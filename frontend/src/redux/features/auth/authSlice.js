import { createSlice } from "@reduxjs/toolkit";

// Function to check if a token is present in cookies
const isTokenPresentInCookies = () => {
  const cookies = document.cookie.split("; ");
  const token = cookies.find((cookie) => cookie.startsWith("token="));
  return token ? true : false; // Returns true if token is found
};

// Function to load user data from localStorage
const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("user");
    console.log("Loaded user data:", serializedState); // Debug log to see what's in localStorage
    if (serializedState === null) {
      return { user: null }; // Return null if no user data found
    }
    return { user: JSON.parse(serializedState) }; // Parse and return user data if it exists
  } catch (error) {
    console.error("Error loading user:", error); // Log any error
    return { user: null }; // Return null if any error occurs
  }
};

// Initial state set based on localStorage
const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set user data (when logged in)
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user)); // Save the user data in localStorage
      console.log("User data saved to localStorage:", state.user); // Debug log
    },
    // Action to remove user data (when logged out)
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove user data from localStorage on logout
      console.log("User data removed from localStorage"); // Debug log
    },
  },
});

// Exporting actions and the reducer
export const { setUser, logout } = authSlice.actions; // Export the actions
export default authSlice.reducer; // Export the reducer to be used in the store

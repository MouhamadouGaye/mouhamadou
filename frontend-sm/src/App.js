// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import axios from "axios"; // Ensure axios is imported
// import Page from "./pages/Page";
// import SignIn from "./components/auth/SignIn";
// import SignUp from "./components/auth/SignUp";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null); // Store user metadata

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     // If a token exists, set the user state
//     if (token && storedUser) {
//       setUser(JSON.parse(storedUser)); // Set user from localStorage
//     }
//   }, []);

//   // Function to handle sign-in and fetch user data
//   const handleSignIn = async () => {
//     setIsAuthenticated(true); // Update state to reflect authentication

//     try {
//       const response = await axios.get("http://localhost:3006/api/auth/user", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token for user validation
//         },
//       });

//       setUser(response.data); // Save user data from response
//     } catch (error) {
//       console.error("Failed to fetch user data:", error);
//       setIsAuthenticated(false); // Reset authentication if an error occurs
//     }
//   };

//   // Handle user sign-out
//   const handleSignOut = () => {
//     setIsAuthenticated(false); // Reset authentication state
//     setUser(null); // Clear user metadata
//     localStorage.removeItem("token"); // Clear token from localStorage
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Redirect based on authentication state */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? (
//               <Navigate to="/page" />
//             ) : (
//               <Navigate to="/signin" />
//             )
//           }
//         />

//         {/* Sign-In Route */}
//         <Route
//           path="/signin"
//           element={
//             isAuthenticated ? (
//               <Navigate to="/page" />
//             ) : (
//               <SignIn onSignIn={handleSignIn} />
//             )
//           }
//         />

//         {/* Sign-Up Route */}
//         <Route path="/signup" element={<SignUp />} />

//         {/* Protected Page Route */}
//         <Route
//           path="/page"
//           element={
//             isAuthenticated ? (
//               <Page user={user} onSignOut={handleSignOut} /> // Pass user metadata and sign-out handler to Page
//             ) : (
//               <Navigate to="/signin" />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import Page from "./pages/Page";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Store user metadata

  // Use effect to check localStorage for token and user data on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // If token and user exist in localStorage, set authentication state
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser)); // Set user from localStorage
    }
  }, []);

  // Function to handle sign-in and fetch user data
  const handleSignIn = async () => {
    try {
      const response = await axios.get("http://localhost:3006/api/auth/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token for user validation
        },
      });

      setUser(response.data); // Save user data from response
      setIsAuthenticated(true); // Set user as authenticated
      localStorage.setItem("user", JSON.stringify(response.data)); // Store user data in localStorage
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setIsAuthenticated(false); // Reset authentication if an error occurs
      localStorage.removeItem("token"); // Remove token if failed
    }
  };

  // Handle user sign-out
  const handleSignOut = () => {
    setIsAuthenticated(false); // Reset authentication state
    setUser(null); // Clear user metadata
    localStorage.removeItem("token"); // Clear token from localStorage
    localStorage.removeItem("user"); // Clear user data from localStorage
  };

  return (
    <Router>
      <Routes>
        {/* Default Route (Redirect based on authentication state) */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/page" /> // If authenticated, go to /page
            ) : (
              <Navigate to="/signin" /> // If not authenticated, go to /signin
            )
          }
        />

        {/* Sign-In Route */}
        <Route
          path="/signin"
          element={
            isAuthenticated ? (
              <Navigate to="/page" /> // If authenticated, redirect to /page
            ) : (
              <SignIn onSignIn={handleSignIn} />
            )
          }
        />

        {/* Sign-Up Route */}
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Page Route */}
        <Route
          path="/page"
          element={
            isAuthenticated ? (
              <Page user={user} onSignOut={handleSignOut} /> // Render Page with user and sign-out
            ) : (
              <Navigate to="/signin" /> // Redirect to /signin if not authenticated
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

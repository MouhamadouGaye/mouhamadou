// import React, { useState } from "react";
// import axios from "axios";
// import "./signIn.css"; // Importing the CSS file for styling

// const SignIn = ({ onSignIn }) => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [message, setMessage] = useState("");
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:3006/api/auth/signin", // Your API URL
//         formData,
//         { withCredentials: true } // Required for sending cookies (if your token is in a cookie)
//       );

//       // If the response contains a token (for JWT-based auth), you can store it
//       const token = response.data.token;
//       if (token) {
//         localStorage.setItem("token", token); // Save the token in localStorage for future requests
//         setMessage(response.data.message);
//         setIsAuthenticated(true);
//         onSignIn(); // Call the onSignIn function to update the parent component's state
//       } else {
//         setMessage("Authentication failed, please try again.");
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Error signing in");
//     }
//   };

//   const handleSignOut = () => {
//     // Clear the authentication state and local storage when signing out
//     setIsAuthenticated(false);
//     localStorage.removeItem("token");
//     setMessage("Successfully signed out.");
//   };

//   return (
//     <div className="auth-container">
//       <h2>{isAuthenticated ? "Welcome Back!" : "Sign In"}</h2>

//       {isAuthenticated ? (
//         <div className="signout-section">
//           <p>You are signed in.</p>
//           <button onClick={handleSignOut} className="signout-btn">
//             Sign Out
//           </button>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="signin-form">
//           {message && <p className="message">{message}</p>}

//           <div className="input-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               autoComplete="current-email"
//             />
//           </div>
//           <div className="input-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               autoComplete="current-password"
//             />
//           </div>
//           <div className="btn-signin">
//             <button type="submit" className="submit-btn">
//               Sign In
//             </button>
//           </div>
//           <a href="/signup">Subscription ?</a>
//         </form>
//       )}
//     </div>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import axios from "axios";
import "./signIn.css"; // Importing the CSS file for styling

const SignIn = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [userMetadata, setUserMetadata] = useState(null); // Store user metadata

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3006/api/auth/signin", // Your API URL
        formData,
        { withCredentials: true } // Required for sending cookies (if your token is in a cookie)
      );

      const token = response.data.token;
      const user = response.data.user; // Assume the backend sends user metadata under "user"

      if (token && user) {
        // Save token and user metadata in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setMessage(response.data.message);
        setIsAuthenticated(true);
        setUserMetadata(user); // Save metadata in state
        onSignIn(user); // Pass the metadata to the parent component
      } else {
        setMessage("Authentication failed, please try again.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error signing in");
    }
  };

  const handleSignOut = () => {
    // Clear the authentication state and local storage when signing out
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMessage("Successfully signed out.");
    setUserMetadata(null); // Clear metadata
  };

  return (
    <div className="auth-container">
      <h2>
        {isAuthenticated
          ? `Welcome Back, ${userMetadata?.name || "User"}!`
          : "Sign In"}
      </h2>

      {isAuthenticated ? (
        <div className="signout-section">
          <p>You are signed in.</p>
          <p>Email: {userMetadata?.email}</p> {/* Display user metadata */}
          <button onClick={handleSignOut} className="signout-btn">
            Sign Out
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="signin-form">
          {message && <p className="message">{message}</p>}

          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="current-email"
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="btn-signin">
            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </div>
          <a href="/signup">Subscription ?</a>
        </form>
      )}
    </div>
  );
};

export default SignIn;

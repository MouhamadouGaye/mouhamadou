import React from "react";
import axios from "axios";

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await axios.post(
        "http://localhost:3006/api/auth/signout",
        {},
        { withCredentials: true }
      );
      alert("You have been signed out");
    } catch (error) {
      alert("Error signing out");
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;

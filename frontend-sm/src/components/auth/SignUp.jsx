import "./signIn.css";
import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  // Initial form data state
  const initialFormData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    pseudo: "",
    profile_photo: null, // File input
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle change for regular text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle change for file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return; // Do not proceed with the submission
    }

    // Clear the error if passwords match
    setPasswordError("");

    // Use FormData to handle both file and text data
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("name", formData.name);
    data.append("pseudo", formData.pseudo);
    if (formData.profile_photo) {
      data.append("profile_photo", formData.profile_photo);
    }

    try {
      const response = await axios.post(
        "http://localhost:3006/api/auth/signup",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message || "Sign-up successful!");

      // Reset form data
      setFormData(initialFormData);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="auth-container">
      <h2 style={{ color: "gray" }}>Sign Up</h2>

      <form onSubmit={handleSubmit} className="signin-form">
        <div className="message-to-user">
          {" "}
          {passwordError && (
            <p style={{ color: "red" }} className="error">
              {passwordError}
            </p>
          )}
        </div>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
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
            autoComplete="new-password"
          />
        </div>
        <div className="input-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>
        <div className="input-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>
        <div className="input-group">
          <label>Pseudo:</label>
          <input
            type="text"
            name="pseudo"
            value={formData.pseudo}
            onChange={handleChange}
            required
            autoComplete="pseudo"
          />
        </div>
        <div className="input-group">
          <label>Profile Photo:</label>
          <input
            type="file"
            name="profile_photo"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="btn-signin">
          <button type="submit" className="submit-btn">
            Subscribe
          </button>
        </div>
        <a href="/signin"> You need to connect ?</a>
      </form>
    </div>
  );
};

export default SignUp;

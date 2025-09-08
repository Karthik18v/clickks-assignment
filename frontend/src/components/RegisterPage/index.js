import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./index.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate the form fields before submission
  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage("Name is required.");
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Email is required.");
      return false;
    }
    if (!formData.password.trim()) {
      setErrorMessage("Password is required.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        setErrorMessage(
          result.error || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>
          Already have an account? <Link to="/login">Log in here</Link>.
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

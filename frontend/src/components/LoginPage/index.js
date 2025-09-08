import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim()) {
      setErrorMessage("Email is required.");
      return false;
    }
    if (!password.trim()) {
      setErrorMessage("Password is required.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/dashboard");
      } else {
        setErrorMessage(result.error || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

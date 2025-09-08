import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

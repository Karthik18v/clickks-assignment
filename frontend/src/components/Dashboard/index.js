const Dashboard = () => {
  const handleLogout = () => {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/login";
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <p>This is a protected route. Only authenticated users can see this.</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

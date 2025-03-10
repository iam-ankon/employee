import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content Area */}
      <div className="main-content">
        {/* Dashboard Title */}
        <h2 className="dashboard-title">Dashboard</h2>
      </div>

      {/* Styles */}
      <style jsx>{`
        .main-content {
          flex: 1;
          padding: 30px;
        }

        .dashboard-title {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin-top: 50px;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;

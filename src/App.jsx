import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import EmployeeDetails from "./components/EmployeeDetails";
import Notifications from "./components/Notifications";
import Attendance from "./components/Attendance";
import EmailLog from "./components/EmailLog";
import "./styles/App.css";
import EmployeeDetailPage from "./components/EmployeeDetailPage";
import EditEmployeePage from "./components/EditEmployeePage";
import LoginPage from "./components/LoginPage";
import AddEmployee from "./components/AddEmployee";
import Interviews from "./components/Interviews";
import HRWorkPage from './components/HRWorkPage';
import DashboardPage from './components/DashboardPage';
import CVManagement from "./components/CVManagement";
import CVAdd from "./components/CVAdd";
import ITProvision from "./components/ITProvision";
import AdminProvision from "./components/AdminProvision";
import FinanceProvision from "./components/FinanceProvision";
import AddCVPage from "./components/AddCVPage";
import CVList from "./components/CVList";
import CVEdit from "./components/CVEdit";
import EditCVPage from "./components/EditCVPage";
import EmployeeAttachments from "./components/EmployeeAttachments";
import TADGroups from "./components/TADGroups";
import EmployeeTermination from "./components/EmployeeTermination";
import TerminationAttachment from "./components/TerminationAttachment"
import CVDetail from "./components/CVDetail";
import MailMdSir from "./components/MailMdSir";


// Protected Route Component (Prevents Unauthorized Access)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
};
// Redirect Logged-in Users from Login Page
const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : children;
};


// App Content with Navbar Handling
const AppContent = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/"; // Hide Navbar on login page

  return (
    <>
      {!hideSidebar && <Sidebar />}
      <div className="container">
        <Routes>
          <Route path="/" element={<AuthRoute><LoginPage /></AuthRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/hr-work" element={<ProtectedRoute><HRWorkPage /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><EmployeeDetails /></ProtectedRoute>} />
          <Route path="/employee/:id" element={<ProtectedRoute><EmployeeDetailPage /></ProtectedRoute>} />
          <Route path="/edit-employee/:id" element={<ProtectedRoute><EditEmployeePage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
          <Route path="/email-logs" element={<ProtectedRoute><EmailLog /></ProtectedRoute>} />
          <Route path="/add-employee" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
          <Route path="/interviews" element={<ProtectedRoute><Interviews /></ProtectedRoute>} />
          <Route path="/DashboardPage" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/cv-management" element={<CVManagement />} />
          <Route path="/cv-add" element={<CVAdd />} />
          <Route path="/it-provision" element={<ITProvision />} />
          <Route path="/admin-provision" element={<AdminProvision />} />
          <Route path="/finance-provision" element={<FinanceProvision />} />
          <Route path="/add-cv" element={<AddCVPage />} />
          <Route path="/cv-list" element={<CVList />} />
          <Route path="/cv-edit/:id" element={<CVEdit />} />
          <Route path="/edit-cv/:cvId" element={<EditCVPage />} />
          <Route path="/employee/:id/attachments" element={<EmployeeAttachments />} />
          <Route path="/tad-groups" element={<ProtectedRoute><TADGroups /></ProtectedRoute>} />
          <Route path="/employee-termination" element={<ProtectedRoute><EmployeeTermination /></ProtectedRoute>} />
          {/* <Route path="/add-termination" element={<ProtectedRoute><AddTermination /></ProtectedRoute>} /> */}
          {/* <Route path="/edit/:id" element={<EditEmployeeTermination />} /> */}
          <Route path="/attachments/:id" element={<TerminationAttachment />} />
          <Route path="/cv-detail/:id" element={<CVDetail />} />
          <Route path="/mailmdsir" element={<MailMdSir />} />
        </Routes>
      </div>
    </>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

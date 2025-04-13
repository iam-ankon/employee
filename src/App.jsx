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
import LetterSend from "./components/LetterSend";
import CVAdd from "./components/CVAdd";
import ITProvision from "./components/ITProvision";
import AdminProvision from "./components/AdminProvision";
import FinanceProvision from "./components/FinanceProvision";
import AddLetterPage from "./components/AddLetterPage";
import CVList from "./components/CVList";
import CVEdit from "./components/CVEdit";
import EditCVPage from "./components/EditCVPage";
import EmployeeAttachments from "./components/EmployeeAttachments";
import TADGroups from "./components/TADGroups";
import EmployeeTermination from "./components/EmployeeTermination";
import TerminationAttachment from "./components/TerminationAttachment"
import CVDetail from "./components/CVDetail";
import MailMdSir from "./components/MailMdSir";
import InviteMail from "./components/InviteMail"
import PerformanseAppraisal from "./components/PerformanseAppraisal";
import NewAppraisal from "./components/NewAppraisal";
import AppraisalDetails from "./components/AppraisalDetails";
import EditAppraisal from "./components/EditAppraisal";
import EmployeeLeaveBalance from "./components/EmployeeLeaveBalance";
import EmployeeLeaveType from "./components/EmployeeLeaveType";
import EmployeeLeave from "./components/EmployeeLeave";
import AddLeaveRequest from "./components/AddLeaveRequest";
import LeaveRequestDetails from "./components/LeaveRequestDetails";
import EditLeaveRequest from "./components/EditLeaveRequest";



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
          <Route path="/employee" element={<ProtectedRoute><EmployeeDetails /></ProtectedRoute>} />
          <Route path="/employee/:id" element={<ProtectedRoute><EmployeeDetailPage /></ProtectedRoute>} />
          <Route path="/edit-employee/:id" element={<ProtectedRoute><EditEmployeePage /></ProtectedRoute>} />
          <Route path="/performanse_appraisal" element={<ProtectedRoute><PerformanseAppraisal /></ProtectedRoute>} />
          <Route path="/performanse_appraisal/:id" element={<ProtectedRoute><PerformanseAppraisal /></ProtectedRoute>} />
          <Route path="/add-newAppraisal" element={<ProtectedRoute><NewAppraisal /></ProtectedRoute>} />
          <Route path="/appraisal-details/:id" element={<ProtectedRoute><AppraisalDetails /></ProtectedRoute>} />
          <Route path="/edit-appraisal/:id" element={<ProtectedRoute><EditAppraisal /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
          <Route path="/employee_leave_balance" element={<ProtectedRoute><EmployeeLeaveBalance /></ProtectedRoute>} />
          <Route path="/add-leave-request" element={<ProtectedRoute><AddLeaveRequest /></ProtectedRoute>} />
          <Route path="/leave-request-details/:id" element={<ProtectedRoute><LeaveRequestDetails /></ProtectedRoute>} />
          <Route path="/edit-leave-request/:id" element={<ProtectedRoute><EditLeaveRequest /></ProtectedRoute>} />
          <Route path="/employee_leave_type" element={<ProtectedRoute><EmployeeLeaveType /></ProtectedRoute>} />
          <Route path="/employee_leave" element={<ProtectedRoute><EmployeeLeave /></ProtectedRoute>} />
          <Route path="/email-logs" element={<ProtectedRoute><EmailLog /></ProtectedRoute>} />
          <Route path="/add-employee" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
          <Route path="/interviews" element={<ProtectedRoute><Interviews /></ProtectedRoute>} />
          <Route path="/interviews/:id" element={<ProtectedRoute><Interviews /></ProtectedRoute>} />
          <Route path="/DashboardPage" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/letter-send" element={<LetterSend />} />
          <Route path="/cv-add" element={<CVAdd />} />
          <Route path="/it-provision" element={<ITProvision />} />
          <Route path="/admin-provision" element={<AdminProvision />} />
          <Route path="/finance-provision" element={<FinanceProvision />} />
          <Route path="/add-letter" element={<AddLetterPage />} />
          <Route path="/cv-list" element={<CVList />} />
          <Route path="/cv-edit/:id" element={<CVEdit />} />
          <Route path="/edit-cv/:cvId" element={<EditCVPage />} />
          <Route path="/employee/:id/attachments" element={<EmployeeAttachments />} />
          <Route path="/tad-groups" element={<ProtectedRoute><TADGroups /></ProtectedRoute>} />
          <Route path="/employee-termination" element={<ProtectedRoute><EmployeeTermination /></ProtectedRoute>} />
          <Route path="/attachments/:id" element={<TerminationAttachment />} />
          <Route path="/cv-detail/:id" element={<CVDetail />} />
          <Route path="/mailmdsir" element={<MailMdSir />} />
          <Route path="/invitemail" element={<InviteMail />} />
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

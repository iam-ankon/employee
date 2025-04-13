// import React from 'react';
// import { Link } from 'react-router-dom';

// const HRWorkPage = () => {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <h2>HR Work</h2>
//         <ul>
//           <li>
//             <Link to="/employees" className="flex items-center py-2 hover:text-gray-300">
//               Employees
//             </Link>
//           </li>
//           <li>
//             <Link to="/performanse_appraisal" className="flex items-center py-2 hover:text-gray-300">
//               Performance Appraisal
//             </Link>
//           </li>
//           <li>
//             <Link to="/employee_leave" className="flex items-center py-2 hover:text-gray-300">
//               EmployeeLeave
//             </Link>
//           </li>
//           <li>
//             <Link to="/employee_leave_balance" className="flex items-center py-2 hover:text-gray-300">
//               Employee Leave Balance
//             </Link>
//           </li>
//           <li>
//             <Link to="/employee_leave_type" className="flex items-center py-2 hover:text-gray-300">
//               Employee Leave Type
//             </Link>
//           </li>
//           <li>
//             <Link to="/attendance" className="flex items-center py-2 hover:text-gray-300">
//               Attendance
//             </Link>
//           </li>
//           <li>
//             <Link to="/email-logs" className="flex items-center py-2 hover:text-gray-300">
//               Email Logs
//             </Link>
//           </li>
//           <li>
//             <Link to="/interviews" className="flex items-center py-2 hover:text-gray-300">
//               Interviews
//             </Link>
//           </li>
//           <li>
//             <Link to="/finance-provision" className="flex items-center py-2 hover:text-gray-300">
//               Finance Provision
//             </Link>
//           </li>
//           <li>
//             <Link to="/admin-provision" className="flex items-center py-2 hover:text-gray-300">
//               Admin Provision
//             </Link>
//           </li>
//           <li>
//             <Link to="/it-provision" className="flex items-center py-2 hover:text-gray-300">
//               IT Provision
//             </Link>
//           </li>
//           <li>
//             <Link to="/cv-add" className="flex items-center py-2 hover:text-gray-300">
//               Add CV
//             </Link>
//           </li>
//           <li>
//             <Link to="/letter-send" className="flex items-center py-2 hover:text-gray-300">
//               Letter Send
//             </Link>
//           </li>
//           <li>
//             <Link to="/tad-groups" className="flex items-center py-2 hover:text-gray-300">
//               Tad Groups
//             </Link>
//           </li>
//           <li>
//             <Link to="/tad-groups" className="flex items-center py-2 hover:text-gray-300">
//               Employee Termination Process
//             </Link>
//           </li>
//         </ul>

//       </div>

//       {/* Main Content Area */}
//       <div className="main-content">
//         <h2 className="text-3xl font-bold mb-6">HR Work Dashboard</h2>

//         {/* Cards section */}
//         <div className="card-container">
//           <div className="card">
//             <h3>📑 Add CV</h3>
//             <p>Upload CV files, enter applicant details, and submit candidate profiles.</p>
//             <Link to="/cv-list">Go to Add CV</Link>
//           </div>
//           <div className="card">
//             <h3>💼 Interviews</h3>
//             <p>Manage interview schedules, view past interviews, and make decisions.</p>
//             <Link to="/interviews">Go to Interviews</Link>
//           </div>
//           <div className="card">
//             <h3> 👥  Employees</h3>
//             <p>Manage employee data, view lists, and perform actions on employee records.</p>
//             <Link to="/employees">Go to Employees</Link>
//           </div>
//           <div className="card">
//             <h3> 📝 Attendance</h3>
//             <p>Track employee attendance, review reports, and manage leave requests.</p>
//             <Link to="/attendance">Go to Attendance</Link>
//           </div>
          
//           <div className="card">
//             <h3>Employee Leave Request/Type/Balance</h3 >
//             <p>Public/Festival Holiday,Casual Leave,Sick Leave,Earned Leave.</p>
//             <Link to="/employee_leave">Go to Employee Leave</Link>
//           </div>
          
//           <div className="card">
//             <h3> 📈 Performance Appraisal</h3 >
//             <p>Conduct performance reviews, manage appraisals, and track employee progress.</p>
//             <Link to="/performanse_appraisal">Go to Performance Appraisal</Link>
//           </div>
//           <div className="card">
//             <h3>🔴 Employee Termination Process</h3>
//             <p>Add An Employee Termination Process.</p>
//             <Link to="/employee-termination">Go to Tad Groups</Link>
//           </div>
          

//           <div className="card">
//             <h3>📊 Finance/IT/Admin Provision</h3>
//             <p>Manage financial resources, allocate budgets,tasks, user roles,IT resources, provision hardware, and assign software licenses and track expenses.</p>
//             <Link to="/finance-provision">Go to Finance Provision</Link>
//           </div>
          
//           <div className="card">
//             <h3>📮 Letter Send</h3>
//             <p>Manage letter submissions, review applications, and send offer letters.</p>
//             <Link to="/letter-send">Go to Letter Send</Link>
//           </div>
//           <div className="card">
//             <h3>📧 Email Logs</h3>
//             <p>View email communication logs and track messages sent to employees.</p>
//             <Link to="/email-logs">Go to Email Logs</Link>
//           </div>
//           <div className="card">
//             <h3>🌐 Tad Groups</h3>
//             <p>Upload company names only.</p>
//             <Link to="/tad-groups">Go to Tad Groups</Link>
//           </div>
          
//         </div>
//       </div>

//       {/* Styles for the HRWorkPage */}
//       <style jsx>{`
//         /* Sidebar Styles */
//         .sidebar {
//           // background-color: #2d3748; 
//           // color: white;
//           // padding: 20px;
//           // width: 250px;
//           // height: 100vh;
//         }

//         .sidebar h2 {
//           font-size: 1.5rem;
//           font-weight: 600;
//           text-align: center;
//           margin-bottom: 20px;
//         }

//         .sidebar ul {
//           list-style-type: none;
//           padding: 0;
//         }

//         .sidebar ul li {
//           margin-bottom: 15px;
//         }

//         .sidebar ul li a {
//           display: flex;
//           align-items: center;
//           padding: 10px 20px;
//           border-radius: 8px;
//           text-decoration: none;
//           color: white;
//           transition: background-color 0.2s ease, color 0.2s ease;
//         }

//         .sidebar ul li a:hover {
//           background-color: #4a5568; /* Darker gray on hover */
//           color: #edf2f7; /* Light color on hover */
//         }

//         /* Main Content Area */
//         .main-content {
//           flex: 1;
//           padding: 30px;
//           background-color: #f7fafc;
//           overflow: auto;
//         }

//         .main-content h2 {
//           font-size: 2.25rem;
//           font-weight: 700;
//           margin-bottom: 30px;
//         }

//         /* Card Styles */
//         .card-container {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 30px;
//         }

//         .card {
//           background-color: white;
//           padding: 20px;
//           border-radius: 30px;
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//           text-align: center;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .card:hover {
//           transform: translateY(-15px);
//           box-shadow: 0 6px 15px rgba(86, 59, 210, 0.31);
//         }

//         .card h3 {
//           font-size: 1.25rem;
//           font-weight: 600;
//           margin-bottom: 20px;
//         }

//         .card p {
//           font-size: 1rem;
//           color: #4a5568;
//           margin-bottom: 20px;
//         }

//         .card a {
//           font-size: 1rem;
//           color: #3182ce;
//           text-decoration: none;
//           transition: color 0.2s ease;
//         }

//         .card a:hover {
//           color: #2b6cb0;
//         }

//         /* Media Queries for Responsiveness */
//         @media (max-width: 768px) {
//           .sidebar {
//             width: 200px;
//             padding: 15px;
//           }

//           .main-content {
//             padding: 20px;
//           }

//           .card-container {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HRWorkPage;
import React from 'react';
import { Link } from 'react-router-dom';

const HRWorkPage = () => {
  // Mock data
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const jobPositions = [
    { title: 'Design Head', total: '88', g1: '1G Candidates', g3: '3C Candidates', g2: '2C Candidates' },
    { title: 'Art Lead', total: '88', g1: '1G Candidates', g3: '3C Candidates', g2: '2C Candidates' },
    { title: 'Product Designer', total: '88', g1: '1G Candidates', g3: '3C Candidates', g2: '2C Candidates' },
    { title: 'Junior UI Designer', total: '88', g1: '1G Candidates', g3: '3C Candidates', g2: '2C Candidates' },
    { title: '3D Artist', total: '88', g1: '1G Candidates', g3: '3C Candidates', g2: '2C Candidates' },
    { title: 'UX Researcher', total: '88', g1: '1G Candidates', g3: '3C Candidates', g2: '2C Candidates' },
  ];

  const tasks = [
    { time: '09:00 - 10:00 AM', description: 'Interview with candidates from product designer application' },
    { time: '10:30 - 12:00 AM', description: 'UI Design candidate screening' },
    { time: '13:30 - 14:00 PM', description: 'Submit freelance recruitment result' },
    { time: '14:00 - 16:00 PM', description: 'Make new career vacancy' },
    { time: '16:30 - 18:00 PM', description: 'Conduct test for UX Researcher candidates' },
  ];

  const teams = [
    { name: 'Design Team', total: 'TOTAL ADVERTISER' },
    { name: 'Development Team', total: 'TOTAL WORKSHIPS' },
    { name: 'Finance Team', total: 'TOTAL WORKSHIPS' },
    { name: 'Sales Team', total: 'TOTAL WORKSHIPS' },
  ];

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      {/* Sidebar */}
      <div style={{ 
        width: '250px', 
        backgroundColor: '#1f2937', 
        color: 'white', 
        padding: '1rem'
      }}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem'
        }}>HR DASHBOARD</h2>
        
        <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '0.5rem' }}>
            <Link 
              to="/cv-add" 
              style={{ 
                display: 'block', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none'
              }}
              hoverStyle={{ backgroundColor: '#374151' }}
            >
              Add CV
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link 
              to="/interviews" 
              style={{ 
                display: 'block', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none'
              }}
              hoverStyle={{ backgroundColor: '#374151' }}
            >
              Interviews
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link 
              to="/employees" 
              style={{ 
                display: 'block', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none'
              }}
              hoverStyle={{ backgroundColor: '#374151' }}
            >
              Employees
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link 
              to="/attendance" 
              style={{ 
                display: 'block', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none'
              }}
              hoverStyle={{ backgroundColor: '#374151' }}
            >
              Attendance
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link 
              to="/employee_leave" 
              style={{ 
                display: 'block', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none'
              }}
              hoverStyle={{ backgroundColor: '#374151' }}
            >
              Employee Leave
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link 
              to="/performanse_appraisal" 
              style={{ 
                display: 'block', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none'
              }}
              hoverStyle={{ backgroundColor: '#374151' }}
            >
              Performance Appraisal
            </Link>
          </li>

          <li style={{ marginBottom: '0.5rem' }}>
            <Link 
              to="/finance-provision" 
              style={{ 
                display: 'block', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none'
              }}
              hoverStyle={{ backgroundColor: '#374151' }}
            >
              Finance Provision
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              to="/letter-send" 
              style={{ 
                display: 'block', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '0.375rem',
                color: 'white',
                textDecoration: 'none'
              }}
              hoverStyle={{ backgroundColor: '#374151' }}
            >
              Send Letter
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        padding: '1.5rem',
        backgroundColor: '#f9fafb'
      }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginBottom: '0.5rem'
        }}>NTO-HUB</h1>
        <h2 style={{ 
          fontSize: '1.25rem', 
          marginBottom: '1.5rem'
        }}>Dashboard</h2>
        <p style={{ marginBottom: '2rem' }}>Today is {formattedDate}</p>

        {/* Grid Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '2rem'
        }}>
          {/* Hiring Section */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.375rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <h3 style={{ 
              fontWeight: 'bold', 
              marginBottom: '0.75rem'
            }}>Hiring</h3>
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ fontWeight: '600' }}>Jobs</div>
              <ul style={{ 
                listStyleType: 'disc', 
                paddingLeft: '1.25rem',
                marginTop: '0.25rem'
              }}>
                <li>New Age/final</li>
                <li>Screening</li>
                <li>Interview</li>
                <li>Text</li>
              </ul>
            </div>
          </div>

          {/* Job Positions */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.375rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            gridColumn: 'span 2'
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
              gap: '1rem'
            }}>
              {jobPositions.map((job, index) => (
                <div key={index} style={{ 
                  border: '1px solid #e5e7eb', 
                  padding: '0.75rem', 
                  borderRadius: '0.375rem'
                }}>
                  <h4 style={{ fontWeight: 'bold' }}>{job.title}</h4>
                  <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    <div>TOTAL APP: {job.total}</div>
                    <div>{job.g1}</div>
                    <div>{job.g3}</div>
                    <div>{job.g2}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '2rem'
        }}>
          {/* Job Summary */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.375rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <h3 style={{ 
              fontWeight: 'bold', 
              marginBottom: '0.75rem'
            }}>Job Summary</h3>
            <div style={{ marginTop: '0.75rem' }}>
              <div>
                <div style={{ fontWeight: '600' }}>Hand</div>
                <div>133</div>
                <div style={{ fontSize: '0.875rem' }}>- TOTAL JOBS</div>
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ fontWeight: '600' }}>80 PRUSHED</div>
                <div style={{ fontSize: '0.875rem' }}>18 INTERNAL</div>
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ fontWeight: '600' }}>20 CHICLD</div>
                <div style={{ fontSize: '0.875rem' }}>15 CLOSED</div>
              </div>
            </div>
          </div>

          {/* Employee */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.375rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <h3 style={{ 
              fontWeight: 'bold', 
              marginBottom: '0.75rem'
            }}>Employee</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>Structure</li>
              <li style={{ marginTop: '0.5rem' }}>Report</li>
              <li style={{ marginTop: '0.5rem' }}>Setting</li>
            </ul>
          </div>

          {/* My Task */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.375rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <h3 style={{ 
              fontWeight: 'bold', 
              marginBottom: '0.75rem'
            }}>My Task</h3>
            <div style={{ marginBottom: '0.75rem' }}>
              <div>Today</div>
              <div style={{ fontSize: '0.875rem' }}>Feb 8 - Nov 16</div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              {tasks.map((task, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: '600' }}>{task.time}</div>
                  <div style={{ fontSize: '0.875rem' }}>{task.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Teams Section */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1rem', 
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
          <h3 style={{ 
            fontWeight: 'bold', 
            marginBottom: '0.75rem'
          }}>Employee</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem'
          }}>
            {teams.map((team, index) => (
              <div key={index}>
                <div style={{ fontWeight: '600' }}>{team.name}</div>
                <div style={{ fontSize: '0.875rem' }}>{team.total}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRWorkPage;
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/employee/details/api/';

export const api = axios.create({
  baseURL: API_URL,
});


export const getCompanies = () => api.get('companies/');
export const getCompanyById = (id) => api.get(`companies/${id}/`);
export const getEmployees = () => api.get('employees/');
export const getEmployeeById = (id) => api.get(`employees/${id}/`);
export const updateEmployee = (id, data) => api.put(`employees/${id}/`, data);
export const addEmployee = (data) => api.post('employees/', data);
export const deleteEmployee = (id) => api.delete(`employees/${id}/`);
export const getNotifications = () => api.get('notifications/');
export const getAttendance = () => api.get('attendance/');
export const getAttendanceById = (id) => api.get(`attendance/${id}/`);
export const updateAttendance = (id, data) => api.put(`attendance/${id}/`, data);
export const deleteAttendance = (id) => api.delete(`attendance/${id}/`);
export const getInterviews = () => api.get('interviews/');
export const getInterviewById = (id) => api.get(`interviews/${id}/`);
export const updateInterview = (id, data) => api.put(`interviews/${id}/`, data);
export const addInterview = (data) => api.post('interviews/', data);
export const deleteInterview = (id) => api.delete(`interviews/${id}/`);
export const getCVs = () => api.get('cvs/');
export const getCVById = (id) => api.get(`cvs/${id}/`);
export const updateCV = (id, data) => api.put(`cvs/${id}/`, data);
export const addCV = (data) => {
  const formData = new FormData();
  formData.append('employee', data.employee);
  formData.append('cv_file', data.cv_file);
  return api.post('cvs/', formData);
};
export const deleteCV = (id) => api.delete(`cvs/${id}/`);
export const getITProvisions = () => api.get('it_provisions/');
export const getITProvisionById = (id) => api.get(`it_provisions/${id}/`);
export const updateITProvision = (id, data) => api.put(`it_provisions/${id}/`, data);
export const addITProvision = (data) => api.post('it_provisions/', data);
export const deleteITProvision = (id) => api.delete(`it_provisions/${id}/`);
export const getFinanceProvisions = () => api.get('finance_provisions/');
export const getFinanceProvisionById = (id) => api.get(`finance_provisions/${id}/`);
export const updateFinanceProvision = (id, data) => api.put(`finance_provisions/${id}/`, data);
export const addFinanceProvision = (data) => api.post('finance_provisions/', data);
export const deleteFinanceProvision = (id) => api.delete(`finance_provisions/${id}/`);
export const getAdminProvisions = () => api.get('admin_provisions/');
export const getAdminProvisionById = (id) => api.get(`admin_provisions/${id}/`);
export const updateAdminProvision = (id, data) => api.put(`admin_provisions/${id}/`, data);
export const addAdminProvision = (data) => api.post('admin_provisions/', data);
export const deleteAdminProvision = (id) => api.delete(`admin_provisions/${id}/`);
export const getLetterSend = () => api.get('letter_send/');
export const getLetterSendById = (id) => api.get(`letter_send/${id}/`);
export const updateLetterSend = (id, data) => api.put(`letter_send/${id}/`, data);
export const addLetterSend = (data) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('letter_file', data.letter_file);
  formData.append('letter_type', data.letter_type);
  return api.post('letter_send/', formData);
};
export const deleteLetterSend = (id) => api.delete(`letter_send/${id}/`);
export const addAttendance = (data) => {
  console.log('Sending attendance data:', data); // Log the data being sent
  return api.post('attendance/', {
    employee: data.employee,
    check_in: data.check_in,
    check_out: data.check_out,
    attendance_delay: data.attendance_delay,
  });
};
export const getEmailLogs = () => api.get('email_logs/');
export const deleteAllEmailLogs = () => api.delete('email_logs/delete_all/');




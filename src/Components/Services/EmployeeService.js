import axios from 'axios';

const API_BASE_URL = 'https://localhost:7133'; 

export const EmployeeService = axios.create({
  baseURL: API_BASE_URL,
});

export async function createEmployee(formData) {
    const response = await EmployeeService.post('/api/Employees', formData, {
    });
    return await response.data;
}
export async function getAllEmployee() {
    const response = await EmployeeService.get("/api/Employees");
    return await response.data;
}
export async function deleteCurrentEmployee(id) {
    const response = await EmployeeService.delete('/api/Employees/' + id);
    return await response.data;
}
export async function updateCurrentEmployee(id,formData) {
    const response = await EmployeeService.put('/api/Employees/'+id, formData, {
    });
    return await response.data;
}
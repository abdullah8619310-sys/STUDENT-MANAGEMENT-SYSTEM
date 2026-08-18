import { apiRequest } from "../api/apiClient";

export function getStudents() {
  return apiRequest("/students");
}

export function createStudent(student) {
  return apiRequest("/students", {
    method: "POST",
    body: JSON.stringify(student),
  });
}

export function updateStudent(id, student) {
  return apiRequest(`/students/${id}`, {
    method: "PUT",
    body: JSON.stringify(student),
  });
}

export function deleteStudent(id) {
  return apiRequest(`/students/${id}`, {
    method: "DELETE",
  });
}
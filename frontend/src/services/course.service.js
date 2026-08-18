import { apiRequest } from "../api/apiClient";

export function getCourses() {
  return apiRequest("/courses");
}

export function createCourse(course) {
  return apiRequest("/courses", {
    method: "POST",
    body: JSON.stringify(course),
  });
}

export function updateCourse(id, course) {
  return apiRequest(`/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(course),
  });
}

export function deleteCourse(id) {
  return apiRequest(`/courses/${id}`, {
    method: "DELETE",
  });
}

export function enrollStudent(courseId, studentId) {
  return apiRequest(`/courses/${courseId}/enroll`, {
    method: "POST",
    body: JSON.stringify({ studentId }),
  });
}

export function dropStudent(courseId, studentId) {
  return apiRequest(`/courses/${courseId}/enroll/${studentId}`, {
    method: "DELETE",
  });
}

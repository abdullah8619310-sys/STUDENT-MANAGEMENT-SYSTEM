const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const DEFAULT_MESSAGES = {
  400: "That entry doesn't look right. Please check the form and try again.",
  401: "You need to log in to do that.",
  403: "You don't have permission to do that.",
  404: "That couldn't be found.",
  409: "That conflicts with an existing record.",
  500: "Something went wrong on our end. Please try again.",
};

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    window.dispatchEvent(new Event("auth:unauthorized"));
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message =
      data?.message ||
      DEFAULT_MESSAGES[response.status] ||
      "Something went wrong.";

    const error = new Error(message);
    error.status = response.status;
    error.details = data?.errors;
    throw error;
  }

  return data;
}

export function isRequired(value) {
  return value.trim().length > 0;
}

export function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export function isMinimumAge(age, minAge = 18) {
  const numericAge = Number(age);
  return !Number.isNaN(numericAge) && numericAge >= minAge;
}

export function validateStudentForm(formData) {
  const errors = {};

  if (!isRequired(formData.name)) {
    errors.name = 'Name is required.';
  }

  if (!isRequired(formData.email)) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!isRequired(formData.department)) {
    errors.department = 'Department is required.';
  }

  if (!isRequired(formData.age)) {
    errors.age = 'Age is required.';
  } else if (!isMinimumAge(formData.age)) {
    errors.age = 'Student must be at least 18 years old.';
  }

  return errors;
}

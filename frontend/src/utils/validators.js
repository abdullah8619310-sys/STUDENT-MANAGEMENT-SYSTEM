export function isRequired(value) {
  return value.trim().length > 0;
}

export function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
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

  if (!isRequired(formData.rollNumber)) {
    errors.rollNumber = 'Roll number is required.';
  }

  return errors;
}

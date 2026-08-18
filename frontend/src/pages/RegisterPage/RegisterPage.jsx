import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth.service';
import { useAuth } from '../../context/useAuth';
import { isRequired, isValidEmail } from '../../utils/validators';
import '../LoginPage/LoginPage.css';
import './RegisterPage.css';

const ROLES = [
  {
    value: 'STUDENT',
    label: 'Student',
    description: 'View the student roster',
  },
  {
    value: 'TEACHER',
    label: 'Teacher',
    description: 'View the student roster',
  },
];

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    const newErrors = {};

    if (!isRequired(formData.name)) {
      newErrors.name = 'Name is required.';
    }

    if (!isRequired(formData.email)) {
      newErrors.email = 'Email is required.';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!isRequired(formData.password)) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setServerError('');

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const authData = await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      });

      login(authData);

      navigate('/students', { replace: true });
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="login-page">
      <div className="login-shell register-shell">
        <div className="login-brand">
          <span className="badge badge-primary login-brand-eyebrow">
            Join us
          </span>
          <h2>Create your account</h2>
          <p>
            Register as a student or teacher to view the student roster.
            Admin accounts are provisioned separately.
          </p>
          <ul className="login-brand-list">
            <li>Free to sign up in seconds</li>
            <li>Secure, hashed passwords</li>
            <li>Read-only access unless you&rsquo;re an admin</li>
          </ul>
        </div>

        <div className="login-card">
          <div className="login-header">
            <h1>Sign Up</h1>
            <p>Fill in your details to create an account</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="role-select" role="radiogroup" aria-label="Account type">
              {ROLES.map((role) => (
                <label
                  key={role.value}
                  className={
                    formData.role === role.value
                      ? 'role-option selected'
                      : 'role-option'
                  }
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={formData.role === role.value}
                    onChange={handleChange}
                  />
                  <span className="role-option-label">{role.label}</span>
                  <span className="role-option-desc">{role.description}</span>
                </label>
              ))}
            </div>

            <div className="login-field">
              <label htmlFor="name">Full Name</label>

              <div className="input-with-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M5 19.5c1.2-3.4 4-5 7-5s5.8 1.6 7 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>

              {errors.name && (
                <p className="login-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="login-field">
              <label htmlFor="email">Email</label>

              <div className="input-with-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="m4 6.5 8 6.25L20 6.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              {errors.email && (
                <p className="login-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>

              <div className="input-with-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="5"
                    y="10.5"
                    width="14"
                    height="9.5"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M8 10.5V8a4 4 0 0 1 8 0v2.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>

              {errors.password && (
                <p className="login-error" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="login-field">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <div className="input-with-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="5"
                    y="10.5"
                    width="14"
                    height="9.5"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M8 10.5V8a4 4 0 0 1 8 0v2.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>

              {errors.confirmPassword && (
                <p className="login-error" role="alert">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {serverError && (
              <p className="login-server-error" role="alert">
                {serverError}
              </p>
            )}

            <button
              className="btn btn-primary btn-block login-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && <span className="spinner" aria-hidden="true" />}
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>

            <p className="register-footer-text">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;

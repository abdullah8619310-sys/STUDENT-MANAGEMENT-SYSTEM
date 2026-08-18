import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginUser } from '../../services/auth.service';
import { useAuth } from '../../context/useAuth';
import { isRequired, isValidEmail } from '../../utils/validators';
import './LoginPage.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? '/students';

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    const newErrors = {};

    if (!isRequired(formData.email)) {
      newErrors.email = 'Email is required.';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!isRequired(formData.password)) {
      newErrors.password = 'Password is required.';
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
      const authData = await loginUser(formData);

      login(authData);

      navigate(from, { replace: true });
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="login-page">
      <div className="login-shell">
        <div className="login-brand">
          <span className="badge badge-primary login-brand-eyebrow">
            Welcome back
          </span>
          <h2>Student Management System</h2>
          <p>
            Sign in to view the student roster, or register and update
            records if you&rsquo;re an admin.
          </p>
          <ul className="login-brand-list">
            <li>Role-based access for admins and teachers</li>
            <li>JWT-secured sessions</li>
            <li>Live PostgreSQL-backed data</li>
          </ul>
        </div>

        <div className="login-card">
          <div className="login-header">
            <h1>Sign In</h1>
            <p>Enter your credentials to access your account</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-icon-toggle"
                  onClick={() => setShowPassword((show) => !show)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {errors.password && (
                <p className="login-error" role="alert">
                  {errors.password}
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
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <p className="register-footer-text">
              Don&rsquo;t have an account? <Link to="/register">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;

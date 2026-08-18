import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to access the Student Management System</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <p className="login-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

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
            className="login-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
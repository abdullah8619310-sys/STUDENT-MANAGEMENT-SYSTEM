import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth.service';
import { useAuth } from '../../context/useAuth';
import { isRequired, isValidEmail } from '../../utils/validators';

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

      navigate('/students');
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <p role="alert">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && (
            <p role="alert">{errors.password}</p>
          )}
        </div>

        {serverError && (
          <p role="alert">{serverError}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </section>
  );
}

export default LoginPage;


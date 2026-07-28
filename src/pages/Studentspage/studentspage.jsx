import { useState } from 'react';
import { validateStudentForm } from '../../utils/validators';
import './StudentsPage.css';

function StudentsPage() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Ayesha Khan', email: 'ayesha.khan@example.com', department: 'Computer Science', age: 20 },
    { id: 2, name: 'Bilal Ahmed', email: 'bilal.ahmed@example.com', department: 'Software Engineering', age: 22 },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    age: '',
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateStudentForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      department: formData.department.trim(),
      age: Number(formData.age),
    };

    setStudents((prev) => [...prev, newStudent]);
    setFormData({ name: '', email: '', department: '', age: '' });
    setErrors({});
  }

  return (
    <section className="students-page">
      <h1>Students</h1>

      <div className="students-page-grid">
        <div className="students-list">
          <h2>Registered Students ({students.length})</h2>
          {students.length === 0 ? (
            <p>No students registered yet.</p>
          ) : (
            <ul>
              {students.map((student) => (
                <li key={student.id} className="student-card">
                  <strong>{student.name}</strong>
                  <span>{student.email}</span>
                  <span>{student.department}</span>
                  <span>Age: {student.age}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form className="student-form" onSubmit={handleSubmit} noValidate>
          <h2>Register New Student</h2>

          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
            {errors.department && <span className="error-text">{errors.department}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <span className="error-text">{errors.age}</span>}
          </div>

          <button type="submit">Register Student</button>
        </form>
      </div>
    </section>
  );
}

export default StudentsPage;
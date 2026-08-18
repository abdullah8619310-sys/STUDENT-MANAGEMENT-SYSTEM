import { useState, useEffect } from 'react';
import { validateStudentForm } from '../../utils/validators';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../../services/student.service';
import { useAuth } from '../../context/useAuth';
import './StudentsPage.css';

function StudentsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    rollNumber: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      setFetchError('');

      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function resetForm() {
    setFormData({
      name: '',
      email: '',
      department: '',
      rollNumber: '',
    });

    setErrors({});
    setEditingStudentId(null);
  }

  function handleEdit(student) {
    setEditingStudentId(student.id);

    setFormData({
      name: student.name,
      email: student.email,
      department: student.department,
      rollNumber: student.rollNumber,
    });

    setErrors({});
    setFetchError('');
  }

  async function handleDelete(studentId) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this student?'
    );

    if (!confirmed) {
      return;
    }

    setFetchError('');

    try {
      await deleteStudent(studentId);

      setStudents((prev) =>
        prev.filter((student) => student.id !== studentId)
      );

      if (editingStudentId === studentId) {
        resetForm();
      }
    } catch (error) {
      setFetchError(error.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateStudentForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setFetchError('');

    try {
      if (editingStudentId !== null) {
        const updatedStudent = await updateStudent(editingStudentId, {
          name: formData.name.trim(),
          email: formData.email.trim(),
          department: formData.department.trim(),
          rollNumber: formData.rollNumber.trim(),
        });

        setStudents((prev) =>
          prev.map((student) =>
            student.id === editingStudentId ? updatedStudent : student
          )
        );
      } else {
        const newStudent = await createStudent({
          name: formData.name.trim(),
          email: formData.email.trim(),
          department: formData.department.trim(),
          rollNumber: formData.rollNumber.trim(),
        });

        setStudents((prev) => [...prev, newStudent]);
      }

      resetForm();
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="students-page">
      <h1>Students</h1>

      <div className="students-page-grid">
        <div className="students-list">
          <h2>Registered Students ({students.length})</h2>

          {loading && <p>Loading students...</p>}

          {!loading && fetchError && (
            <p className="error-text" role="alert">
              {fetchError}
            </p>
          )}

          {!loading && !fetchError && students.length === 0 ? (
            <p>No students registered yet.</p>
          ) : (
            !loading &&
            !fetchError && (
              <ul>
                {students.map((student) => (
                  <li key={student.id} className="student-card">
                    <div className="student-card-header">
                      <div>
                        <h3 className="student-name">{student.name}</h3>
                        <p className="student-email">{student.email}</p>
                      </div>
                    </div>

                    <div className="student-card-body">
                      <div className="student-field">
                        <span className="field-label">Department</span>
                        <span className="field-value">
                          {student.department}
                        </span>
                      </div>

                      <div className="student-field">
                        <span className="field-label">Roll Number</span>
                        <span className="field-value">
                          {student.rollNumber}
                        </span>
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="student-actions">
                        <button
                          type="button"
                          className="btn-edit"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn-delete"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )
          )}
        </div>

        {isAdmin && (
          <form
            className="student-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <h2>
              {editingStudentId !== null
                ? 'Edit Student'
                : 'Register New Student'}
            </h2>

            <div className="form-field">
              <label htmlFor="name">Name</label>

              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              {errors.name && (
                <span className="error-text">{errors.name}</span>
              )}
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

              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
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

              {errors.department && (
                <span className="error-text">{errors.department}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="rollNumber">Roll Number</label>

              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
              />

              {errors.rollNumber && (
                <span className="error-text">{errors.rollNumber}</span>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" disabled={submitting}>
                {submitting
                  ? 'Saving...'
                  : editingStudentId !== null
                    ? 'Update Student'
                    : 'Register Student'}
              </button>

              {editingStudentId !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={submitting}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default StudentsPage;
import { useState, useEffect, useMemo } from 'react';
import { validateStudentForm } from '../../utils/validators';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../../services/student.service';
import { useAuth } from '../../context/useAuth';
import { useToast } from '../../context/useToast';
import './StudentsPage.css';

const BADGE_TONES = ['badge-primary', 'badge-success', 'badge-neutral'];

function getInitials(name) {
  if (!name) return '?';
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function toneForDepartment(department) {
  let hash = 0;
  for (let i = 0; i < department.length; i += 1) {
    hash = (hash + department.charCodeAt(i)) % BADGE_TONES.length;
  }
  return BADGE_TONES[hash];
}

function StudentsPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const isAdmin = user?.role === 'ADMIN';
  const canRegister = isAdmin || user?.role === 'TEACHER';

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredStudents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return students;

    return students.filter((student) =>
      [student.name, student.email, student.department, student.rollNumber]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }, [students, searchTerm]);

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

    try {
      await deleteStudent(studentId);

      setStudents((prev) =>
        prev.filter((student) => student.id !== studentId)
      );

      if (editingStudentId === studentId) {
        resetForm();
      }

      showToast('Student deleted.', 'success');
    } catch (error) {
      showToast(error.message, 'error');
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

      showToast(
        editingStudentId !== null ? 'Student updated.' : 'Student registered.',
        'success'
      );

      resetForm();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="students-page container">
      <div className="students-page-header">
        <div>
          <h1>Students</h1>
          <p className="students-page-subtitle">
            Browse and search every registered student
            {canRegister ? ', or register a new one.' : '.'}
          </p>
        </div>

        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="m20 20-3.8-3.8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            placeholder="Search by name, email, roll number..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search students"
          />
        </div>
      </div>

      <div className="students-page-grid">
        <div className="students-list card">
          <div className="students-list-header">
            <h2>Registered Students</h2>
            <span className="badge badge-primary">
              {filteredStudents.length}
            </span>
          </div>

          {loading && (
            <div className="state-message">
              <span className="spinner spinner-dark" aria-hidden="true" />
              <p>Loading students...</p>
            </div>
          )}

          {!loading && fetchError && (
            <p className="error-text" role="alert">
              {fetchError}
            </p>
          )}

          {!loading && !fetchError && filteredStudents.length === 0 ? (
            <div className="state-message">
              <p>
                {students.length === 0
                  ? 'No students registered yet.'
                  : 'No students match your search.'}
              </p>
            </div>
          ) : (
            !loading &&
            !fetchError && (
              <ul>
                {filteredStudents.map((student) => (
                  <li key={student.id} className="student-card">
                    <div className="student-card-header">
                      <span className="student-avatar" aria-hidden="true">
                        {getInitials(student.name)}
                      </span>

                      <div>
                        <h3 className="student-name">{student.name}</h3>
                        <p className="student-email">{student.email}</p>
                      </div>
                    </div>

                    <div className="student-card-body">
                      <div className="student-field">
                        <span className="field-label">Department</span>
                        <span
                          className={`badge ${toneForDepartment(student.department)}`}
                        >
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
                          className="btn btn-outline btn-sm"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger-outline btn-sm"
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

        {canRegister && (
          <form
            className="student-form card"
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting && <span className="spinner" aria-hidden="true" />}
                {submitting
                  ? 'Saving...'
                  : editingStudentId !== null
                    ? 'Update Student'
                    : 'Register Student'}
              </button>

              {editingStudentId !== null && (
                <button
                  type="button"
                  className="btn btn-ghost"
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

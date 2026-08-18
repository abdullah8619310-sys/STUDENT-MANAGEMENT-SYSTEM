import { useState, useEffect } from 'react';
import { validateCourseForm } from '../../utils/validators';
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollStudent,
  dropStudent,
} from '../../services/course.service';
import { getStudents } from '../../services/student.service';
import { useAuth } from '../../context/useAuth';
import { useToast } from '../../context/useToast';
import './CoursesPage.css';

function getInitials(name) {
  if (!name) return '?';
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function CoursesPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const isAdmin = user?.role === 'ADMIN';
  const canManageCourses = isAdmin || user?.role === 'TEACHER';

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const [editingCourseId, setEditingCourseId] = useState(null);
  const [formData, setFormData] = useState({ name: '', code: '', description: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [enrollSelection, setEnrollSelection] = useState({});
  const [busyCourseId, setBusyCourseId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setFetchError('');

      try {
        const coursesData = await getCourses();
        setCourses(coursesData);

        if (canManageCourses) {
          const studentsData = await getStudents();
          setStudents(studentsData);
        }
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [canManageCourses]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setFormData({ name: '', code: '', description: '' });
    setFormErrors({});
    setEditingCourseId(null);
  }

  function handleEdit(course) {
    setEditingCourseId(course.id);
    setFormData({
      name: course.name,
      code: course.code,
      description: course.description || '',
    });
    setFormErrors({});
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateCourseForm(formData);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      code: formData.code.trim(),
      description: formData.description.trim(),
    };

    try {
      if (editingCourseId !== null) {
        const updated = await updateCourse(editingCourseId, payload);
        setCourses((prev) =>
          prev.map((course) => (course.id === editingCourseId ? updated : course))
        );
        showToast('Course updated.', 'success');
      } else {
        const created = await createCourse(payload);
        setCourses((prev) => [...prev, created]);
        showToast('Course created.', 'success');
      }

      resetForm();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteCourse(courseId) {
    const confirmed = window.confirm(
      'Are you sure you want to remove this course? Enrolled students will be dropped.'
    );

    if (!confirmed) return;

    try {
      await deleteCourse(courseId);
      setCourses((prev) => prev.filter((course) => course.id !== courseId));

      if (editingCourseId === courseId) {
        resetForm();
      }

      showToast('Course removed.', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  async function handleEnroll(courseId) {
    const studentId = Number(enrollSelection[courseId]);

    if (!studentId) {
      showToast('Choose a student to enroll first.', 'error');
      return;
    }

    setBusyCourseId(courseId);

    try {
      const updated = await enrollStudent(courseId, studentId);
      setCourses((prev) =>
        prev.map((course) => (course.id === courseId ? updated : course))
      );
      setEnrollSelection((prev) => ({ ...prev, [courseId]: '' }));
      showToast('Student enrolled.', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setBusyCourseId(null);
    }
  }

  async function handleDrop(courseId, studentId, studentName) {
    const confirmed = window.confirm(`Drop ${studentName} from this course?`);
    if (!confirmed) return;

    setBusyCourseId(courseId);

    try {
      const updated = await dropStudent(courseId, studentId);
      setCourses((prev) =>
        prev.map((course) => (course.id === courseId ? updated : course))
      );
      showToast('Student dropped from course.', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setBusyCourseId(null);
    }
  }

  return (
    <section className="courses-page container">
      <div className="courses-page-header">
        <div>
          <h1>Courses</h1>
          <p className="courses-page-subtitle">
            {canManageCourses
              ? 'Create courses and manage who is enrolled.'
              : 'Browse the courses currently offered.'}
          </p>
        </div>
      </div>

      <div className="courses-page-grid">
        <div className="courses-list-wrap">
          {loading && (
            <div className="state-message card">
              <span className="spinner spinner-dark" aria-hidden="true" />
              <p>Loading courses...</p>
            </div>
          )}

          {!loading && fetchError && (
            <p className="error-text card" role="alert">
              {fetchError}
            </p>
          )}

          {!loading && !fetchError && courses.length === 0 && (
            <div className="state-message card">
              <p>No courses have been added yet.</p>
            </div>
          )}

          {!loading &&
            !fetchError &&
            courses.map((course) => {
              const enrolledIds = new Set(course.students.map((s) => s.id));
              const availableStudents = students.filter(
                (s) => !enrolledIds.has(s.id)
              );

              return (
                <div className="course-card card card-interactive" key={course.id}>
                  <div className="course-card-header">
                    <div>
                      <h3 className="course-name">{course.name}</h3>
                      {course.description && (
                        <p className="course-description">{course.description}</p>
                      )}
                    </div>
                    <span className="badge badge-warning">{course.code}</span>
                  </div>

                  <div className="course-roster">
                    <div className="course-roster-header">
                      <span className="field-label">
                        Enrolled ({course.students.length})
                      </span>
                    </div>

                    {course.students.length === 0 ? (
                      <p className="course-roster-empty">No students enrolled yet.</p>
                    ) : (
                      <ul className="course-roster-list">
                        {course.students.map((student) => (
                          <li key={student.id} className="course-roster-item">
                            <span className="student-avatar student-avatar-sm" aria-hidden="true">
                              {getInitials(student.name)}
                            </span>
                            <span className="course-roster-name">{student.name}</span>
                            {canManageCourses && (
                              <button
                                type="button"
                                className="btn btn-danger-outline btn-sm"
                                disabled={busyCourseId === course.id}
                                onClick={() =>
                                  handleDrop(course.id, student.id, student.name)
                                }
                              >
                                Drop
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {canManageCourses && (
                    <div className="course-actions">
                      {availableStudents.length > 0 && (
                        <div className="enroll-control">
                          <select
                            value={enrollSelection[course.id] || ''}
                            onChange={(event) =>
                              setEnrollSelection((prev) => ({
                                ...prev,
                                [course.id]: event.target.value,
                              }))
                            }
                            aria-label={`Enroll a student in ${course.name}`}
                          >
                            <option value="">Enroll a student...</option>
                            {availableStudents.map((student) => (
                              <option key={student.id} value={student.id}>
                                {student.name} ({student.rollNumber})
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            disabled={busyCourseId === course.id}
                            onClick={() => handleEnroll(course.id)}
                          >
                            Enroll
                          </button>
                        </div>
                      )}

                      <div className="course-actions-row">
                        {isAdmin && (
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleEdit(course)}
                          >
                            Edit
                          </button>
                        )}

                        <button
                          type="button"
                          className="btn btn-danger-outline btn-sm"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          Remove Course
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {canManageCourses && (
          <form className="course-form card" onSubmit={handleSubmit} noValidate>
            <h2>{editingCourseId !== null ? 'Edit Course' : 'Add New Course'}</h2>

            <div className="form-field">
              <label htmlFor="name">Course Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && <span className="error-text">{formErrors.name}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="code">Course Code</label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
              />
              {formErrors.code && <span className="error-text">{formErrors.code}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting && <span className="spinner" aria-hidden="true" />}
                {submitting
                  ? 'Saving...'
                  : editingCourseId !== null
                    ? 'Update Course'
                    : 'Add Course'}
              </button>

              {editingCourseId !== null && (
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

export default CoursesPage;

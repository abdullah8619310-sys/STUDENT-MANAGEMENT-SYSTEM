import './AboutPage.css';

const STACK = [
  'React 19',
  'Vite',
  'React Router',
  'Express 5',
  'Prisma 7',
  'PostgreSQL',
  'JWT',
  'Zod',
];

const ROLES = [
  {
    name: 'ADMIN',
    tone: 'badge-primary',
    permissions: [
      'View all students and courses',
      'Register, edit, and delete students',
      'Create, edit, and remove courses',
      'Enroll and drop students from courses',
    ],
  },
  {
    name: 'TEACHER',
    tone: 'badge-warning',
    permissions: [
      'View all students and courses',
      'Register new students',
      'Create and remove courses',
      'Enroll and drop students from courses',
    ],
  },
  {
    name: 'STUDENT',
    tone: 'badge-neutral',
    permissions: ['View all students', 'View courses'],
  },
];

function AboutPage() {
  return (
    <div className="about-page container">
      <header className="about-header">
        <h1>About This Project</h1>
        <p>
          A full-stack application: a React + Vite single-page frontend
          backed by an Express REST API with a PostgreSQL database via
          Prisma. Access is protected by JWT authentication, with
          role-based authorization distinguishing what admins, teachers, and
          students can do across both student records and courses.
        </p>
      </header>

      <section className="about-section card">
        <h2>Tech Stack</h2>
        <div className="stack-list">
          {STACK.map((tech) => (
            <span className="badge badge-primary" key={tech}>
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>Roles &amp; Permissions</h2>
        <div className="roles-grid">
          {ROLES.map((role) => (
            <div className="role-card card card-interactive" key={role.name}>
              <span className={`badge ${role.tone}`}>{role.name}</span>
              <ul>
                {role.permissions.map((permission) => (
                  <li key={permission}>{permission}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;

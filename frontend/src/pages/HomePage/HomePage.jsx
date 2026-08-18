import { Link } from 'react-router-dom';
import './HomePage.css';

const FEATURES = [
  {
    title: 'Role-Based Access',
    description:
      'Admins manage the full student roster while teachers get read access — enforced on both the UI and the API.',
    icon: (
      <path d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3Zm0 2.2 6 2.25V11c0 4-2.7 6.9-6 7.94C8.7 17.94 6 15.04 6 11V6.45l6-2.25Z" />
    ),
  },
  {
    title: 'Secure JWT Auth',
    description:
      'Passwords hashed with bcrypt, sessions backed by short-lived JWTs, and protected routes on the frontend.',
    icon: (
      <path d="M12 1 4 4v6c0 5.5 3.4 10.3 8 11.9 4.6-1.6 8-6.4 8-11.9V4l-8-3Zm-1.2 14.3-3.1-3.1 1.4-1.4 1.7 1.7 4.3-4.3 1.4 1.4-5.7 5.7Z" />
    ),
  },
  {
    title: 'Real CRUD, Real Database',
    description:
      'Every student record is created, edited, and deleted through a validated Express + Prisma API on PostgreSQL.',
    icon: (
      <path d="M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3Zm0 3.2c1.62 1.1 4.6 1.8 8 1.8s6.38-.7 8-1.8V12c0 1.66-3.58 3-8 3s-8-1.34-8-3V9.2Zm0 6c1.62 1.1 4.6 1.8 8 1.8s6.38-.7 8-1.8V18c0 1.66-3.58 3-8 3s-8-1.34-8-3v-2.8Z" />
    ),
  },
];

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-inner container">
          <span className="badge badge-primary hero-eyebrow">
            Arbisoft AI Internship 2026 &middot; Phase 1
          </span>
          <h1>Manage your students, effortlessly.</h1>
          <p>
            A full-stack Student Management System with role-based
            authentication, live PostgreSQL data, and a clean CRUD workflow
            for admins and teachers alike.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/about" className="btn btn-ghost hero-ghost">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <section className="container features">
        <div className="features-grid">
          {FEATURES.map((feature) => (
            <div className="feature-card card" key={feature.title}>
              <span className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {feature.icon}
                </svg>
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;

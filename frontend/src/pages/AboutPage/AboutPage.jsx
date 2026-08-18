function AboutPage() {
  return (
    <section className="about-page">
      <h1>About This Project</h1>
      <p>
        The Student Management System is a full-stack application: a React +
        Vite single-page frontend backed by an Express REST API with a
        PostgreSQL database via Prisma. Access is protected by JWT
        authentication, with role-based authorization distinguishing ADMIN
        and TEACHER accounts — only admins can register, edit, or delete
        students.
      </p>
    </section>
  );
}

export default AboutPage;

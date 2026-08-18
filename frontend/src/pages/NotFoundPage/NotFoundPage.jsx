import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <span className="not-found-code">404</span>
      <h1>Page not found</h1>
      <p>The page you&rsquo;re looking for doesn&rsquo;t exist or was moved.</p>
      <Link to="/" className="btn btn-primary">
        Go back home
      </Link>
    </section>
  );
}

export default NotFoundPage;

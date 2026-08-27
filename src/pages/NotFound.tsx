import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-page py-20 lg:py-32 text-center">
      <p className="font-display text-7xl font-bold text-saffron-300">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-charcoal-900">Page Not Found</h1>
      <p className="mt-3 text-charcoal-700/70">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary mt-6">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
}

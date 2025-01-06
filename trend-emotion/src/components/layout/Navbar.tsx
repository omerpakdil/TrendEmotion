import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Navbar = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">TrendEmotion</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/watchlist" className="nav-link">
              Watchlist
            </Link>
            <Link to="/analysis" className="nav-link">
              Analysis
            </Link>
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-base font-medium nav-link"
            >
              Dashboard
            </Link>
            <Link
              to="/watchlist"
              className="block px-3 py-2 text-base font-medium nav-link"
            >
              Watchlist
            </Link>
            <Link
              to="/analysis"
              className="block px-3 py-2 text-base font-medium nav-link"
            >
              Analysis
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-base font-medium btn-primary mx-3"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}; 
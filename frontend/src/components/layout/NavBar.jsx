import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProviders";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isAuthenticated, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/connexion");
  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo simple et cohérent */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                MySocialApp
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  location.pathname === "/"
                    ? "bg-slate-800 text-purple-400"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                Accueil
              </Link>
              {!isAuthenticated && (
                <>
                  <Link
                    to="/connexion"
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      location.pathname === "/connexion"
                        ? "bg-slate-800 text-purple-400"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/inscription"
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      location.pathname === "/inscription"
                        ? "bg-slate-800 text-purple-400"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* User Section */}
          {isAuthenticated && (
            <div className="flex items-center gap-3">
              {currentUser && (
                <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-lg">
                  <img
                    src={currentUser.image_url || "/default-avatar.png"}
                    alt={currentUser.username}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-500/50"
                  />
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-white">
                      {currentUser.username}
                    </p>
                    <p className="text-xs text-slate-400">En ligne</p>
                  </div>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-lg font-medium text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

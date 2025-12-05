import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProviders";
import { useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/connexion");
  }

  return (
    <nav className="fixed w-screen top-0 z-50 bg-slate-900 border-b border-slate-700/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <h1 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                MySocialApp
              </h1>
            </Link>
          </div>

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
            {isAuthenticated && (
              <Link
                to="posts/add"
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  location.pathname === "/posts/add"
                    ? "bg-slate-800 text-purple-400"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                Faire un Post
              </Link>
            )}

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

          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-3">
              {currentUser && (
                <Link
                  to="/profile"
                  className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-lg"
                >
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
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-lg font-medium text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Déconnexion
              </button>
            </div>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu mobile"
            className="md:hidden text-white text-3xl transition-transform active:scale-90"
          >
            <i
              className={menuOpen ? "ri-close-large-line" : "ri-menu-line"}
            ></i>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700/50 shadow-xl animate-fadeIn">
          <div className="flex flex-col p-4 gap-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                location.pathname === "/"
                  ? "bg-slate-700 text-purple-400"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              Accueil
            </Link>

            {!isAuthenticated && (
              <>
                <Link
                  to="/connexion"
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === "/connexion"
                      ? "bg-slate-700 text-purple-400"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  Connexion
                </Link>

                <Link
                  to="/inscription"
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === "/inscription"
                      ? "bg-slate-700 text-purple-400"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  Inscription
                </Link>
              </>
            )}

            {isAuthenticated && (
              <>
              <Link
              to="/posts/add"
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                location.pathname === "/posts/add"
                  ? "bg-slate-700 text-purple-400"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              Faire un Post
            </Link>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 bg-slate-700 px-4 py-3 rounded-lg"
                >
                  <img
                    src={currentUser.image_url || "/default-avatar.png"}
                    alt={currentUser.username}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-400/50"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {currentUser.username}
                    </p>
                    <p className="text-xs text-slate-300">En ligne</p>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="px-4 py-3 bg-red-600 text-white rounded-lg font-medium text-sm hover:bg-red-700 transition"
                >
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

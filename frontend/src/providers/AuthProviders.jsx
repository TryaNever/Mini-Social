import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/commun/Loader";

const AuthContext = createContext();
const apiUrl = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("JWT"));

  useEffect(() => {
    async function validateToken() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${apiUrl}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Erreur API : ${res.status}`);

        const data = await res.json();
        console.log("Utilisateur connecté :", data.user);
        setCurrentUser(data.user);
      } catch (error) {
        console.error("Erreur de récupération de l'utilisateur :", error);
        localStorage.removeItem("JWT");
        setToken(null);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    }

    validateToken();
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("JWT", token);
    } else {
      localStorage.removeItem("JWT");
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("JWT");
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    setToken,
    logout,
  };

  if (loading) {
    return (
      <AuthContext.Provider value={value}>
        <Loader />
      </AuthContext.Provider>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/commun/Loader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("JWT"));
  useEffect(() => {
    async function validatToken() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error(`Erreur API : ${res.status}`);
        }
        const data = await res.json();
        console.log("Utilisateur connecté :", data.user);
        setCurrentUser(data.user);
      } catch (error) {
        console.error("Erreur de récupération de l'utilisateur :", error);
        localStorage.removeItem("JWT");
      } finally {
        setLoading(false);
      }
    }

    validatToken();
  }, [token]);

  const value = {
    currentUser,
    isAuthenticated: currentUser ? true : false,
    loading,
    setToken,
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProviders";
import { InputField } from "../components/commun/inputField";
import { ErrorMessage } from "../components/commun/ErrorMessage";

const apiUrl = import.meta.env.VITE_API_URL;

export const Profile = () => {
  const { currentUser, setToken } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(currentUser);
  const [formData, setFormData] = useState({
    username: user.username,
    image_url: user.image_url || "",
  });
  const [displayError, setDisplayError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(true);

  const formattedDate = new Date(user.created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Validation simple : username non vide
  const validateUsername = (username) => {
    if (!username.trim()) return "Le pseudo ne peut pas être vide";
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const errorMessage = name === "username" ? validateUsername(value) : null;
    setDisplayError(errorMessage);
    setIsFormValid(!errorMessage);
  };

  const handleOnSubmitForm = async (e) => {
    e.preventDefault();
    setDisplayError(null);

    try {
      const response = await fetch(`${apiUrl}/api/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 400)
        throw new Error("Tous les champs sont requis");
      if (response.status === 401) throw new Error("Token invalide ou expiré");
      if (response.status === 409)
        throw new Error("Nom d'utilisateur déjà pris");
      if (response.status === 500)
        throw new Error("Erreur serveur, veuillez réessayer");

      const data = await response.json();

      // Mettre à jour le state local et le token si nécessaire
      setUser(data.user);
      if (data.token) {
        localStorage.setItem("JWT", data.token);
        setToken(data.token);
      }

      // Message de succès
      setDisplayError("Profil mis à jour avec succès !");
    } catch (error) {
      setDisplayError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full text-center">
        <img
          src={user.image_url}
          alt={user.username}
          className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-500"
        />
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          {user.username}
        </h2>
        <p className="mt-2 text-gray-500">{user.email}</p>
        <p className="mt-2 text-gray-400 text-sm">
          Membre depuis {formattedDate}
        </p>
        <p className="mt-2 text-gray-600 text-sm">ID: {user.id}</p>

        <form
          className="mt-6 text-left space-y-4"
          onSubmit={handleOnSubmitForm}
        >
          <InputField
            label="Nom d'utilisateur"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            validationError={displayError}
          />

          <InputField
            label="URL de l'image de profil"
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 disabled:bg-blue-300 disabled:cursor-default"
          >
            Mettre à jour
          </button>

          {displayError && <ErrorMessage displayError={displayError} />}
        </form>
      </div>
    </div>
  );
};

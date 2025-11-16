import { useState } from "react";
import { useAuth } from "../providers/AuthProviders";
import { InputField } from "../components/commun/inputField";
import { ErrorMessage } from "../components/commun/ErrorMessage";
import { PpChooseModal } from "../components/modals/PpChooseModal";

const apiUrl = import.meta.env.VITE_API_URL;

export const Profile = () => {
  const { currentUser, setRefresh, refresh } = useAuth();

  const [user, setUser] = useState(currentUser);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    image_url: currentUser?.image_url || "",
  });

  const [errors, setErrors] = useState([]);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkImageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const validateUsername = (username) => {
    const messages = [];
    if (!username.trim()) messages.push("Le champ ne peut pas être vide");
    if (username.length < 6 || username.length > 16)
      messages.push("Le nom d'utilisateur doit être entre 6 et 16 caractères");
    return messages;
  };

  const validateImageUrl = async (url) => {
    const isValid = await checkImageExists(url);

    setErrors((prev) => {
      let updated = prev.filter((msg) => msg !== "L'image n'affiche rien");

      if (!isValid) updated.push("L'image n'affiche rien");

      setIsFormValid(updated.length === 0);
      return updated;
    });
  };

  const handleModalImageSelect = (newUrl) => {
    setFormData((prev) => ({ ...prev, image_url: newUrl }));
    validateImageUrl(newUrl);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "username") {
      const usernameErrors = validateUsername(value);
      setErrors(usernameErrors);
      setIsFormValid(usernameErrors.length === 0);
    }

    if (name === "image_url") {
      validateImageUrl(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameErrors = validateUsername(formData.username);
    if (usernameErrors.length > 0) {
      setErrors(usernameErrors);
      setIsFormValid(false);
      return;
    }

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
      setUser(data.user);
      setRefresh(!refresh);

      setErrors(["Profil mis à jour avec succès !"]);
      setIsFormValid(true);
    } catch (err) {
      setErrors([err.message]);
      setIsFormValid(false);
    }
  };

  const formattedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

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

        <form className="mt-6 text-left space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Nom d'utilisateur"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleFieldChange}
          />

          <div className="flex justify-between items-end gap-2 w-full">
            <InputField
              label="URL de l'image de profil"
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleFieldChange}
            />

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm"
            >
              Choisir
            </button>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 disabled:bg-blue-300 disabled:cursor-default"
          >
            Mettre à jour
          </button>

          {errors.map((err, i) => (
            <ErrorMessage
              key={i}
              displayError={err}
              valid={err === "Profil mis à jour avec succès !"}
            />
          ))}
        </form>
      </div>

      <PpChooseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setNewUrl={handleModalImageSelect}
      />
    </div>
  );
};

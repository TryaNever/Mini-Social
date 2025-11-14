import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../components/commun/ErrorMessage";
import { useAuth } from "../providers/AuthProviders";
import { InputField } from "../components/commun/inputField";

const apiUrl = import.meta.env.VITE_API_URL;

export const Login = () => {
  const [displayError, setDisplayError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState({});
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const validateEmail = (email) => {
    if (!email) return "L’email est requis";
    const regex = /^\s*(?!.*[._-]{2})[\w.-]+@([\w-])+\.+[\w-]{2,24}\s*$/;
    if (!regex.test(email)) return "Le format de l'email est incorrect";
    return null;
  };

  const validatePassword = (password) => {
    if (!password.trim()) return "Le champ ne peut pas être vide";
    if (password.length < 12 || password.length > 20)
      return "Le mot de passe doit être entre 12 et 20 caractères";
    return null;
  };

  function handleOnChangeInput(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let errorMessage = "";
    if (name === "email") errorMessage = validateEmail(value);
    if (name === "password") errorMessage = validatePassword(value);

    setValidationError((prev) => ({ ...prev, [name]: errorMessage }));

    const isValid =
      !validateEmail(name === "email" ? value : formData.email) &&
      !validatePassword(name === "password" ? value : formData.password);

    setIsFormValid(isValid);
  }

  async function handleOnSubmitForm(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.status === 401)
        throw new Error("Le mail ou le mot de passe est incorrect");
      if (response.status === 400)
        throw new Error("Tous les champs sont requis");
      if (response.status === 500)
        throw new Error("Erreur serveur, veuillez réessayer");

      const { token } = await response.json();

      localStorage.setItem("JWT", token);
      setToken(token);

      navigate("/");
    } catch (error) {
      setDisplayError(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-md space-y-6"
        onSubmit={handleOnSubmitForm}
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Connexion
        </h2>

        <InputField
          label="Adresse Mail"
          type="text"
          name="email"
          onchange={handleOnChangeInput}
          validationError={validationError.email}
          placeholder="votre@mail.com"
        />

        <InputField
          label="Votre mot de passe"
          type="password"
          name="password"
          onchange={handleOnChangeInput}
          validationError={validationError.password}
        />

        <div className="flex justify-center">
          <input
            disabled={!isFormValid}
            type="submit"
            value="Connexion"
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-150 cursor-pointer disabled:bg-blue-300 disabled:cursor-default"
          />
        </div>

        {displayError && <ErrorMessage displayError={displayError} />}
      </form>
    </div>
  );
};

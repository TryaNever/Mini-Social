/* eslint-env vitest */
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";

import { Navbar } from "./NavBar";

vi.mock("../../providers/AuthProviders", () => ({
  useAuth: () => ({
    currentUser: {
      id: 21,
      username: "lukass",
      email: "a@a.aa",
      image_url: "https://i.pravatar.cc/150",
      created_at: "2025-11-20T14:55:04.000Z",
    },
    isAuthenticated: true,
    logout: () => localStorage.removeItem("JWT"), // simulate logout
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: "/" }),
  };
});

describe("NavBar logout", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
  });

  test("La navbar s'affiche bien", () => {
    expect(screen.getByText("Accueil")).toBeInTheDocument();
  });

  test("supprime le JWT du localStorage au clic sur Déconnexion", async () => {
    const removeItemMock = vi.spyOn(Storage.prototype, "removeItem");

    await userEvent.setup().click(screen.getByText("Déconnexion"));

    expect(removeItemMock).toHaveBeenCalledWith("JWT");

    removeItemMock.mockRestore();
  });
});

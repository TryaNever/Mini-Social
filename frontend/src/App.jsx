import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SinIn } from "./pages/SinIn";
import { Navbar } from "./components/layout/NavBar";
import { PostDetails } from "./pages/PostDetails";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { AuthProvider } from "./providers/AuthProviders";
import { Profile } from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="connexion" element={<Login />} />
          <Route path="inscription" element={<SinIn />} />

          <Route
            path="posts/:id"
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

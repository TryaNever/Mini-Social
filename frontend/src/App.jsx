import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/layout/NavBar";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { AuthProvider } from "./providers/AuthProviders";
import React, { Suspense } from "react";
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const SinIn = React.lazy(() => import("./pages/SinIn"));
const PostDetails = React.lazy(() => import("./pages/PostDetails"));


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Suspense fallback={<p>Chargement…</p>}>
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

         
 
        </Suspense>

      </AuthProvider>
    </BrowserRouter>
  );
}

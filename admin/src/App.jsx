// App.jsx
import React from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import { useUser } from "@clerk/react";
import DashboardPage from "./pages/DashboardPage";

function RequireAuth({ children }) {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-gray-600">Loading…</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen font-mono flex items-center justify-center
       bg-linear-to-b from-purple-50 via-white to-purple-100 px-4">
        <div className="text-center">
          <p className="text-emerald-800 font-semibold text-lg sm:text-2xl mb-4
           animate-fade-in">
            Please sign in to view this page
          </p>

          <div className="flex justify-center">
            <Link
              to="/"
              state={{ from: location }}
              className="px-4 py-2 text-sm rounded-full bg-purple-600 text-white shadow-sm
                         hover:bg-purple-700 hover:shadow-md
                         transition-all duration-300 ease-in-out
                         animate-bounce-subtle"
            >
              HOME
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return children;
}

const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />

      {/* Protected */}
      <Route
        path="/list"
        element={
          <RequireAuth>
            <List />
          </RequireAuth>
        }
      />

      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default App;
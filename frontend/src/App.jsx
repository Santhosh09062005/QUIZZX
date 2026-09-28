import { useAuth } from "@clerk/react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Show } from "@clerk/react";
import Home from "./pages/Home";
import MyResult from "./pages/MyResult";

export default function App() {
  const { isLoaded } = useAuth();
  if (!isLoaded) return null;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/result"
        element={
          <>
            <Show when="signed-in">
              <MyResult />
            </Show>

            <Show when="signed-out">
              <Navigate to="/" />
            </Show>
          </>
        }
      />
    </Routes>
  );
}

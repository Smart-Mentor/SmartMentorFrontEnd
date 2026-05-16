import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");
  const verificationToken = localStorage.getItem("verificationToken");

  if (!token) return <Navigate to="/login" replace />;

  if (verificationToken && !token) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
}
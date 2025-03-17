import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Prevents redirection before checking auth state

  return currentUser ? children : <Navigate to="/login" />;
}
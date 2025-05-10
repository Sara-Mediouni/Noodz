import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token); // adapte selon ton reducer
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  useEffect(() => {
    if (!token) {
      setIsRedirecting(true); // Afficher l'état de redirection
      setTimeout(() => {
        setIsRedirecting(false); // Après un délai, redirige
      }, 2000); // Délai de 2 secondes pour afficher le message
    }
  }, [token]);

 

  if (!token) {
    return <Navigate to="/" replace />; // Redirection vers la page de login/home
  }

  return children;
};

export default ProtectedRoute;

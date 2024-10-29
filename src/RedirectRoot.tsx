import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

interface RedirectRootProps {}

const RedirectRoot: React.FC<RedirectRootProps> = ({}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  console.log("🚀 ~ isAuthenticated:", isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return null; // No renderiza nada, solo redirige
};
export { RedirectRoot };

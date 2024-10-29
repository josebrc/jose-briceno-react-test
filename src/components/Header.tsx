import React from "react";
import { useAuth } from "../hooks/useAuth";
import { GoPersonFill, GoSignOut } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/user")} type="button">
        <GoPersonFill />
      </button>
      <div>Bienvenido {user?.fullName}</div>
      <Link to="/products">Productos</Link>
      <button onClick={logout} type="button">
        <GoSignOut />
      </button>
    </div>
  );
};
export { Header };

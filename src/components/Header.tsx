import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { GoPerson, GoRocket, GoSignOut } from "react-icons/go";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="flex justify-between w-100 mb">
        <div className="flex justify-center align-center">
          <button onClick={() => navigate("/user")} type="button">
            <GoPerson size={40} />
          </button>
          <div className="title">Bienvenido, {user?.fullName}</div>
        </div>
        <button onClick={logout} type="button">
          <GoSignOut size={40} />
        </button>
      </div>
      <div className="w-100">
        <Link to="/products">
          Productos <GoRocket size={16} />{" "}
        </Link>
      </div>
    </div>
  );
};
export { Header };

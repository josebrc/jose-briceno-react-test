import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { GoPerson, GoRocket, GoSignOut } from "react-icons/go";
import { Modal } from "./Modal";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  return (
    <div className="header">
      <div className="flex justify-between w-100 mb">
        <div className="title">Bienvenido, {user?.fullName}</div>
        <div className="flex align-center w-100 space">
          <button onClick={() => navigate("/user")} type="button">
            Editar
            <GoPerson size={20} />
          </button>
          <button onClick={handleOpen} type="button">
            <GoSignOut size={20} />
          </button>
        </div>
      </div>
      <div className="w-100">
        <Link to="/products">
          Productos <GoRocket size={16} />{" "}
        </Link>
      </div>
      {/* Modal de confirmación de logout */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>¿Estás seguro de que deseas cerrar sesión?</h2>
        <div className="modal-actions">
          <button
            onClick={() => {
              logout();
              handleClose();
            }}
            className="button-alt"
          >
            Sí, cerrar sesión
          </button>
          <button onClick={() => setIsModalOpen(false)} className="button">
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};
export { Header };

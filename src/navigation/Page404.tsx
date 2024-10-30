import React from "react";
import { Link } from "react-router-dom";

interface Page404Props {}

const Page404: React.FC<Page404Props> = ({}) => {
  return (
    <div className="page-404">
      <div>
        <h1>404</h1>
      </div>
      <div>
        <h2>Página no encontrada</h2>
      </div>

      <div className="cursor-pointer">
        <Link to="/">Ir a la página de inicio</Link>
      </div>
    </div>
  );
};
export { Page404 };

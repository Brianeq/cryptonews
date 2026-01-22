import Style from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuMovil, SetMenuMovil] = useState(false);

  const CambioMenuMovil = () => {
    SetMenuMovil(!menuMovil);
  };

  // clase para los links activos
  const linkClass = ({ isActive }) =>
    isActive ? `${Style.NavLink} ${Style.active}` : Style.NavLink;

  return (
    <div className={Style.NavBar}>
      <NavLink to="/" className={Style.Brand}>
        <img src="/logo.png" alt="Logo del sitio" />
      </NavLink>

      <button
        onClick={CambioMenuMovil}
        className={Style.IconMenuMovil}
        aria-label="Abrir menú"
      >
        {menuMovil ? (
          <FontAwesomeIcon icon={faTimes} size="2x" />
        ) : (
          <FontAwesomeIcon icon={faBars} size="2x" />
        )}
      </button>

      <nav className={menuMovil ? Style.NavBar_items_Open : Style.NavBar_items}>
        <NavLink to="/" className={linkClass} onClick={() => SetMenuMovil(false)}>
          Inicio
        </NavLink>
        <NavLink
          to="/noticias"
          className={linkClass}
          onClick={() => SetMenuMovil(false)}
        >
          Noticias
        </NavLink>
        <NavLink
          to="/mercado"
          className={linkClass}
          onClick={() => SetMenuMovil(false)}
        >
          Mercado
        </NavLink>
        <NavLink
          to="/formacion"
          className={linkClass}
          onClick={() => SetMenuMovil(false)}
        >
          Formación
        </NavLink>
        <NavLink
          to="/contacto"
          className={linkClass}
          onClick={() => SetMenuMovil(false)}
        >
          Contacto
        </NavLink>
        <NavLink
          to="/sobre-nosotros"
          className={linkClass}
          onClick={() => SetMenuMovil(false)}
        >
          Sobre Nosotros
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;

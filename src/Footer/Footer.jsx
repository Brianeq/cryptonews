import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 px-4 md:px-16 lg:px-28 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
        {/* Sección About Us */}
        <div>
          <h2 className="text-lg font-bold mb-4">Sobre nosotros</h2>
          <p className="text-gray-300">
            Somos un equipo dedicado a brindar la mejor información y servicios sobre el mundo de las criptomonedas a nuestros usuarios.
          </p>
        </div>

        {/* Sección Quick Links */}
        <div>
          <h2 className="text-lg font-bold mb-4">Enlaces rápidos</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline text-gray-300">Inicio</Link></li>
            <li><Link to="/noticias" className="hover:underline text-gray-300">Noticias</Link></li>
            <li><Link to="/mercado" className="hover:underline text-gray-300">Mercado</Link></li>
            <li><Link to="/formacion" className="hover:underline text-gray-300">Formación</Link></li>
            <li><Link to="/contacto" className="hover:underline text-gray-300">Contacto</Link></li>
            <li><Link to="/sobre-nosotros" className="hover:underline text-gray-300">Sobre Nosotros</Link></li>
          </ul>
        </div>

        {/* Sección Follow Us */}
        <div>
          <h2 className="text-lg font-bold mb-4">Siguenos</h2>
          <ul className="flex space-x-6 items-center">
            <li>
              <a href="https://www.facebook.com" target="_blank" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <FaFacebookF className="text-blue-500" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="https://www.x.com" target="_blank" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <FaTwitter className="text-sky-500" />
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <FaInstagram className="text-orange-500" />
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-700 p-4 text-center text-gray-400 text-sm">
        <p>© 2025 CryptoNews. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

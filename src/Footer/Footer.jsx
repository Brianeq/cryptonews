import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 px-4 md:px-16 lg:px-28 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
        {/* Sección About Us */}
        <div>
          <h2 className="text-lg font-bold mb-4">About Us</h2>
          <p className="text-gray-300">
            We are a team dedicated to providing the best products and services
            to our customers.
          </p>
        </div>

        {/* Sección Quick Links */}
        <div>
          <h2 className="text-lg font-bold mb-4">Quick Links</h2>
          <ul>
            <li><a href="#" className="hover:underline text-gray-300">Inicio</a></li>
            <li><a href="#" className="hover:underline text-gray-300">Noticias</a></li>
            <li><a href="#" className="hover:underline text-gray-300">Mercado</a></li>
            <li><a href="#" className="hover:underline text-gray-300">Formacion</a></li>
            <li><a href="#" className="hover:underline text-gray-300">Contacto</a></li>
            <li><a href="#" className="hover:underline text-gray-300">Sobre Nostros</a></li>
          </ul>
        </div>

        {/* Sección Follow Us */}
        <div>
          <h2 className="text-lg font-bold mb-4">Follow Us</h2>
          <ul className="flex space-x-6 items-center">
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <FaFacebookF className="text-blue-500" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <FaTwitter className="text-sky-500" />
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
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

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Biblioteca Nacional</h3>
            <p className="text-sm text-blue-100 mb-4">
              Agüero 2502, C1425EID
              <br />
              Ciudad Autónoma de Buenos Aires
              <br />
              Argentina
            </p>
            <p className="text-sm text-blue-100">Tel: +54 (011) 4808-6000</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <Link to="#" className="hover:text-white">
                  Catálogo en línea
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Colecciones digitales
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Horarios de atención
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Información</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <Link to="#" className="hover:text-white">
                  Institucional
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Autoridades
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Prensa
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Trabaja con nosotros
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Suscríbete al boletín</h3>
            <p className="text-sm text-blue-100 mb-4">Recibe noticias y eventos de la Biblioteca Nacional</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="px-3 py-2 text-gray-800 rounded-l-md w-full focus:outline-none"
              />
              <button className="bg-blue-700 px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">
                Enviar
              </button>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Síguenos</h4>
              <div className="flex space-x-4">
                <Link to="#" className="text-blue-100 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-blue-100 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-blue-100 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-blue-100 hover:text-white">
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-blue-800 text-center text-sm text-blue-200">
          <p>© 2025 Biblioteca Nacional Mariano Moreno. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
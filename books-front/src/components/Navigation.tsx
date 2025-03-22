import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const menuItems = [
    "Inicio",
    "Institucional",
    "Colecciones",
    "Catálogos",
    "Servicios",
    "Actividades",
    "Publicaciones",
    "Museo",
  ];

  return (
    <nav className="bg-blue-800 text-white hidden md:block">
      <div className="container mx-auto px-8">
        <ul className="flex space-x-1">
          {menuItems.map((item) => (
            <li key={item} className="group relative">
              <Link to="#" className="block px-4 py-3 hover:bg-blue-700 transition-colors">
                {item}
              </Link>
              <div className="absolute hidden group-hover:block bg-white shadow-lg w-48 z-10">
                <ul className="py-2 text-gray-800 text-sm">
                  <li>
                    <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                      Submenú 1
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                      Submenú 2
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                      Submenú 3
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
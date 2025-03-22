import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { Search, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const [isSearchOpen, setIsSearchOpen] = useState(false);

  const menuItems = [
    { name: "Inicio", url: "/" },
    {
      name: "Catálogo",
      url: "/catalog",
      submenu: [
        { name: "Libros", url: "/catalog/books" },
        { name: "Revistas", url: "/catalog/magazines" },
        { name: "Manuscritos", url: "/catalog/manuscripts" },
      ],
    },
    { name: "Servicios", url: "/services" },
    { name: "Eventos", url: "/events" },
    { name: "Sobre nosotros", url: "/about" },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto">
           <nav className="bg-blue-800 text-white hidden md:block">
          <ul className="flex">
          <Link to="/" className="flex items-center px-2">
          <img
  src="https://www.bn.gov.ar/web/logo-bn.svg"
  alt="Logo Biblioteca Nacional"
  className="h-12 w-auto filter invert brightness-100"
/>
          </Link>
            {menuItems.map((item) => (
              <li key={item.name} className="group relative">
                <Link
                  to={item.url}
                  className="block px-4 py-3 hover:bg-blue-700 transition-colors"
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="absolute hidden group-hover:block bg-white shadow-lg w-48 z-10">
                    <ul className="py-2 text-gray-800 text-sm">
                      {item.submenu.map((subitem) => (
                        <li key={subitem.name}>
                          <Link
                            to={subitem.url}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {subitem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-t mt-2">
            <ul className="py-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.url}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <ul className="pl-8 border-l-2 border-gray-200 ml-4">
                      {item.submenu.map((subitem) => (
                        <li key={subitem.name}>
                          <Link
                            to={subitem.url}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subitem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;

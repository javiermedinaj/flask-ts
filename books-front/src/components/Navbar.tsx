import React from 'react';
//import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="https://www.bn.gov.ar/web/logo-bn.svg"
              alt="Logo Biblioteca Nacional"
              width={60}
              height={60}
              className="h-12 w-auto"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-blue-900">Biblioteca Nacional</h1>
              <p className="text-sm text-gray-600">Mariano Moreno</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Buscar en el sitio"
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search className="h-4 w-4" />
              </button>
            </div>
            <button className="md:hidden text-blue-900">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-blue-900 p-1 rounded-md hover:bg-blue-100 transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
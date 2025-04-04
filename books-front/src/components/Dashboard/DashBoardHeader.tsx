import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Home, User } from "lucide-react";

interface DashboardHeaderProps {
  username: string;
  onLogout: () => void;
  onMenuToggle: () => void;
  menuOpen: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  username,
  onLogout,
  onMenuToggle,
  menuOpen,
}) => {
  const navigate = useNavigate();

  return (
    <header className="relative z-10 border-b border-white/10 backdrop-blur-sm bg-black/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex">
            <div className="w-2 h-8 bg-white mr-1"></div>
            <div className="w-2 h-8 bg-white mr-1"></div>
            <div className="w-2 h-8 bg-white"></div>
          </div>
          <div>
            <h1 className="text-white font-serif italic">Biblioteca</h1>
            <h2 className="text-white font-serif font-semibold -mt-1">Digital</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-white/80">
            <User size={16} />
            <span className="text-sm font-medium">{username || "Administrador"}</span>
          </div>
          <button 
            onClick={() => navigate("/")}
            className="hidden md:flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <Home size={16} />
            <span className="text-sm">Volver al sitio</span>
          </button>
          <button 
            onClick={onLogout}
            className="hidden md:flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            <span className="text-sm">Cerrar sesión</span>
          </button>
          
          {/* Botón de menú móvil */}
          <button 
            onClick={onMenuToggle}
            className="md:hidden text-white p-1"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-6 bg-white transform transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 bg-white transform transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100 w-4'}`}></span>
              <span className={`block h-0.5 w-6 bg-white transform transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
import React from "react";
import { useNavigate } from "react-router-dom";
import { Book, LogOut, Home, User, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  username,
  onLogout,
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className={`fixed inset-0 bg-black/90 backdrop-blur-xl z-20 flex flex-col items-center justify-center md:hidden transition-all duration-500
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 text-white/70 hover:text-white"
      >
        <X size={24} />
      </button>
      
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-px bg-white/40 mb-4"></div>
          <div className="text-white flex items-center gap-2 mb-1">
            <User size={18} />
            <span className="font-medium">{username || "Administrador"}</span>
          </div>
          <div className="text-white/70 text-sm">Panel de administración</div>
        </div>
  
        <button 
          onClick={onClose}
          className="flex items-center gap-3 py-2 px-3 text-white"
        >
          <Book size={20} />
          <span className="text-lg">Gestión de Libros</span>
        </button>
        
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-3 py-2 px-3 text-white/70 hover:text-white transition-colors"
        >
          <Home size={20} />
          <span className="text-lg">Volver al sitio</span>
        </button>
        
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 py-2 px-3 text-white/70 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span className="text-lg">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
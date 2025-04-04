import React from "react";

interface MenuOptionProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const MenuOption: React.FC<MenuOptionProps> = ({ 
  icon, 
  label, 
  isActive, 
  onClick 
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 py-3 px-4 rounded-full transition-all duration-300
      ${isActive 
        ? 'bg-white/10 text-white font-medium' 
        : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default MenuOption;
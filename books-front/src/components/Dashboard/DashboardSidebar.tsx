import React from "react";
import { Book } from "lucide-react";
import MenuOption from "./MenuOption";

const DashboardSidebar: React.FC = () => {
  return (
    <aside className="hidden md:block w-64 border-r border-white/10 backdrop-blur-sm bg-black/10">
      <nav className="p-6 flex flex-col gap-2">
        <MenuOption 
          icon={<Book size={18} />}
          label="Gestión de Libros"
          isActive={true} 
          onClick={() => {}}
        />
      </nav>
    </aside>
  );
};

export default DashboardSidebar;

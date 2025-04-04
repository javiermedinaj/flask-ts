import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "./DashBoardHeader";
import DashboardSidebar from "./DashboardSidebar";
import MobileMenu from "./MobileMenu";
import BookForm from "./BookForm";
import AlertMessage from "./AlertMessage";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/check-session", {
          credentials: "include",
        });
        
        if (!response.ok) {
          navigate("/login");
          return;
        }
        
        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        navigate("/login");
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleBookSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("http://localhost:5000/upload-book", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al subir el libro");
      }

      setMessage({
        text: "Libro subido correctamente",
        type: "success"
      });

    } catch (error) {
      setMessage({
        text: error instanceof Error ? error.message : "Error al subir el libro",
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-stone-900 to-black relative overflow-hidden">
      <div className="absolute w-full h-full inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-white/5 rounded-full filter blur-[100px] transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-white/5 rounded-full filter blur-[100px] transform translate-y-1/2"></div>
      </div>
      <DashboardHeader 
        username={username}
        onLogout={handleLogout}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        menuOpen={menuOpen}
      />
      <MobileMenu 
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        username={username}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 relative z-10">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div 
            className={`mb-8 ${isTextVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} 
            transition-all duration-700 ease-out`}
          >
            <div className="w-16 h-px bg-white/40 mb-4"></div>
            <h1 className="text-2xl font-serif italic text-white mb-1">
              Gestión de <span className="underline font-semibold">Libros</span>
            </h1>
            <p className="text-white/70 mt-2">
              Aquí podrás subir y gestionar los libros de la biblioteca
            </p>
          </div>

          {message && (
            <AlertMessage message={message} onClose={() => setMessage(null)} />
          )}

          <div 
            className={`bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6
              ${isTextVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} 
              transition-all duration-700 delay-300 ease-out`}
          >
            <BookForm onSubmit={handleBookSubmit} isLoading={isLoading} />
          </div>
        </main>
      </div>

      <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center text-white/20 tracking-widest text-xs uppercase">
        Panel de Administración
      </div>
    </div>
  );
};

export default Dashboard;
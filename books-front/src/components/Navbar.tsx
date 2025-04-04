import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para cambiar la apariencia
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Evitar scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Datos de los enlaces de navegación
  const navLinks = [
    { to: "/orchid", label: "About" },
    { to: "/login", label: "Login" },
  ];

  return (
    <nav
  className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 
  ${isScrolled || isMenuOpen ? "bg-black" : "bg-black/30"} 
   transition-all duration-300`}
>

      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-medium z-20">
          <Link to="/" className="text-white tracking-wider">
            Telepathic
          </Link>
        </div>

        {/* Botón de menú móvil */}
        <button
          className="z-20 relative md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col justify-center w-8 h-8 space-y-1.5">
            <span
              className={`block h-0.5 w-8 bg-white transition-transform duration-300 
              ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`block h-0.5 bg-white transition-opacity duration-300 
              ${isMenuOpen ? "opacity-0 w-0" : "opacity-100 w-5"}`}
            ></span>
            <span
              className={`block h-0.5 w-8 bg-white transition-transform duration-300 
              ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </div>
        </button>

        {/* Enlaces de navegación para escritorio */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-white text-sm tracking-wider hover:opacity-80 transition-opacity duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Menú móvil con transición */}
        <div
          className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-start pt-24
          transition-all duration-500 ease-in-out md:hidden
          ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
          {navLinks.map(({ to, label }, index) => (
            <Link
              key={to}
              to={to}
              className={`text-white text-xl mb-10 tracking-wider hover:text-green-400 transition-all duration-500 
              ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
              style={{ transitionDelay: isMenuOpen ? `${200 + index * 100}ms` : "0ms" }}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, UserRound, KeyRound } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Por favor ingresa tu nombre de usuario");
      return;
    }
    if (!password) {
      setError("Por favor ingresa tu contraseña");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Credenciales incorrectas. Por favor inténtalo nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-stone-900 to-black py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute w-full h-full inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-white/5 rounded-full filter blur-[100px] transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-white/5 rounded-full filter blur-[100px] transform translate-y-1/2"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10 bg-black/20 backdrop-blur-sm p-8 rounded-xl border border-white/10">
        <div className="text-center">
          <div className={`w-16 h-px bg-white/40 mx-auto mb-6 
            ${isTextVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"} 
            transition-all duration-1000 ease-out`}>
          </div>
          
          <h2 className={`text-3xl font-serif italic text-white mb-1
            ${isTextVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"} 
            transition-all duration-700 ease-out`}>
            Iniciar <span className="underline font-semibold">Sesión</span>
          </h2>
          
          <p className={`mt-2 text-sm text-white/70
            ${isTextVisible ? "opacity-100" : "opacity-0"} 
            transition-all duration-700 delay-300 ease-out`}>
            Accede a tu cuenta para gestionar tus libros
          </p>
        </div>

        <form className={`mt-8 space-y-6
          ${isTextVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} 
          transition-all duration-700 delay-500 ease-out`} 
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="bg-red-900/30 border-l-2 border-red-500 p-4 rounded-r-lg">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserRound className="h-5 w-5 text-white/50" />
              </div>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="username"
                required
                className="block w-full pl-10 py-3 bg-white/10 text-white border border-white/20 rounded-full 
                placeholder-white/50 focus:ring-1 focus:ring-white/40 focus:border-white/40 focus:outline-none"
                placeholder="Nombre de usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-white/50" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full pl-10 py-3 bg-white/10 text-white border border-white/20 rounded-full 
                placeholder-white/50 focus:ring-1 focus:ring-white/40 focus:border-white/40 focus:outline-none"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-white/50 hover:text-white/80 transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-white/50 hover:text-white/80 transition-colors" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-white/70">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 bg-white/10 border-white/20 rounded focus:ring-white/40 focus:ring-offset-black"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm"
              >
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="text-white/70 hover:text-white transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`relative w-full flex justify-center py-3 px-6 text-sm font-medium rounded-full 
                text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-white/50 focus:ring-offset-stone-900 transition-all duration-300 
                ${isLoading ? "opacity-80" : "opacity-100"}`}
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </button>
          </div>
        </form>

        <div className={`text-center mt-6 text-white/70
          ${isTextVisible ? "opacity-100" : "opacity-0"} 
          transition-all duration-700 delay-700 ease-out`}>
          <p className="text-sm">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="text-white hover:underline transition-all"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
        
        <div className="hidden md:block absolute -right-20 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center text-white/30 tracking-widest text-xs uppercase">
          Biblioteca Digital
        </div>
      </div>
    </div>
  );
};

export default Login;
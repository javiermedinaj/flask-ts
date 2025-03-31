import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book, Newspaper, LogOut, Upload, Home, User } from "lucide-react";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"books" | "news">("books");
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  

  const [bookForm, setBookForm] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    categoria: "",
    archivo: null as File | null,
  });

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

  const handleBookInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBookForm(prev => ({
        ...prev,
        archivo: e.target.files![0]
      }));
    }
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("titulo", bookForm.titulo);
      formData.append("autor", bookForm.autor);
      formData.append("descripcion", bookForm.descripcion);
      formData.append("categoria", bookForm.categoria);
      
      if (bookForm.archivo) {
        formData.append("archivo", bookForm.archivo);
      }

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

      setBookForm({
        titulo: "",
        autor: "",
        descripcion: "",
        categoria: "",
        archivo: null,
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
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-blue-800 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <div className="mt-2 flex items-center space-x-2">
            <User size={18} />
            <span>{username || "Administrador"}</span>
          </div>
        </div>
        <nav className="mt-6">
          <div 
            className={`px-6 py-3 flex items-center space-x-3 cursor-pointer ${activeTab === "books" ? "bg-blue-900" : "hover:bg-blue-700"}`}
            onClick={() => setActiveTab("books")}
          >
            <Book size={18} />
            <span>Gestión de Libros</span>
          </div>
          <div 
            className={`px-6 py-3 flex items-center space-x-3 cursor-pointer ${activeTab === "news" ? "bg-blue-900" : "hover:bg-blue-700"}`}
            onClick={() => setActiveTab("news")}
          >
            <Newspaper size={18} />
            <span>Gestión de Noticias</span>
          </div>
          <div className="px-6 py-3 flex items-center space-x-3 cursor-pointer hover:bg-blue-700" onClick={() => navigate("/")}>
            <Home size={18} />
            <span>Volver al sitio</span>
          </div>
          <div className="px-6 py-3 flex items-center space-x-3 cursor-pointer hover:bg-blue-700" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Cerrar sesión</span>
          </div>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === "books" ? "Gestión de Libros" : "Gestión de Noticias"}
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {message && (
            <div className={`mb-4 p-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message.text}
            </div>
          )}
          {activeTab === "books" && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Subir nuevo libro</h3>
                
                <form onSubmit={handleBookSubmit} className="mt-5 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
                      <input
                        type="text"
                        name="titulo"
                        id="titulo"
                        required
                        value={bookForm.titulo}
                        onChange={handleBookInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="autor" className="block text-sm font-medium text-gray-700">Autor</label>
                      <input
                        type="text"
                        name="autor"
                        id="autor"
                        required
                        value={bookForm.autor}
                        onChange={handleBookInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                      name="descripcion"
                      id="descripcion"
                      rows={3}
                      value={bookForm.descripcion}
                      onChange={handleBookInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoría</label>
                    <select
                      id="categoria"
                      name="categoria"
                      value={bookForm.categoria}
                      onChange={handleBookInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="Ficción">Ficción</option>
                      <option value="No ficción">No ficción</option>
                      <option value="Ciencia">Ciencia</option>
                      <option value="Historia">Historia</option>
                      <option value="Biografía">Biografía</option>
                      <option value="Infantil">Infantil</option>
                      <option value="Juvenil">Juvenil</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Archivo PDF</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="archivo"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Subir un archivo</span>
                            <input id="archivo" name="archivo" type="file" accept=".pdf,.epub" className="sr-only" onChange={handleFileChange} />
                          </label>
                          <p className="pl-1">o arrastra y suelta</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF o EPUB hasta 10MB</p>
                        {bookForm.archivo && (
                          <p className="text-sm text-green-600">{bookForm.archivo.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-5">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                        isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                      {isLoading ? "Subiendo..." : "Subir libro"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "news" && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Gestión de Noticias</h3>
                <div className="mt-5">
                  <p className="text-sm text-gray-500">
                    Aquí podrás subir y gestionar noticias relacionadas con la biblioteca.
                    (Funcionalidad en desarrollo)
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
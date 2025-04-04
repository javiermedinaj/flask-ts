import React, { useState } from "react";
import { Upload, ChevronRight } from "lucide-react";

interface BookFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, isLoading }) => {
  const [bookForm, setBookForm] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    categoria: "",
    archivo: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("titulo", bookForm.titulo);
    formData.append("autor", bookForm.autor);
    formData.append("descripcion", bookForm.descripcion);
    formData.append("categoria", bookForm.categoria);
    
    if (bookForm.archivo) {
      formData.append("archivo", bookForm.archivo);
    }

    await onSubmit(formData);
    
    setBookForm({
      titulo: "",
      autor: "",
      descripcion: "",
      categoria: "",
      archivo: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-white/80 mb-2">Título</label>
          <input
            type="text"
            name="titulo"
            id="titulo"
            required
            value={bookForm.titulo}
            onChange={handleInputChange}
            className="w-full py-3 px-4 bg-white/10 text-white border border-white/20 rounded-full 
            placeholder-white/50 focus:ring-1 focus:ring-white/40 focus:border-white/40 focus:outline-none"
            placeholder="Título del libro"
          />
        </div>
        
        <div>
          <label htmlFor="autor" className="block text-sm font-medium text-white/80 mb-2">Autor</label>
          <input
            type="text"
            name="autor"
            id="autor"
            required
            value={bookForm.autor}
            onChange={handleInputChange}
            className="w-full py-3 px-4 bg-white/10 text-white border border-white/20 rounded-full 
            placeholder-white/50 focus:ring-1 focus:ring-white/40 focus:border-white/40 focus:outline-none"
            placeholder="Nombre del autor"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-white/80 mb-2">Descripción</label>
        <textarea
          name="descripcion"
          id="descripcion"
          rows={4}
          value={bookForm.descripcion}
          onChange={handleInputChange}
          className="w-full py-3 px-4 bg-white/10 text-white border border-white/20 rounded-xl 
          placeholder-white/50 focus:ring-1 focus:ring-white/40 focus:border-white/40 focus:outline-none resize-none"
          placeholder="Breve descripción del contenido"
        />
      </div>
      
      <div>
        <label htmlFor="categoria" className="block text-sm font-medium text-white/80 mb-2">Categoría</label>
        <select
          id="categoria"
          name="categoria"
          value={bookForm.categoria}
          onChange={handleInputChange}
          className="w-full py-3 px-4 bg-white/10 text-white border border-white/20 rounded-full 
          focus:ring-1 focus:ring-white/40 focus:border-white/40 focus:outline-none appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, 
                   backgroundPosition: `right 0.75rem center`,
                   backgroundRepeat: `no-repeat`,
                   backgroundSize: `1.25rem 1.25rem`,
                   paddingRight: `2.5rem` }}
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
        <label className="block text-sm font-medium text-white/80 mb-2">Archivo PDF</label>
        <div className="mt-1 flex justify-center px-6 pt-6 pb-6 border border-white/20 border-dashed rounded-xl bg-white/5 backdrop-blur-sm">
          <div className="space-y-2 text-center">
            <Upload className="mx-auto h-10 w-10 text-white/60" />
            <div className="flex text-sm text-white/70 justify-center">
              <label
                htmlFor="archivo"
                className="relative cursor-pointer px-4 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <span>Seleccionar archivo</span>
                <input id="archivo" name="archivo" type="file" accept=".pdf,.epub" className="sr-only" onChange={handleFileChange} />
              </label>
            </div>
            <p className="text-xs text-white/50">PDF o EPUB hasta 10MB</p>
            {bookForm.archivo && (
              <p className="text-sm text-green-300 font-medium mt-2">{bookForm.archivo.name}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-white text-black py-2 px-8 rounded-full text-sm tracking-wider flex items-center 
          transition-all duration-300 hover:bg-gray-200 disabled:bg-white/70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Subiendo..." : "Subir libro"}
          {!isLoading && <ChevronRight className="ml-1 h-4 w-4" />}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
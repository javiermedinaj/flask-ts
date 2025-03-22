import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import data from '../data/data.json';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  price?: number;
  oldPrice?: number;
  rating?: number;
  stock?: number;
  isBestseller?: boolean;
}

const FeaturedBooks: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const booksPerView = window.innerWidth < 768 ? 1 : 2;
  
  // Formatear precios (con valor por defecto)
  const formatPrice = (price: number = 4500) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Funciones para el carrusel
  const nextSlide = () => {
    setCurrentIndex((prev) => 
      (prev + booksPerView) >= data.featuredBooks.length ? 0 : prev + booksPerView
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => 
      (prev - booksPerView) < 0 ? Math.max(0, data.featuredBooks.length - booksPerView) : prev - booksPerView
    );
  };

  const addToCart = (id: number) => {
    alert(`Libro agregado al carrito: ${id}`);
    // Aquí iría la lógica real para agregar al carrito
  };

  return (
    <section className="mb-12 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Libros Destacados</h2>
        <Link to="/books" className="text-blue-600 hover:underline flex items-center">
          Ver todos
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      {/* Carrusel de libros */}
      <div className="relative">
        {data.featuredBooks.length > booksPerView && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 overflow-hidden">
          {data.featuredBooks.slice(currentIndex, currentIndex + booksPerView).map((book: Book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative">
                <Link to={`/book/${book.id}`}>
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="w-full h-56 object-cover transition-transform hover:scale-105" 
                  />
                </Link>
              </div>
              
              <div className="p-4">
                <Link to={`/book/${book.id}`}>
                  <h3 className="text-lg font-semibold line-clamp-1">{book.title}</h3>
                </Link>
                <p className="text-gray-600 mb-2">{book.author}</p>
                
                {/* Precio - usando un valor predeterminado */}
                <div className="mb-4">
                  <span className="text-xl font-bold text-gray-800">
                    {formatPrice(book.price)}
                  </span>
                </div>
                
                {/* Botón de agregar al carrito */}
                <button 
                  onClick={() => addToCart(book.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center transition-colors"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Indicadores de carrusel */}
      {data.featuredBooks.length > booksPerView && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(data.featuredBooks.length / booksPerView) }).map((_, i) => (
            <button
              key={i}
              className={`h-2 w-2 mx-1 rounded-full ${
                i === Math.floor(currentIndex / booksPerView) ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(i * booksPerView)}
              aria-label={`Ir a la página ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedBooks; 
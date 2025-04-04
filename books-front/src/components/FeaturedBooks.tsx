import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import data from "../data/data.json";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
}

const FeaturedBooks: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [booksPerView, setBooksPerView] = useState(2);
  
  useEffect(() => {
    const handleResize = () => {
      setBooksPerView(window.innerWidth < 768 ? 1 : 2);
    };
    handleResize(); // Establecer valor inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + booksPerView >= data.featuredBooks.length ? 0 : prev + booksPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - booksPerView < 0
        ? Math.max(0, data.featuredBooks.length - booksPerView)
        : prev - booksPerView
    );
  };

  return (
    <section className="py-16 bg-gradient-to-r from-stone-900 to-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-px bg-white/40 mb-4"></div>
          <h2 className="text-3xl sm:text-4xl font-serif italic">
            Lecturas <span className="underline font-semibold">Destacadas</span>
          </h2>
          <p className="mt-4 text-center text-white/70 max-w-2xl mx-auto">
            Descubre las obras que están cautivando a nuestros lectores este mes.
          </p>
        </div>

        <div className="relative px-10">
          {data.featuredBooks.length > booksPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
            {data.featuredBooks
              .slice(currentIndex, currentIndex + booksPerView)
              .map((book: Book) => (
                <div
                  key={book.id}
                  className="group relative rounded-lg overflow-hidden bg-stone-800/50 backdrop-blur-sm"
                >
                  <div className="relative h-80 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <Link to={`/book/${book.id}`}>
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>
                  </div>

                  <div className="p-6 relative z-20 -mt-16">
                    <Link to={`/book/${book.id}`}>
                      <h3 className="text-xl font-serif font-semibold line-clamp-1 group-hover:underline transition-all">
                        {book.title}
                      </h3>
                    </Link>
                    <p className="text-white/70 mb-4">
                      {book.author}
                    </p>

                    <div className="flex items-center justify-between mt-6">
                      <Link 
                        to={`/book/${book.id}`}
                        className="bg-transparent border border-white/30 hover:border-white text-white py-2 px-6 rounded-full text-sm tracking-wider transition-all duration-300 group-hover:bg-white/10"
                      >
                        DETALLES
                      </Link>
                      <button className="bg-white text-black py-2 px-6 rounded-full text-sm tracking-wider flex items-center transition-all duration-300 hover:bg-gray-200">
                        LEER
                        <span className="ml-2">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {data.featuredBooks.length > booksPerView && (
          <div className="flex justify-center mt-8">
            {Array.from({
              length: Math.ceil(data.featuredBooks.length / booksPerView),
            }).map((_, i) => (
              <button
                key={i}
                className={`h-1 mx-1 transition-all duration-300 ${
                  i === Math.floor(currentIndex / booksPerView)
                    ? "w-8 bg-white"
                    : "w-3 bg-white/30"
                }`}
                onClick={() => setCurrentIndex(i * booksPerView)}
                aria-label={`Ir a la página ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center text-white/50 tracking-widest text-xs uppercase">
        Biblioteca Digital
      </div>
    </section>
  );
};

export default FeaturedBooks;
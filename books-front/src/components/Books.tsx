import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  ChevronDown,
  Star,
  ShoppingCart,
  Heart,
} from "lucide-react";

// Tipos para nuestros datos
interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  oldPrice?: number;
  rating: number;
  coverImage: string;
  category: string;
  stock: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

// Datos simulados
const booksData: Book[] = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    price: 5999,
    oldPrice: 7500,
    rating: 4.8,
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=500",
    category: "Ficción",
    stock: 15,
    isBestseller: true,
  },
  {
    id: 2,
    title: "El Aleph",
    author: "Jorge Luis Borges",
    price: 4200,
    rating: 4.7,
    coverImage:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=500",
    category: "Ficción",
    stock: 8,
  },
  {
    id: 3,
    title: "Rayuela",
    author: "Julio Cortázar",
    price: 4800,
    rating: 4.5,
    coverImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=500",
    category: "Ficción",
    stock: 10,
  },
  {
    id: 4,
    title: "Historia de la filosofía occidental",
    author: "Bertrand Russell",
    price: 7500,
    oldPrice: 8900,
    rating: 4.6,
    coverImage:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=500",
    category: "Filosofía",
    stock: 5,
  },
  {
    id: 5,
    title: "Aprender Python en 24 horas",
    author: "Marina Gonzalez",
    price: 3500,
    rating: 4.2,
    coverImage:
      "https://images.cdn3.buscalibre.com/fit-in/360x360/ab/b1/abb1e18f6c89a6dd0f021a63514759a9.jpg",
    category: "Programación",
    stock: 20,
    isNew: true,
  },
  {
    id: 6,
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    price: 2800,
    rating: 4.9,
    coverImage:
      "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=500",
    category: "Literatura infantil",
    stock: 25,
    isBestseller: true,
  },
  {
    id: 7,
    title: "1984",
    author: "George Orwell",
    price: 3900,
    rating: 4.7,
    coverImage:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=500",
    category: "Ficción",
    stock: 12,
  },
  {
    id: 8,
    title: "El Gran Gatsby",
    author: "F. Scott Fitzgerald",
    price: 4100,
    rating: 4.4,
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=500",
    category: "Ficción",
    stock: 9,
  },
];

// Categorías disponibles (extraídas de los datos)
const categories = Array.from(new Set(booksData.map((book) => book.category)));

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(booksData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  // Función para filtrar libros
  useEffect(() => {
    let filtered = booksData;

    // Aplicar búsqueda por texto
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtro por categoría
    if (selectedCategory) {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    // Aplicar filtro por rango de precio
    filtered = filtered.filter(
      (book) => book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    setBooks(filtered);
  }, [searchTerm, selectedCategory, priceRange]);

  // Función para añadir al carrito
  const addToCart = (bookId: number) => {
    alert(`Libro añadido al carrito: ID ${bookId}`);
    // Aquí implementarías la lógica real de añadir al carrito
  };

  // Función para formatear precios en pesos argentinos
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Librería</h1>
        <p className="text-gray-600">Explora nuestra colección de libros</p>
      </div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar por título o autor..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white md:w-auto"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            <span>Filtros</span>
            <ChevronDown
              size={18}
              className={`transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* filtros */}
        {showFilters && (
          <div className="bg-white p-4 border border-gray-200 rounded-md shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Categoría</h3>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Precio mínimo</h3>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-sm mt-1">{formatPrice(priceRange[0])}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Precio máximo</h3>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-sm mt-1">{formatPrice(priceRange[1])}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mb-4">
        <p className="text-gray-600">{books.length} resultados</p>
      </div>

      {/* mapeo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {" "}
            <div className="relative">
              {book.isNew && (
                <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                  Nuevo
                </span>
              )}
              {book.isBestseller && (
                <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                  Bestseller
                </span>
              )}
              <div className="h-48 overflow-hidden">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  onClick={() => navigate(`/book/${book.id}`)}
                />
              </div>
            </div>
            {/* Info del libro con calificacon preico etc  */}
            <div className="p-4 h-[260px] flex flex-col">
              <div className="flex justify-between items-start">
                <h3
                  className="text-lg font-medium text-gray-800 hover:text-blue-600 cursor-pointer line-clamp-2"
                  onClick={() => navigate(`/book/${book.id}`)}
                >
                  {book.title}
                </h3>
                <button className="text-gray-400 hover:text-red-500">
                  <Heart size={18} />
                </button>
              </div>
              <p className="text-gray-600 mb-2">{book.author}</p>
              <div className="flex items-center mb-2">
                <div className="flex items-center text-yellow-400 mr-1">
                  <Star size={16} fill="currentColor" />
                </div>
                <span className="text-sm text-gray-600">{book.rating}</span>
              </div>
              <div className="mb-3">
                <span className="text-xl font-bold text-gray-800">
                  {formatPrice(book.price)}
                </span>
                {book.oldPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {formatPrice(book.oldPrice)}
                  </span>
                )}
                {book.oldPrice && (
                  <span className="text-sm text-green-600 ml-2">
                    {Math.round((1 - book.price / book.oldPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-1">
                {book.stock > 10
                  ? "Stock disponible"
                  : book.stock > 0
                  ? `¡Solo quedan ${book.stock} unidades!`
                  : "Sin stock"}
              </p>
              <div className="mt-auto">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
                  onClick={() => addToCart(book.id)}
                  disabled={book.stock === 0}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {/* <div className="mt-8 flex justify-center">
        <nav className="inline-flex rounded-md shadow">
          <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            Anterior
          </button>
          <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-blue-600 font-medium">
            1
          </button>
          <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            Siguiente
          </button>
        </nav>
      </div> */}
    </div>
  );
};

export default Books;

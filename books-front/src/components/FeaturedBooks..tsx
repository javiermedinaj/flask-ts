import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data/data.json';

const FeaturedBooks: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Libros Destacados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.featuredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={book.cover} alt={book.title} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-700">{book.author}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right">
        <Link to="/all-books" className="text-blue-500 hover:underline">
          Ver más
        </Link>
      </div>
    </section>
  );
};

export default FeaturedBooks;
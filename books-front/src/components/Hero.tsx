import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[400px] overflow-hidden">
      <img
        src="/Hero.jpg"
        alt="Biblioteca Nacional"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-lg text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Biblioteca Nacional Mariano Moreno</h2>
            <p className="text-lg mb-6">Preservando el patrimonio bibliográfico y documental de Argentina</p>
            <button className="bg-white text-blue-900 px-6 py-2 rounded-md font-medium hover:bg-blue-100 transition-colors">
              Explorar catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
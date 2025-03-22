import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';

// Definimos la interfaz para los eventos
interface Event {
  id: number;
  title: string;
  url: string;
  image: string;
  category: string;
  categoryType: 'exhibition' | 'event' | 'holiday';
}

const UpcomingEvents: React.FC = () => {
  // Datos de eventos basados en el HTML proporcionado
  const events: Event[] = [
    {
      id: 1,
      title: "Escritos en celuloide. Cine y literatura argentina",
      url: "https://www.bn.gov.ar/agenda-cultural/escritos-en-celuloide-cine-y-literatura-argentina-1",
      image: "https://www.bn.gov.ar/images/large/1741189574.jpg",
      category: "BN | Exposiciones",
      categoryType: "exhibition"
    },
    {
      id: 2,
      title: "Cárceles. Narraciones del encierro (1878-2025)",
      url: "https://www.bn.gov.ar/agenda-cultural/carceles-narraciones-del-encierro-1878-2025-1",
      image: "https://www.bn.gov.ar/images/large/1740071681.jpg",
      category: "BN | Exposiciones",
      categoryType: "exhibition"
    },
    {
      id: 3,
      title: "Día Nacional de la Memoria por la Verdad y la Justicia",
      url: "https://www.bn.gov.ar/agenda-cultural/dia-nacional-de-la-memoria-por-la-verdad-y-la-justicia-8",
      image: "https://www.bn.gov.ar/images/large/1739453232.jpg",
      category: "Feriado",
      categoryType: "holiday"
    }
  ];

  // Función para obtener el color de fondo según el tipo de categoría
  const getCategoryColor = (type: Event['categoryType']) => {
    switch(type) {
      case 'exhibition':
        return 'bg-blue-600';
      case 'event':
        return 'bg-green-600';
      case 'holiday':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <section className="mb-12 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Agenda Cultural</h2>
        <a 
          href="https://www.bn.gov.ar/agenda-cultural" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline flex items-center"
        >
          Ver agenda completa
          <ChevronRight className="ml-1 h-4 w-4" />
        </a>
      </div>

      {/* Grid para las tarjetas de eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <a 
            key={event.id} 
            href={event.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
          >
            <div 
              className="h-48 bg-center bg-cover bg-no-repeat transition-transform group-hover:scale-105"
              style={{ backgroundImage: `url(${event.image})` }}
            ></div>
            <div className="p-4 flex-grow flex flex-col">
              <div className="mb-2">
                <span className={`inline-block text-xs px-2 py-1 rounded text-white ${getCategoryColor(event.categoryType)}`}>
                  {event.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              <div className="mt-auto pt-3 flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Ver detalles</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
import { Calendar, ChevronRight, ArrowRight } from 'lucide-react';
interface Event {
  id: number;
  title: string;
  url: string;
  image: string;
  category: string;
  categoryType: 'exhibition' | 'event' | 'holiday';
}

const UpcomingEvents: React.FC = () => {
  // Datos de pruba
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

  const getCategoryColor = (type: Event['categoryType']) => {
    switch(type) {
      case 'exhibition':
        return 'bg-blue-600/80 backdrop-blur-sm';
      case 'event':
        return 'bg-green-600/80 backdrop-blur-sm';
      case 'holiday':
        return 'bg-red-600/80 backdrop-blur-sm';
      default:
        return 'bg-gray-600/80 backdrop-blur-sm';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-stone-900 to-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-px bg-white/40 mb-4"></div>
          <h2 className="text-3xl sm:text-4xl font-serif italic">
            Agenda <span className="underline font-semibold">Cultural</span>
          </h2>
          <p className="mt-4 text-center text-white/70 max-w-2xl mx-auto">
            Descubre los eventos culturales que tenemos preparados para ti este mes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <a 
              key={event.id} 
              href={event.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group overflow-hidden h-full flex flex-col bg-stone-800/30 backdrop-blur-sm rounded-lg transition-all duration-500 hover:bg-stone-800/50"
            >
              <div className="relative h-56 overflow-hidden">
                
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500 z-10"></div>
                
                <div 
                  className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${event.image})` }}
                ></div>
                
                
                <div className="absolute top-4 left-4 z-20">
                  <span className={`inline-block text-xs px-3 py-1.5 rounded-full text-white tracking-wider ${getCategoryColor(event.categoryType)}`}>
                    {event.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-serif font-medium text-white group-hover:text-white/90 transition-colors line-clamp-2 mb-3">
                  {event.title}
                </h3>
                
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-sm text-white/60 flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    Ver detalles
                  </span>
                  
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                    <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        

        <div className="flex justify-center mt-12">
          <a 
            href="https://www.bn.gov.ar/agenda-cultural" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-black py-2 px-8 rounded-full text-sm tracking-wider flex items-center transition-all duration-300 hover:bg-gray-200"
          >
            VER AGENDA COMPLETA
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
      
      <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center text-white/50 tracking-widest text-xs uppercase">
        Eventos Culturales
      </div>
    </section>
  );
};

export default UpcomingEvents;
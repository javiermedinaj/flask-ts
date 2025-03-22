import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Definimos la interfaz para los elementos de noticias
interface NewsItem {
  id: number;
  title: string;
  url: string;
  image: string;
  isHtml?: boolean;
}

const News: React.FC = () => {
  // Datos de noticias basados en el HTML proporcionado
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Incorporación de la Colección Imprenta de los Niños Expósitos en el Registro Memoria del Mundo. Región América Latina y el Caribe 2024",
      url: "https://www.bn.gov.ar/noticias/incorporacion-de-la-coleccion-imprenta-de-los-ninos-expositos-en-el-registro-memoria-del-mundo-region-america-latina-y-el-caribe-2024",
      image: "https://www.bn.gov.ar/images/large/1742231554.jpg"
    },
    {
      id: 2,
      title: "Concurso literario infantil y juvenil de lectura y escritura \"Raúl Scalabrini Ortiz. Rieles y palabras\"",
      url: "https://www.bn.gov.ar/noticias/concurso-literario-infantil-y-juvenil-de-lectura-y-escritura-raul-scalabrini-ortiz-rieles-y-palabras",
      image: "https://www.bn.gov.ar/images/large/1732198662.jpg"
    },
    {
      id: 3,
      title: "Salió un nuevo número de la revista CUADERNO DE LA BN",
      url: "https://www.bn.gov.ar/noticias/salio-un-nuevo-numero-de-la-revista-cuaderno-de-la-bn-14",
      image: "https://www.bn.gov.ar/images/large/1742476838.jpg",
      isHtml: true
    }
  ];

  return (
    <section className="mb-12 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Novedades</h2>
        <a 
          href="https://www.bn.gov.ar/noticias" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline flex items-center"
        >
          Ver todas
          <ChevronRight className="ml-1 h-4 w-4" />
        </a>
      </div>

      {/* Grid para las tarjetas de noticias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((news) => (
          <a 
            key={news.id} 
            href={news.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full"
          >
            <div 
              className="h-48 bg-center bg-cover bg-no-repeat" 
              style={{ backgroundImage: `url(${news.image})` }}
            ></div>
            <div className="p-4">
              {news.isHtml ? (
                <h3 
                  className="text-lg font-semibold text-gray-800 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: news.title }}
                ></h3>
              ) : (
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-3">
                  {news.title}
                </h3>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default News;
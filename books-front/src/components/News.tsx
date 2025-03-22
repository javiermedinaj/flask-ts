import React from 'react';
import data from '../data/data.json';

const News: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Noticias</h2>
      <ul>
        {data.news.map((newsItem) => (
          <li key={newsItem.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-xl font-semibold">{newsItem.title}</h3>
            <p className="text-gray-700">{new Date(newsItem.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default News;
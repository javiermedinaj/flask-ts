import React from 'react';
import data from '../data/data.json';

const Services: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Servicios</h2>
      <ul>
        {data.services.map((service) => (
          <li key={service.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-xl font-semibold">{service.name}</h3>
            <p className="text-gray-700">{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Services;
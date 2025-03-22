import React from 'react';
import data from '../data/data.json';

const UpcomingEvents: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Próximos Eventos</h2>
      <ul>
        {data.upcomingEvents.map((event) => (
          <li key={event.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-700">{new Date(event.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UpcomingEvents;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import TopBar from './components/TopBar';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import FeaturedBooks from './components/FeaturedBooks.';
import UpcomingEvents from './components/UpcomingEvents';
import Services from './components/Services';
import News from './components/News';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* <TopBar /> */}
        <Navbar />
        <Navigation />
        <Hero />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4 md:px-8">
              <FeaturedBooks />
              <UpcomingEvents />
              <Services />
              <News />

          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
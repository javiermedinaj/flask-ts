import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import FeaturedBooks from './components/FeaturedBooks';
import UpcomingEvents from './components/UpcomingEvents';
import News from './components/News';
import Login from './components/Login';
import Books from './components/Books';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path= "/books" element={<Books />} />
          <Route path = "/dashboard" element={<Dashboard />} />
          <Route path='/' element={
            <>
              <Hero />
              <main className="flex-grow bg-gray-50 py-8">
                <div className="container mx-auto px-4 md:px-8">
                  <FeaturedBooks />
                  <UpcomingEvents />
                  <News />
                </div>
              </main>
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
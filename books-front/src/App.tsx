import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import FeaturedBooks from './components/FeaturedBooks';
import UpcomingEvents from './components/UpcomingEvents';
import Login from './components/Login';
import Dashboard from './components/Dashboard/index';
import Example from './components/Example';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">   
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path = "/dashboard" element={<Dashboard />} />
          <Route path='/' element={
            <>
            <Navbar />
              <Hero />
              <main className="flex-grow bg-black ">
                  <Example />
                  <FeaturedBooks />
                  <UpcomingEvents />
                  <Footer />        
              </main>
            </>
          } />
        </Routes>       
      </div>
    </Router>
  );
};

export default App;
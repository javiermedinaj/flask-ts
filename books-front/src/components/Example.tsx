import React from 'react';

interface HeroSectionProps {
  // title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  waitlistText?: string;
  stockStatus?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  // title = "Find what's on your mind.",
  subtitle = "Orchid's advanced intuitive chord generator offers a break from chord maths and muscle memory and keeps you in the flow of songwriting.",
  description = "Find a new chord, a new progression, a new voicing, or a whole new idea.",
  ctaText = "LEARN MORE",
  waitlistText = "JOIN WAITLIST",
  stockStatus = "CURRENTLY OUT OF STOCK"
}) => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-stone-800 to-black relative overflow-hidden">
      <div className="w-full md:w-2/5 p-6 sm:p-10 md:p-16 flex flex-col justify-center text-white z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic mb-4 md:mb-6">
          Find <span className="italic">what's on</span> <br className="hidden sm:block" />
          <span className="italic">your</span> <span className="underline font-semibold">mind</span>.
        </h1>
        
        <p className="mb-4 md:mb-6 text-base sm:text-lg">
          {subtitle}
        </p>
        
        <p className="mb-4 md:mb-6 text-base sm:text-lg">
          {description}
        </p>
        
        <p className="mb-6 md:mb-8 text-base sm:text-lg">
          Find what's on your mind.
        </p>
        
        <button className="bg-white text-black py-2 px-6 rounded-full w-fit flex items-center transition duration-300 hover:bg-gray-200">
          {ctaText}
          <span className="ml-2">→</span>
        </button>
      </div>
      
      <div className="w-full md:w-3/5 h-full md:h-auto relative">
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-stone-800/90 to-transparent z-10"></div>
        
        <div className="h-full w-full bg-cover bg-center relative">
          <img src="https://www.bn.gov.ar/images/large/1740071681.jpg" alt="Background" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 md:bottom-0 right-4 md:right-0 p-4 z-20 w-full md:w-auto max-w-xs mx-auto md:mx-0">
            <button className="bg-gray-300 text-black font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-md mb-2 w-full hover:bg-gray-200 transition duration-300">
              {waitlistText}
            </button>
            <div className="text-white text-center text-xs sm:text-sm">
              {stockStatus}
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center text-white tracking-widest text-xs uppercase">
        Side of the Day
      </div>
      
      <div className="md:hidden absolute bottom-0 left-0 right-0 text-center text-white tracking-widest text-xs uppercase py-2">
        Side of the Day
      </div>
    </div>
  );
};

export default HeroSection;
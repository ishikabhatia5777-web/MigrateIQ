import React from 'react';

export const KeyStats: React.FC = () => {
  return (
    <section className="bg-white py-16 lg:py-24 px-6 lg:px-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center">
          
          <div className="flex flex-col items-center">
            <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-950 font-display tracking-tight mb-2">
              Up to 50%
            </span>
            <p className="text-xl sm:text-2xl text-gray-800 font-medium font-display">
              Faster Migration
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-950 font-display tracking-tight mb-2">
              ~50%
            </span>
            <p className="text-xl sm:text-2xl text-gray-800 font-medium font-display">
              Reduction in Effort
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-950 font-display tracking-tight mb-2">
              Up to 75%
            </span>
            <p className="text-xl sm:text-2xl text-gray-800 font-medium font-display">
              of Tasks Automated
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

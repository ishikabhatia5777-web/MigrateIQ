import React from 'react';

export const SupportedPlatforms: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 lg:px-12 border-b border-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 font-display mb-12">
          MigrateIQ AI agents handle data migration from several platforms
        </h3>

        <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 flex-nowrap overflow-x-auto no-scrollbar py-2">
          {/* Tableau */}
          <div className="shrink-0 h-14 flex items-center justify-center hover:scale-105 transition-transform duration-200">
            <img
              src="/logos/tableau.png"
              alt="Tableau"
              className="h-8 sm:h-9 lg:h-10 w-auto object-contain"
            />
          </div>

          {/* Qlik */}
          <div className="shrink-0 h-14 flex items-center justify-center hover:scale-105 transition-transform duration-200">
            <span className="font-bold text-xl sm:text-2xl tracking-tight text-gray-900 font-display whitespace-nowrap flex items-center">
              Qlik&nbsp;<span className="text-emerald-600 font-medium">Sense</span>
            </span>
          </div>

          {/* Snowflake */}
          <div className="shrink-0 h-14 flex items-center justify-center hover:scale-105 transition-transform duration-200">
            <img
              src="/logos/snowflake.png"
              alt="Snowflake"
              className="h-8 sm:h-9 lg:h-10 w-auto object-contain"
            />
          </div>

          {/* Databricks */}
          <div className="shrink-0 h-14 flex items-center justify-center hover:scale-105 transition-transform duration-200">
            <img
              src="/logos/databricks.png"
              alt="Databricks"
              className="h-7 sm:h-8 lg:h-9 w-auto object-contain"
            />
          </div>

          {/* SQL Server */}
          <div className="shrink-0 h-14 flex items-center justify-center hover:scale-105 transition-transform duration-200">
            <img
              src="/logos/sqlserver.png"
              alt="SQL Server"
              className="h-9 sm:h-10 lg:h-11 w-auto object-contain"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

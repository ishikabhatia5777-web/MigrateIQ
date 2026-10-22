import React from 'react';
import { ArrowRight } from 'lucide-react';

export const StatsSection: React.FC = () => {
  return (
    <section className="bg-slate-50 py-20 px-6 lg:px-12 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        
        {/* 3 Metric Stat Cards matching vectorlab.ai */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs text-center flex flex-col justify-center">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 font-display mb-3">
              Up to 50%
            </span>
            <span className="text-lg font-semibold text-gray-700">
              Faster Migration
            </span>
            <p className="text-xs text-gray-500 mt-2">
              Accelerates project delivery timeline from months to days
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs text-center flex flex-col justify-center">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 font-display mb-3">
              Up to 75%
            </span>
            <span className="text-lg font-semibold text-gray-700">
              Reduction in Effort
            </span>
            <p className="text-xs text-gray-500 mt-2">
              Eliminates manual measure rewriting and layout reconstruction
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs text-center flex flex-col justify-center">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 font-display mb-3">
              Up to 75%
            </span>
            <span className="text-lg font-semibold text-gray-700">
              of Tasks Automated
            </span>
            <p className="text-xs text-gray-500 mt-2">
              Autonomous agents handle discovery, parsing, DAX, and validation
            </p>
          </div>

        </div>

        {/* Platform migration logo banner matching vectorlab.ai */}
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-display mb-8">
            MigrateIQ AI agents handle data migration from several platforms
          </h3>

          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-nowrap overflow-x-auto no-scrollbar py-2">
            {/* Tableau */}
            <div className="h-12 flex items-center justify-center">
              <img
                src="/logos/tableau.png"
                alt="Tableau"
                className="h-9 sm:h-10 object-contain hover:scale-105 transition-all"
              />
            </div>

            {/* Qlik */}
            <div className="h-12 flex items-center justify-center font-bold text-xl sm:text-2xl text-gray-900 font-display">
              <span>Qlik <span className="text-emerald-600 font-medium">Sense</span></span>
            </div>

            {/* Snowflake */}
            <div className="h-12 flex items-center justify-center">
              <img
                src="/logos/snowflake.png"
                alt="Snowflake"
                className="h-9 sm:h-10 object-contain hover:scale-105 transition-all"
              />
            </div>

            {/* Databricks */}
            <div className="h-12 flex items-center justify-center">
              <img
                src="/logos/databricks.png"
                alt="Databricks"
                className="h-8 sm:h-9 object-contain hover:scale-105 transition-all"
              />
            </div>

            {/* SQL Server */}
            <div className="h-12 flex items-center justify-center">
              <img
                src="/logos/sqlserver.png"
                alt="SQL Server"
                className="h-9 sm:h-10 object-contain hover:scale-105 transition-all"
              />
            </div>

            <ArrowRight className="w-5 h-5 text-gray-400 hidden sm:block" />

            {/* Target: Microsoft Fabric */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-xs">
              <img
                src="https://images.squarespace-cdn.com/content/v1/679d89679ef8b943803f6a4a/5c308bb2-7bf4-428e-b405-bf95fc770b1a/Fabric_final_x256.png"
                alt="Microsoft Fabric"
                className="w-6 h-6 object-contain"
              />
              <span className="font-bold text-sm text-gray-950">Microsoft Fabric</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

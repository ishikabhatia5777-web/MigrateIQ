import React from 'react';
import { ExternalLink } from 'lucide-react';

export const MarketplaceSection: React.FC = () => {
  return (
    <section className="bg-white py-16 lg:py-24 px-6 lg:px-12 border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 font-display mb-4">
            Get MigrateIQ through Microsoft Marketplace
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Draws down your existing Azure commitment. Private offers and pilot pricing available through your Microsoft account team.
          </p>
        </div>

        {/* 3 Offer Cards matching vectorlab.ai */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. Tableau to Fabric */}
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8 flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 bg-cyan-100 px-2.5 py-1 rounded inline-block mb-4">
                Available Now
              </span>
              <h3 className="text-2xl font-bold text-gray-900 font-display mb-3">
                Tableau to Fabric
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Workbooks, data models and calculated fields converted to Fabric Reports
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700">Azure MACC Eligible</span>
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </div>
          </div>

          {/* 2. Qlik to Fabric */}
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8 flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded inline-block mb-4">
                Available Now
              </span>
              <h3 className="text-2xl font-bold text-gray-900 font-display mb-3">
                Qlik to Fabric
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Sense apps, load scripts and set analysis expressions mapped into Fabric and DAX.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700">Azure MACC Eligible</span>
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </div>
          </div>

          {/* 3. Snowflake to Fabric */}
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8 flex flex-col justify-between hover:shadow-lg transition-all opacity-85">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600 bg-gray-200 px-2.5 py-1 rounded inline-block mb-4">
                Roadmap
              </span>
              <h3 className="text-2xl font-bold text-gray-900 font-display mb-3">
                Snowflake to Fabric
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Direct migration of tables, views, and SQL dialects to Fabric Direct Lake.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Coming soon</span>
              <span className="text-xs text-cyan-600 font-semibold">Join Waitlist</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

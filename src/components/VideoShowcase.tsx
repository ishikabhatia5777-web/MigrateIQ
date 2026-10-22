import React from 'react';

export const VideoShowcase: React.FC = () => {
  return (
    <section className="bg-white py-16 lg:py-24 px-6 lg:px-12 border-b border-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-950 font-display mb-10">
          See MigrateIQ for migrating from Qlik/Tableau to Microsoft Fabric in action
        </h3>

        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-slate-950">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/kofp_Xa3sQA?feature=oembed"
            title="MigrateIQ: Qlik/Tableau to Microsoft Fabric"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

      </div>
    </section>
  );
};

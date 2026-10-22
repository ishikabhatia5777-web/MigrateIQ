import React from 'react';

export const SwitchbladeIntro: React.FC = () => {
  return (
    <section className="bg-white py-16 lg:py-24 px-6 lg:px-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Heading, Divider, Subtitle, Fabric Logo */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-950 tracking-tight font-display">
            MigrateIQ
          </h2>

          <div className="w-full max-w-md h-[1.5px] bg-gray-300 my-8" />

          <p className="text-2xl sm:text-3xl text-gray-900 font-medium tracking-tight mb-10 leading-snug">
            Multi-agent migration platform for Microsoft Fabric.
          </p>

          <div>
            <img
              src="https://images.squarespace-cdn.com/content/v1/679d89679ef8b943803f6a4a/5c308bb2-7bf4-428e-b405-bf95fc770b1a/Fabric_final_x256.png"
              alt="Microsoft Fabric Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* Right Column: Circular Earth Night Image */}
        <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
          <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] lg:w-[480px] lg:h-[480px] rounded-full overflow-hidden shadow-2xl bg-black border-4 border-gray-100">
            <img
              src="https://images.squarespace-cdn.com/content/v1/679d89679ef8b943803f6a4a/1739164427134-5XHRNUPWWQ2GT4IAU5XR/unsplash-image-1lfI7wkGWZ4.jpg"
              alt="Earth from Space City Lights"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

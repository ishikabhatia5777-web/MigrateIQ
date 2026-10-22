import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SwitchbladeIntro } from './components/SwitchbladeIntro';
import { KeyStats } from './components/KeyStats';
import { SupportedPlatforms } from './components/SupportedPlatforms';
import { VideoShowcase } from './components/VideoShowcase';
import { AgentShowcase } from './components/AgentShowcase';
import { MarketplaceSection } from './components/MarketplaceSection';
import { EcosystemSupport } from './components/EcosystemSupport';
import { ContactSection } from './components/ContactSection';
import { ArchitectureModal } from './components/ArchitectureModal';
import { RoiCalculatorModal } from './components/RoiCalculatorModal';
import { Footer } from './components/Footer';
import { Platform } from './types/migration';

export const App: React.FC = () => {
  const [currentPlatform, setCurrentPlatform] = useState<Platform>('tableau');
  
  // Modals
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);
  const [isRoiModalOpen, setIsRoiModalOpen] = useState(false);

  // Smooth scroll helpers
  const scrollToContact = () => {
    const el = document.getElementById('contact-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAgents = () => {
    const el = document.getElementById('agents-showcase-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Platform switch handler
  const handlePlatformChange = (platform: Platform) => {
    setCurrentPlatform(platform);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900 antialiased selection:bg-cyan-100 selection:text-cyan-900">
      
      {/* 1. Header Navigation */}
      <Navbar
        currentPlatform={currentPlatform}
        onPlatformChange={handlePlatformChange}
        onOpenArch={() => setIsArchModalOpen(true)}
        onOpenRoi={() => setIsRoiModalOpen(true)}
        onScrollToContact={scrollToContact}
      />

      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <HeroSection
          platform={currentPlatform}
          onRunMigration={scrollToContact}
          onLearnMore={scrollToAgents}
          isProcessing={false}
        />

        {/* 3. Switchblade / MigrateIQ Intro */}
        <SwitchbladeIntro />

        {/* 4. Statistics Section (50% Faster, ~50% Effort, 75% Automated) */}
        <KeyStats />

        {/* 5. Supported Platforms Logo Strip */}
        <SupportedPlatforms />

        {/* 6. Video Showcase Section */}
        <VideoShowcase />

        {/* 7. AI-Agent Showcase (Diagnosis, Metadata, Convergence, BI Engineering, QA) */}
        <div id="agents-showcase-section">
          <AgentShowcase
            onSelectStage={() => scrollToContact()}
          />
        </div>

        {/* 8. Microsoft Marketplace Section */}
        <MarketplaceSection />

        {/* 9. Microsoft Ecosystem Support */}
        <EcosystemSupport />

        {/* 10. Contact / Demo Section */}
        <ContactSection />

      </main>

      {/* 11. Footer matching Vector Lab */}
      <Footer />

      {/* Modals */}
      <ArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />

      <RoiCalculatorModal
        isOpen={isRoiModalOpen}
        onClose={() => setIsRoiModalOpen(false)}
      />

    </div>
  );
};

export default App;

import { useState } from "react";
import { Hero } from "./components/Hero";
import { FeatureDetailModal } from "./components/FeatureDetailModal";
import { TrailExplorerModal } from "./components/TrailExplorerModal";
import { ContactDrawer } from "./components/ContactDrawer";
// import { NextSectionSlot } from "./components/NextSectionSlot"; 
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import AdventureShowcase from "./components/AdventureShowcase";
import PlacesSection from "./components/PlacesSection";
import Explore from "./components/Explore";

export default function App() {
  const [exploreModalOpen, setExploreModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState({
    isOpen: false,
    title: "",
    description: "",
  });

  const handleFeatureClick = (title, description) => {
    setActiveFeature({
      isOpen: true,
      title,
      description,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* 1. Floating Glassmorphism Navbar */}
      <Navbar
        onOpenExplore={() => setExploreModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* 2. Hero Section with IMG_3641 Integration */}
      <main className="flex-1">
        <Hero
          onExploreClick={() => setExploreModalOpen(true)}
          onFeatureClick={handleFeatureClick}
        />

        {/* 3. Section Slot for subsequent design attachments */}
        <AdventureShowcase onDiscoverClick={() => setExploreModalOpen(true)} />

        <PlacesSection />
        <Explore />
      </main>

      {/* 4. Quiet Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <TrailExplorerModal
        isOpen={exploreModalOpen}
        onClose={() => setExploreModalOpen(false)}
        // onSelectTrail={(title) => {
        //   // Trail selected
        // }}
      />

      <ContactDrawer
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      <FeatureDetailModal
        isOpen={activeFeature.isOpen}
        onClose={() => setActiveFeature((prev) => ({ ...prev, isOpen: false }))}
        title={activeFeature.title}
        description={activeFeature.description}
        onExplore={() => setExploreModalOpen(true)}
      />
    </div>
  );
}

import { useState, useEffect } from "react";
import { Hero } from "./components/Hero";
import { FeatureDetailModal } from "./components/FeatureDetailModal";
import { ContactDrawer } from "./components/ContactDrawer";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import AdventureShowcase from "./components/AdventureShowcase";
import PlacesSection from "./components/PlacesSection";
import Explore from "./components/Explore";
import AboutPage from "./components/AboutPage";
import DiscoverPage from "./components/DiscoverPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [discoverTrailId, setDiscoverTrailId] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState({
    isOpen: false,
    title: "",
    description: "",
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#about") {
        setCurrentPage("about");
      } else if (hash === "#discover") {
        setCurrentPage("discover");
      } else if (hash === "#home") {
        setCurrentPage("home");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === "about") window.location.hash = "#about";
    else if (page === "discover") window.location.hash = "#discover";
    else window.location.hash = "#home";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenDiscover = (trailId = null) => {
    setDiscoverTrailId(trailId);
    handleNavigate("discover");
  };

  const handleFeatureClick = (title, description) => {
    setActiveFeature({ isOpen: true, title, description });
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#262216] flex flex-col font-sans selection:bg-[#332d1b] selection:text-white">
      {/* 1. Floating Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenDiscover={() => handleOpenDiscover()}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* 2. Main Page Views */}
      <main className="flex-1">
        {currentPage === "about" ? (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenExplore={() => handleOpenDiscover()}
            onOpenContact={() => setContactModalOpen(true)}
          />
        ) : currentPage === "discover" ? (
          <DiscoverPage
            initialTrailId={discoverTrailId}
            onOpenContact={() => setContactModalOpen(true)}
          />
        ) : (
          <>
            <Hero
              onExploreClick={() => handleOpenDiscover()}
              onFeatureClick={handleFeatureClick}
            />

            <AdventureShowcase onDiscoverClick={() => handleOpenDiscover()} />

            <PlacesSection
              onSeeMore={() => handleOpenDiscover()}
              onBookPlace={(trailId) => handleOpenDiscover(trailId)}
            />
            <Explore />
          </>
        )}
      </main>

      {/* 3. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals */}
      <ContactDrawer
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      <FeatureDetailModal
        isOpen={activeFeature.isOpen}
        onClose={() => setActiveFeature((prev) => ({ ...prev, isOpen: false }))}
        title={activeFeature.title}
        description={activeFeature.description}
        onExplore={() => handleOpenDiscover()}
      />
    </div>
  );
}

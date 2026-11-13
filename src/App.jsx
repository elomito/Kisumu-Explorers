import { useState, useEffect } from "react";
import { Hero } from "./components/Hero";
import { FeatureDetailModal } from "./components/FeatureDetailModal";
import { TrailExplorerModal } from "./components/TrailExplorerModal";
import { ContactDrawer } from "./components/ContactDrawer";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import AdventureShowcase from "./components/AdventureShowcase";
import PlacesSection from "./components/PlacesSection";
import Explore from "./components/Explore";
import AboutPage from "./components/AboutPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [exploreModalOpen, setExploreModalOpen] = useState(false);
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
    window.location.hash = page === "about" ? "#about" : "#home";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFeatureClick = (title, description) => {
    setActiveFeature({
      isOpen: true,
      title,
      description,
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#262216] flex flex-col font-sans selection:bg-[#332d1b] selection:text-white">
      {/* 1. Floating Glassmorphism Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenExplore={() => setExploreModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* 2. Main Page Views */}
      <main className="flex-1">
        {currentPage === "about" ? (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenExplore={() => setExploreModalOpen(true)}
            onOpenContact={() => setContactModalOpen(true)}
          />
        ) : (
          <>
            <Hero
              onExploreClick={() => setExploreModalOpen(true)}
              onFeatureClick={handleFeatureClick}
            />

            <AdventureShowcase onDiscoverClick={() => setExploreModalOpen(true)} />

            <PlacesSection onSeeMore={() => setExploreModalOpen(true)} />
            <Explore />
          </>
        )}
      </main>

      {/* 3. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Modals & Drawers */}
      <TrailExplorerModal
        isOpen={exploreModalOpen}
        onClose={() => setExploreModalOpen(false)}
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

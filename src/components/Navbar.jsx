
import { useState } from "react";
import {
  ArrowRight,
  Compass,
  Menu,
  Mountain,
  X,
} from "lucide-react";

export function Navbar({ onOpenExplore, onOpenContact }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About us", href: "#about" },
    { label: "Adventures", href: "#adventures" },
    { label: "Discover", href: "#discover" },
  ];

  const handleExplore = () => {
    setMobileMenuOpen(false);
    onOpenExplore?.();
  };

  const handleContact = () => {
    setMobileMenuOpen(false);
    onOpenContact?.();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-6 sm:pt-5">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex h-[68px] max-w-[1320px] items-center justify-between rounded-full border border-white/20 bg-[#10291f]/65 px-4 shadow-lg shadow-black/10 backdrop-blur-2xl sm:px-6"
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Kisumu Explorers home"
          className="group flex shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5f36a]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c5f36a] text-[#173b25] transition-transform duration-300 group-hover:rotate-[-8deg]">
            <Mountain size={22} strokeWidth={2.2} />
          </span>

          <span className="flex flex-col leading-none">
            <span className="text-[14px] font-extrabold tracking-[-0.045em] text-white sm:text-base">
              KISUMU
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/65 sm:text-[10px]">
              Explorers
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative py-2 text-[13px] font-medium transition-colors duration-200 hover:text-[#c5f36a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5f36a] ${
                index === 0 ? "text-white" : "text-white/75"
              }`}
            >
              {link.label}
              {index === 0 && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-4 rounded-full bg-[#c5f36a]" />
              )}
            </a>
          ))}
        </div>

        {/* Desktop action */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={handleContact}
            className="rounded-full px-4 py-3 text-[13px] font-semibold text-white/85 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5f36a]"
          >
            Get in touch
          </button>

          <button
            type="button"
            onClick={handleExplore}
            className="group inline-flex items-center gap-2 rounded-full bg-[#c5f36a] px-5 py-3 text-[13px] font-bold text-[#183320] transition duration-300 hover:bg-[#d5ff8c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Let's explore
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5f36a] lg:hidden"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="absolute left-0 right-0 top-[calc(100%+12px)] rounded-[28px] border border-white/15 bg-[#10291f]/95 p-4 text-white shadow-2xl shadow-black/30 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-[#c5f36a]"
                >
                  {link.label}
                  <ArrowRight size={16} />
                </a>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={handleContact}
                className="rounded-full border border-white/20 px-3 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                Contact us
              </button>

              <button
                type="button"
                onClick={handleExplore}
                className="flex items-center justify-center gap-2 rounded-full bg-[#c5f36a] px-3 py-3 text-sm font-bold text-[#183320] transition hover:bg-[#d5ff8c]"
              >
                <Compass size={16} />
                Explore
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;

import { useState } from "react";
import { Menu, X, Compass, Mountain, ArrowRight } from "lucide-react";

export function Navbar({
  currentPage = "home",
  onNavigate,
  onOpenExplore,
  onOpenContact,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      label: "Home",
      href: "#home",
      active: currentPage === "home",
      onClick: () => onNavigate?.("home"),
    },
    {
      label: "About",
      href: "#about",
      active: currentPage === "about",
      onClick: () => onNavigate?.("about"),
    },
    { label: "Discover", href: "#discover", onClick: onOpenExplore },
    { label: "Contact Us", href: "#contact", onClick: onOpenContact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 md:pt-6">
      <nav
        aria-label="Main Navigation"
        className="max-w-6xl mx-auto h-14 md:h-16 px-5 md:px-7 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg shadow-black/10 flex items-center justify-between transition-all duration-300"
      >
        {/* Brand Zone */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.("home");
          }}
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded-full py-1 pr-3 cursor-pointer"
        >
          {/* Gold / Tan Circular Emblem from the design */}
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#d2b87f] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
            <Mountain className="w-4 h-4 text-[#332d1b] stroke-[2.2]" />
          </div>

          <div className="flex items-baseline font-semibold text-base md:text-lg tracking-tight text-white select-none">
            <span>traveler.com</span>
          </div>
        </a>

        {/* Navigation Links Zone */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick();
                }
              }}
              className={`text-sm font-medium transition-all duration-200 cursor-pointer ${
                link.active
                  ? "bg-[#332d1b]/80 text-white font-semibold px-4 py-1.5 rounded-full shadow-sm"
                  : "text-white/85 hover:text-white px-3 py-1.5"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Action: White Circular Hamburger Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/95 hover:bg-white text-[#332d1b] shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Menu className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Card */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-6xl mx-auto rounded-3xl bg-[#332d1b]/95 backdrop-blur-2xl border border-white/20 p-5 shadow-2xl text-white animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-white/10 transition-colors text-base font-medium text-white/90 hover:text-white"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#d2b87f] opacity-80" />
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenExplore?.();
              }}
              className="w-full py-3 px-5 rounded-full bg-[#332d1b] hover:bg-[#242013] text-white font-semibold text-sm flex items-center justify-center gap-2 border border-white/20 shadow-lg transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#d2b87f]" />
              <span>Explore Nature Trails</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

import { useEffect, useRef, useState } from "react";
import { Menu, X, Compass, Mountain, ArrowRight } from "lucide-react";

// Keyed by what is BEHIND the navbar
const THEMES = {
  dark: {
    // dark content behind -> bright nav
    nav: "bg-white/85 border-white/60 shadow-black/20",
    brand: "text-[#1f1b10]",
    link: "text-[#1f1b10]/75 hover:text-[#1f1b10]",
    pill: "bg-[#332d1b] text-white",
    button: "bg-[#1f1b10] hover:bg-black text-white",
  },
  light: {
    // bright content behind -> dark nav
    nav: "bg-[#1f1b10]/85 border-white/15 shadow-black/30",
    brand: "text-white",
    link: "text-white/85 hover:text-white",
    pill: "bg-white/20 text-white",
    button: "bg-white/95 hover:bg-white text-[#332d1b]",
  },
};

export function Navbar({
  currentPage = "home",
  onNavigate,
  onOpenExplore,
  onOpenContact,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bgUnderNav, setBgUnderNav] = useState("dark"); // hero is dark by default
  const headerRef = useRef(null);
  const navRef = useRef(null);

  // Detect what is behind the navbar and pick a theme
  useEffect(() => {
    let frame = 0;

    const detect = () => {
      frame = 0;
      const header = headerRef.current;
      const nav = navRef.current;
      if (!header || !nav) return;

      const rect = nav.getBoundingClientRect();
      const x = window.innerWidth / 2;
      const y = rect.top + rect.height / 2;

      // elementsFromPoint returns the full stack under that point
      const stack = document.elementsFromPoint(x, y);
      for (const el of stack) {
        if (header.contains(el)) continue; // skip the navbar itself
        const tagged = el.closest("[data-nav-bg]");
        if (tagged) {
          const value = tagged.getAttribute("data-nav-bg");
          setBgUnderNav(value === "light" ? "light" : "dark");
          return;
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(detect);
    };

    detect();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const theme = THEMES[bgUnderNav];

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
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 md:pt-6"
    >
      <nav
        ref={navRef}
        aria-label="Main Navigation"
        className={`max-w-6xl mx-auto h-14 md:h-16 px-5 md:px-7 rounded-full backdrop-blur-xl border shadow-lg flex items-center justify-between transition-colors duration-300 ${theme.nav}`}
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
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#d2b87f] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
            <Mountain className="w-4 h-4 text-[#332d1b] stroke-[2.2]" />
          </div>

          <div
            className={`flex items-baseline font-semibold text-base md:text-lg tracking-tight select-none transition-colors duration-300 ${theme.brand}`}
          >
            <span>kisumuexplorers.com</span>
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
              className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${
                link.active
                  ? `${theme.pill} font-semibold px-4 py-1.5 rounded-full shadow-sm`
                  : `${theme.link} px-3 py-1.5`
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`w-9 h-9 md:w-10 md:h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer ${theme.button}`}
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Menu className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Card (dark in both themes, so it stays readable) */}
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
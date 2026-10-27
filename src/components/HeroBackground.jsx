import { useEffect, useMemo, useState } from "react";

export const DEFAULT_HERO_IMAGE = "/images/hero.png";

const HERO_IMAGES = [
  DEFAULT_HERO_IMAGE,
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/images/hero4.jpg",
  "/images/hero5.jpg",
];

export function HeroBackground({ imageSrc = DEFAULT_HERO_IMAGE }) {
  const images = useMemo(
    () => HERO_IMAGES.map((src, i) => (i === 0 ? imageSrc : src)),
    [imageSrc]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [hasRotated, setHasRotated] = useState(false);
  const [status, setStatus] = useState({}); // { [src]: "loaded" | "failed" }

  const markStatus = (src, value) =>
    setStatus((current) =>
      current[src] === value ? current : { ...current, [src]: value }
    );

  // Preload every image so the rotation can skip broken ones
  useEffect(() => {
    setStatus({});
    setActiveIndex(0);
    setHasRotated(false);

    let cancelled = false;
    images.forEach((src) => {
      const img = new Image();
      img.onload = () => !cancelled && markStatus(src, "loaded");
      img.onerror = () => {
        console.warn("Hero image failed to load:", src);
        !cancelled && markStatus(src, "failed");
      };
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [images]);

  // Rotate through loaded images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => {
        for (let step = 1; step <= images.length; step++) {
          const next = (current + step) % images.length;
          if (status[images[next]] === "loaded") {
            setHasRotated(true);
            return next;
          }
        }
        return current;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [images, status]);

  return (
    <div
      className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-slate-900"
      aria-hidden="true"
    >
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt=""
          loading="eager"
          fetchPriority={index === 0 ? "high" : "auto"}
          className={`absolute inset-0 h-full w-full object-cover object-center ${
            hasRotated ? "transition-opacity duration-[1500ms] ease-in-out" : ""
          } ${
            activeIndex === index && status[src] !== "failed"
              ? "opacity-100"
              : "opacity-0"
          }`}
          draggable="false"
        />
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-950/20" />
    </div>
  );
}

export default HeroBackground;
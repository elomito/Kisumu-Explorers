import { useState } from "react";

/**
 * Placeholder image path for the Hero background.
 * You can place your image inside the 'public/' directory (e.g. public/hero.png)
 * and update the path here:
 */
export const DEFAULT_HERO_IMAGE = "/IMG_3641 1.png";

export function HeroBackground({ imageSrc = DEFAULT_HERO_IMAGE }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
      {/* 1. If an image path is specified and loads successfully */}
      {imageSrc && !hasError && (
        <div className="relative w-full h-full">
          <img
            src={imageSrc}
            alt="Hero background adventure trail"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Calibrated contrast scrim ensuring legible white hero typography */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      {/* 2. Fallback artwork if the image file has not yet been placed in the public/ folder */}
      {(!imageSrc || hasError) && (
        <div className="relative w-full h-full">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0b58a3" />
                <stop offset="25%" stopColor="#196cb9" />
                <stop offset="55%" stopColor="#2c80cb" />
                <stop offset="85%" stopColor="#559ee2" />
                <stop offset="100%" stopColor="#7cb8f0" />
              </linearGradient>

              <linearGradient
                id="cirrusGrad1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="50%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
              </linearGradient>

              <linearGradient
                id="cirrusGrad2"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
              </linearGradient>

              <linearGradient
                id="rockFaceGrad"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#43494e" />
                <stop offset="35%" stopColor="#303539" />
                <stop offset="70%" stopColor="#222528" />
                <stop offset="100%" stopColor="#141618" />
              </linearGradient>

              <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
                <stop offset="50%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0.4" />
              </radialGradient>
            </defs>

            {/* Azure Sky */}
            <rect width="1920" height="1080" fill="url(#skyGrad)" />

            {/* Cirrus Clouds */}
            <g opacity="0.85">
              <path
                d="M 1100 30 C 1320 80, 1600 150, 1920 230 L 1920 290 C 1580 210, 1280 140, 1080 80 Z"
                fill="url(#cirrusGrad1)"
              />
              <path
                d="M 940 110 C 1220 180, 1540 300, 1880 430 L 1840 480 C 1460 330, 1160 220, 910 150 Z"
                fill="url(#cirrusGrad2)"
              />
              <path
                d="M 1200 190 C 1440 260, 1720 380, 1920 490 L 1920 540 C 1680 430, 1380 310, 1170 230 Z"
                fill="url(#cirrusGrad1)"
                opacity="0.65"
              />
              <ellipse
                cx="1780"
                cy="620"
                rx="220"
                ry="90"
                fill="#ffffff"
                opacity="0.35"
              />
            </g>

            {/* Summit Granite Rock Outcrop */}
            <path
              d="M -50 1100 L -50 670 Q 250 660, 520 710 Q 800 750, 1100 780 Q 1550 790, 1980 760 L 1980 1100 Z"
              fill="url(#rockFaceGrad)"
            />
            <path
              d="M -30 710 Q 200 670, 580 700 Q 780 720, 980 750 L 1050 770 Q 1380 775, 1750 750 Q 1900 740, 1950 750 L 1950 810 Q 1600 830, 1150 820 L 1040 840 Q 600 810, -30 820 Z"
              fill="#373d42"
            />

            {/* Hikers Silhouettes from Design */}
            <g id="hikers">
              {/* Central Hiker: Red shirt, blue bandana */}
              <circle cx="950" cy="510" r="28" fill="#543729" />
              <path
                d="M 922 505 C 930 480, 970 480, 980 502 Z"
                fill="#2563eb"
              />
              <path
                d="M 915 540 C 935 535, 965 535, 985 540 C 1025 570, 1050 635, 1020 685 L 890 685 C 870 635, 885 570, 915 540 Z"
                fill="#dc2626"
              />
              <path
                d="M 860 670 C 860 640, 1040 640, 1050 670 C 1050 710, 850 715, 860 670 Z"
                fill="#1e2226"
              />

              {/* Hiker Standing Hands on Hips */}
              <circle cx="700" cy="398" r="24" fill="#181c20" />
              <path
                d="M 670 424 Q 700 420, 730 424 L 740 495 L 660 495 Z"
                fill="#21262a"
              />
              <path
                d="M 670 428 C 630 445, 600 480, 625 530"
                fill="none"
                stroke="#21262a"
                strokeWidth="22"
                strokeLinecap="round"
              />
              <path
                d="M 730 428 C 770 445, 800 480, 775 530"
                fill="none"
                stroke="#21262a"
                strokeWidth="22"
                strokeLinecap="round"
              />
              <path
                d="M 672 500 L 660 690 L 690 690 L 700 560 L 710 690 L 740 690 L 728 500 Z"
                fill="#191c1f"
              />
            </g>

            <rect width="1920" height="1080" fill="url(#vignette)" />
          </svg>

          {/* Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/25 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 pointer-events-none" />
        </div>
      )}
    </div>
  );
}

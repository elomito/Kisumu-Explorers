import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Image as ImageIcon, UploadCloud, CheckCircle2, RefreshCw } from 'lucide-react';
import { HeroBackground } from './HeroBackground';
import { FeatureBar } from './FeatureBar';
import { saveHeroImage, loadHeroImage, clearHeroImage } from '../lib/imageStorage';

interface HeroProps {
  onExploreClick: () => void;
  onFeatureClick: (title: string, description: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onFeatureClick,
}) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load persisted hero photo on mount
  useEffect(() => {
    loadHeroImage().then((stored) => {
      if (stored) {
        setHeroImage(stored);
      }
    });
  }, []);

  const handleProcessFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, or WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result as string;
      if (result) {
        setHeroImage(result);
        await saveHeroImage(result);
        setToastMessage(`Loaded ${file.name} as Hero Background!`);
        setTimeout(() => setToastMessage(null), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleReset = async () => {
    await clearHeroImage();
    setHeroImage(null);
    setToastMessage('Reset to vector photo preview');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section
      id="home"
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-28 md:pt-32 pb-8 md:pb-12 px-4 sm:px-6 lg:px-12"
    >
      {/* Background Graphic or Loaded IMG_3641 Photo */}
      <HeroBackground
        customImageUrl={heroImage}
        onImageDrop={handleDrop}
        isDragging={isDragging}
      />

      {/* Hidden file input for picking IMG_3641 1.png */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900/90 text-white px-4 py-2.5 rounded-full border border-cyan-400/50 shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Hero Copy - Aligned Left as in Design */}
      <div className="relative z-20 max-w-6xl mx-auto w-full my-auto py-12 md:py-16">
        <div className="max-w-2xl text-left space-y-6">
          {/* Main Display Headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[78px] font-extrabold text-white tracking-tight leading-[1.06]"
            style={{
              textShadow:
                '0 4px 18px rgba(0, 0, 0, 0.65), 0 2px 6px rgba(0, 0, 0, 0.8)',
            }}
          >
            Discover Nature.
            <br />
            Find Your Escape.
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg md:text-xl text-white/95 font-normal max-w-xl leading-relaxed"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
            }}
          >
            Breathtaking places, unforgettable experiences
            <br />
            crafted just for you.
          </p>

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-3 px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-[#034d44] hover:bg-[#046156] active:bg-[#023b34] text-white font-semibold text-base md:text-lg shadow-xl shadow-teal-950/40 hover:shadow-teal-900/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <span>Explore Now</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Floating Feature Bar from the Design */}
      <div className="relative z-20 w-full mt-auto pt-6 space-y-4">
        <FeatureBar onFeatureClick={onFeatureClick} />

        {/* Quick Toolbar to Select or Switch IMG_3641 1.png */}
        <div className="flex items-center justify-center gap-2.5">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-white/80 hover:text-white bg-slate-950/50 hover:bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 hover:border-cyan-400/50 flex items-center gap-2 transition-all cursor-pointer shadow-md"
            title="Choose IMG_3641 1.png from your device to display in full original resolution"
          >
            <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {heroImage ? 'Change Image (IMG_3641)' : 'Load IMG_3641 1.png Photo'}
            </span>
          </button>

          {heroImage && (
            <button
              onClick={handleReset}
              className="text-xs text-white/70 hover:text-white bg-slate-950/40 hover:bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset background"
            >
              <RefreshCw className="w-3 h-3 text-slate-300" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

import { X, CheckCircle2, Shield, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function FeatureDetailModal({
  isOpen,
  onClose,
  title,
  description,
  onExplore,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-slate-900 border border-white/20 rounded-3xl shadow-2xl p-6 md:p-8 text-white animate-in zoom-in-95 duration-200"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-4">
          <Shield className="w-6 h-6 stroke-[2]" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {description}
        </p>

        <div className="space-y-2.5 mb-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              Rigorous safety and gear checks on every outdoor excursion
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>100% price transparency with no hidden guide fees</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              Flexible cancellation & rescheduling up to 48 hours prior
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <Button
            variant="ghost"
            onClick={onClose}
            className="rounded-full text-xs"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              onClose();
              onExplore();
            }}
            className="bg-[#034d44] hover:bg-[#046156] text-white rounded-full text-xs flex items-center gap-1.5"
          >
            <span>Explore Trails</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

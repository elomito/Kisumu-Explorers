import { useState } from "react";
import { X, Phone, Mail, Send, CheckCircle2, Clock } from "lucide-react";
import { Button } from "./ui/button";

export function ContactDrawer({ isOpen, onClose, prefillSubject }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    groupSize: "2 people",
    message: prefillSubject ? `Inquiry regarding: ${prefillSubject}` : "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-white/20 rounded-3xl shadow-2xl overflow-hidden text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div>
            <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider block mb-1">
              24/7 Expedition Desk
            </span>
            <h2
              id="contact-modal-title"
              className="text-xl font-bold text-white"
            >
              Connect with traveler.com
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/80 hover:text-white cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Message Dispatched!
              </h3>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Thank you, {formData.name}. Our wilderness expedition
                coordinator will review your request and get back to you at{" "}
                {formData.email} within 2 hours.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="rounded-full mt-4"
              >
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Planned Group Size
                </label>
                <select
                  value={formData.groupSize}
                  onChange={(e) =>
                    setFormData({ ...formData, groupSize: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="Solo Adventurer">Solo Adventurer (1)</option>
                  <option value="Duo (2)">Duo / Couple (2)</option>
                  <option value="Small Crew (3-5)">Small Crew (3–5)</option>
                  <option value="Expedition Group (6+)">
                    Large Group (6+)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Trail Wishes / Questions
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us what kind of terrain, dates, or experience you are looking for..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Avg reply: &lt; 2 hrs</span>
                </div>

                <Button
                  type="submit"
                  className="bg-[#034d44] hover:bg-[#046156] text-white rounded-full px-6 flex items-center gap-2"
                >
                  <span>Send Request</span>
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>+1 (800) 555-HIKE</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>team@traveler.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

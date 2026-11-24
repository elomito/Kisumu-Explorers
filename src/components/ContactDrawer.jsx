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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-[#262216]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#f5f1e8] border border-[#d6ccb9] rounded-3xl shadow-2xl overflow-hidden text-[#262216]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#d6ccb9] flex items-center justify-between bg-[#eae3d5]">
          <div>
            <span className="text-[#635e4e] text-xs font-semibold uppercase tracking-wider block mb-1">
              Get in Touch
            </span>
            <h2
              id="contact-modal-title"
              className="text-xl font-extrabold text-[#332d1b]"
            >
              Connect with Kisumu Explorers
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#d6ccb9] hover:bg-[#c4b9a4] flex items-center justify-center transition-colors text-[#635e4e] hover:text-[#332d1b] cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#332d1b]/10 text-[#332d1b] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#332d1b]">
                Message Sent!
              </h3>
              <p className="text-sm text-[#635e4e] max-w-sm mx-auto">
                Thank you, {formData.name}. Our team will review your request
                and get back to you at{" "}
                <span className="font-semibold text-[#332d1b]">{formData.email}</span> within 2 hours.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="rounded-full mt-4 bg-[#332d1b] hover:bg-[#242013] text-white"
              >
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#332d1b] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Achieng Omondi"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d6ccb9] text-[#332d1b] placeholder-[#9e9685] text-sm focus:outline-none focus:border-[#332d1b] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#332d1b] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="achieng@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d6ccb9] text-[#332d1b] placeholder-[#9e9685] text-sm focus:outline-none focus:border-[#332d1b] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#332d1b] mb-1.5">
                  Planned Group Size
                </label>
                <select
                  value={formData.groupSize}
                  onChange={(e) =>
                    setFormData({ ...formData, groupSize: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d6ccb9] text-[#332d1b] text-sm focus:outline-none focus:border-[#332d1b] transition-colors"
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
                <label className="block text-xs font-semibold text-[#332d1b] mb-1.5">
                  Trail Wishes / Questions
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us what kind of adventure, dates, or experience you're looking for..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d6ccb9] text-[#332d1b] placeholder-[#9e9685] text-sm focus:outline-none focus:border-[#332d1b] transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs text-[#9e9685]">
                  <Clock className="w-3.5 h-3.5 text-[#635e4e]" />
                  <span>Avg reply: &lt; 2 hrs</span>
                </div>

                <Button
                  type="submit"
                  className="bg-[#332d1b] hover:bg-[#242013] text-white rounded-full px-6 flex items-center gap-2"
                >
                  <span>Send Request</span>
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </form>
          )}

          {/* Contact info footer */}
          <div className="mt-6 pt-5 border-t border-[#d6ccb9] grid grid-cols-2 gap-3 text-xs text-[#9e9685]">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#635e4e]" />
              <span>+254 700 000 000</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#635e4e]" />
              <span>info@kisumuexplorers.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

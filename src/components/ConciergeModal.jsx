import React, { useState } from 'react';
import { X, Calendar, Clock, PhoneCall, Sparkles, Check } from 'lucide-react';

export default function ConciergeModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Virtual High-Definition Gemologist Session',
    date: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-xl">
      <div className="relative w-full max-w-lg vault-glass-elevated rounded-2xl border border-gold-400/30 p-8 shadow-2xl overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-alabaster-400 hover:text-gold-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-400/30 bg-obsidian-900 mb-3">
              <Sparkles className="w-3 h-3 text-gold-300" />
              <span className="text-[10px] tracking-widest uppercase font-sans text-gold-300">
                VIP Private Salon
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-alabaster-50 mb-2">
              Private Gemologist Consultation
            </h3>

            <p className="text-xs font-sans text-alabaster-300 font-light leading-relaxed mb-6">
              Reserve a private consultation with a Bhagvatam Senior Gemologist to curate loose diamonds, discuss bespoke ring settings, or inspect rare gemstones.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-alabaster-300 uppercase tracking-wider text-[10px] mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-obsidian-850 border border-gold-400/20 rounded-lg p-2.5 text-alabaster-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-alabaster-300 uppercase tracking-wider text-[10px] mb-1">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="eleanor@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-obsidian-850 border border-gold-400/20 rounded-lg p-2.5 text-alabaster-100 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-alabaster-300 uppercase tracking-wider text-[10px] mb-1">
                    Direct Phone / WhatsApp
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-obsidian-850 border border-gold-400/20 rounded-lg p-2.5 text-alabaster-100 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-alabaster-300 uppercase tracking-wider text-[10px] mb-1">
                  Consultation Experience
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-obsidian-850 border border-gold-400/20 rounded-lg p-2.5 text-alabaster-100 focus:outline-none focus:border-gold-400"
                >
                  <option>Virtual High-Definition Gemologist Session (Global)</option>
                  <option>Mayfair Private Salon Appointment (London)</option>
                  <option>Fifth Avenue Showroom Viewing (New York)</option>
                  <option>Royal Atelier Heritage Commission (Mumbai)</option>
                </select>
              </div>

              <div>
                <label className="block text-alabaster-300 uppercase tracking-wider text-[10px] mb-1">
                  Specific Requests or Questions
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your desired carat weight, timeline, or design inspiration..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-obsidian-850 border border-gold-400/20 rounded-lg p-2.5 text-alabaster-100 focus:outline-none focus:border-gold-400 placeholder:text-alabaster-400/40"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-obsidian-950 font-sans font-bold text-xs tracking-widest uppercase hover:shadow-gold-glow transition-all pt-3.5 mt-2 shadow-xl"
              >
                Confirm Salon Reservation
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-gold-400/20 border border-gold-400 flex items-center justify-center mx-auto text-gold-300">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif text-alabaster-50">Reservation Received</h3>
            <p className="text-xs font-sans text-alabaster-300 font-light leading-relaxed">
              A private client liaison from Bhagvatam will reach out within 4 business hours to finalize your appointment schedule and send the encrypted viewing link.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-gold-400 text-obsidian-950 text-xs font-sans tracking-widest uppercase font-semibold"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

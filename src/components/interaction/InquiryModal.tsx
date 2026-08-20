import React, { useState, useEffect, useRef } from 'react';
import { X, Check, ArrowRight, Sparkles, Send } from 'lucide-react';
import gsap from 'gsap';
import { Button } from '../ui/Button';
import { EASING } from '../../animations/core/constants';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>('$50k - $100k');
  const [timeline, setTimeline] = useState<string>('2 - 3 Months');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: '',
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const servicesList = [
    'Product Engineering',
    'High-Performance Web App',
    'AI & Autonomous Agents',
    'Spatial / Mobile XR',
    'Cloud & Distributed Systems',
    'Enterprise Modernization',
  ];

  const budgetOptions = [
    '$25k – $50k',
    '$50k – $100k',
    '$100k – $250k',
    '$250k+',
  ];

  const timelineOptions = [
    'Immediate (< 1 Month)',
    '2 – 3 Months',
    '3 – 6 Months',
    'Strategic Partnership (Ongoing)',
  ];

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        panelRef.current,
        { y: 50, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: EASING.power4Out }
      );
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      ctx.revert();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleClose = () => {
    gsap.to(panelRef.current, {
      y: 30,
      opacity: 0,
      scale: 0.96,
      duration: 0.25,
      ease: 'power3.in',
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        onClose();
        setTimeout(() => {
          setIsSubmitted(false);
          setStep(1);
        }, 300);
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-obsidian-950/85 backdrop-blur-2xl select-text"
      onClick={handleClose}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-obsidian-900 border border-jade-500/40 shadow-[0_0_80px_rgba(0,240,139,0.15)] p-6 sm:p-8 md:p-10 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-obsidian-800 text-[#8B949E] hover:text-white hover:border-jade-500 hover:bg-jade-500/10 transition-all duration-200"
          data-cursor-label="CLOSE"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-jade-500/20 border border-jade-500 flex items-center justify-center mx-auto mb-6 text-jade-400">
              <Check className="w-8 h-8" />
            </div>

            <span className="eyebrow-tag mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              TRANSMISSION RECEIVED
            </span>

            <h3 className="text-3xl sm:text-4xl font-syne font-bold uppercase mt-2 mb-4 text-white">
              LET'S ENGINEER THE IMPOSSIBLE.
            </h3>

            <p className="text-[#A1ABB8] text-base max-w-md mx-auto mb-8 font-light leading-relaxed">
              Thank you, {formData.name || 'Partner'}. Our principal engineering team has received your project parameters. We will respond with an architectural proposal within 24 hours.
            </p>

            <div className="p-4 rounded-xl border border-white/10 bg-obsidian-800/80 font-mono text-xs text-[#8B949E] max-w-sm mx-auto mb-8">
              BLUEPRINT ID: <span className="text-jade-400">#JQ-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>

            <Button variant="primary" onClick={handleClose}>
              RETURN TO SITE
            </Button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-mono text-jade-400 mb-2">
                <span>STEP {step} OF 3</span>
                <span>•</span>
                <span>INITIATE PROJECT INQUIRY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-syne font-bold uppercase tracking-tight text-white">
                {step === 1 && 'WHAT ARE WE BUILDING?'}
                {step === 2 && 'SCOPE & TIMELINE PARAMETERS'}
                {step === 3 && 'WHERE SHOULD WE SEND THE BLUEPRINT?'}
              </h3>
            </div>

            {/* Step 1: Capabilities */}
            {step === 1 && (
              <div>
                <p className="text-sm text-[#8B949E] mb-6">
                  Select all focus domains relevant to your vision:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {servicesList.map((srv) => {
                    const isSelected = selectedServices.includes(srv);
                    return (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => toggleService(srv)}
                        className={`p-4 rounded-xl text-left font-mono text-xs tracking-wider transition-all duration-200 border flex items-center justify-between ${
                          isSelected
                            ? 'border-jade-500 bg-jade-500/15 text-white shadow-[0_0_15px_rgba(0,240,139,0.15)]'
                            : 'border-white/10 bg-obsidian-800/60 text-[#CBD1D9] hover:border-white/20 hover:bg-obsidian-800'
                        }`}
                      >
                        <span>{srv}</span>
                        {isSelected && <Check className="w-4 h-4 text-jade-400 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    onClick={() => setStep(2)}
                    disabled={selectedServices.length === 0}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    CONTINUE TO SCOPE
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Budget & Timeline */}
            {step === 2 && (
              <div>
                <div className="mb-6">
                  <label className="block text-xs font-mono text-[#8B949E] uppercase tracking-wider mb-3">
                    TARGET CAPITAL ALLOCATION
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setBudget(opt)}
                        className={`p-3 rounded-xl text-center font-mono text-xs transition-all duration-200 border ${
                          budget === opt
                            ? 'border-jade-500 bg-jade-500/15 text-white font-semibold'
                            : 'border-white/10 bg-obsidian-800/60 text-[#8B949E] hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-mono text-[#8B949E] uppercase tracking-wider mb-3">
                    ESTIMATED LAUNCH TIMELINE
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {timelineOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setTimeline(opt)}
                        className={`p-3.5 rounded-xl text-left font-mono text-xs transition-all duration-200 border ${
                          timeline === opt
                            ? 'border-jade-500 bg-jade-500/15 text-white font-semibold'
                            : 'border-white/10 bg-obsidian-800/60 text-[#8B949E] hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-mono text-[#8B949E] hover:text-white"
                  >
                    ← BACK
                  </button>
                  <Button
                    variant="primary"
                    onClick={() => setStep(3)}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    FINAL DETAILS
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Form */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-mono text-[#8B949E] uppercase tracking-wider mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-obsidian-800/80 text-white placeholder-zinc-600 focus:outline-none focus:border-jade-500 text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#8B949E] uppercase tracking-wider mb-2">
                      CORPORATE EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elena@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-obsidian-800/80 text-white placeholder-zinc-600 focus:outline-none focus:border-jade-500 text-sm font-sans"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-mono text-[#8B949E] uppercase tracking-wider mb-2">
                    ORGANIZATION / CLIENT
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. NextGen Autonomous Systems"
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-obsidian-800/80 text-white placeholder-zinc-600 focus:outline-none focus:border-jade-500 text-sm font-sans"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-mono text-[#8B949E] uppercase tracking-wider mb-2">
                    PROJECT ARCHITECTURE & GOALS
                  </label>
                  <textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Describe your technical challenge, goals, or current architectural bottlenecks..."
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-obsidian-800/80 text-white placeholder-zinc-600 focus:outline-none focus:border-jade-500 text-sm font-sans resize-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-mono text-[#8B949E] hover:text-white"
                  >
                    ← BACK
                  </button>
                  <Button
                    type="submit"
                    variant="primary"
                    icon={<Send className="w-4 h-4" />}
                  >
                    TRANSMIT INQUIRY
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

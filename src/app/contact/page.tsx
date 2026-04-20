"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Contact() {
  const router = useRouter();
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Handle Form Input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  // Handle Countdown and Redirect
  useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isSuccess && countdown === 0) {
      router.push('/');
    }
  }, [isSuccess, countdown, router]);

  return (
    <div className="bg-[#09090b] min-h-screen flex flex-col pt-20">
      <Header />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24 animate-fade-in-up">
          <div className="mb-12 md:mb-16 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
              Let's start a conversation
            </h1>
            <p className="text-lg text-neutral-400">
              Whether you have a question about our services, or anything else, our team is ready to answer all your questions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Form / Success State */}
            <div className="lg:col-span-3 bg-neutral-900/40 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden min-h-[450px] flex flex-col">
              
              {isSuccess ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-neutral-900/95 backdrop-blur-md z-10 animate-scale-in">
                  <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <iconify-icon icon="solar:check-circle-bold" width="40" height="40" style={{ color: '#4ade80' }}></iconify-icon>
                  </div>
                  <h3 className="text-3xl font-medium tracking-tight text-white mb-3">Message Received</h3>
                  <p className="text-neutral-400 mb-10 max-w-sm">
                    Thank you, {formData.name.split(' ')[0] || 'there'}! We've received your message and will get back to you shortly.
                  </p>
                  
                  <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium text-neutral-300 shadow-sm">
                    <iconify-icon icon="solar:hourglass-linear" width="18" className="animate-spin" style={{ animationDuration: '3s' }}></iconify-icon>
                    Redirecting to home in <span className="w-4 text-center text-white">{countdown}s</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                  <div className="space-y-6 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2 text-left">
                        <label htmlFor="name" className="text-sm font-medium text-neutral-300 ml-1">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="w-full bg-neutral-950/50 border border-white/10 text-white placeholder-neutral-600 text-sm rounded-xl focus:ring-1 focus:ring-white focus:border-white block px-4 py-3 outline-none transition-all hover:bg-white/5"
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <label htmlFor="email" className="text-sm font-medium text-neutral-300 ml-1">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                          className="w-full bg-neutral-950/50 border border-white/10 text-white placeholder-neutral-600 text-sm rounded-xl focus:ring-1 focus:ring-white focus:border-white block px-4 py-3 outline-none transition-all hover:bg-white/5"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left flex-1 flex flex-col">
                      <label htmlFor="message" className="text-sm font-medium text-neutral-300 ml-1">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        className="w-full flex-1 bg-neutral-950/50 border border-white/10 text-white placeholder-neutral-600 text-sm rounded-xl focus:ring-1 focus:ring-white focus:border-white block px-4 py-3 outline-none transition-all resize-none hover:bg-white/5"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <p className="text-xs text-neutral-500">
                      By submitting, you agree to our privacy policy.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={clsx(
                        "inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-medium text-neutral-950 transition-all shadow-sm",
                        isSubmitting ? "opacity-80 cursor-not-allowed" : "hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <iconify-icon icon="solar:spinner-linear" width="18" className="animate-spin"></iconify-icon>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <iconify-icon icon="solar:arrow-right-linear" width="18"></iconify-icon>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Info & Map */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info Card */}
              <div className="bg-neutral-900/40 border border-white/10 rounded-3xl p-8 shadow-xl">
                <h3 className="text-lg font-medium tracking-tight text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 shrink-0">
                      <iconify-icon icon="solar:letter-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Email Us</p>
                      <a href="mailto:chyagroup2019@gmail.com" className="text-sm text-neutral-400 mt-0.5 hover:text-white transition-colors">
                        chyagroup2019@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 shrink-0">
                      <iconify-icon icon="solar:map-point-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Visit Headquarters</p>
                      <p className="text-sm text-neutral-400 mt-0.5 leading-relaxed">
                        Runaki Street, Erbil 44001<br/>Kurdistan Region, Iraq
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 shrink-0">
                      <iconify-icon icon="solar:phone-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Call Us</p>
                      <div className="flex flex-col gap-1 mt-0.5">
                        <a href="tel:+9647504798788" className="text-sm text-neutral-400 hover:text-white transition-colors">+964 750 479 8788</a>
                        <a href="tel:+9647504442688" className="text-sm text-neutral-400 hover:text-white transition-colors">+964 750 444 2688</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Embed Card */}
              <div className="bg-neutral-900/40 border border-white/10 rounded-3xl overflow-hidden shadow-xl h-[260px] relative group cursor-pointer">
                <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/10 transition-colors z-10 pointer-events-none"></div>
                <iframe 
                  src="https://maps.google.com/maps?q=Runaki%20street,%20Erbil,%20Iraq&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) grayscale(0.2)' }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 z-0"
                  title="Chya Group Headquarters Location"
                ></iframe>
                
                {/* Subtle overlay badge */}
                <div className="absolute bottom-4 left-4 z-20 bg-neutral-950/90 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-20"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  <span className="text-xs font-medium text-white tracking-tight">HQ Erbil</span>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

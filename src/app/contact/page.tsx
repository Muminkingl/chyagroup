"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n/translations';
import { cn } from '@/lib/utils';
import { Iconify } from '@/components/ui/Iconify';

export default function Contact() {
  const router = useRouter();
  const { locale, isRTL } = useLanguage();
  const t = translations[locale].contact;

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/chyagroup2019@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Message from ${formData.name} - Chya Group Portfolio`
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again or contact us directly via email.");
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="bg-[#faf9f6] min-h-screen flex flex-col pt-20">
      <Header />

      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24 animate-fade-in-up">
          <div className="mb-12 md:mb-16 max-w-2xl text-start">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0c1a2e] mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-[#3a4f6a] font-medium leading-relaxed">
              {t.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

            {/* Left Column: Form / Success State */}
            <div className="lg:col-span-3 bg-white border border-[#0c1a2e]/5 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden min-h-[450px] flex flex-col">

              {isSuccess ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white/95 backdrop-blur-md z-10 animate-scale-in">
                  <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Iconify icon="solar:check-circle-bold" width={40} height={40} style={{ color: '#22c55e' }} />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight text-[#0c1a2e] mb-3">
                    {t.form.successTitle}
                  </h3>
                  <p className="text-[#3a4f6a] mb-10 max-w-sm font-medium">
                    {t.form.successDesc.replace('{name}', formData.name.split(' ')[0] || '')}
                  </p>

                  <div className="inline-flex items-center gap-3 bg-[#f4f7f9] border border-[#0c1a2e]/10 px-5 py-2.5 rounded-full text-sm font-semibold text-[#0c1a2e] shadow-sm">
                    <Iconify icon="solar:hourglass-linear" width={18} className="animate-spin text-[#3b82f6]" style={{ animationDuration: '3s' }} />
                    {t.form.redirect.replace('{seconds}', countdown.toString())}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                  {/* Hidden metadata for FormSubmit */}
                  <input type="hidden" name="_subject" value={`New Contact from ${formData.name}`} />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="space-y-6 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2 text-start">
                        <label htmlFor="name" className="text-sm font-bold text-[#0c1a2e] ms-1">
                          {t.form.fullName}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t.form.placeholderName}
                          className="w-full bg-[#f4f7f9] border border-[#0c1a2e]/10 text-[#0c1a2e] placeholder-[#3a4f6a]/60 text-sm font-medium rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] block px-4 py-3 outline-none transition-all hover:bg-[#eaeef2]"
                        />
                      </div>
                      <div className="space-y-2 text-start">
                        <label htmlFor="email" className="text-sm font-bold text-[#0c1a2e] ms-1">
                          {t.form.email}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t.form.placeholderEmail}
                          className="w-full bg-[#f4f7f9] border border-[#0c1a2e]/10 text-[#0c1a2e] placeholder-[#3a4f6a]/60 text-sm font-medium rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] block px-4 py-3 outline-none transition-all hover:bg-[#eaeef2]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-start flex-1 flex flex-col">
                      <label htmlFor="message" className="text-sm font-bold text-[#0c1a2e] ms-1">
                        {t.form.message}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t.form.placeholderMessage}
                        className="w-full flex-1 bg-[#f4f7f9] border border-[#0c1a2e]/10 text-[#0c1a2e] placeholder-[#3a4f6a]/60 text-sm font-medium rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] block px-4 py-3 outline-none transition-all resize-none hover:bg-[#eaeef2]"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#0c1a2e]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-[#3a4f6a] font-medium text-start">
                      {t.form.privacy}
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={clsx(
                        "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0c1a2e] px-8 py-3 text-sm font-bold text-white transition-all shadow-md",
                        isSubmitting ? "opacity-80 cursor-not-allowed" : "hover:bg-[#162d4f] hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <Iconify icon="solar:spinner-linear" width={18} className="animate-spin" />
                          {t.form.sending}
                        </>
                      ) : (
                        <>
                          {t.form.submit}
                          <Iconify
                            icon={isRTL ? "solar:arrow-left-linear" : "solar:arrow-right-linear"}
                            width={18}
                          />
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
              <div className="bg-white border border-[#0c1a2e]/5 rounded-3xl p-8 shadow-sm text-start">
                <h3 className="text-lg font-bold tracking-tight text-[#0c1a2e] mb-6">
                  {t.info.title}
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f4f7f9] border border-[#0c1a2e]/10 flex items-center justify-center text-[#3b82f6] shrink-0">
                      <Iconify icon="solar:letter-linear" width={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0c1a2e]">{t.info.emailTitle}</p>
                      <a href="mailto:chyagroup2019@gmail.com" className="text-sm font-medium text-[#3a4f6a] mt-0.5 hover:text-[#3b82f6] transition-colors">
                        chyagroup2019@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f4f7f9] border border-[#0c1a2e]/10 flex items-center justify-center text-[#3b82f6] shrink-0">
                      <Iconify icon="solar:map-point-linear" width={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0c1a2e]">{t.info.visitTitle}</p>
                      <p className="text-sm font-medium text-[#3a4f6a] mt-0.5 leading-relaxed">
                        Runaki Street, Erbil 44001<br />Kurdistan Region, Iraq
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f4f7f9] border border-[#0c1a2e]/10 flex items-center justify-center text-[#3b82f6] shrink-0">
                      <Iconify icon="solar:phone-linear" width={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0c1a2e]">{t.info.callTitle}</p>
                      <div className="flex flex-col gap-1 mt-0.5" dir="ltr">
                        <a href="tel:+9647504798788" className="text-sm font-medium text-[#3a4f6a] hover:text-[#3b82f6] transition-colors">+964 750 479 8788</a>
                        <a href="tel:+9647504442688" className="text-sm font-medium text-[#3a4f6a] hover:text-[#3b82f6] transition-colors">+964 750 444 2688</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Embed Card */}
              <div className="bg-white border border-[#0c1a2e]/5 rounded-3xl overflow-hidden shadow-sm h-[260px] relative group cursor-pointer">
                <div className="absolute inset-0 bg-white/0 group-hover:bg-[#0c1a2e]/5 transition-colors z-10 pointer-events-none"></div>
                <iframe
                  src="https://maps.google.com/maps?q=Runaki%20street,%20Erbil,%20Iraq&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.1)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 z-0"
                  title="Chya Group Headquarters Location"
                ></iframe>

                {/* Subtle overlay badge */}
                <div className={cn(
                  "absolute bottom-4 z-20 bg-white/90 backdrop-blur-sm border border-[#0c1a2e]/10 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2",
                  isRTL ? "right-4" : "left-4"
                )}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]"></span>
                  </span>
                  <span className="text-xs font-bold text-[#0c1a2e] tracking-tight">{t.info.hqErbil}</span>
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

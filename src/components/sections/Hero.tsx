"use client";

import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white px-4 sm:px-6 lg:px-8">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-3xl opacity-50 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black z-10" />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-neutral-300 mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Setting the Global Standard
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
        >
          Building the Future, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">
            Empowering Growth.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed"
        >
          Chya Group is a premier portfolio of diverse enterprises, pioneering innovation across industries and creating sustainable value worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="w-full sm:w-auto group">
            Discover Our Portfolio
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Contact Us
          </Button>
        </motion.div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent z-20" />
    </section>
  );
};

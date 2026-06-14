"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  const word1 = "CHYA".split("");
  const word2 = "GROUP".split("");

  return (
    <div className="fixed inset-0 min-h-screen z-[100] flex flex-col items-center justify-center bg-[#faf9f6] overflow-hidden">
      {/* Ambient White Breathing Aura */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[350px] h-[350px] rounded-full bg-white blur-3xl shadow-[0_0_120px_rgba(255,255,255,0.9)]"
        />
        
        {/* Rotating concentric thin white lines */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[400px] h-[400px] rounded-full border border-white flex items-center justify-center opacity-40 shadow-inner"
        >
          <div className="w-[300px] h-[300px] rounded-full border border-dashed border-white/60" />
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Glowing Pure White Progress Orbit */}
        <div className="relative flex items-center justify-center">
          {/* Sweeping Pure White Progress Ring */}
          <svg className="w-36 h-36 absolute transform -rotate-90 overflow-visible" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="43"
              stroke="#ffffff"
              strokeWidth="2"
              strokeOpacity="0.4"
              fill="transparent"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="43"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray="270"
              filter="url(#white-glow)"
              animate={{
                strokeDashoffset: [270, -270],
                rotate: [0, 360],
              }}
              transition={{
                strokeDashoffset: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }
              }}
            />
            <defs>
              <filter id="white-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#ffffff" floodOpacity="0.9" />
              </filter>
            </defs>
          </svg>

          {/* Premium White Glassmorphism Card */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotateY: [0, 10, -10, 0],
              rotateX: [0, -5, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-24 h-24 bg-white/80 backdrop-blur-md rounded-[2.2rem] shadow-[0_20px_50px_rgba(255,255,255,0.8),0_10px_20px_rgba(12,26,46,0.04)] flex items-center justify-center p-5 border border-white/60 relative overflow-hidden [preserve-3d]"
          >
            {/* Glass sweep reflection */}
            <motion.div
              animate={{
                x: ["-120%", "220%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.5,
              }}
              className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/70 to-transparent -skew-x-12"
            />

            <img src="/logo.svg" alt="Chya Group Logo" className="w-full h-full object-contain select-none" />
          </motion.div>
        </div>

        {/* Brand text with modern blur-in letter animations */}
        <div className="flex flex-col items-center">
          <div className="flex gap-2.5 text-center" dir="ltr">
            <div className="flex gap-0.5">
              {word1.map((char, index) => (
                <motion.span
                  key={`w1-${index}`}
                  initial={{ opacity: 0, y: 8, filter: "blur(6px)", scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="text-[23px] font-black tracking-[0.02em] uppercase text-white drop-shadow-[0_2px_8px_rgba(12,26,46,0.15)] inline-block select-none"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <div className="flex gap-0.5">
              {word2.map((char, index) => (
                <motion.span
                  key={`w2-${index}`}
                  initial={{ opacity: 0, y: 8, filter: "blur(6px)", scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: (word1.length + index) * 0.05,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="text-[20px] font-bold tracking-[0.06em] uppercase text-white/95 drop-shadow-[0_2px_8px_rgba(12,26,46,0.15)] inline-block select-none"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Pure White Minimalist Progress Loader */}
          <div className="w-28 h-1 bg-white/40 rounded-full overflow-hidden mt-6 relative shadow-inner">
            <motion.div
              animate={{
                left: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 bottom-0 w-1/3 bg-white shadow-[0_0_8px_#ffffff]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}




'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Generate logo objects for C1.png through C32.png in the /clients directory
const logos = Array.from({ length: 32 }, (_, i) => {
  const num = i + 1;
  return {
    name: `Client ${num}`,
    icon: <img src={`/clients/C${num}.png`} alt={`Client ${num}`} className="h-16 md:h-24 w-auto object-contain" />
  };
});

export default function LogoTicker() {
  return (
    <section className="bg-white py-6 md:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-6 md:mb-10">
        <p className="text-[11px] font-bold tracking-[0.25em] text-slate-500 uppercase mb-3">
          Trusted By Industry Leaders
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">
          A few of the brands we've grown alongside
        </h2>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative flex overflow-hidden w-full group">
        {/* Left/Right Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Logo Row */}
        <motion.div
          className="flex flex-nowrap items-center gap-12 md:gap-20 pl-12 md:pl-20 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 50, // Adjust speed here
            repeat: Infinity,
          }}
        >
          {/* Double the logos to create an infinite loop effect */}
          {[...logos, ...logos].map((logo, idx) => (
            <div
              key={`row-${idx}`}
              className="flex items-center justify-center shrink-0 min-w-[120px]"
            >
              {logo.icon}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

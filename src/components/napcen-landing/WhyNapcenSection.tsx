"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

interface StepItem {
  id: string;
  category: string;
  title: string;
  description: string;
}

const stepsData: StepItem[] = [
  {
    id: "01",
    category: "APPLICATION UNDERSTANDING",
    title: "Start with the process",
    description:
      "Discuss the material, production task and capture points with a manufacturer whose equipment range spans dust collection and industrial extraction. The selected collector should fit the actual duty."
  },
  {
    id: "02",
    category: "SYSTEM COORDINATION",
    title: "Connect the equipment",
    description:
      "Bring collector, fan, ducting and discharge requirements into the same specification. Define supply boundaries clearly so procurement and production teams can assess the proposed arrangement."
  },
  {
    id: "03",
    category: "PROJECT COMMUNICATION",
    title: "Make support explicit",
    description:
      "Discuss drawings, installation coordination, commissioning and ongoing support before ordering. Confirm the services and documentation included for your site rather than relying on assumptions."
  }
];

export default function WhyNapcenSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="why-napcen"
      className="pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-20 lg:pb-12 bg-white relative overflow-hidden border-t border-slate-100 scroll-mt-28"
    >
      {/* Background Architectural Blueprint / Grid Motif */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#0a5cbb_1.5px,transparent_1.5px)] [background-size:28px_28px]"
        aria-hidden="true"
      />

      {/* Subtle CAD Crosshair Watermarks */}
      <div className="absolute top-12 left-10 text-slate-300 font-mono text-[10px] select-none pointer-events-none hidden lg:block">
        + NAPCEN-CAD // 02-SPEC-REV.C
      </div>
      <div className="absolute top-12 right-12 text-slate-300 font-mono text-[10px] select-none pointer-events-none hidden lg:block">
        GRID 24x28 // ISO-EXTRACTION
      </div>

      <div className="w-full px-5 sm:px-8 lg:px-14 xl:px-20 max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] xl:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 xl:gap-20 items-start">

          {/* ================= LEFT COLUMN ================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
            className="flex flex-col"
          >
            {/* Eyebrow Label */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
                WHY NAPCEN
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-black text-[#0f1b3a] tracking-tight leading-[1.06] mb-6">
              One conversation.
              <br />
              The complete
              <br />
              extraction requirement
              <span className="text-[#0a5cbb]">.</span>
            </h2>

            {/* Description Subtext */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-xl">
              NAPCEN designs, manufactures and supplies industrial air pollution control equipment from
              Puducherry, including dust collectors, blowers and ducting solutions.
            </p>

            {/* Pill CTA Button (Website Brand Colors) */}
            <div className="mb-6">
              <a
                href="#contact"
                onClick={handleCtaClick}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0a5cbb] hover:bg-[#084ea3] active:scale-95 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_10px_25px_rgba(10,92,187,0.28)] hover:shadow-[0_14px_32px_rgba(10,92,187,0.38)] transition-all duration-300 group cursor-pointer"
              >
                <span>Talk to our engineers</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>

            {/* Quick Consultation Assurance Badge */}
            <div className="flex items-start sm:items-center gap-3 text-slate-500 text-xs sm:text-[13px] font-medium pt-1 max-w-lg">
              <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5 sm:mt-0" />
              <span>
                Technical review includes duct sizing, static pressure calculations and supply boundary definition.
              </span>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN (TIMELINE STEPS) ================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="flex flex-col relative pt-2 lg:pt-6"
          >
            {/* The 3 Connected Steps */}
            <div className="relative">
              {/* Continuous Vertical Timeline Line */}
              <div
                className="absolute left-[11px] sm:left-[13px] top-6 sm:top-7 bottom-12 w-[2px] bg-gradient-to-b from-[#0a5cbb] via-[#0a5cbb] to-[#0a5cbb]/30"
                aria-hidden="true"
              />

              <div className="flex flex-col divide-y divide-slate-100">
                {stepsData.map((step, idx) => {
                  const isCurrent = activeStep === idx;

                  return (
                    <motion.div
                      key={step.id}
                      variants={fadeInUp}
                      onMouseEnter={() => setActiveStep(idx)}
                      className="relative pl-10 sm:pl-14 py-8 sm:py-10 first:pt-2 last:pb-4 transition-all duration-300 group cursor-default"
                    >
                      {/* Step Node Marker on Vertical Line - precisely aligned with step number */}
                      <div className="absolute left-0 top-[22px] sm:top-[26px] -translate-x-[1px] z-10">
                        {idx === 0 ? (
                          // Top Double-Ring Active Node (Styled in Website Royal Blue)
                          <div className="w-[26px] h-[26px] sm:w-7 sm:h-7 rounded-full border-2 border-[#0a5cbb] bg-white flex items-center justify-center shadow-[0_0_12px_rgba(10,92,187,0.3)]">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#0a5cbb]" />
                          </div>
                        ) : (
                          // Subsequent Node Markers with Subtle Hover Effect
                          <div
                            className={`w-[24px] h-[24px] sm:w-6 sm:h-6 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 ${isCurrent
                              ? "border-[#0a5cbb] shadow-[0_0_10px_rgba(10,92,187,0.25)]"
                              : "border-slate-300 group-hover:border-[#0a5cbb]"
                              }`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full transition-colors duration-300 ${isCurrent
                                ? "bg-[#0a5cbb]"
                                : "bg-slate-300 group-hover:bg-[#0a5cbb]"
                                }`}
                            />
                          </div>
                        )}
                      </div>

                      {/* Content Block */}
                      <div className="flex flex-col">
                        {/* Header Row: Big Outlined Number + Category & Title */}
                        <div className="flex items-start gap-4 sm:gap-6 mb-3">
                          {/* Big Outlined Number with Architectural Double-Line Effect */}
                          <div className="shrink-0 select-none w-[72px] sm:w-[86px] h-[52px] sm:h-[62px] relative flex items-center justify-center">
                            <svg
                              viewBox="0 0 95 65"
                              className="w-full h-full overflow-visible"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {/* Outer royal blue stroke */}
                              <text
                                x="48"
                                y="54"
                                textAnchor="middle"
                                fontSize="58"
                                fontWeight="900"
                                fontFamily="system-ui, -apple-system, sans-serif"
                                fill="none"
                                stroke={isCurrent ? "#0a5cbb" : "#0a5cbb"}
                                strokeWidth="3.2"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                              >
                                {step.id}
                              </text>
                              {/* Inner white channel creating precise double-stroke contour */}
                              <text
                                x="48"
                                y="54"
                                textAnchor="middle"
                                fontSize="58"
                                fontWeight="900"
                                fontFamily="system-ui, -apple-system, sans-serif"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="1.2"
                              >
                                {step.id}
                              </text>
                            </svg>
                          </div>

                          {/* Category Tag & Bold Heading */}
                          <div className="flex flex-col pt-0.5">
                            <span className="text-slate-500 font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-1">
                              {step.category}
                            </span>
                            <h3 className="text-2xl sm:text-[26px] lg:text-[28px] font-black text-[#0f1b3a] tracking-tight leading-tight group-hover:text-[#0a5cbb] transition-colors duration-200">
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        {/* Description Paragraph */}
                        <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal pl-1 sm:pl-2">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>


          </motion.div>

        </div>
      </div>
    </section>
  );
}

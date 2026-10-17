"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function WorkflowSection() {
  return (
    <div id="projects" className="bg-white pt-12 pb-2 lg:pb-0 border-t border-slate-100 w-full max-w-full overflow-hidden scroll-mt-24">
      {/* Header Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mb-10 text-center max-w-3xl mx-auto flex flex-col items-center"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
            Lifecycle
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0f1b3a] tracking-tight mb-4">
          Project workflow – Fume Extractor
        </h3>
        <p className="text-slate-500 font-medium text-sm md:text-base">
          From fume control requirement to commissioning and ongoing support
        </p>

      </motion.div>

      {/* Pipeline Workflow Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full"
      >
        <div className="flex overflow-x-auto lg:overflow-visible pb-12 hide-scrollbar lg:justify-center items-start gap-4 lg:gap-0 snap-x snap-mandatory px-4 lg:px-12">
          {[
            {
              step: "01",
              title: "Define",
              desc: "Understand application, fume type (welding, laser, grinding etc.), airflow requirement and site conditions.",
              color: "text-blue-600", bg: "bg-blue-600", borderColor: "border-blue-600",
              image: "/Engineers Reviewing Plans in Fabrication Workshop.png"
            },
            {
              step: "02",
              title: "Engineer",
              desc: "Select the right fume extractor type, capture hood design, airflow, filtration media and control system.",
              color: "text-sky-500", bg: "bg-sky-500", borderColor: "border-sky-500",
              image: "/Napcen Mobile Fume Extractor.png"
            },
            {
              step: "03",
              title: "Detail Design",
              desc: "Prepare GA drawings, P&ID, specifications and electrical details for approval.",
              color: "text-teal-400", bg: "bg-teal-400", borderColor: "border-teal-400",
              image: "/NAPCEN Mobile Fume Extractor Blueprint.png"
            },
            {
              step: "04",
              title: "Manufacture",
              desc: "Fabricate fume extractor and assemble all components including hood, arm, filters, blower and control as per approved design.",
              color: "text-green-500", bg: "bg-green-500", borderColor: "border-green-500",
              image: "/Napcen Extraction Units in Modern Factory.png"
            },
            {
              step: "05",
              title: "Inspect & Test",
              desc: "Perform dimensional inspection, airflow testing, filter efficiency check, leakage and functional testing before dispatch.",
              color: "text-yellow-500", bg: "bg-yellow-500", borderColor: "border-yellow-500",
              image: "/Technician Measuring Industrial Airflow.png"
            },
            {
              step: "06",
              title: "Dispatch & Install",
              desc: "Pack, dispatch and coordinate site installation, ducting (where required) and electrical connection (included in scope).",
              color: "text-orange-500", bg: "bg-orange-500", borderColor: "border-orange-500",
              image: "/Industrial Fume Extractor Loading Scene.png"
            },
            {
              step: "07",
              title: "Commission & Support",
              desc: "Start-up and performance verification. Provide operator training, spares and after-sales support.",
              color: "text-red-500", bg: "bg-red-500", borderColor: "border-red-500",
              image: "/Modern Industrial Fume Extraction Workshop.png"
            },
          ].map((item, i, arr) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center text-center relative group w-[220px] lg:w-[11%] shrink-0 snap-center">
                <div className="relative mb-5 inline-block">
                  <div className={`w-32 h-32 lg:w-36 lg:h-36 rounded-full border-[3px] p-1 lg:p-1.5 transition-colors duration-300 bg-white ${item.borderColor}`}>
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-100">
                      <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 128px, 144px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>

                  <div className={`absolute -top-1 -left-1 w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-white font-bold text-[13px] lg:text-[14px] border-2 border-white shadow-sm z-10 ${item.bg}`}>
                    {item.step}
                  </div>
                </div>

                <h4 className="text-[15px] lg:text-[16px] font-black text-[#0f1b3a] mb-2 leading-tight px-1">{item.title}</h4>
                <p className="text-[11px] lg:text-[12px] text-slate-500 leading-relaxed font-medium px-1">{item.desc}</p>
              </div>

              {i < arr.length - 1 && (
                <div className="hidden lg:flex flex-1 items-center justify-center relative min-w-[10px]" style={{ height: '144px' }}>
                  <div className={`h-[2px] w-full ${arr[i + 1].bg}`}></div>
                  <div className={`absolute right-0 w-0 h-0 border-y-[5px] border-y-transparent border-l-[6px] border-l-current ${arr[i + 1].color}`} style={{ right: '-3px' }}></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

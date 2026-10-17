"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  CircleDot,
  Grid,
  ArrowDownUp,
  DoorOpen,
  Cog,
  Trash2,
  Sparkles,
  PackageCheck,
  Layers
} from "lucide-react";

interface ProjectsManufacturingSectionProps {
  onSelectEquipment?: (equipmentName: string) => void;
}

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
    transition: { staggerChildren: 0.12 }
  }
};

export default function ProjectsManufacturingSection({
  onSelectEquipment
}: ProjectsManufacturingSectionProps) {
  const handleCardClick = (collectorName: string) => {
    if (onSelectEquipment) {
      onSelectEquipment(collectorName);
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="projects"
      className="pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 bg-[#f4f7fb] relative overflow-hidden border-t border-slate-200/90 scroll-mt-24"
    >
      <span id="projects-manufacturing" className="block -mt-24 pt-24 invisible pointer-events-none" aria-hidden="true" />
      {/* Background Industrial Factory Render Overlay (Top-Right) */}
      <div className="absolute top-0 right-0 w-full md:w-[68%] lg:w-[58%] xl:w-[52%] h-[320px] sm:h-[400px] lg:h-[460px] pointer-events-none z-0 overflow-hidden">
        <Image
          src="/napcen-manufacturing-factory.jpg"
          alt="Napcen Industrial Plant & Equipment"
          fill
          className="object-cover object-left-top opacity-75 sm:opacity-85 mix-blend-multiply brightness-105 contrast-[1.02]"
          priority
        />
        {/* Soft edge feathering overlays to integrate seamlessly with the background */}
        <div className="absolute inset-y-0 left-0 w-36 sm:w-64 bg-gradient-to-r from-[#f4f7fb] via-[#f4f7fb]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f4f7fb] via-[#f4f7fb]/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f4f7fb] to-transparent" />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 mx-auto max-w-[1640px] relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2 mb-3.5">
            <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
              PROJECTS &amp; MANUFACTURING
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-black text-[#0f1b3a] leading-[1.12] tracking-tight mb-5">
            Understand the configuration. <br />
            Ask for the{" "}
            <span className="text-[#0a5cbb] relative inline-block">
              relevant evidence.
            </span>
          </h2>

          {/* Subtitle / Paragraph */}
          <p className="text-slate-600 text-sm sm:text-base lg:text-[16px] leading-relaxed font-normal max-w-xl">
            Explore NAPCEN equipment arrangements and the project details worth
            confirming before manufacture. These supplied renders illustrate
            equipment, not completed installations.
          </p>
        </motion.div>

        {/* 3 Equipment Configuration Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 xl:gap-6 mb-8 sm:mb-10"
        >
          {/* CARD 01: Baghouse Configuration */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_4px_25px_rgba(15,27,58,0.04)] flex flex-col justify-between"
          >
            <div>
              {/* Header inside Card: Number + Tag on Left, Equipment Image on Right */}
              <div className="grid grid-cols-[1fr_auto] gap-3 items-start min-h-[190px] sm:min-h-[220px]">
                <div className="pt-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#0f1b3a] tracking-tight block">
                    01
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-black-700 block mt-2">
                    BAGHOUSE
                    <br />
                    CONFIGURATION
                  </span>
                </div>

                {/* Equipment Image */}
                <div className="relative w-36 h-48 sm:w-44 sm:h-56 shrink-0 -mt-2 -mr-1">
                  <Image
                    src="/Industrial Blue Hopper with Yellow Safety Ladder.png"
                    alt="Industrial Blue Hopper with Yellow Safety Ladder"
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className="object-contain object-right-top"
                  />
                </div>
              </div>

              {/* Title & Body Description */}
              <div className="mt-2 mb-6">
                <h3 className="text-xl sm:text-[22px] font-black text-[#0f1b3a] leading-snug mb-2">
                  Access and discharge
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed font-normal">
                  Review filter access, platform requirements, structural
                  support and the dust-removal route against your site layout.
                </p>
              </div>
            </div>

            {/* Bottom Row: 3 Feature Badges spanning full width */}
            <div className="pt-4 border-t border-slate-100 w-full mt-auto">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full items-center">
                {/* Feature 1 */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 min-w-0">
                  <CircleDot className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] sm:text-[11.5px] font-bold leading-tight">
                    Filter access
                    <br />
                    points
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 min-w-0">
                  <Grid className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] sm:text-[11.5px] font-bold leading-tight">
                    Platform &amp;
                    <br />
                    structural support
                  </span>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 min-w-0">
                  <ArrowDownUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] sm:text-[11.5px] font-bold leading-tight">
                    Discharge
                    <br />
                    arrangement
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 02: Cabinet Configuration */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_4px_25px_rgba(15,27,58,0.04)] flex flex-col justify-between"
          >
            <div>
              {/* Header inside Card: Number + Tag on Left, Equipment Image on Right */}
              <div className="grid grid-cols-[1fr_auto] gap-3 items-start min-h-[190px] sm:min-h-[220px]">
                <div className="pt-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#0f1b3a] tracking-tight block">
                    02
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-black-700 block mt-2">
                    CABINET
                    <br />
                    CONFIGURATION
                  </span>
                </div>

                {/* Equipment Image */}
                <div className="relative w-36 h-48 sm:w-44 sm:h-56 shrink-0 -mt-2 -mr-1">
                  <Image
                    src="/Blue and White Industrial Dust Collector.png"
                    alt="Blue and White Industrial Dust Collector"
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className="object-contain object-right-top"
                  />
                </div>
              </div>

              {/* Title & Body Description */}
              <div className="mt-2 mb-6">
                <h3 className="text-xl sm:text-[22px] font-black text-[#0f1b3a] leading-snug mb-2">
                  Compact service access
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed font-normal">
                  Confirm door clearance, filter replacement space and
                  collection-bin movement before fixing the equipment position.
                </p>
              </div>
            </div>

            {/* Bottom Row: 3 Feature Badges spanning full width */}
            <div className="pt-4 border-t border-slate-100 w-full mt-auto">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full items-center">
                {/* Feature 1 */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 min-w-0">
                  <DoorOpen className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-[11px] sm:text-[11.5px] font-bold leading-tight">
                    Door
                    <br />
                    clearance
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 min-w-0">
                  <Cog className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-[11px] sm:text-[11.5px] font-bold leading-tight">
                    Filter
                    <br />
                    replacement
                  </span>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 min-w-0">
                  <Trash2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-[11px] sm:text-[11.5px] font-bold leading-tight">
                    Collection-bin
                    <br />
                    movement
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 03: Separation Configuration */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_4px_25px_rgba(15,27,58,0.04)] flex flex-col justify-between"
          >
            <div>
              {/* Header inside Card: Number + Tag on Left, Equipment Image on Right */}
              <div className="grid grid-cols-[1fr_auto] gap-3 items-start min-h-[190px] sm:min-h-[220px]">
                <div className="pt-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#0f1b3a] tracking-tight block">
                    03
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-black-700 block mt-2">
                    SEPARATION
                    <br />
                    CONFIGURATION
                  </span>
                </div>

                {/* Equipment Image */}
                <div className="relative w-36 h-48 sm:w-44 sm:h-56 shrink-0 -mt-2 -mr-1">
                  <Image
                    src="/Industrial Blue Separator and Stainless Tank.png"
                    alt="Industrial Blue Separator and Stainless Tank"
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className="object-contain object-right-top"
                  />
                </div>
              </div>

              {/* Title & Body Description */}
              <div className="mt-2 mb-6">
                <h3 className="text-xl sm:text-[22px] font-black text-[#0f1b3a] leading-snug mb-2">
                  Collected-material handling
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed font-normal">
                  Consider particle recovery, container changes and any
                  downstream filtration required for the process.
                </p>
              </div>
            </div>

            {/* Bottom Row: 3 Feature Badges spanning full width */}
            <div className="pt-4 border-t border-slate-100 w-full mt-auto">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full items-center">
                {/* Feature 1 */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 min-w-0">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-[11px] sm:text-[11.5px] font-bold leading-tight">
                    Particle
                    <br />
                    recovery
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 min-w-0">
                  <PackageCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-[11px] sm:text-[11.5px] font-bold leading-tight">
                    Container
                    <br />
                    changes
                  </span>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-1.5 text-slate-700 min-w-0">
                  <Layers className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-[11px] sm:text-[11.5px] font-bold leading-tight">
                    Downstream
                    <br />
                    filtration
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Review & Reference Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 xl:gap-6 items-stretch">
          {/* LEFT: Manufacturing Review Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 xl:p-9 border border-slate-200/90 shadow-[0_4px_25px_rgba(15,27,58,0.03)] flex flex-col justify-between"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 sm:gap-8 items-start">
              {/* Left Column: Icon + Eyebrow + Title + Paragraph */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/80">
                  <ClipboardCheck className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-emerald-700 block mb-1">
                    MANUFACTURING REVIEW
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0f1b3a] tracking-tight leading-snug mb-3">
                    Agree the checks before production.
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed font-normal">
                    For your order, define drawing approvals, material
                    specifications, fabrication checks, dimensional inspection
                    and the functional tests included in scope. Document
                    maintenance clearances and connection points before site
                    preparation.
                  </p>
                </div>
              </div>

              {/* Right Column: 6 Checklist items */}
              <div className="bg-[#f8fafc] md:bg-transparent rounded-2xl p-4 md:p-0 border md:border-0 border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 sm:gap-3">
                  {[
                    "Drawing approvals",
                    "Material specifications",
                    "Fabrication checks",
                    "Dimensional inspection",
                    "Functional tests",
                    "Maintenance clearances"
                  ].map((checkItem, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-600 fill-emerald-100 shrink-0" />
                      <span className="text-xs sm:text-[13px] font-semibold text-slate-700 whitespace-nowrap">
                        {checkItem}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Request a Relevant Project Reference Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 xl:p-9 border border-slate-200/90 shadow-[0_4px_25px_rgba(15,27,58,0.03)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4 sm:gap-5 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 text-[#0a5cbb] flex items-center justify-center shrink-0 border border-blue-100/80">
                  <FileText className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#0a5cbb] block mb-1">
                    REQUEST A RELEVANT PROJECT REFERENCE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0f1b3a] tracking-tight leading-snug">
                    Request a relevant project reference.
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed font-normal mb-6">
                Ask for available installation photographs, the application and
                dust type, supplied equipment scope and any measured results
                with their test basis. Customer references and performance
                figures should be confirmed for the specific project.
              </p>
            </div>

            {/* Action Button */}
            <div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleCardClick("Relevant Project Reference");
                }}
                className="inline-flex items-center gap-2.5 bg-[#0a5cbb] hover:bg-blue-700 text-white font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Request project information</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Wind,
  Zap,
  Layers,
  Volume2,
  ArrowRight,
  Phone,
  FileCheck2,
  Gauge,
  Sparkles,
  Move,
  RotateCw
} from "lucide-react";

export interface ProductDetailItem {
  id: string;
  category: string;
  title: string;
  image: string;
  desc: string;
  bullets: string[];
  url?: string;
  modelCode?: string;
  tagline?: string;
  airflow?: string;
  power?: string;
  filtration?: string;
  efficiency?: string;
  noise?: string;
  arms?: string;
  mobility?: string;
  cleaning?: string;
  voltage?: string;
  applications?: string[];
  features?: string[];
}

export const PRODUCT_DETAILS_DATA: Record<string, Partial<ProductDetailItem>> = {
  "Welding fume extractor": {
    url: "https://napcen.com/welding-fume-extractor-industrial-dust-collector-manuafactures-in-india.html",
    modelCode: "NP-WFE-2200",
    tagline: "High-efficiency localized source extraction for manual, semi-auto, and robotic welding bays.",
    airflow: "1,500 – 2,500 m³/h (880 – 1,470 CFM)",
    power: "1.5 kW – 2.2 kW (2.0 – 3.0 HP)",
    voltage: "415V / 3 Phase / 50 Hz (230V 1-Ph option)",
    filtration: "3-Stage: Spark Baffle + Nanofiber/PTFE Cartridge + Activated Carbon VOC Pad",
    efficiency: "99.9% @ 0.3 micron (ISO 15012-1 / EN 779 / ASHRAE 52.2)",
    noise: "< 72 dBA @ 1m",
    arms: "Dual or single 360° articulated friction arms (Ø 160 mm × 2m / 3m / 4m reach)",
    mobility: "4x Heavy-Duty Swivel PU Wheels with Foot Lock Brakes",
    cleaning: "Reverse Pulse-Jet / Manual Clean compressed air nozzle port",
    features: [
      "360° freely rotating positional capture hood with integrated air damper & handle",
      "Multi-stage mechanical spark arrestor to prevent filter ignition from welding spatter",
      "Differential pressure gauge for continuous filter condition and loading status",
      "Quick-release slide-out bottom dust drawer for effortless particulate disposal",
      "Low sound backward-curved centrifugal fan with dynamically balanced aluminum impeller",
      "Heavy-duty powder-coated steel chassis built for tough industrial fabrication shop floors"
    ],
    applications: [
      "Manual MIG / MAG & TIG Welding",
      "Flux-Cored Arc Welding (FCAW) & Stick Welding (MMAW)",
      "Robotic Welding Cells & Automated Turn-tables",
      "Plasma Arc Cutting & Beveling Stations",
      "Metal Grinding, Deburring & Polishing Bays",
      "Structural Steel & Pressure Vessel Fabrication"
    ]
  },
  "Laser fume extractor": {
    modelCode: "NP-LFE-1200",
    tagline: "High-vacuum multi-stage extraction designed for sub-micron process smoke and plastic pyrolysis VOCs.",
    airflow: "800 – 1,800 m³/h (High Static Vacuum Pressure)",
    power: "1.1 kW – 2.2 kW High Static Turbine Blower",
    voltage: "415V / 3 Phase / 50 Hz or 230V Single Phase",
    filtration: "4-Stage Deep Bed: Metal Mesh Pre-filter + F8 Medium Bag + H14 True HEPA + Deep-Bed Activated Carbon (30 kg)",
    efficiency: "99.995% @ 0.1 – 0.3 micron (EN 1822 H14 Grade)",
    noise: "< 65 dBA (Ultra-quiet for lab & factory spaces)",
    arms: "Multi-port flanged duct connectors (Ø 100mm / 150mm) or flexible positional arms",
    mobility: "Heavy-duty swivel casters with integrated vibration dampeners",
    cleaning: "Modular quick-swap sealed cassette system",
    features: [
      "High static vacuum suction to overcome tight enclosure resistances in laser cutting beds",
      "Deep-bed virgin activated carbon block adsorbs hazardous acrylic, resin, and polymer VOCs",
      "Multi-tier staged filtration stops ultrafine laser nanoparticles from clogging expensive HEPA",
      "Smart micro-controller interface with acoustic & visual filter saturation alarm",
      "Continuous 24/7 duty rated turbine motor designed for unassisted production shifts",
      "Compact sound-insulated enclosure protects factory working atmosphere"
    ],
    applications: [
      "Fiber Laser Sheet & Tube Cutting Machines",
      "CO2 Laser Acrylic, Wood & Polymer Cutting",
      "Laser Marking, Etching & Micro-Engraving",
      "UV Laser Micromachining & Ablation",
      "Precision Plastic & Rubber Laser Processing",
      "Medical Device & Electronics Laser Enclosures"
    ]
  },
  "Soldering fume extractor": {
    modelCode: "NP-SFE-600",
    tagline: "Compact, quiet multi-station extraction designed for electronics cleanrooms and rework benches.",
    airflow: "350 – 750 m³/h (Dual or Multi-operator ports)",
    power: "250W – 550W High Vacuum Brushless DC Motor",
    voltage: "230V / 1 Phase / 50 Hz",
    filtration: "3-Stage: F7 Pre-filter Pad + H13 True HEPA + Acid Gas Adsorption Carbon",
    efficiency: "99.97% @ 0.3 micron",
    noise: "< 55 dBA (Super-silent operation for clean electronics benches)",
    arms: "Dual / Quad stay-put articulated flexible arms with ESD-safe silicone nozzles",
    mobility: "Lightweight compact profile with smooth lockable nylon swivel casters",
    cleaning: "Tool-less quick-clamp filter access for rapid 2-minute media changeout",
    features: [
      "ESD-safe antistatic design with silicone nozzles safe for delicate SMT boards",
      "Captures toxic rosin core flux fumes, lead aerosol, and aliphatic aldehydes",
      "Stepless rotary speed regulator to dial in precise capture velocity at each bench",
      "Independent multi-arm manifolds support up to 4 simultaneous soldering technicians",
      "Compact footprint fits neatly under or beside standard electronics workstations",
      "Exhaust passes through high-capacity carbon bed for odor-free cleanroom air"
    ],
    applications: [
      "PCB Assembly & Wave Soldering Touch-Up",
      "Surface Mount Technology (SMT) Rework",
      "Manual Wire Tinning & Cable Harness Soldering",
      "Electronics QA/QC & Micro-Soldering Benches",
      "Potting, Dispensing & Conformal Coating Fumes",
      "Education & Electronics Training Laboratories"
    ]
  },
  "Laboratory fume extractor": {
    modelCode: "NP-LAB-1000",
    tagline: "Corrosion-resistant localized extraction for hazardous acids, reagents, and solvent vapors.",
    airflow: "600 – 1,400 m³/h",
    power: "0.75 kW – 1.5 kW Chemical-Duty Motor (Flameproof ATEX Option)",
    voltage: "230V 1-Ph / 415V 3-Ph / 50 Hz",
    filtration: "Multi-Stage Chemisorptive Carbon (Acid / Formaldehyde / Ammonia) + HEPA H14 + Demister",
    efficiency: "99.99% particulate capture + targeted chemical vapor adsorption",
    noise: "< 62 dBA",
    arms: "Polypropylene / chemically inert flexible articulated extraction arm (Ø 75mm / 100mm)",
    mobility: "Non-marking chemical-resistant caster wheels with foot brakes",
    cleaning: "Replaceable sealed chemical canister with saturation test ports",
    features: [
      "Specialized chemical-impregnated media specifically for acids, solvents, or biological reagents",
      "Polypropylene and SS304 internal airflow pathways to withstand aggressive fumes",
      "Ductless recirculating design eliminates conditioned HVAC air loss and outdoor venting",
      "Continuous face-velocity airflow indicator with low-flow safety warning",
      "Sparkless backward-curved chemical blower safe for volatile solvent atmosphere",
      "Complies with SEFA and ASHRAE laboratory fume containment guidelines"
    ],
    applications: [
      "Pharmaceutical QA/QC & Formulation Labs",
      "Wet Chemical Testing, Titration & Solvent Dispensing",
      "Histology, Pathology & Formalin Tissue Handling",
      "Academic Chemistry & Life Sciences Research",
      "Battery Testing & Electrolyte Chemical Handling",
      "Cleanroom Chemical Transfer & Extraction"
    ]
  },
  "Gold fume extractor": {
    modelCode: "NP-GFE-1200",
    tagline: "Specialized precious metal recovery and toxic acid vapor neutralization for goldsmiths and refiners.",
    airflow: "800 – 1,600 m³/h",
    power: "1.5 kW – 2.2 kW High Static Motor",
    voltage: "415V / 3 Phase / 50 Hz (230V 1-Ph option)",
    filtration: "3-Stage Recovery: High-Temp Ceramic Spark Trap + Reclaimable Micro-Cartridge + Neutralizing Carbon",
    efficiency: "99.8% precious metal dust recovery + acid vapor capture",
    noise: "< 68 dBA",
    arms: "Heat-resistant stainless steel articulated hood & flexible heat-shield ducting",
    mobility: "Heavy-duty lockable casters with compact footprint for jewelry workshops",
    cleaning: "Lockable precious metal collection chamber for secure bullion reclamation",
    features: [
      "High-efficiency particulate retention engineered specifically for gold & silver recovery",
      "Ceramic spark arrestor withstands open torch flame and induction furnace heat",
      "Secondary chemical treatment neutralizes corrosive nitric and hydrochloric aqua regia vapors",
      "Key-locked dust collection drawer prevents unauthorized access to precious metal dust",
      "Compact footprint fits seamlessly into traditional jewelry manufacturing workshops",
      "Substantially improves workshop health and yields valuable recovered metal bullion"
    ],
    applications: [
      "Gold & Silver Induction Melting Furnaces",
      "Jewelry Torch Soldering, Annealing & Casting",
      "Polishing, Buffing & Lapping Dust Extraction",
      "Aqua Regia Gold Refining & Acid Parting Benches",
      "Precious Metal Assay & Touchstone Testing",
      "Diamond & Gemstone Cutting / Polishing"
    ]
  },
  "Printing fume extractor": {
    modelCode: "NP-PFE-2000",
    tagline: "High-volume solvent vapor and VOC adsorption system for industrial printing lines.",
    airflow: "1,500 – 3,200 m³/h",
    power: "2.2 kW – 4.0 kW Continuous Duty Blower",
    voltage: "415V / 3 Phase / 50 Hz",
    filtration: "2-Stage Industrial: High-Capacity Particulate Pre-filter + Deep-Bed Virgin Coconut Carbon (60–100 kg)",
    efficiency: "95%+ VOC adsorption (Toluene, MEK, IPA, acetates, UV monomers)",
    noise: "< 70 dBA",
    arms: "Multi-point custom duct manifolds or overhead canopy hood connections",
    mobility: "Floor-mount vibration-isolated skid with heavy-duty caster options",
    cleaning: "Modular pull-out carbon cartridge trays for clean media replacement",
    features: [
      "Extended residence time contact chamber maximizes VOC adsorption efficiency",
      "Eliminates dizzying ink solvent odors and hazardous volatile organic compounds",
      "Differential pressure sensor to monitor particulate loading and carbon bed saturation",
      "Engineered for 24/7 continuous operation in high-throughput print packaging plants",
      "Protects operators from respiratory irritation, headaches, and long-term VOC exposure",
      "Low running cost with refillable high-grade virgin coconut shell carbon"
    ],
    applications: [
      "Automatic & Manual Screen Printing Tables",
      "Flexographic & Gravure Packaging Presses",
      "UV-Curable & Solvent Ink Curing Tunnels",
      "Industrial Roll-to-Roll Laminators & Coaters",
      "Plate Cleaning & Solvent Washout Tanks",
      "Digital Wide-Format & Textile Printing Rooms"
    ]
  }
};

interface ProductDetailsModalProps {
  product: ProductDetailItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDiscussApplication: (productTitle: string) => void;
}

export default function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  onDiscussApplication
}: ProductDetailsModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const extra = PRODUCT_DETAILS_DATA[product.title] || {};
  const modelCode = extra.modelCode || `NP-${product.id || "EXT"}-SERIES`;
  const tagline = extra.tagline || product.desc;
  const airflow = extra.airflow || "1,200 – 2,500 m³/h";
  const power = extra.power || "1.5 kW – 2.2 kW (415V / 3 Phase)";
  const filtration = extra.filtration || "Multi-stage high-efficiency cartridge & carbon adsorption";
  const efficiency = extra.efficiency || "99.9% @ 0.3 µm";
  const noise = extra.noise || "< 70 dBA";
  const arms = extra.arms || "360° Articulated positional capture arm (Ø 160 mm)";
  const mobility = extra.mobility || "4x Heavy-Duty Swivel Caster Wheels with Brakes";
  const cleaning = extra.cleaning || "Reverse pulse-jet / manual compressed air cleaning port";
  const voltage = extra.voltage || "415V / 3 Phase / 50 Hz (230V options available)";
  const features = extra.features || [
    "High-efficiency localized capture hood with 360° rotation",
    "Multi-stage industrial filtration with particle & VOC treatment",
    "Continuous differential pressure monitoring gauge",
    "Heavy-duty powder-coated steel chassis built for durability",
    "Low noise backward-curved impeller for comfortable workspace sound",
    "Complies with OSHA and global indoor air quality standards"
  ];
  const applications = extra.applications || [
    "Industrial manufacturing & fabrication bays",
    "Production assembly lines & testing workstations",
    "Continuous process emission capture points",
    "Maintenance workshops & tooling bays"
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.45, bounce: 0.1 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200/90 overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-slate-50 via-white to-slate-50">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  {product.category}
                </span>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Model: {modelCode}
                </span>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
                  CE &amp; ISO 9001:2015
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0f1b3a] tracking-tight">
                {product.title}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1 max-w-2xl">
                {tagline}
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors shrink-0 ml-4 cursor-pointer"
              aria-label="Close details modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
            {/* Top Showcase: Image on Left + Fast Specs on Right */}
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.4fr] gap-6 sm:gap-8 items-center">
              {/* Image Container with subtle gray backdrop */}
              <div className="relative rounded-2xl bg-[#eef1f4] border border-slate-200/70 p-6 flex flex-col items-center justify-center min-h-[260px] sm:min-h-[300px] overflow-hidden group">
                <span className="absolute top-3 left-4 text-xs font-semibold text-slate-400 select-none">
                  {product.id}
                </span>

                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-56 sm:max-h-64 max-w-full object-contain drop-shadow-[0_12px_24px_rgba(15,27,58,0.14)] group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute bottom-3 right-4 flex items-center gap-1.5 opacity-80 pointer-events-none">
                  <img src="/Napcen-logo.webp" alt="Napcen" className="h-4 w-auto" />
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider">ENGINEERED</span>
                </div>
              </div>

              {/* Fast Highlights Matrix */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Quick Engineering Highlights
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2 text-primary-blue mb-1">
                      <Wind className="w-4 h-4" />
                      <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Airflow</span>
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-[#0f1b3a]">
                      {airflow}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2 text-emerald-600 mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Efficiency</span>
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-[#0f1b3a]">
                      {efficiency}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2 text-amber-600 mb-1">
                      <Zap className="w-4 h-4" />
                      <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Motor Power</span>
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-[#0f1b3a]">
                      {power}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2 text-indigo-600 mb-1">
                      <Volume2 className="w-4 h-4" />
                      <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Sound Level</span>
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-[#0f1b3a]">
                      {noise}
                    </div>
                  </div>
                </div>

                {/* Key Bullet Focus */}
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary-blue block mb-2">
                    Primary Process Considerations
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.bullets.map((b, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold bg-white px-2.5 py-1 rounded-lg border border-blue-200/70 text-slate-700 shadow-2xs"
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div>
              <div className="flex items-center gap-2 mb-3.5">
                <Gauge className="w-4 h-4 text-primary-blue" />
                <h3 className="text-base font-bold text-[#0f1b3a] tracking-tight">
                  Complete Technical Specifications
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-2xs">
                <div className="divide-y divide-slate-100 text-xs sm:text-[13px]">
                  <div className="grid grid-cols-[1.2fr_2fr] p-3 sm:p-3.5 bg-slate-50/80">
                    <span className="font-bold text-slate-600">Model Series</span>
                    <span className="font-bold text-[#0f1b3a]">{modelCode}</span>
                  </div>
                  <div className="grid grid-cols-[1.2fr_2fr] p-3 sm:p-3.5">
                    <span className="font-semibold text-slate-600">Airflow Capacity</span>
                    <span className="text-[#0f1b3a] font-medium">{airflow}</span>
                  </div>
                  <div className="grid grid-cols-[1.2fr_2fr] p-3 sm:p-3.5 bg-slate-50/50">
                    <span className="font-semibold text-slate-600">Motor Power &amp; Voltage</span>
                    <span className="text-[#0f1b3a] font-medium">{power} | {voltage}</span>
                  </div>
                  <div className="grid grid-cols-[1.2fr_2fr] p-3 sm:p-3.5">
                    <span className="font-semibold text-slate-600">Filtration Stages</span>
                    <span className="text-[#0f1b3a] font-medium">{filtration}</span>
                  </div>
                  <div className="grid grid-cols-[1.2fr_2fr] p-3 sm:p-3.5 bg-slate-50/50">
                    <span className="font-semibold text-slate-600">Particle Efficiency</span>
                    <span className="text-[#0f1b3a] font-medium">{efficiency}</span>
                  </div>
                  <div className="grid grid-cols-[1.2fr_2fr] p-3 sm:p-3.5">
                    <span className="font-semibold text-slate-600">Capture Arm / Ducting</span>
                    <span className="text-[#0f1b3a] font-medium">{arms}</span>
                  </div>
                  <div className="grid grid-cols-[1.2fr_2fr] p-3 sm:p-3.5 bg-slate-50/50">
                    <span className="font-semibold text-slate-600">Operating Sound Level</span>
                    <span className="text-[#0f1b3a] font-medium">{noise}</span>
                  </div>
                  <div className="grid grid-cols-[1.2fr_2fr] p-3 sm:p-3.5">
                    <span className="font-semibold text-slate-600">Mobility &amp; Mounting</span>
                    <span className="text-[#0f1b3a] font-medium">{mobility}</span>
                  </div>
                  <div className="grid grid-cols-[1.2fr_2fr] p-3 sm:p-3.5 bg-slate-50/50">
                    <span className="font-semibold text-slate-600">Cleaning &amp; Maintenance</span>
                    <span className="text-[#0f1b3a] font-medium">{cleaning}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Engineering Features & Benefits */}
            <div>
              <div className="flex items-center gap-2 mb-3.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-bold text-[#0f1b3a] tracking-tight">
                  Design &amp; Engineering Features
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200/70"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-[13px] text-slate-700 leading-snug font-medium">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Applications */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-base font-bold text-[#0f1b3a] tracking-tight">
                  Target Applications &amp; Industries
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {applications.map((app, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer with Actions */}
          <div className="px-6 sm:px-8 py-4 sm:py-5 border-t border-slate-200/90 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Quick Contact info */}
            <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
              <a
                href="tel:+917904469219"
                className="flex items-center gap-1.5 text-slate-700 hover:text-primary-blue font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>+91 79044 69219</span>
              </a>
              <span className="text-slate-300">|</span>
              <a
                href={`https://wa.me/917904469219?text=${encodeURIComponent(`Hi NAPCEN, I would like technical details and a quote for the ${product.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-bold transition-colors"
              >
                Chat on WhatsApp ↗
              </a>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onDiscussApplication(product.title);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0a5cbb] hover:bg-blue-800 text-white font-black text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Droplets, Droplet, Wind, Grip, Fan, Table, Beaker, RefreshCcw, Share2, Leaf, Shield, ShieldCheck, Play, Settings, BarChart3, Phone, Mail, MapPin, ChevronRight, ChevronDown, Target, Sliders, Layers, Briefcase, Factory, LifeBuoy, Globe, Users, FileText, Send, Cloud, FlaskConical, Pill, Car, PaintRoller, Utensils, Cpu, Scissors, Gem, FileSearch, MonitorCog, Wrench, Headset, Building2, Anchor, FileBadge, ArrowRight, ArrowUpRight, ArrowDown, Plane, Database, Info, CircleDot, Asterisk, LineChart, Thermometer, Clock, Box, ClipboardCheck, Search, CheckCircle2, Check, Sparkles, AlertCircle, Loader2, Activity, Flame, Printer } from "lucide-react";
import { Footer } from "@/components/ui/modem-animated-footer";
import ThreeBackground from "@/components/napcen-landing/ThreeBackground";
import LogoTicker from "@/components/napcen-landing/LogoTicker";
import WorkflowSection from "@/components/napcen-landing/WorkflowSection";
import FilterCalculator from "@/components/napcen-landing/FilterCalculator";
import ProjectsManufacturingSection from "@/components/napcen-landing/ProjectsManufacturingSection";
import WhyNapcenSection from "@/components/napcen-landing/WhyNapcenSection";
import CurvedHeader from "@/components/ui/curved-menu";

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const dustFaqs = [
  {
    q: "What is an industrial fume extractor?",
    a: "An industrial fume extractor draws contaminated air from a process through a capture hood or enclosure, ducting and selected treatment stages. The aim is to collect fumes close to their source and route the treated air to an appropriate discharge."
  },
  {
    q: "Which NAPCEN fume extractors can I enquire about?",
    a: "NAPCEN lists welding, laser, soldering, laboratory, gold and printing fume extractors on its main website. Share your application first if you are unsure which product to select."
  },
  {
    q: "Can one filter remove both particles and gases?",
    a: "Particle filters collect airborne solids and aerosols; they do not provide general gas removal. Activated carbon or other treatment can suit selected vapours, subject to pollutant chemistry, concentration, humidity and contact time."
  },
  {
    q: "How do I choose portable or centralised extraction?",
    a: "A portable arrangement can suit changing local work areas. A centralised system may suit multiple fixed points. Compare simultaneous use, duct losses, filter loading, available space and maintenance before choosing a configuration."
  },
  {
    q: "What determines fume extractor price?",
    a: "Price depends on airflow, required static pressure, number of capture points, filter stages, construction, controls and installation scope. A quotation should define the design basis and replacement-filter requirements."
  },
  {
    q: "Can filtered air return to the workshop?",
    a: "Recirculation requires an application-specific assessment of contaminants, filtration, monitoring and applicable workplace requirements. Gas hazards and residual particles must be reviewed before deciding between recirculation and external discharge."
  },
  {
    q: "What information should I send for a quotation?",
    a: "Send the process and material, number of stations, operating hours, pollutant details, available airflow data, temperature, layout, power supply and any required outlet criteria. Photos and safety data sheets help the application review."
  },
  {
    q: "Does a fume extractor replace general ventilation?",
    a: "Source extraction and room ventilation serve different roles. A complete ventilation design considers capture, replacement air, discharge and the wider workspace; equipment selection alone does not establish exposure control."
  }
];

export default function NapcenLandingPage() {
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", industry: "", application: "", equipment: "", desc: "",
    country: "", location: "", airflow: "", unit: "", temp: "", timeline: "",
    collector: "", dustMaterial: ""
  });
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const visibleFaqs = showAllFaqs ? dustFaqs : dustFaqs.slice(0, 8);
  const [formStep, setFormStep] = useState(1);
  const [productFilter, setProductFilter] = useState("All equipment");
  const [exhaustTab, setExhaustTab] = useState(0);

  const exhaustTabs = [
    {
      title: "H₂S / odour",
      cardTitle: "Reactive media for H₂S control",
      cardDesc: "Share inlet H₂S concentration, peak loading, humidity and required outlet concentration. Media chemistry and contact time must suit the stream; a lead–lag arrangement can be considered for monitoring and changeover.",
      image: "/Modern Stainless Industrial Processing Plant.png"
    },
    {
      title: "VOC / solvent",
      cardTitle: "Assess adsorption suitability first",
      cardDesc: "Share the individual VOC species, concentrations and gas temperature. Carbon adsorption requires a review of capacity, humidity, breakthrough and potential heat generation. Not every VOC stream is suitable.",
      image: "/Industrial Activated Carbon Adsorption Skid.png"
    },
    {
      title: "Acid gas",
      cardTitle: "Review dry reagent treatment",
      cardDesc: "Acid-gas control may require a reactive sorbent injection system and downstream particulate collection. Share acid-gas species, temperature, flow and treatment targets so the process can be evaluated.",
      image: "/Industrial Reagent Injection and Baghouse System.png"
    },
    {
      title: "Biogas",
      cardTitle: "Biogas H₂S removal with selected dry media",
      cardDesc: "Share methane and H₂S composition, gas flow, temperature, moisture, oxygen content and the downstream outlet requirement. Evaluate media compatibility, loading, pressure loss and safe changeout. Biogas treatment requires a process-specific review of flammable-gas handling.",
      image: "/Biogas Processing and Adsorption System.png"
    },
    {
      title: "Mixed / unsure",
      cardTitle: "Start with a gas analysis",
      cardDesc: "A mixed or unknown stream needs characterisation before selecting media. Share any available test report, safety data, process description and odour observations to guide the application review.",
      image: "/Industrial H₂S Adsorption Skid (1).png"
    }
  ];

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.company || !formData.application || !formData.desc) {
      setFormStatus("Please fill in all required fields (*)");
      setTimeout(() => setFormStatus(""), 5000);
      return;
    }

    setIsSubmitting(true);
    setFormStatus("Sending your request...");

    // Web3Forms Configuration
    const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "233963d2-f4b0-4f25-9a2f-bf7e151ac018";

    const payload = {
      access_key: ACCESS_KEY,
      subject: `New Technical Quote Request: ${formData.application || "Fume Extractor"} — ${formData.company || formData.name || "NAPCEN Inquiry"}`,
      from_name: formData.name || "NAPCEN Lead",
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone || "N/A",
      application: formData.application,
      preferred_product: formData.collector || "Help me select",
      airflow: formData.airflow || "N/A",
      timeline: formData.timeline || "N/A",
      product: formData.collector || formData.application || "Fume Extractor System",
      message: `Company: ${formData.company || "N/A"}\nPhone: ${formData.phone || "N/A"}\nApplication: ${formData.application || "N/A"}\nPreferred Product: ${formData.collector || "Help me select"}\nAirflow: ${formData.airflow || "N/A"}\nProject Timeline: ${formData.timeline || "N/A"}\n\nProcess and Project Details:\n${formData.desc}`,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        setFormStatus("Thank you! We will contact you soon.");
        setFormData({
          name: "", company: "", email: "", phone: "", industry: "", application: "", equipment: "", desc: "",
          country: "", location: "", airflow: "", unit: "", temp: "", timeline: "",
          collector: "", dustMaterial: ""
        });
      } else {
        console.error("Web3Forms Response Error:", result);
        setFormStatus("Submission failed. Please try again or call us.");
      }
    } catch (error) {
      console.error("Network Exception:", error);
      setFormStatus("Submission failed. Please try again or call us.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus(""), 6000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-napcean-blue selection:text-white">
      {/* TOPBAR */}
      <div className="hidden lg:block bg-[#051124] text-slate-300 text-[11.5px] py-2 border-b border-white/5">
        <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">

          <div className="flex items-center gap-4 divide-x divide-white/10">
            <div className="flex items-center gap-1.5 text-emerald-500 font-bold tracking-wide">
              <Globe size={13} /> Global Engineering & Export Hub
            </div>

            <div className="flex items-center gap-1.5 pl-4 font-medium text-slate-300 tracking-wide">
              <Plane size={13} className="text-slate-400" /> Exporting to 30+ Countries
            </div>

            <div className="flex items-center gap-2 pl-4">
              <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded text-[9px] tracking-widest uppercase">ISO 9001:2015</span>
              <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded text-[9px] tracking-widest uppercase">CE MARKED</span>
              <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded text-[9px] tracking-widest uppercase">ATEX / ASME</span>
            </div>
          </div>

          <div className="flex items-center gap-4 divide-x divide-white/10">
            <a href="mailto:info@napcen.com" className="flex items-center gap-1.5 font-medium hover:text-white transition-colors tracking-wide">
              <Mail size={13} className="text-blue-500" />
              info@napcen.com
            </a>

            <a href="tel:+917904469219" className="flex items-center gap-1.5 pl-4 text-white font-bold hover:text-emerald-400 transition-colors tracking-wide">
              <Phone size={13} className="text-emerald-500" /> +91 79044 69219
            </a>
          </div>

        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
          <a href="#" className="flex items-center gap-3">
            <Image src="/Napcen-logo.webp" alt="NAPCEN Logo" width={140} height={50} className="object-contain" />
          </a>

          <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-sm font-bold text-slate-700">
            <a href="#products" className="hover:text-primary-blue transition-colors">Products</a>
            <a href="#how-it-works" className="hover:text-primary-blue transition-colors">How it works</a>
            <a href="#applications" className="hover:text-primary-blue transition-colors">Applications</a>
            <a href="#engineering" className="hover:text-primary-blue transition-colors">Engineering</a>
            <a href="#faq" className="hover:text-primary-blue transition-colors">FAQs</a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="bg-[#0a5cbb] hover:bg-[#084ea3] active:scale-95 text-white font-bold text-xs sm:text-[13.5px] px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(10,92,187,0.25)] hover:shadow-[0_6px_20px_rgba(10,92,187,0.35)] transition-all flex items-center gap-1.5 group cursor-pointer"
            >
              <span>Get a quote</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Curved Menu for Mobile View */}
          <div className="lg:hidden">
            <CurvedHeader />
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative bg-white overflow-hidden pt-16 pb-12">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-20 right-40 w-64 h-64 border border-blue-100 rounded-full opacity-50" />
            <div className="absolute top-40 right-20 w-[500px] h-[500px] border border-blue-50 rounded-full opacity-50" />
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 md:px-8 xl:px-12 2xl:px-16 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 xl:gap-12 items-center md:items-stretch min-h-[480px]">

              {/* LEFT: TEXT & STATS */}
              <div className="w-full md:w-[46%] xl:w-[45%] flex flex-col justify-start pt-3 sm:pt-4 lg:pt-6">
                <div className="mb-4 sm:mb-5">
                  <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase">
                    ENGINEERED INDUSTRIAL FUME EXTRACTION
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-black text-[#0f1b3a] leading-[1.12] tracking-tight mb-5">
                  Fume extractor<br />
                  manufacturers<br />
                  <span className="text-primary-blue">in India.</span>
                </h1>

                <div className="text-slate-600 text-[15px] sm:text-[16px] mb-8 max-w-xl leading-relaxed font-normal space-y-3">
                  <p>
                    Capture fumes at the source. Choose an extraction solution around your process, your materials and the way your team works.
                  </p>
                  <p>
                    Explore NAPCEN welding, laser, soldering, laboratory, gold and printing fume extractors.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                  <a href="#contact" className="bg-primary-blue hover:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-md transition-all shadow-md hover:shadow-lg text-sm flex items-center gap-2">
                    Request a technical quote <ArrowUpRight size={17} />
                  </a>
                  <a href="#collectors" className="bg-white border border-slate-300 hover:border-primary-blue text-slate-700 hover:text-primary-blue font-bold py-3.5 px-6 rounded-md transition-all text-sm flex items-center gap-2">
                    Explore products <ArrowDown size={17} />
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-5 text-[13px] text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-primary-blue" />
                    <span>Application-led selection</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-primary-blue" />
                    <span>Technical enquiry support</span>
                  </div>
                </div>
              </div>



              {/* RIGHT: FORM */}
              <div className="w-full md:w-[52%] xl:w-[54%] relative z-20 flex flex-col justify-start mt-12 md:mt-0 md:-ml-4 lg:-ml-8 xl:-ml-12" id="contact">
                <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100">
                  <h3 className="text-2xl lg:text-3xl font-black text-[#0f1b3a] mb-6">Request a technical quotation</h3>

                  <form onSubmit={handleQuoteSubmit} className="space-y-4">
                    {/* Row 1: Your name * & Company * */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0f1b3a]">Your name *</label>
                        <input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-slate-700 transition-all font-medium shadow-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0f1b3a]">Company *</label>
                        <input
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-slate-700 transition-all font-medium shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Row 2: Work email * & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0f1b3a]">Work email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-slate-700 transition-all font-medium shadow-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0f1b3a]">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-slate-700 transition-all font-medium shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Row 3: Application * & Preferred product */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-5">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="form-application" className="text-[13px] font-bold text-[#0f1b3a]">Application *</label>
                        <select
                          id="form-application"
                          required
                          value={formData.application}
                          onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                          className={`w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all font-medium shadow-sm ${!formData.application ? "text-slate-400" : "text-slate-700"}`}
                        >
                          <option value="" disabled hidden>Choose your process</option>
                          <option value="Welding / fabrication" className="text-slate-700">Welding / fabrication</option>
                          <option value="Laser cutting / marking" className="text-slate-700">Laser cutting / marking</option>
                          <option value="Soldering / electronics" className="text-slate-700">Soldering / electronics</option>
                          <option value="Laboratory / chemical work" className="text-slate-700">Laboratory / chemical work</option>
                          <option value="Gold processing" className="text-slate-700">Gold processing</option>
                          <option value="Printing" className="text-slate-700">Printing</option>
                          <option value="Custom / Application review" className="text-slate-700">Custom / Application review</option>
                          <option value="Other / Not sure" className="text-slate-700">Other / Not sure</option>
                          {formData.application && ![
                            "Welding / fabrication",
                            "Laser cutting / marking",
                            "Soldering / electronics",
                            "Laboratory / chemical work",
                            "Gold processing",
                            "Printing",
                            "Custom / Application review",
                            "Other / Not sure"
                          ].includes(formData.application) && (
                            <option value={formData.application} className="text-slate-700">
                              {formData.application}
                            </option>
                          )}
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="form-collector" className="text-[13px] font-bold text-[#0f1b3a]">Preferred product *</label>
                        <select
                          id="form-collector"
                          required
                          value={formData.collector}
                          onChange={(e) => setFormData({ ...formData, collector: e.target.value })}
                          className={`w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all font-medium shadow-sm ${!formData.collector ? "text-slate-400" : "text-slate-700"}`}
                        >
                          <option value="" disabled hidden>Help me select</option>
                          <option value="Welding fume extractor" className="text-slate-700">Welding fume extractor</option>
                          <option value="Laser fume extractor" className="text-slate-700">Laser fume extractor</option>
                          <option value="Soldering fume extractor" className="text-slate-700">Soldering fume extractor</option>
                          <option value="Laboratory fume extractor" className="text-slate-700">Laboratory fume extractor</option>
                          <option value="Gold fume extractor" className="text-slate-700">Gold fume extractor</option>
                          <option value="Printing fume extractor" className="text-slate-700">Printing fume extractor</option>
                          <option value="Recommend a system" className="text-slate-700">Recommend a system</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Airflow, if known & Project timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0f1b3a]">Airflow, if known</label>
                        <input
                          value={formData.airflow}
                          onChange={(e) => setFormData({ ...formData, airflow: e.target.value })}
                          placeholder="e.g. m³/h, or not yet known"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-slate-700 transition-all font-medium shadow-sm placeholder:text-slate-400"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0f1b3a]">Project timeline</label>
                        <input
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          placeholder="e.g. Planning / required date"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-slate-700 transition-all font-medium shadow-sm placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Row 5: Process and project details * */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-[#0f1b3a]">Process and project details *</label>
                      <textarea
                        required
                        placeholder="Material, stations, operating hours, temperature and extraction needs"
                        value={formData.desc}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all min-h-[120px] resize-y font-medium text-slate-700 shadow-sm placeholder:text-slate-400"
                      />
                    </div>

                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed mt-2">
                      Submitting opens your email app with the enquiry populated. Nothing is sent until you send it. This page does not store your enquiry details.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-[#0a5cbb] hover:bg-blue-800 text-white font-black py-4 rounded-xl transition-all shadow-md text-sm lg:text-[15px] flex items-center justify-center gap-2 tracking-wide mt-4 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Quotation Request</span>
                          <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>

                    {formStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 p-4 rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2.5 ${formStatus.includes("Thank")
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                          : "bg-red-50 text-red-600 border border-red-300"
                          }`}
                      >
                        {formStatus.includes("Thank") ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        )}
                        <span>{formStatus}</span>
                      </motion.div>
                    )}
                  </form>

                  <div className="flex justify-center items-center gap-6 md:gap-10 mt-6 pt-4 border-t border-slate-100 text-[10px] text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5"><Shield size={12} className="text-[#0f1b3a]" /> Quick Response</div>
                    <div className="flex items-center gap-1.5"><Users size={12} className="text-[#0f1b3a]" /> Expert Support</div>
                    <div className="flex items-center gap-1.5"><Settings size={12} className="text-[#0f1b3a]" /> Custom Solutions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* APPLICATION PILLARS BAR */}
            <div className="mt-16 sm:mt-20 border-t border-b border-slate-200 py-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full">
                {[
                  {
                    title: "Welding & fabrication",
                    subtitle: "Metal fumes and process smoke",
                    icon: <Flame className="w-5 h-5" />
                  },
                  {
                    title: "Laser & electronics",
                    subtitle: "Fine particles and flux fumes",
                    icon: <Cpu className="w-5 h-5" />
                  },
                  {
                    title: "Laboratory & gold",
                    subtitle: "Process-specific extraction",
                    icon: <FlaskConical className="w-5 h-5" />
                  },
                  {
                    title: "Printing operations",
                    subtitle: "Vapour and particulate assessment",
                    icon: <Printer className="w-5 h-5" />
                  }
                ].map((item, i) => (
                  <div key={i} className="px-2 sm:px-4 py-1 flex items-start gap-3.5 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center shrink-0 text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-all shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[15px] sm:text-[16px] font-bold text-[#0f1b3a] mb-1 tracking-tight group-hover:text-primary-blue transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[13px] text-slate-500 font-normal leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>



          </div>
        </section>

        <LogoTicker />
        {/* FUME EXTRACTOR MEANING SECTION */}
        <section id="fume-extractor-meaning" className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden scroll-mt-24 w-full">
          <span id="what-is-a-dust-collector" className="block -mt-24 pt-24 invisible pointer-events-none" aria-hidden="true" />
          <div className="w-full px-1 sm:px-1.5 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">

              {/* Left Column: Text Content */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center px-4 sm:px-6 lg:pl-6 xl:pl-10"
              >
                <div className="flex items-center gap-2 mb-4 sm:mb-5">
                  <span className="text-slate-500 font-bold text-[11px] sm:text-[12px] tracking-[0.2em] uppercase">
                    FUME EXTRACTOR MEANING
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-black text-[#0f1b3a] leading-[1.12] tracking-tight mb-6">
                  Cleaner air starts<br />
                  <span className="text-primary-blue">at the source</span>
                  <span className="text-primary-blue">.</span>
                </h2>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-8">
                  <p>
                    A fume extractor collects contaminated air near a process before fumes disperse through the workspace. A hood or enclosure, extraction fan and selected treatment stages work together as one system.
                  </p>
                  <p>
                    Good selection starts with what is in the air. Welding particles, laser smoke and solvent vapours have different treatment needs. NAPCEN&apos;s product range gives you a starting point for an application-specific discussion.
                  </p>
                </div>

                <div>
                  <a
                    href="#collectors"
                    className="inline-flex items-center gap-2 text-sm sm:text-[15px] font-bold text-[#0f1b3a] hover:text-primary-blue pb-1 border-b-2 border-primary-blue transition-colors group cursor-pointer"
                  >
                    <span>Understand the extraction process</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-primary-blue" />
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Industrial Fume Extraction System Image & Features */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="lg:col-span-8 xl:col-span-8 relative w-full"
              >
                {/* Main Machine Image - No border, No shadow */}
                <div className="relative z-10 w-full flex items-center justify-center p-0 m-0 border-0 shadow-none">
                  <Image
                    src="/Industrial Fume Extraction System.png"
                    alt="Industrial Fume Extraction System"
                    width={1580}
                    height={995}
                    className="w-full h-auto object-contain select-none border-0 shadow-none rounded-none"
                    priority
                  />
                </div>

                {/* Floating Feature Bar */}
                <div className="relative lg:absolute lg:bottom-2 lg:left-3 lg:right-3 z-20 mt-6 lg:mt-0 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-[0_12px_40px_rgba(15,27,58,0.08)] border border-slate-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-2 items-center">
                  {/* Feature 1 */}
                  <div className="flex items-center gap-2.5 sm:gap-3 px-1 sm:px-2">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 border border-blue-100">
                      <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-primary-blue" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-[13px] font-bold text-[#0f1b3a] leading-tight">Captures</div>
                      <div className="text-[11px] sm:text-xs text-slate-500 font-medium">at the source</div>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-center gap-2.5 sm:gap-3 px-1 sm:px-2">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 border border-blue-100">
                      <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-primary-blue" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-[13px] font-bold text-[#0f1b3a] leading-tight">Healthier</div>
                      <div className="text-[11px] sm:text-xs text-slate-500 font-medium">workspace</div>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex items-center gap-2.5 sm:gap-3 px-1 sm:px-2">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 border border-blue-100">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary-blue" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-[13px] font-bold text-[#0f1b3a] leading-tight">Compliant</div>
                      <div className="text-[11px] sm:text-xs text-slate-500 font-medium">and reliable</div>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="flex items-center gap-2.5 sm:gap-3 px-1 sm:px-2">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 border border-blue-100">
                      <Fan className="w-4 h-4 sm:w-5 sm:h-5 text-primary-blue" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-[13px] font-bold text-[#0f1b3a] leading-tight">High airflow</div>
                      <div className="text-[11px] sm:text-xs text-slate-500 font-medium">quiet operation</div>
                    </div>
                  </div>

                  {/* Feature 5 */}
                  <div className="flex items-center gap-2.5 sm:gap-3 px-1 sm:px-2 col-span-2 sm:col-span-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 border border-blue-100">
                      <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-primary-blue" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-[13px] font-bold text-[#0f1b3a] leading-tight">Low upkeep</div>
                      <div className="text-[11px] sm:text-xs text-slate-500 font-medium">easy filter change</div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 02 / WHY NAPCEN SECTION */}


        {/* PRODUCTS / COLLECTORS SECTION */}
        <section id="collectors" className="pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20 bg-white relative overflow-hidden scroll-mt-24">
          <span id="products" className="block -mt-24 pt-24 invisible pointer-events-none" aria-hidden="true" />
          <div className="w-full px-4 md:px-8 xl:px-12 2xl:px-16">
            {/* Header Area */}
            <div className="grid md:grid-cols-[2fr_1fr] gap-6 md:gap-12 items-center mb-10 md:mb-16 relative">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-4xl">
                <div className="mb-3 md:mb-4">
                  <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase block">
                    CHOOSE THE RIGHT APPROACH
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0f1b3a] leading-[1.08] tracking-tight mb-4 md:mb-6">
                  One goal. Six ways <br className="hidden md:block" />
                  <span className="text-primary-blue">to capture fumes.</span>
                </h2>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex justify-start md:justify-end items-center mt-4 md:mt-0">
                <p className="text-slate-500 text-base md:text-lg max-w-sm leading-relaxed font-medium">
                  Explore the fume extractor products listed by NAPCEN. Start with your process; confirm the final configuration through an engineering review.
                </p>
              </motion.div>
            </div>

            {/* Product Cards Grid */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {[
                {
                  category: "METAL FABRICATION · WELDING BAYS",
                  title: "Welding fume extractor",
                  image: "/Welding fume extractor.png",
                  desc: "Capture welding smoke closer to the arc. Plan the hood position around the welding process, component size and operator movement.",
                  bullets: [
                    "Metal particulate loading",
                    "Workstation access",
                    "Shielding-gas compatibility"
                  ]
                },
                {
                  category: "LASER CUTTING · MARKING · ENGRAVING",
                  title: "Laser fume extractor",
                  image: "/Laser Fume Extractor.png",
                  desc: "Collect fine particles and process smoke at the laser enclosure. Material composition determines the filtration and discharge arrangement.",
                  bullets: [
                    "Enclosure extraction",
                    "Fine-particle filtration",
                    "Material-specific assessment"
                  ]
                },
                {
                  category: "ELECTRONICS · PCB ASSEMBLY",
                  title: "Soldering fume extractor",
                  image: "/Soldering fume Extractor.png",
                  desc: "Bring extraction to the soldering point to collect flux smoke before it spreads across the bench. Match each capture point to the working area.",
                  bullets: [
                    "Bench-level capture",
                    "Flux-fume assessment",
                    "Filter access"
                  ]
                },
                {
                  category: "RESEARCH · TESTING · CHEMICAL HANDLING",
                  title: "Laboratory fume extractor",
                  image: "/Blue Industrial Filtration Cabinet with Controls.png",
                  desc: "Select local extraction around the substances used, their concentrations and the laboratory workflow. Vapour duties need chemistry-specific treatment.",
                  bullets: [
                    "Chemical compatibility",
                    "Containment review",
                    "Suitable discharge"
                  ]
                },
                {
                  category: "JEWELLERY · MELTING · REFINING",
                  title: "Gold fume extractor",
                  image: "/Gold fume extractor.png",
                  desc: "Evaluate extraction for gold-processing operations by identifying metal fumes, fine particles and any acid vapours separately. Each requires a suitable treatment route.",
                  bullets: [
                    "Process-specific capture",
                    "Metal particulate control",
                    "Acid-vapour review"
                  ]
                },
                {
                  category: "SCREEN · OFFSET · FLEXOGRAPHIC PRINTING",
                  title: "Printing fume extractor",
                  image: "/Industrial Blue Control Cabinet Cutout.png",
                  desc: "Capture emissions around printing and associated handling processes. Solvent identity and vapour loading guide adsorption or other treatment selection.",
                  bullets: [
                    "Ink and solvent data",
                    "VOC treatment review",
                    "Planned media replacement"
                  ]
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(15,27,58,0.03)] hover:shadow-[0_16px_40px_rgba(15,27,58,0.08)] hover:border-blue-200 transition-all flex flex-col h-full group"
                >
                  {/* Product Image Area */}
                  <div className="relative w-full h-52 sm:h-60 mb-5 flex items-center justify-center p-4 overflow-hidden group-hover:border-blue-200/80 transition-colors">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain drop-shadow-[0_8px_16px_rgba(15,27,58,0.08)] group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget.parentElement?.querySelector(".img-placeholder") as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div className="img-placeholder hidden flex-col items-center justify-center text-center p-4">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200/80 text-primary-blue flex items-center justify-center mb-2">
                        <Wind className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-[#0f1b3a]">{item.title}</span>
                      <span className="text-[11px] text-slate-400 mt-1">Image: {item.image}</span>
                    </div>
                  </div>

                  {/* Category Eyebrow */}
                  <div className="text-[11px] font-bold text-slate-500 tracking-[0.18em] uppercase mb-2">
                    {item.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-[26px] font-bold text-[#0f1b3a] tracking-tight mb-3 group-hover:text-primary-blue transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-[14px] leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>

                  {/* Key bullets */}
                  <ul className="space-y-2.5 mb-8">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-[13px] text-slate-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Divider line & Bottom Link */}
                  <div className="mt-auto pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        const appMapping: Record<string, string> = {
                          "Welding fume extractor": "Welding / fabrication",
                          "Laser fume extractor": "Laser cutting / marking",
                          "Soldering fume extractor": "Soldering / electronics",
                          "Laboratory fume extractor": "Laboratory / chemical work",
                          "Gold fume extractor": "Gold processing",
                          "Printing fume extractor": "Printing",
                        };
                        const selectedApp = appMapping[item.title] || item.title;
                        setFormData((prev) => ({ ...prev, application: selectedApp }));
                        const formEl = document.getElementById("contact");
                        if (formEl) {
                          formEl.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                        setTimeout(() => {
                          const inputEl = document.getElementById("form-application");
                          if (inputEl) {
                            inputEl.focus();
                            inputEl.classList.add("!border-primary-blue", "ring-4", "ring-primary-blue/30");
                            setTimeout(() => {
                              inputEl.classList.remove("ring-4", "ring-primary-blue/30");
                            }, 2000);
                          }
                        }, 350);
                      }}
                      className="text-[#0f1b3a] hover:text-primary-blue text-[13px] font-bold flex items-center gap-1 transition-colors group/btn cursor-pointer"
                    >
                      <span>Discuss this application</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Footnote Disclaimer */}
            <div className="mt-8 sm:mt-10">
              <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-4xl">
                Images are supplied equipment visualizations; schematic illustrations explain extraction methods. Neither represents a verified installation or a model specification. Final equipment configuration, performance and scope depend on the agreed design basis.
              </p>
            </div>
          </div>
        </section>

        {/* 07 / INSIDE THE PROCESS - AIR PATH & PIPELINE SECTION */}
        <section id="how-it-works" className="py-20 sm:py-28 lg:py-32 bg-[#030712] relative overflow-hidden border-t border-b border-slate-800 scroll-mt-24">
          <span id="inside-the-process" className="block -mt-24 pt-24 invisible pointer-events-none" aria-hidden="true" />

          {/* Full High-End Industrial Factory Plant Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/process-emission-bg.jpg"
              alt="Industrial air pollution control and fume extraction system plant"
              fill
              className="object-cover object-right lg:object-center opacity-70"
            />
            {/* Dark Vignette & Gradient Overlays - smoothly fades to deep black on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/90 sm:via-[#030712]/75 to-[#030712]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/80" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="w-full px-6 lg:px-14 xl:px-20 mx-auto max-w-[1600px] relative z-10">
            {/* Header: Eyebrow, Title & Lead */}
            <div className="max-w-3xl mb-14 sm:mb-20">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-white font-bold text-xs sm:text-[13px] tracking-[0.24em] uppercase">
                    INSIDE THE PROCESS
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black text-white leading-[1.08] tracking-tight">
                  From process emission <br className="hidden sm:inline" />
                  to controlled discharge.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base lg:text-[16.5px] leading-relaxed font-normal max-w-2xl mt-4 sm:mt-5 drop-shadow-sm">
                  Capture performance depends on the whole air path. Hood placement, duct resistance and filter condition matter as much as the extractor itself.
                </p>
              </motion.div>
            </div>

            {/* 4-Stage Air Path Pipeline */}
            <div className="relative">
              {/* Desktop Horizontal Glowing Connecting Line */}
              <div className="hidden lg:block absolute top-[65px] left-[12.5%] right-[12.5%] h-[2.5px] bg-gradient-to-r from-[#0099ff]/30 via-[#0099ff] to-[#0099ff]/30 shadow-[0_0_12px_#0099ff] z-0 pointer-events-none" />

              {/* Desktop Connecting Arrow Badges between Columns */}
              <div
                style={{ width: '34px', height: '34px' }}
                className="hidden lg:flex absolute top-[48px] left-[25%] -translate-x-1/2 w-[34px] h-[34px] aspect-square shrink-0 rounded-full bg-[#050c1a] border-2 border-[#0099ff] text-[#0099ff] items-center justify-center z-20 shadow-[0_0_14px_rgba(0,153,255,0.7)]"
              >
                <ArrowRight className="w-4 h-4 text-[#0099ff]" />
              </div>
              <div
                style={{ width: '34px', height: '34px' }}
                className="hidden lg:flex absolute top-[48px] left-[50%] -translate-x-1/2 w-[34px] h-[34px] aspect-square shrink-0 rounded-full bg-[#050c1a] border-2 border-[#0099ff] text-[#0099ff] items-center justify-center z-20 shadow-[0_0_14px_rgba(0,153,255,0.7)]"
              >
                <ArrowRight className="w-4 h-4 text-[#0099ff]" />
              </div>
              <div
                style={{ width: '34px', height: '34px' }}
                className="hidden lg:flex absolute top-[48px] left-[75%] -translate-x-1/2 w-[34px] h-[34px] aspect-square shrink-0 rounded-full bg-[#050c1a] border-2 border-[#0099ff] text-[#0099ff] items-center justify-center z-20 shadow-[0_0_14px_rgba(0,153,255,0.7)]"
              >
                <ArrowRight className="w-4 h-4 text-[#0099ff]" />
              </div>

              {/* 4 Columns Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                {[
                  {
                    num: "01",
                    title: "Collect near the source",
                    desc: "Position the hood or enclosure to intercept the plume while allowing the task to be carried out comfortably.",
                    icon: (
                      <svg className="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 64 64" fill="none">
                        <defs>
                          <linearGradient id="hoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#475569" />
                            <stop offset="35%" stopColor="#cbd5e1" />
                            <stop offset="65%" stopColor="#f1f5f9" />
                            <stop offset="100%" stopColor="#334155" />
                          </linearGradient>
                          <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#475569" />
                            <stop offset="40%" stopColor="#94a3b8" />
                            <stop offset="100%" stopColor="#1e293b" />
                          </linearGradient>
                        </defs>
                        <rect x="27" y="6" width="10" height="12" rx="1.5" fill="url(#pipeGrad)" stroke="#94a3b8" strokeWidth="1.2" />
                        <line x1="25" y1="6" x2="39" y2="6" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                        <path d="M27 18 L13 36 H51 L37 18 Z" fill="url(#hoodGrad)" stroke="#94a3b8" strokeWidth="1.2" strokeLinejoin="round" />
                        <line x1="11" y1="36" x2="53" y2="36" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
                        <g stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 53 V42 M18 45 L21 42 L24 45" />
                          <path d="M32 53 V42 M29 45 L32 42 L35 45" />
                          <path d="M43 53 V42 M40 45 L43 42 L46 45" />
                        </g>
                      </svg>
                    )
                  },
                  {
                    num: "02",
                    title: "Move the air",
                    desc: "Size the extraction path around required flow, pressure losses and simultaneous workstation use.",
                    icon: (
                      <svg className="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 64 64" fill="none">
                        <defs>
                          <linearGradient id="ductGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#334155" />
                            <stop offset="40%" stopColor="#cbd5e1" />
                            <stop offset="70%" stopColor="#f8fafc" />
                            <stop offset="100%" stopColor="#475569" />
                          </linearGradient>
                        </defs>
                        <rect x="14" y="44" width="16" height="4" rx="1" fill="#475569" stroke="#94a3b8" strokeWidth="1.2" />
                        <path
                          d="M16 44 V30 C16 17 26 14 38 14 H46 V26 H38 C32 26 28 28 28 34 V44 Z"
                          fill="url(#ductGrad)"
                          stroke="#94a3b8"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <rect x="46" y="12" width="4" height="16" rx="1" fill="#475569" stroke="#94a3b8" strokeWidth="1.2" />
                        <path d="M20 22 L24 26" stroke="#64748b" strokeWidth="1.5" />
                        <g stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M38 38 H54 M50 34 L54 38 L50 42" />
                          <path d="M42 48 H58 M54 44 L58 48 L54 52" />
                        </g>
                      </svg>
                    )
                  },
                  {
                    num: "03",
                    title: "Match the filtration",
                    desc: "Select particulate filters, suitable adsorption or other treatment according to the identified pollutants.",
                    icon: (
                      <svg className="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 64 64" fill="none">
                        <defs>
                          <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#475569" />
                            <stop offset="50%" stopColor="#cbd5e1" />
                            <stop offset="100%" stopColor="#334155" />
                          </linearGradient>
                          <linearGradient id="pleatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#1e293b" />
                            <stop offset="50%" stopColor="#64748b" />
                            <stop offset="100%" stopColor="#1e293b" />
                          </linearGradient>
                        </defs>
                        <g fill="#38bdf8">
                          <circle cx="10" cy="22" r="1.5" />
                          <circle cx="14" cy="30" r="1.5" />
                          <circle cx="9" cy="38" r="1.5" />
                          <circle cx="15" cy="46" r="1.5" />
                          <circle cx="11" cy="54" r="1.5" />
                        </g>
                        <rect x="20" y="15" width="24" height="34" fill="url(#pleatGrad)" stroke="#94a3b8" strokeWidth="1.2" />
                        <line x1="24" y1="17.5" x2="24" y2="47" stroke="#94a3b8" strokeWidth="1.2" />
                        <line x1="28" y1="18.5" x2="28" y2="48" stroke="#cbd5e1" strokeWidth="1.5" />
                        <line x1="32" y1="19" x2="32" y2="48.5" stroke="#f8fafc" strokeWidth="1.8" />
                        <line x1="36" y1="18.5" x2="36" y2="48" stroke="#cbd5e1" strokeWidth="1.5" />
                        <line x1="40" y1="17.5" x2="40" y2="47" stroke="#94a3b8" strokeWidth="1.2" />
                        <ellipse cx="32" cy="15" rx="12" ry="4" fill="url(#capGrad)" stroke="#94a3b8" strokeWidth="1.2" />
                        <ellipse cx="32" cy="49" rx="12" ry="4" fill="url(#capGrad)" stroke="#94a3b8" strokeWidth="1.2" />
                        <g stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M49 28 H60 M56 24 L60 28 L56 32" />
                          <path d="M49 38 H60 M56 34 L60 38 L56 42" />
                        </g>
                      </svg>
                    )
                  },
                  {
                    num: "04",
                    title: "Verify the result",
                    desc: "Check airflow and filter condition. Plan replacement and assess outlet quality against the agreed design basis.",
                    icon: (
                      <svg className="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 64 64" fill="none">
                        <defs>
                          <linearGradient id="fanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#334155" />
                            <stop offset="45%" stopColor="#94a3b8" />
                            <stop offset="70%" stopColor="#cbd5e1" />
                            <stop offset="100%" stopColor="#1e293b" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M30 48 C18 48 12 38 12 28 C12 16 22 10 34 10 C46 10 50 18 50 24 V12 H58 V30 H48"
                          fill="url(#fanGrad)"
                          stroke="#94a3b8"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line x1="16" y1="52" x2="42" y2="52" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="22" y1="48" x2="20" y2="52" stroke="#64748b" strokeWidth="2" />
                        <line x1="36" y1="48" x2="38" y2="52" stroke="#64748b" strokeWidth="2" />
                        <circle cx="29" cy="29" r="10" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" />
                        <circle cx="29" cy="29" r="3.5" fill="#00d4ff" />
                        <line x1="29" y1="21" x2="29" y2="24" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="29" y1="34" x2="29" y2="37" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="21" y1="29" x2="24" y2="29" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="34" y1="29" x2="37" y2="29" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
                        <g stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M52 18 H63 M59 14 L63 18 L59 22" />
                          <path d="M52 26 H63 M59 22 L63 26 L59 30" />
                        </g>
                      </svg>
                    )
                  }
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="flex flex-col items-center group w-full"
                  >
                    {/* Glowing Cyan Circular Node */}
                    <div
                      style={{ width: '130px', height: '130px', minWidth: '130px', minHeight: '130px', maxWidth: '130px', maxHeight: '130px' }}
                      className="w-[130px] h-[130px] aspect-square shrink-0 rounded-full bg-[#050c1a]/95 backdrop-blur-md border-2 border-[#0099ff] shadow-[0_0_28px_rgba(0,153,255,0.7),inset_0_0_18px_rgba(0,153,255,0.3)] flex items-center justify-center relative z-10 group-hover:scale-105 group-hover:shadow-[0_0_42px_rgba(0,153,255,0.9)] transition-all duration-300 mb-6 sm:mb-8"
                    >
                      {step.icon}
                    </div>

                    {/* Dark Glassmorphic Card Container */}
                    <div className="w-full h-full bg-[#040915]/90 backdrop-blur-md border border-[#0d2238] rounded-2xl p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_40px_rgba(0,153,255,0.2)] transition-all duration-300 flex flex-col justify-start relative overflow-hidden group/card">
                      {/* Big Gray Background Number behind description */}
                      <span className="absolute -bottom-2 right-2 text-7xl sm:text-8xl font-black font-mono text-slate-800/70 select-none pointer-events-none z-0 tracking-tighter leading-none group-hover/card:text-slate-700/70 transition-colors">
                        {step.num}
                      </span>

                      <div className="relative z-10">
                        <h3 className="text-lg sm:text-[19px] font-bold text-white transition-colors leading-snug mb-2.5">
                          {step.title}
                        </h3>
                        <p className="text-slate-400 text-[13.5px] sm:text-sm leading-relaxed font-normal">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW / PROJECT LIFECYCLE SECTION */}
        {/* 05 / CHOOSE BY APPLICATION SECTION */}
        <section id="applications" className="pt-10 lg:pt-14 pb-12 lg:pb-24 bg-white relative overflow-clip border-t border-slate-100 scroll-mt-24">
          <div className="w-full px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 max-w-[1600px] mx-auto relative z-10">
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto mb-10 lg:mb-16">
              <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase block mb-3">
                APPLICATION GUIDE
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f1b3a] leading-[1.05] tracking-tight mb-5">
                What does your <span className="text-primary-blue">process produce?</span>
              </h2>
              <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-medium max-w-3xl mx-auto">
                Select a process to see useful information to include in your enquiry. Industrial fume extraction should fit the process, operator access and machinery layout.
              </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-16 items-start">
              {/* Left Side: Sticky Image & Guidance Card */}
              <div className="relative lg:sticky lg:top-32">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] group">
                  <Image
                    src="/Welding Under Industrial Fume Extraction.png"
                    alt="Industrial Fume Extraction Applications"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b3a]/80 via-[#0f1b3a]/25 to-transparent flex flex-col justify-end p-6 sm:p-7">
                    <span className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">
                      Tailored Fume Control
                    </span>
                    <h3 className="text-white font-black text-lg sm:text-xl leading-snug">
                      Engineered for Your Specific Process &amp; Emission Type
                    </h3>
                  </div>
                </div>

                {/* Conclusion Block under Image */}
                <div className="mt-6 sm:mt-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-blue-200 transition-colors">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-blue"></div>
                  <h4 className="text-[17px] font-black text-[#0f1b3a] mb-2 group-hover:text-primary-blue transition-colors">
                    Unsure which extractor you need?
                  </h4>
                  <p className="text-[13px] sm:text-sm text-slate-500 font-medium leading-relaxed mb-5">
                    Describe the operation and choose &ldquo;Recommend a system&rdquo; in your enquiry. Our team evaluates your airflow, material and site requirements.
                  </p>
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, application: "Custom / Application review", collector: "Recommend a system" }));
                      const formEl = document.getElementById("contact");
                      if (formEl) {
                        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                      setTimeout(() => {
                        const inputEl = document.getElementById("form-application");
                        if (inputEl) {
                          inputEl.focus();
                          inputEl.classList.add("!border-primary-blue", "ring-4", "ring-primary-blue/30");
                          setTimeout(() => {
                            inputEl.classList.remove("ring-4", "ring-primary-blue/30");
                          }, 2000);
                        }
                      }, 350);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-blue hover:bg-blue-700 text-white font-bold text-xs sm:text-[13px] shadow-sm hover:shadow-md transition-all group/btn"
                  >
                    <span>Get selection guidance</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>

              {/* Right Side: Numbered Steps / Application Cards */}
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                {[
                  {
                    num: "01",
                    title: "Welding fume extraction",
                    tagline: "Capture welding smoke closer to the arc.",
                    text: "Share the welding process, base metal, consumables, number of stations and daily operating hours. Capture position should support access without disrupting shielding gas.",
                    tellUsAbout: "Welding process, base metal, consumables, number of stations and daily operating hours.",
                    selectionDirection: "Capture position should support workstation access without disrupting shielding gas."
                  },
                  {
                    num: "02",
                    title: "Laser fume extraction",
                    tagline: "Fine-particle and process smoke control.",
                    text: "Share the laser process, power, materials, enclosure details and duty cycle. Assess the actual material emissions before specifying particle and vapour treatment.",
                    tellUsAbout: "Laser process, power, materials, enclosure details and duty cycle.",
                    selectionDirection: "Assess actual material emissions before specifying particle and vapour treatment."
                  },
                  {
                    num: "03",
                    title: "Soldering fume extraction",
                    tagline: "Point-of-soldering flux smoke capture.",
                    text: "Share flux type, soldering method, bench layout and simultaneous users. Include safety data sheets to assess particulate and vapour treatment requirements.",
                    tellUsAbout: "Flux type, soldering method, bench layout and simultaneous users.",
                    selectionDirection: "Include safety data sheets to assess particulate and vapour treatment requirements."
                  },
                  {
                    num: "04",
                    title: "Laboratory fume extraction",
                    tagline: "Chemical containment and local exhaust.",
                    text: "Share chemical names, safety data sheets, concentration, temperature and task details. Review containment, construction and exhaust treatment together.",
                    tellUsAbout: "Chemical names, safety data sheets, concentration, temperature and task details.",
                    selectionDirection: "Review containment, construction and exhaust treatment together."
                  },
                  {
                    num: "05",
                    title: "Gold fume extraction",
                    tagline: "Melting, refining and precious metal recovery.",
                    text: "Identify melting, casting, welding or refining steps separately. Include metal loading and any acid chemistry so each emission can receive suitable treatment.",
                    tellUsAbout: "Identify melting, casting, welding or refining steps separately.",
                    selectionDirection: "Include metal loading and any acid chemistry so each emission receives suitable treatment."
                  },
                  {
                    num: "06",
                    title: "Printing fume extraction",
                    tagline: "Solvent, VOC and press emission capture.",
                    text: "Share printing method, ink and solvent safety data, production hours and capture locations. VOC composition and loading determine suitable treatment.",
                    tellUsAbout: "Printing method, ink and solvent safety data, production hours and capture locations.",
                    selectionDirection: "VOC composition and loading determine suitable filtration and exhaust treatment."
                  }
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="bg-white rounded-3xl p-5 sm:p-6 lg:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl hover:border-blue-100 transition-all group"
                  >
                    <div className="grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-5 lg:gap-x-6 gap-y-3 sm:gap-y-1.5 items-center sm:items-start">
                      <div className="w-12 h-12 rounded-[14px] bg-slate-50 text-slate-400 font-black text-xl flex items-center justify-center shrink-0 group-hover:bg-primary-blue group-hover:text-white transition-colors shadow-sm border border-slate-100 group-hover:border-primary-blue sm:row-span-2 self-start">
                        {step.num}
                      </div>
                      <div className="pt-0.5 sm:pt-0">
                        <h3 className="text-lg sm:text-[20px] font-black text-[#0f1b3a] group-hover:text-primary-blue transition-colors">
                          {step.title}
                        </h3>
                        <h4 className="text-sm sm:text-[15px] font-bold text-primary-blue mt-1 mb-2">
                          {step.tagline}
                        </h4>
                      </div>
                      <div className="w-full col-span-2 sm:col-span-1 sm:col-start-2 mt-2">
                        <p className="text-slate-500 text-[13px] sm:text-[14px] leading-relaxed font-medium mb-4">
                          {step.text}
                        </p>

                        {/* Tell us about & Selection direction info grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 sm:p-5 bg-slate-50/80 rounded-2xl border border-slate-100 mb-4">
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                              Tell us about
                            </div>
                            <p className="text-xs sm:text-[13px] text-[#0f1b3a] font-medium leading-relaxed">
                              {step.tellUsAbout}
                            </p>
                          </div>
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                              Selection direction
                            </div>
                            <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
                              {step.selectionDirection}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const appMapping: Record<string, string> = {
                              "Welding fume extraction": "Welding / fabrication",
                              "Laser fume extraction": "Laser cutting / marking",
                              "Soldering fume extraction": "Soldering / electronics",
                              "Laboratory fume extraction": "Laboratory / chemical work",
                              "Gold fume extraction": "Gold processing",
                              "Printing fume extraction": "Printing",
                            };
                            const selectedApp = appMapping[step.title] || step.title;
                            setFormData(prev => ({ ...prev, application: selectedApp }));
                            const formEl = document.getElementById("contact");
                            if (formEl) {
                              formEl.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                            setTimeout(() => {
                              const inputEl = document.getElementById("form-application");
                              if (inputEl) {
                                inputEl.focus();
                                inputEl.classList.add("!border-primary-blue", "ring-4", "ring-primary-blue/30");
                                setTimeout(() => {
                                  inputEl.classList.remove("ring-4", "ring-primary-blue/30");
                                }, 2000);
                              }
                            }, 350);
                          }}
                          className="text-primary-blue hover:text-blue-700 font-bold text-xs sm:text-[13px] inline-flex items-center gap-1.5 transition-all group/link cursor-pointer"
                        >
                          <span>Discuss this application</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 04 / FILTRATION EXPLAINED / COMPARISON SECTION */}
        <section id="comparison" className="pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 bg-white relative overflow-hidden border-t border-slate-100 scroll-mt-24">
          <div className="w-full px-6 lg:px-14 xl:px-20 mx-auto max-w-[1600px] relative z-10">
            {/* Header */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-3xl mb-8 sm:mb-10">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-slate-500 font-bold text-[11px] sm:text-[12px] tracking-[0.2em] uppercase">
                  FILTRATION EXPLAINED
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-[#0f1b3a] leading-[1.08] tracking-tight mb-4 sm:mb-5">
                Choose by pollutant.<br />
                <span className="text-primary-blue">Then choose the filter.</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base lg:text-[16px] leading-relaxed font-normal">
                Filter arrangements are project-specific. A particle removal rating alone cannot establish control of vapours or gases.
              </p>
            </motion.div>

            {/* Sub-label */}
            <div className="mb-3 text-[12px] sm:text-[13px] text-slate-500 font-medium">
              Treatment stages to discuss during the application review
            </div>

            {/* Comparison Table */}
            <div className="w-full overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 mb-10 sm:mb-12">
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-200/90 overflow-hidden min-w-[760px] w-full">
                {/* Header row */}
                <div className="grid grid-cols-[1.4fr_2fr_2fr] bg-slate-50 border-b border-slate-200 text-[#0f1b3a]">
                  <div className="p-4 sm:p-5 font-bold text-xs sm:text-sm tracking-wide">
                    Stage or component
                  </div>
                  <div className="p-4 sm:p-5 font-bold text-xs sm:text-sm tracking-wide">
                    Purpose
                  </div>
                  <div className="p-4 sm:p-5 font-bold text-xs sm:text-sm tracking-wide">
                    What to check
                  </div>
                </div>

                {/* Rows */}
                {[
                  {
                    stage: "Pre-filter",
                    purpose: "Collect larger particles before finer stages.",
                    check: "Loading rate, replacement access and compatibility."
                  },
                  {
                    stage: "Cartridge filtration",
                    purpose: "Collect suitable fine particulate and process dust.",
                    check: "Filter media, cleaning method and pressure drop."
                  },
                  {
                    stage: "HEPA filtration",
                    purpose: "Provide high-efficiency particle filtration where specified.",
                    check: "Filter classification, system sealing and actual duty."
                  },
                  {
                    stage: "Activated carbon",
                    purpose: "Adsorb selected vapours and odour compounds.",
                    check: "Species, capacity, humidity, breakthrough and replacement."
                  },
                  {
                    stage: "Chemical treatment",
                    purpose: "Treat selected reactive or corrosive gas streams.",
                    check: "Chemistry, materials and whether a scrubber is required."
                  }
                ].map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[1.4fr_2fr_2fr] border-t border-slate-100 hover:bg-slate-50/80 transition-colors items-center text-xs sm:text-[13.5px]"
                  >
                    <div className="p-4 sm:p-5 font-bold text-[#0f1b3a]">
                      {row.stage}
                    </div>
                    <div className="p-4 sm:p-5 text-slate-600 font-medium">
                      {row.purpose}
                    </div>
                    <div className="p-4 sm:p-5 text-slate-600">
                      {row.check}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Card: Filters, accessories and ongoing upkeep */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h3 className="text-xl sm:text-2xl font-black text-[#0f1b3a] mb-2 tracking-tight">
                  Filters, accessories and ongoing upkeep.
                </h3>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
                  NAPCEN lists cartridge filters, pre-filters, HEPA filters, activated carbon filters, hoses, blowers and differential pressure gauges. Confirm compatibility with your equipment before ordering.
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-lg border border-slate-300 hover:border-primary-blue bg-white hover:bg-slate-50 text-[#0f1b3a] hover:text-primary-blue font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
                >
                  <span>View accessories</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* 06 / ENGINEERING BEFORE QUOTATION SECTION */}
        <section id="engineering-quotation" className="pt-16 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32 bg-white relative overflow-hidden border-t border-slate-100 scroll-mt-24">
          <span id="engineering" className="block -mt-24 pt-24 invisible pointer-events-none" aria-hidden="true" />
          <div className="w-full px-6 lg:px-12 xl:px-16 2xl:px-20 mx-auto max-w-[1700px] relative z-10">
            <div className="grid lg:grid-cols-[1fr_1.9fr] gap-12 xl:gap-16 items-center">
              {/* Left Column: Heading, Lead & CTAs */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="max-w-xl"
              >
                {/* Eyebrow with blue line */}
                <div className="flex items-center gap-3.5 mb-5 sm:mb-6">
                  <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase block mb-3">
                    ENGINEERING BEFORE QUOTATION
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-black text-[#0f1b3a] leading-[1.08] tracking-tight mb-5 sm:mb-6">
                  A useful proposal <br />
                  starts with <br />
                  useful data.
                </h2>

                {/* Description */}
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal mb-8 sm:mb-10 max-w-lg">
                  Fume extractor price depends on capture points, airflow, filtration, materials, controls and installation scope. Share the actual operating conditions so the proposal can address both equipment and upkeep.
                </p>

                {/* Action Button */}
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-7 py-3.5 sm:py-4 rounded-xl bg-[#0f1b3a] hover:bg-primary-blue text-white font-bold text-sm shadow-[0_10px_25px_rgba(15,27,58,0.15)] hover:shadow-[0_14px_30px_rgba(10,92,187,0.25)] transition-all flex items-center gap-2 group"
                  >
                    <span>Discuss your design basis</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </motion.div>

              {/* Right Side: 2 Columns of Connected Step Cards */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8 xl:gap-10 pt-4"
              >
                {/* Column 1 (01, 03, 05) */}
                <div className="flex flex-col gap-10 sm:gap-12 relative pt-2">
                  {[
                    {
                      num: "01",
                      title: "Process",
                      desc: "Material, operation, consumables and pollutant information.",
                      image: "/step-process.jpg",
                      icon: FileText
                    },
                    {
                      num: "03",
                      title: "Operating duty",
                      desc: "Hours, temperature, peak loading and available airflow data.",
                      image: "/step-duty.jpg",
                      icon: Activity
                    },
                    {
                      num: "05",
                      title: "Performance",
                      desc: "Required outlet criteria and applicable process requirements.",
                      image: "/step-performance.jpg",
                      icon: BarChart3
                    }
                  ].map((step, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeInUp}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="relative flex items-center group"
                    >
                      {/* Large Gray Number tucked slightly behind the circular image */}
                      <span className="absolute -top-7 sm:-top-9 left-0 sm:left-1 text-slate-200 font-black text-5xl sm:text-6xl lg:text-[70px] leading-none select-none z-10 tracking-tighter group-hover:text-slate-300 transition-colors pointer-events-none">
                        {step.num}
                      </span>

                      {/* Full Pill Container (Image overlapping Card) */}
                      <div className="w-full flex items-center relative pt-2">
                        {/* Circular Thumbnail Photo (z-20 sits in front of the number) */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-[4px] border-white shadow-[0_8px_25px_rgba(15,27,58,0.14)] shrink-0 z-20 relative bg-slate-100">
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            sizes="96px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Card Body Capsule */}
                        <div className="-ml-7 sm:-ml-9 flex-1 min-w-0 bg-white rounded-2xl sm:rounded-full py-3.5 sm:py-4 pl-10 sm:pl-12 pr-5 sm:pr-6 border border-slate-100 shadow-[0_6px_25px_rgba(15,27,58,0.05)] hover:shadow-[0_12px_35px_rgba(10,92,187,0.1)] hover:border-blue-200 transition-all z-10 flex items-center gap-3 sm:gap-3.5">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-50 border border-blue-100/80 text-primary-blue flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <step.icon className="w-4 h-4 text-primary-blue" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-[14px] sm:text-[15px] font-bold text-[#0f1b3a] leading-tight group-hover:text-primary-blue transition-colors">
                              {step.title}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed mt-0.5 line-clamp-2">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Column 2 (02, 04, 06) */}
                <div className="flex flex-col gap-10 sm:gap-12 relative pt-2">
                  {[
                    {
                      num: "02",
                      title: "Capture",
                      desc: "Workstation size, hood location and number of active points.",
                      image: "/step-capture.jpg",
                      icon: Wind
                    },
                    {
                      num: "04",
                      title: "Installation",
                      desc: "Layout, duct route, utilities, access and discharge location.",
                      image: "/step-installation.jpg",
                      icon: Wrench
                    },
                    {
                      num: "06",
                      title: "Maintenance",
                      desc: "Filter access, replacement planning and waste handling.",
                      image: "/step-maintenance.jpg",
                      icon: ShieldCheck
                    }
                  ].map((step, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeInUp}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="relative flex items-center group"
                    >
                      {/* Large Gray Number tucked slightly behind the circular image */}
                      <span className="absolute -top-7 sm:-top-9 left-0 sm:left-1 text-slate-200 font-black text-5xl sm:text-6xl lg:text-[70px] leading-none select-none z-10 tracking-tighter group-hover:text-slate-300 transition-colors pointer-events-none">
                        {step.num}
                      </span>

                      {/* Full Pill Container (Image overlapping Card) */}
                      <div className="w-full flex items-center relative pt-2">
                        {/* Circular Thumbnail Photo (z-20 sits in front of the number) */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-[4px] border-white shadow-[0_8px_25px_rgba(15,27,58,0.14)] shrink-0 z-20 relative bg-slate-100">
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            sizes="96px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Card Body Capsule */}
                        <div className="-ml-7 sm:-ml-9 flex-1 min-w-0 bg-white rounded-2xl sm:rounded-full py-3.5 sm:py-4 pl-10 sm:pl-12 pr-5 sm:pr-6 border border-slate-100 shadow-[0_6px_25px_rgba(15,27,58,0.05)] hover:shadow-[0_12px_35px_rgba(10,92,187,0.1)] hover:border-blue-200 transition-all z-10 flex items-center gap-3 sm:gap-3.5">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-50 border border-blue-100/80 text-primary-blue flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <step.icon className="w-4 h-4 text-primary-blue" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-[14px] sm:text-[15px] font-bold text-[#0f1b3a] leading-tight group-hover:text-primary-blue transition-colors">
                              {step.title}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed mt-0.5 line-clamp-2">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WORKFLOW / PROJECT LIFECYCLE SECTION */}
        <WorkflowSection />

        {/* WHY NAPCEN SECTION */}
        <WhyNapcenSection />

        {/* FAQ SECTION */}
        <section id="faq" className="py-12 sm:py-16 lg:py-24 bg-white relative overflow-hidden scroll-mt-24">
          <span id="faqs" className="block -mt-24 pt-24 invisible pointer-events-none" aria-hidden="true" />
          <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 lg:gap-24 items-start">

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="static lg:sticky lg:top-32 mb-2 lg:mb-0">
                <span className="text-slate-500 font-bold text-[11px] tracking-[0.2em] uppercase block mb-2 sm:mb-4">
                  ANSWERS BEFORE YOU ENQUIRE
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-[#0f1b3a] leading-[1.1] tracking-tight mb-4 lg:mb-6">
                  Fume extraction,<br />made clearer.
                </h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-sm">
                  Practical answers for equipment selection, filtration and quotation planning.
                </p>
              </motion.div>

              <div className="flex flex-col">
                {visibleFaqs.map((faq, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <div key={i} className="border-b border-slate-200 last:border-0 overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                      >
                        <h3 className={`text-lg font-bold pr-8 transition-colors duration-300 ${isOpen ? 'text-primary-blue' : 'text-[#0f1b3a] group-hover:text-primary-blue'}`}>
                          {faq.q}
                        </h3>
                        <div className={`relative shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'border-primary-blue bg-primary-blue shadow-md' : 'border-slate-200 bg-slate-50 group-hover:border-primary-blue group-hover:bg-blue-50'}`}>
                          <div className={`absolute w-3.5 h-[2px] transition-all duration-300 rounded-full ${isOpen ? 'bg-white' : 'bg-slate-600 group-hover:bg-primary-blue'}`}></div>
                          <div className={`absolute w-[2px] h-3.5 transition-all duration-300 rounded-full ${isOpen ? 'bg-white rotate-90 scale-0' : 'bg-slate-600 group-hover:bg-primary-blue scale-100'}`}></div>
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="pb-8 pr-12 text-slate-500 text-[15px] font-medium leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {dustFaqs.length > 8 && (
                  <div className="pt-8 flex justify-center w-full">
                    <button
                      type="button"
                      onClick={() => setShowAllFaqs(!showAllFaqs)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 hover:border-primary-blue text-[#0f1b3a] hover:text-primary-blue font-bold text-sm shadow-sm transition-all bg-white cursor-pointer"
                    >
                      <span>{showAllFaqs ? "Show less" : "Read more"}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAllFaqs ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* COMBINED CTA & FOOTER SECTION */}
        <Footer
          className="bg-black pt-24"
          brandName="NAPCEN"
          brandDescription="Industrial Air Pollution Control Equipment & Engineering Solutions. Built around the application, not just the equipment."
          creatorName="NAPCEN Team"
          creatorUrl="#"
          navLinks={[
            { label: "Products", href: "#products" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Applications", href: "#applications" },
            { label: "Engineering", href: "#engineering" },
            { label: "FAQs", href: "#faq" },
          ]}
          socialLinks={[
            { icon: <Globe className="w-5 h-5" />, href: "#", label: "Website" },
            { icon: <Users className="w-5 h-5" />, href: "#", label: "LinkedIn" },
            { icon: <Mail className="w-5 h-5" />, href: "#contact", label: "Email" },
          ]}
          brandIcon={<Image src="/Napcen-logo.webp" alt="NAPCEN Logo" width={80} height={80} className="object-contain p-2" />}
        >
          <div className="container mx-auto px-6 max-w-7xl relative z-10 mb-20 border-b border-white/10 pb-20">
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">

              {/* Left Column */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-xl">
                <span className="text-white font-mono text-[11px] tracking-[0.3em] uppercase mb-6 block">
                  Let's Build Together
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-[54px] font-black text-white mb-6 leading-[1.1] tracking-tight">
                  Need industrial air <br className="hidden md:block" />
                  pollution control equipment?
                </h2>
                <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                  Start a technical discussion with NAPCEN engineers. We analyze your process to provide the most effective pollution control solution.
                </p>

                {/* Contact Minimal Blocks */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-[#12161b] flex items-center justify-center transition-all border border-white/5 shrink-0">
                        <Phone className="text-cyan-400 w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">SALES INQUIRY</div>
                        <a href="tel:+917904469219" className="text-white text-[15px] font-bold tracking-wide hover:text-cyan-400 transition-colors block">
                          +91 79044 69219
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-[#12161b] flex items-center justify-center transition-all border border-white/5 shrink-0">
                        <Mail className="text-cyan-400 w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">GENERAL SUPPORT</div>
                        <a href="mailto:info@napcen.com" className="text-white text-[15px] font-bold tracking-wide hover:text-cyan-400 transition-colors block"> info@napcen.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#12161b] flex items-center justify-center transition-all border border-white/5 shrink-0 mt-1">
                      <MapPin className="text-cyan-400 w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white text-[15px] font-bold tracking-wide hover:text-cyan-400 transition-colors block leading-relaxed">
                        No. 42, Main Road, Villianur,<br />
                        Puducherry, India - 605110
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column (Dark Sleek Card) */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative z-10 overflow-hidden group">
                {/* Glow effect */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/10 transition-colors duration-700"></div>

                <h3 className="text-3xl font-bold text-white mb-4 relative z-10 tracking-tight">Request a quotation</h3>
                <p className="text-slate-400 mb-10 font-medium leading-relaxed relative z-10">
                  Provide your process specifications, and our engineers will evaluate the requirements for a customized solution.
                </p>
                <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="relative z-10 flex w-full justify-between items-center bg-white hover:bg-slate-200 text-black font-black py-4 px-8 rounded-full transition-all text-sm tracking-widest uppercase group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer">
                  <span>Get my quotation</span>
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </a>
              </motion.div>
            </div>

            {/* Privacy Disclaimer */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <h4 className="text-slate-300 font-bold text-sm mb-2">Enquiry data & privacy</h4>
              <p className="text-slate-500 text-xs leading-relaxed max-w-4xl">
                Your enquiry details are submitted securely to NAPCEN's engineering team for prompt technical review and customized quotation. We do not sell or share your contact information with third parties. For direct communications, you can also reach us at <a href="mailto:info@napcen.com" className="text-slate-300 hover:text-white underline underline-offset-2 transition-colors">info@napcen.com</a>.
              </p>
            </div>
          </div>
        </Footer>
      </main>
    </div>
  );
}
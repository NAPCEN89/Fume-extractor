"use client";

import React, { useState, useEffect, useRef } from "react";
import { Wind, Layers, Building2, Sliders, Info, Sparkles, Check } from "lucide-react";

interface DustApp {
  name: string;
  vCartridge: number;
  vBaghouse: number;
  desc?: string;
}

const APPLICATIONS: DustApp[] = [
  { 
    name: "Fine Metallic Fumes", 
    vCartridge: 0.8, 
    vBaghouse: 1.0,
    desc: "Thermal cutting, laser/plasma, welding, metallurgical fume" 
  },
  { 
    name: "Wood Dust", 
    vCartridge: 1.2, 
    vBaghouse: 1.6,
    desc: "Sawing, routing, sanding, biomass coarse/fine dust" 
  },
  { 
    name: "Cement / Mineral Dust", 
    vCartridge: 0.9, 
    vBaghouse: 1.2,
    desc: "Crushing, screening, bulk loading, raw material grinding" 
  },
  { 
    name: "Pharmaceutical Fine Dust", 
    vCartridge: 0.7, 
    vBaghouse: 0.9,
    desc: "Blending, tablet compression, active powder handling" 
  }
];

export default function FilterCalculator() {
  const [airflow, setAirflow] = useState<number>(10000);
  const [appIndex, setAppIndex] = useState<number>(0);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const app = APPLICATIONS[appIndex];
  const qM3Min = airflow / 60; // m³/min
  
  // A = Q / V
  const cartridgeArea = Math.round(qM3Min / app.vCartridge);
  const baghouseArea = Math.round(qM3Min / app.vBaghouse);

  // Footprint estimation heuristic (m² floor space)
  // Cartridge media is compact (~45 m² media / m² footprint)
  // Baghouse media is vertical bags (~18 m² media / m² footprint)
  const cartridgeFootprint = (cartridgeArea / 45).toFixed(1);
  const baghouseFootprint = (baghouseArea / 18).toFixed(1);

  const sliderPercent = ((airflow - 2000) / (50000 - 2000)) * 100;

  // Space savings calculation
  const spaceSavedPct = Math.round(
    ((parseFloat(baghouseFootprint) - parseFloat(cartridgeFootprint)) / parseFloat(baghouseFootprint)) * 100
  );

  // Canvas Bar Chart Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderChart = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Handle high DPI display
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Clear background
      ctx.clearRect(0, 0, width, height);

      // Chart margins (generous bottom margin for clean 2-tier axis labels)
      const margin = { top: 26, right: 16, bottom: 44, left: 46 };
      const chartW = width - margin.left - margin.right;
      const chartH = height - margin.top - margin.bottom;

      if (chartW <= 0 || chartH <= 0) return;

      // Values to plot:
      // Group 1: Media Area -> [cartridgeArea, baghouseArea]
      // Group 2: Footprint -> [parseFloat(cartridgeFootprint), parseFloat(baghouseFootprint)]
      const maxVal = Math.max(cartridgeArea, baghouseArea, 50);
      // Nice round upper ceiling for grid
      const yCeil = Math.ceil((maxVal * 1.15) / 50) * 50;

      // Draw horizontal grid lines
      const gridSteps = 4;
      ctx.strokeStyle = "#f1f5f9"; // slate-100
      ctx.lineWidth = 1;
      ctx.fillStyle = "#94a3b8"; // slate-400
      ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";

      for (let i = 0; i <= gridSteps; i++) {
        const val = Math.round((yCeil / gridSteps) * i);
        const y = margin.top + chartH - (i / gridSteps) * chartH;

        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(margin.left + chartW, y);
        ctx.stroke();

        ctx.fillText(`${val}`, margin.left - 10, y);
      }

      // Group setup
      const groups = [
        {
          title: "Required Media",
          subtitle: "(m² filter area)",
          cVal: cartridgeArea,
          bVal: baghouseArea,
          unit: " m² media"
        },
        {
          title: "Estimated Footprint",
          subtitle: "(m² floor space)",
          cVal: parseFloat(cartridgeFootprint),
          bVal: parseFloat(baghouseFootprint),
          unit: " m² floor"
        }
      ];

      const groupW = chartW / groups.length;
      const maxBarW = Math.min(36, groupW * 0.22);
      const barGap = 8;

      groups.forEach((g, gIdx) => {
        const groupCenterX = margin.left + gIdx * groupW + groupW / 2;
        const cartridgeX = groupCenterX - maxBarW - barGap / 2;
        const baghouseX = groupCenterX + barGap / 2;

        // Group label along X axis (2 lines so labels never collide or wrap awkwardly)
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        ctx.fillStyle = "#334155"; // slate-700
        ctx.font = chartW < 360 
          ? "600 11px system-ui, -apple-system, sans-serif" 
          : "600 12px system-ui, -apple-system, sans-serif";
        ctx.fillText(g.title, groupCenterX, margin.top + chartH + 8);

        ctx.fillStyle = "#64748b"; // slate-500
        ctx.font = "500 10.5px ui-monospace, SFMono-Regular, monospace";
        ctx.fillText(g.subtitle, groupCenterX, margin.top + chartH + 22);

        // Heights
        const cH = Math.max(4, (g.cVal / yCeil) * chartH);
        const bH = Math.max(4, (g.bVal / yCeil) * chartH);

        const cY = margin.top + chartH - cH;
        const bY = margin.top + chartH - bH;

        // Helper to draw rounded top bar
        const drawBar = (x: number, y: number, w: number, h: number, color: string) => {
          const r = Math.min(6, w / 2, h / 2);
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(x, y + h);
          ctx.lineTo(x, y + r);
          ctx.quadraticCurveTo(x, y, x + r, y);
          ctx.lineTo(x + w - r, y);
          ctx.quadraticCurveTo(x + w, y, x + w, y + r);
          ctx.lineTo(x + w, y + h);
          ctx.closePath();
          ctx.fill();
        };

        // Draw Cartridge Bar (Primary Blue #0a5cbb)
        drawBar(cartridgeX, cY, maxBarW, cH, "#0a5cbb");

        // Draw Baghouse Bar (Slate Steel #5b6e9e)
        drawBar(baghouseX, bY, maxBarW, bH, "#5b6e9e");

        // Draw value text above bars
        ctx.font = "bold 11px ui-monospace, monospace";
        ctx.fillStyle = "#0f172a";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";

        ctx.fillText(`${g.cVal}`, cartridgeX + maxBarW / 2, cY - 4);
        ctx.fillText(`${g.bVal}`, baghouseX + maxBarW / 2, bY - 4);
      });
    };

    renderChart();

    const resizeObserver = new ResizeObserver(() => {
      renderChart();
    });
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
    };
  }, [airflow, appIndex, cartridgeArea, baghouseArea, cartridgeFootprint, baghouseFootprint]);

  return (
    <div className="w-full max-w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-100/60 p-4 sm:p-7 md:p-9 transition-all overflow-hidden">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-blue-50 text-primary-blue border border-blue-100">
              <Sparkles className="w-3 h-3" /> Interactive Tool
            </span>
            <span className="text-xs font-mono text-slate-400">v1.2 Sizing</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0f1b3a] tracking-tight">
            Dust Collector Media &amp; Footprint Calculator
          </h3>
          <p className="text-xs sm:text-[13px] text-slate-500 font-mono mt-1">
            Filter Area: <i className="font-serif">A</i> = <i className="font-serif">Q</i> / <i className="font-serif">V</i> &nbsp;|&nbsp; Cartridge vs. Baghouse Comparative Sizing
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 font-medium self-start sm:self-auto">
          <Info className="w-3.5 h-3.5 text-primary-blue shrink-0" />
          <span>Real-time Industrial Heuristics</span>
        </div>
      </div>

      {/* Metrics Grid (3 KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
        {/* Airflow Q */}
        <div className="bg-slate-50/80 hover:bg-slate-50 transition-colors p-4 sm:p-5 rounded-2xl border border-slate-200/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Airflow (Q)
              </span>
              <Wind className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0f1b3a] tracking-tight font-mono">
              {airflow.toLocaleString()} <span className="text-base font-normal text-slate-600">m³/h</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium pt-2 mt-2 border-t border-slate-200/50">
            {qM3Min.toFixed(1)} m³/min operating rate
          </div>
        </div>

        {/* Cartridge System */}
        <div className="bg-blue-50/40 hover:bg-blue-50/60 transition-colors p-4 sm:p-5 rounded-2xl border border-blue-200/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-primary-blue font-bold">
                Cartridge System
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-primary-blue" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0f1b3a] tracking-tight font-mono">
              {cartridgeArea.toLocaleString()} <span className="text-base font-normal text-slate-600">m²</span>
            </div>
          </div>
          <div className="text-xs text-slate-600 font-medium pt-2 mt-2 border-t border-blue-100 flex items-center justify-between">
            <span>Footprint ~ <strong className="text-primary-blue">{cartridgeFootprint} m²</strong></span>
            <span className="text-[11px] text-slate-400 font-mono">({app.vCartridge} m/min)</span>
          </div>
        </div>

        {/* Baghouse System */}
        <div className="bg-slate-50/80 hover:bg-slate-50 transition-colors p-4 sm:p-5 rounded-2xl border border-slate-200/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 font-bold">
                Baghouse System
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#5b6e9e]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0f1b3a] tracking-tight font-mono">
              {baghouseArea.toLocaleString()} <span className="text-base font-normal text-slate-600">m²</span>
            </div>
          </div>
          <div className="text-xs text-slate-600 font-medium pt-2 mt-2 border-t border-slate-200/50 flex items-center justify-between">
            <span>Footprint ~ <strong className="text-slate-700">{baghouseFootprint} m²</strong></span>
            <span className="text-[11px] text-slate-400 font-mono">({app.vBaghouse} m/min)</span>
          </div>
        </div>
      </div>

      {/* Chart Zone */}
      <div className="mb-4">
        <div className="w-full h-[280px] sm:h-[300px] bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 relative overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Chart Legend - Responsive card layout that never overflows on mobile */}
        <div className="mt-4 pt-1 grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5 w-full">
          {/* Cartridge Collector Card */}
          <div className="p-3 sm:px-4 sm:py-2.5 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-col min-[390px]:flex-row min-[390px]:items-center justify-between gap-1.5 min-[390px]:gap-2">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0a5cbb] shrink-0 ring-2 ring-blue-200" />
              <span className="text-xs sm:text-[13px] font-bold text-[#0f1b3a]">
                Cartridge Collector
              </span>
            </div>
            <span className="text-[11px] font-mono font-medium text-primary-blue bg-white/90 px-2 py-0.5 rounded-md border border-blue-100 self-start min-[390px]:self-auto">
              (~45 m² media / m² floor)
            </span>
          </div>

          {/* Baghouse Collector Card */}
          <div className="p-3 sm:px-4 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col min-[390px]:flex-row min-[390px]:items-center justify-between gap-1.5 min-[390px]:gap-2">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5b6e9e] shrink-0 ring-2 ring-slate-200" />
              <span className="text-xs sm:text-[13px] font-bold text-[#0f1b3a]">
                Baghouse Collector
              </span>
            </div>
            <span className="text-[11px] font-mono font-medium text-slate-600 bg-white/90 px-2 py-0.5 rounded-md border border-slate-200/70 self-start min-[390px]:self-auto">
              (~18 m² media / m² floor)
            </span>
          </div>
        </div>
      </div>

      {/* Control Deck */}
      <div className="bg-slate-50/90 rounded-2xl p-5 sm:p-6 border border-slate-200/80 flex flex-col gap-5 mt-5">
        {/* Row 1: Application Select */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-[160px]">
            <label htmlFor="calculator-app-select" className="text-sm font-bold text-[#0f1b3a] block">
              Application / Dust
            </label>
            <span className="text-xs text-slate-500">
              Sets allowable filtration velocity (m/min)
            </span>
          </div>

          <div className="flex-1 max-w-md w-full">
            <select
              id="calculator-app-select"
              value={appIndex}
              onChange={(e) => setAppIndex(parseInt(e.target.value, 10))}
              className="w-full h-11 px-3.5 sm:px-4 rounded-xl border border-slate-300 bg-white text-[#0f1b3a] text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue shadow-xs transition-all cursor-pointer"
            >
              {APPLICATIONS.map((item, idx) => (
                <option key={idx} value={idx}>
                  {item.name} (Cartridge: {item.vCartridge} m/min | Bag: {item.vBaghouse} m/min)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Airflow Slider */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-4 border-t border-slate-200/60">
          <div className="min-w-[160px]">
            <label htmlFor="calculator-airflow-slider" className="text-sm font-bold text-[#0f1b3a] block">
              Target Airflow
            </label>
            <span className="text-xs text-slate-500">
              Total process extraction volume
            </span>
          </div>

          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full">
            <div className="relative flex-1 flex items-center">
              <input
                id="calculator-airflow-slider"
                type="range"
                min={2000}
                max={50000}
                step={1000}
                value={airflow}
                onChange={(e) => setAirflow(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/30"
                style={{
                  background: `linear-gradient(to right, #0a5cbb 0%, #0a5cbb ${sliderPercent}%, #e2e8f0 ${sliderPercent}%, #e2e8f0 100%)`
                }}
              />
            </div>

            <div className="shrink-0 px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl font-mono text-sm font-bold text-[#0f1b3a] min-w-[110px] text-center shadow-xs">
              {airflow.toLocaleString()} m³/h
            </div>
          </div>
        </div>

        {/* Preset quick buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-semibold text-slate-500 mr-1">Quick Select:</span>
          {[5000, 10000, 18000, 25000, 40000].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAirflow(preset)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                airflow === preset
                  ? "bg-primary-blue text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/70"
              }`}
            >
              {preset.toLocaleString()} m³/h
            </button>
          ))}
        </div>
      </div>

      {/* Engineering Insights Card */}
      <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-linear-to-r from-blue-50/80 via-slate-50 to-white border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-blue/10 text-primary-blue flex items-center justify-center shrink-0 mt-0.5">
            <Building2 className="w-4 h-4 text-primary-blue" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0f1b3a]">
              Footprint Advantage: Cartridge saves ~{spaceSavedPct}% floor space
            </h4>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-0.5">
              Due to pleated media geometry (~45 m² media per m² footprint), cartridge collectors require significantly less plant space than vertical tubular baghouses for fine, dry dust.
            </p>
          </div>
        </div>

        <a
          href="#enquiry-form"
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0f1b3a] hover:bg-primary-blue text-white text-xs sm:text-[13px] font-bold transition-colors whitespace-nowrap shadow-sm"
        >
          Discuss Sizing With NAPCEN
        </a>
      </div>
    </div>
  );
}

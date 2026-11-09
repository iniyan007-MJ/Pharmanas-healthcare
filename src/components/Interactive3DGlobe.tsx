"use client";

import React, { useEffect, useRef, useState } from "react";
import { Globe2, Layers, Navigation, RefreshCw, ShieldCheck } from "lucide-react";

export function Interactive3DGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeLayer, setActiveLayer] = useState<
    "all" | "import" | "export" | "domestic"
  >("all");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let rotationY = 1.75; // Centered around Southeast Asia / Malaysia longitude
    let rotationX = 0.18;
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let pulsePhase = 0;

    // Generate 3D sphere lattice points
    const spherePoints: { lat: number; lon: number; isHub?: boolean; ring?: string }[] = [];
    for (let lat = -75; lat <= 75; lat += 12) {
      const count = Math.max(8, Math.floor(Math.cos((lat * Math.PI) / 180) * 38));
      for (let i = 0; i < count; i++) {
        const lon = (i / count) * 360 - 180;
        spherePoints.push({ lat, lon });
      }
    }

    // Illustrative conceptual coordination nodes (no invented client routes, labeled strictly as Conceptual Trade Corridors)
    const hubNode = { lat: 4.2, lon: 101.9 }; // Central Coordination Hub (Malaysia Reference)
    const conceptualArcs = [
      { lat: 24.0, lon: 54.0, type: "import" },
      { lat: 35.0, lon: 136.0, type: "import" },
      { lat: 48.0, lon: 11.0, type: "import" },
      { lat: -25.0, lon: 135.0, type: "export" },
      { lat: 14.0, lon: 108.0, type: "export" },
      { lat: -2.0, lon: 115.0, type: "export" },
      { lat: 5.4, lon: 100.3, type: "domestic" },
      { lat: 1.5, lon: 103.7, type: "domestic" },
      { lat: 5.9, lon: 116.0, type: "domestic" },
    ];

    const project3D = (
      lat: number,
      lon: number,
      radius: number,
      cx: number,
      cy: number
    ) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lon + 180) * Math.PI) / 180 + rotationY;

      const x0 = -radius * Math.sin(phi) * Math.cos(theta);
      const z0 = radius * Math.sin(phi) * Math.sin(theta);
      const y0 = radius * Math.cos(phi);

      // Rotate around X axis
      const y = y0 * Math.cos(rotationX) - z0 * Math.sin(rotationX);
      const z = y0 * Math.sin(rotationX) + z0 * Math.cos(rotationX);
      const x = x0;

      return {
        x: cx + x,
        y: cy - y,
        z,
        visible: z > -radius * 0.15,
      };
    };

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.37;

      ctx.clearRect(0, 0, width, height);

      // Ambient outer atmosphere glow
      const outerGlow = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.65,
        cx,
        cy,
        radius * 1.32
      );
      outerGlow.addColorStop(0, "rgba(8, 127, 91, 0.22)");
      outerGlow.addColorStop(0.6, "rgba(183, 240, 211, 0.08)");
      outerGlow.addColorStop(1, "rgba(6, 78, 59, 0)");
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.32, 0, Math.PI * 2);
      ctx.fill();

      // Globe body sphere gradient
      const globeGrad = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.3,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      globeGrad.addColorStop(0, "#0D6348");
      globeGrad.addColorStop(0.55, "#064E3B");
      globeGrad.addColorStop(1, "#03291E");

      ctx.fillStyle = globeGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle rim border
      ctx.strokeStyle = "rgba(183, 240, 211, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw latitude / longitude wireframe rings
      ctx.strokeStyle = "rgba(183, 240, 211, 0.08)";
      ctx.lineWidth = 1;
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -80; lat <= 80; lat += 8) {
          const p = project3D(lat, lon, radius, cx, cy);
          if (p.z > 0) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Draw 3D lattice points
      for (const pt of spherePoints) {
        const p = project3D(pt.lat, pt.lon, radius, cx, cy);
        if (p.z > 0) {
          const alpha = Math.max(0.15, (p.z / radius) * 0.65);
          ctx.fillStyle = `rgba(183, 240, 211, ${alpha.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw conceptual logistics coordination arcs
      const hubProj = project3D(hubNode.lat, hubNode.lon, radius, cx, cy);

      conceptualArcs.forEach((arc, idx) => {
        if (activeLayer !== "all" && arc.type !== activeLayer) return;

        const targetProj = project3D(arc.lat, arc.lon, radius, cx, cy);
        if (hubProj.visible || targetProj.visible) {
          const midLat = (hubNode.lat + arc.lat) / 2;
          const midLon = (hubNode.lon + arc.lon) / 2;
          const midProj = project3D(midLat, midLon, radius * 1.24, cx, cy);

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(hubProj.x, hubProj.y);
          ctx.quadraticCurveTo(midProj.x, midProj.y, targetProj.x, targetProj.y);

          ctx.strokeStyle =
            arc.type === "import"
              ? "rgba(183, 240, 211, 0.75)"
              : arc.type === "export"
              ? "rgba(56, 189, 248, 0.75)"
              : "rgba(250, 204, 21, 0.85)";
          ctx.lineWidth = 1.8;
          ctx.setLineDash([5, 5]);
          ctx.lineDashOffset = -(pulsePhase * 28 + idx * 10);
          ctx.stroke();
          ctx.restore();

          // Target node dot
          if (targetProj.z > 0) {
            ctx.fillStyle = "#B7F0D3";
            ctx.beginPath();
            ctx.arc(targetProj.x, targetProj.y, 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // Draw Central Hub Pulse (Malaysia Coordination Node)
      if (hubProj.z > -radius * 0.2) {
        const pulseRadius = 8 + Math.sin(pulsePhase * 3) * 4;
        ctx.fillStyle = "rgba(183, 240, 211, 0.3)";
        ctx.beginPath();
        ctx.arc(hubProj.x, hubProj.y, pulseRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#B7F0D3";
        ctx.beginPath();
        ctx.arc(hubProj.x, hubProj.y, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();

      if (!prefersReducedMotion && !isPaused && !isDragging) {
        rotationY += 0.0035;
        pulsePhase += 0.03;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      rotationY += dx * 0.007;
      rotationX = Math.max(-0.8, Math.min(0.8, rotationX + dy * 0.007));
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isPaused, activeLayer]);

  return (
    <div className="relative rounded-3xl bg-[#064E3B] text-white border border-[#B7F0D3]/20 shadow-2xl overflow-hidden">
      {/* Top Interactive Filter Controls */}
      <div className="relative z-10 p-5 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#043829]/70 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-[#087F5B] flex items-center justify-center text-[#B7F0D3]">
            <Globe2 className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
              Interactive 3D Supply Coordination Visualizer
            </h3>
            <p className="text-[11px] text-[#B7F0D3]/80">
              Drag globe to rotate 360° • Conceptual illustration of import, export &amp; domestic coordination
            </p>
          </div>
        </div>

        {/* Layer Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: "all", label: "All Corridors" },
              { id: "import", label: "Inbound Sourcing" },
              { id: "export", label: "Outbound Export" },
              { id: "domestic", label: "Domestic Distribution" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveLayer(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeLayer === tab.id
                  ? "bg-[#B7F0D3] text-[#064E3B] shadow-xs"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? "Resume globe rotation" : "Pause globe rotation"}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white/80 hover:bg-white/20 inline-flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${!isPaused ? "animate-spin" : ""}`} />
            <span>{isPaused ? "Resume" : "Pause"}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Globe Canvas + Telemetry Overlay */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7 relative h-[360px] sm:h-[430px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing">
          <canvas
            ref={canvasRef}
            className="w-full h-full block touch-none"
            aria-label="Interactive 3D Global Healthcare Distribution Globe"
          />

          {/* Floating Hub Indicator Pill */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto pointer-events-none glass-dark-emerald px-3.5 py-2 rounded-xl text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B7F0D3] animate-ping" />
            <span className="font-semibold text-[#B7F0D3]">
              Central Coordination Focus:
            </span>
            <span className="text-white/90">Kuala Lumpur, Malaysia</span>
          </div>
        </div>

        {/* Right Side Conceptual Logistics Architecture Panel */}
        <div className="lg:col-span-5 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-white/10 space-y-5 bg-[#053F2F]/60">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B7F0D3]/15 text-[#B7F0D3] text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Multi-Modal Logistics Framework</span>
          </div>

          <h4 className="text-xl font-bold text-white leading-snug">
            Structured Healthcare Supply Chain Coordination
          </h4>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            PHARMANAS SDN BHD coordinates the movement of pharmaceutical formulations and clinical medical devices through structured import, export, and domestic distribution workflows.
          </p>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-xl bg-white/8 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B7F0D3] mb-1">
                <Navigation className="w-3.5 h-3.5" />
                <span>Inbound Import Coordination</span>
              </div>
              <p className="text-xs text-white/75 leading-relaxed">
                Documentation alignment, consignment scheduling, and port/air-cargo clearance coordination for international healthcare manufacturers.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/8 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8] mb-1">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Cross-Border Export Facilitation</span>
              </div>
              <p className="text-xs text-white/75 leading-relaxed">
                Export-ready packaging inspection, shipping carton consolidation, and freight forwarding alignment for regional distribution partners.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/8 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Domestic Institutional &amp; Pharmacy Supply</span>
              </div>
              <p className="text-xs text-white/75 leading-relaxed">
                Order fulfillment coordination for community pharmacies, private medical centres, and healthcare procurement teams across Malaysia.
              </p>
            </div>
          </div>

          <p className="text-[11px] text-white/55 italic">
            * Globe visualization depicts conceptual healthcare trade capabilities and does not claim specific proprietary carrier routes or third-party regulatory registrations.
          </p>
        </div>
      </div>
    </div>
  );
}

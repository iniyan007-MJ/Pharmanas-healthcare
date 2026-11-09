"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { withBasePath } from "@/data/siteConfig";
import {
  Activity,
  Box,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function Interactive3DHeroVisual() {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 10,
      rotateY: x * 10,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
      className="relative w-full"
    >
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative rounded-3xl overflow-hidden border border-[#087F5B]/25 shadow-2xl bg-[#064E3B]"
      >
        {/* Main Commercial Studio Photography */}
        <div className="relative h-[420px] sm:h-[500px] w-full overflow-hidden">
          <img
            src={withBasePath("/images/hero-pharma.png")}
            alt="PHARMANAS SDN BHD Pharmaceutical Vials, Capsules and Medical Products"
            className="w-full h-full object-cover object-center scale-102 transition-transform duration-700"
          />

          {/* Subtle Editorial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/90 via-[#064E3B]/20 to-transparent" />

          {/* Top Floating Glass Badge — PHARMANAS SDN BHD */}
          <div className="absolute top-4 left-4 right-4 sm:right-auto glass-surface rounded-2xl p-3 pr-4 shadow-lg flex items-center gap-3">
            <img
              src={withBasePath("/images/pharmanas-icon-only.png")}
              alt="PHARMANAS SDN BHD"
              className="w-11 h-11 rounded-xl object-contain bg-[#EAE6DF] p-1 border border-[#087F5B]/20 shrink-0"
            />
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[#087F5B]">
                Kuala Lumpur • Malaysia
              </span>
              <span className="block text-xs sm:text-sm font-extrabold text-[#172B25]">
                PHARMANAS SDN BHD
              </span>
              <span className="block text-[11px] text-[#172B25]/70">
                Import • Export • Healthcare Distribution
              </span>
            </div>
          </div>

          {/* Interactive 3D Rotating Capsule Emblem (Top Right) */}
          <motion.div
            animate={{ y: [0, -8, 0], rotateZ: [0, 4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:flex absolute top-4 right-4 glass-dark-emerald rounded-2xl p-3.5 text-white items-center gap-2.5 shadow-lg"
          >
            <div className="w-9 h-9 rounded-xl bg-[#087F5B] flex items-center justify-center text-[#B7F0D3]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="block font-bold text-[#B7F0D3]">
                Dual-Division Portfolio
              </span>
              <span className="text-white/80 text-[11px]">
                Pharmaceuticals &amp; Medical Devices
              </span>
            </div>
          </motion.div>

          {/* Bottom Overlay Composition Cards */}
          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="glass-dark-emerald rounded-2xl p-3.5 text-white">
              <div className="flex items-center gap-2 text-[#B7F0D3] text-xs font-bold mb-1">
                <Box className="w-4 h-4" />
                <span>Pharmaceuticals</span>
              </div>
              <p className="text-[11px] text-white/85 leading-snug">
                Capsules, tablets, amber bottles, sterile vials &amp; liquid formulations.
              </p>
            </div>

            <div className="glass-dark-emerald rounded-2xl p-3.5 text-white">
              <div className="flex items-center gap-2 text-[#B7F0D3] text-xs font-bold mb-1">
                <Activity className="w-4 h-4" />
                <span>Medical Devices</span>
              </div>
              <p className="text-[11px] text-white/85 leading-snug">
                Diagnostic systems, patient monitors, infusion pumps &amp; accessories.
              </p>
            </div>

            <div className="glass-dark-emerald rounded-2xl p-3.5 text-white">
              <div className="flex items-center gap-2 text-[#B7F0D3] text-xs font-bold mb-1">
                <Globe2 className="w-4 h-4" />
                <span>Trade Coordination</span>
              </div>
              <p className="text-[11px] text-white/85 leading-snug">
                Structured import, export &amp; domestic healthcare distribution.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Trust Strip under Hero Image */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-[#DCE8E2] flex items-center gap-2.5 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" />
          <span className="text-xs font-semibold text-[#172B25]">
            Quality-Conscious Handling
          </span>
        </div>
        <div className="bg-white rounded-2xl p-3.5 border border-[#DCE8E2] flex items-center gap-2.5 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#087F5B] shrink-0" />
          <span className="text-xs font-semibold text-[#172B25]">
            Transparent B2B Quotations
          </span>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl p-3.5 border border-[#DCE8E2] flex items-center gap-2.5 shadow-xs">
          <Globe2 className="w-4 h-4 text-[#087F5B] shrink-0" />
          <span className="text-xs font-semibold text-[#172B25]">
            Kuala Lumpur Hub (52100)
          </span>
        </div>
      </div>
    </div>
  );
}

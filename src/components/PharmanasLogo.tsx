"use client";

import React from "react";
import { withBasePath } from "@/data/siteConfig";

interface PharmanasLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
  showSubtitle?: boolean;
}

export function PharmanasLogo({
  className = "",
  size = "md",
  variant = "dark",
  showSubtitle = true,
}: PharmanasLogoProps) {
  const iconDimensions =
    size === "sm"
      ? "w-9 h-9"
      : size === "lg"
      ? "w-14 h-14"
      : "w-11 h-11";

  const titleClass =
    size === "sm"
      ? "text-sm sm:text-base"
      : size === "lg"
      ? "text-xl sm:text-2xl"
      : "text-base sm:text-lg";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Authentic PHARMANAS SDN BHD Capsule & Leaf Symbol Only */}
      <div
        className={`${iconDimensions} rounded-xl bg-[#EAE6DF] border border-[#087F5B]/20 shadow-xs flex items-center justify-center p-1 shrink-0 relative overflow-hidden group`}
      >
        <img
          src={withBasePath("/images/pharmanas-icon-only.png")}
          alt="PHARMANAS SDN BHD Logo"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Brand Typography */}
      <div className="leading-tight">
        <span
          className={`block font-extrabold tracking-tight ${titleClass} ${
            variant === "light" ? "text-white" : "text-[#003B64]"
          }`}
        >
          PHARMANAS{" "}
          <span
            className={
              variant === "light" ? "text-[#B7F0D3]" : "text-[#087F5B]"
            }
          >
            SDN BHD
          </span>
        </span>
        {showSubtitle && (
          <span
            className={`block text-[10px] sm:text-[11px] font-medium tracking-wide ${
              variant === "light" ? "text-white/75" : "text-[#172B25]/70"
            }`}
          >
            Healthcare Import, Export &amp; Distribution • KL, Malaysia
          </span>
        )}
      </div>
    </div>
  );
}

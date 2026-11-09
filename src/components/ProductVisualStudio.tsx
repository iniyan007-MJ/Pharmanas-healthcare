"use client";

import React from "react";
import { SampleProduct, withBasePath } from "@/data/siteConfig";

interface ProductVisualStudioProps {
  product: SampleProduct;
  className?: string;
  interactive?: boolean;
}

export function ProductVisualStudio({
  product,
  className = "",
}: ProductVisualStudioProps) {
  const isPharma = product.category === "Pharmaceutical Products";

  return (
    <div
      className={`relative overflow-hidden select-none bg-gradient-to-br ${
        isPharma
          ? "from-[#E9F5F0] via-[#F4FAF7] to-[#D8EFE4]"
          : "from-[#EBF3F1] via-[#F7FAFA] to-[#DCECE6]"
      } ${className}`}
    >
      {/* Background High-Res Studio Photography Layer */}
      <img
        src={withBasePath(product.image)}
        alt={product.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-85 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Soft Studio Lighting Vignette & Depth Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/75 via-[#064E3B]/15 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(183,240,211,0.35),transparent_55%)]" />

      {/* Top Metadata Bar */}
      <div className="relative z-10 flex items-center justify-between p-3.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-white/92 text-[#064E3B] shadow-sm backdrop-blur-md border border-[#087F5B]/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B]" />
          {product.subcategory}
        </span>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#064E3B]/85 text-[#B7F0D3] backdrop-blur-md border border-[#B7F0D3]/20">
          {product.code}
        </span>
      </div>

      {/* Bespoke 3D-Styled Studio Foreground Spec Badge */}
      <div className="relative z-10 mt-auto p-4 pt-16 flex items-end justify-between gap-3">
        <div className="text-white">
          <span className="inline-block text-[10px] uppercase tracking-widest text-[#B7F0D3] font-semibold mb-0.5">
            Illustrative Sample • {isPharma ? "Pharma Line" : "Clinical Device"}
          </span>
          <p className="text-xs text-white/90 font-medium line-clamp-1">
            {product.packagingFormat}
          </p>
        </div>

        {/* Distinct Hardware / Dosage Form Graphic Emblem */}
        <div className="w-11 h-11 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-[#B7F0D3]/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          {renderVariantEmblem(product.visualVariant)}
        </div>
      </div>
    </div>
  );
}

function renderVariantEmblem(variant: SampleProduct["visualVariant"]) {
  switch (variant) {
    case "capsule-blister":
      return (
        <svg viewBox="0 0 36 36" className="w-7 h-7">
          <rect
            x="6"
            y="13"
            width="12"
            height="10"
            rx="5"
            fill="#087F5B"
            transform="rotate(-25 18 18)"
          />
          <rect
            x="16"
            y="13"
            width="12"
            height="10"
            rx="5"
            fill="#B7F0D3"
            stroke="#087F5B"
            strokeWidth="1.5"
            transform="rotate(-25 18 18)"
          />
        </svg>
      );
    case "tablet-strip":
    case "caplet-pack":
      return (
        <svg viewBox="0 0 36 36" className="w-7 h-7">
          <circle
            cx="14"
            cy="15"
            r="6.5"
            fill="#B7F0D3"
            stroke="#087F5B"
            strokeWidth="1.5"
          />
          <line
            x1="10"
            y1="15"
            x2="18"
            y2="15"
            stroke="#087F5B"
            strokeWidth="1.5"
          />
          <circle cx="23" cy="21" r="6.5" fill="#087F5B" />
          <line
            x1="19"
            y1="21"
            x2="27"
            y2="21"
            stroke="#B7F0D3"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "amber-bottle":
    case "hdpe-bottle":
      return (
        <svg viewBox="0 0 36 36" className="w-7 h-7">
          <rect x="13" y="6" width="10" height="4" rx="1" fill="#064E3B" />
          <path
            d="M14 10h8l3 4v14a2 2 0 01-2 2H13a2 2 0 01-2-2V14l3-4z"
            fill="#087F5B"
          />
          <rect x="13" y="16" width="10" height="8" rx="1" fill="#F8FAF9" />
          <line
            x1="15"
            y1="20"
            x2="21"
            y2="20"
            stroke="#087F5B"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "sterile-vial":
    case "ophthalmic-dropper":
    case "glass-ampoule":
      return (
        <svg viewBox="0 0 36 36" className="w-7 h-7">
          <rect x="14" y="6" width="8" height="3" rx="1" fill="#087F5B" />
          <rect x="15" y="9" width="6" height="3" fill="#B7F0D3" />
          <rect
            x="12"
            y="12"
            width="12"
            height="17"
            rx="2.5"
            fill="#E6F7F0"
            stroke="#087F5B"
            strokeWidth="1.6"
          />
          <path d="M13 20h10v7a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 0113 27v-7z" fill="#087F5B" fillOpacity="0.35" />
        </svg>
      );
    case "dermal-tube":
    case "respiratory-inhaler":
      return (
        <svg viewBox="0 0 36 36" className="w-7 h-7">
          <path
            d="M11 8h10v14h5a2 2 0 012 2v4a2 2 0 01-2 2H11a2 2 0 01-2-2V10a2 2 0 012-2z"
            fill="#087F5B"
          />
          <rect x="13" y="5" width="6" height="4" rx="1" fill="#B7F0D3" stroke="#064E3B" strokeWidth="1.2" />
        </svg>
      );
    case "ecg-system":
    case "patient-monitor":
    case "pulse-oximeter":
      return (
        <svg viewBox="0 0 36 36" className="w-7 h-7">
          <rect
            x="5"
            y="7"
            width="26"
            height="19"
            rx="3"
            fill="#064E3B"
            stroke="#087F5B"
            strokeWidth="1.5"
          />
          <polyline
            points="8,17 13,17 15,11 18,22 20,15 23,17 28,17"
            fill="none"
            stroke="#B7F0D3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="13" y="27" width="10" height="2.5" rx="1" fill="#087F5B" />
        </svg>
      );
    case "ultrasound-probe":
    case "ir-thermometer":
      return (
        <svg viewBox="0 0 36 36" className="w-7 h-7">
          <rect
            x="13"
            y="7"
            width="10"
            height="20"
            rx="5"
            fill="#087F5B"
          />
          <path
            d="M11 28a9 9 0 0114 0"
            fill="none"
            stroke="#064E3B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="18" cy="14" r="2.5" fill="#B7F0D3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 36 36" className="w-7 h-7">
          <rect
            x="7"
            y="8"
            width="22"
            height="20"
            rx="3"
            fill="#E6F7F0"
            stroke="#087F5B"
            strokeWidth="1.6"
          />
          <path
            d="M18 13v10M13 18h10"
            stroke="#087F5B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

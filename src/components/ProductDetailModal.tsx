"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  FileText,
  Info,
  MessageCircle,
  Package,
  ShieldCheck,
  Thermometer,
  X,
} from "lucide-react";
import { formatCurrency } from "@/data/siteConfig";
import { useHealthcare } from "@/context/HealthcareContext";
import { ProductVisualStudio } from "./ProductVisualStudio";

export function ProductDetailModal() {
  const {
    activeDetailProduct,
    closeProductDetail,
    openEnquiry,
    currency,
  } = useHealthcare();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProductDetail();
    };
    if (activeDetailProduct) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeDetailProduct, closeProductDetail]);

  return (
    <AnimatePresence>
      {activeDetailProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProductDetail}
            className="fixed inset-0 bg-[#172B25]/65 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl bg-white rounded-3xl border border-[#DCE8E2] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeProductDetail}
              aria-label="Close product details"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#172B25] flex items-center justify-center shadow-md border border-[#DCE8E2] transition-transform hover:scale-105 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto">
              {/* Top Visual Header */}
              <ProductVisualStudio
                product={activeDetailProduct}
                className="h-64 sm:h-72 w-full border-b border-[#DCE8E2]"
              />

              {/* Main Specification Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF5F2] text-[#087F5B] border border-[#087F5B]/20">
                      {activeDetailProduct.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#F8FAF9] text-[#172B25]/80 border border-[#DCE8E2]">
                      {activeDetailProduct.subcategory}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#064E3B] bg-[#B7F0D3]/40 px-2.5 py-1 rounded-md">
                    Catalogue Ref: {activeDetailProduct.code}
                  </span>
                </div>

                <div>
                  <h2
                    id="product-modal-title"
                    className="text-2xl sm:text-3xl font-bold text-[#172B25] mb-3"
                  >
                    {activeDetailProduct.name}
                  </h2>
                  <p className="text-[#172B25]/80 leading-relaxed text-sm sm:text-base">
                    {activeDetailProduct.fullDescription}
                  </p>
                </div>

                {/* Illustrative Quotation Box */}
                <div className="rounded-2xl bg-gradient-to-r from-[#EFF5F2] to-[#F8FAF9] border border-[#087F5B]/25 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#087F5B] mb-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>Sample Quotation Reference Price</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-[#064E3B]">
                        {formatCurrency(
                          activeDetailProduct.sampleUnitPrice,
                          currency
                        )}
                      </span>
                      <span className="text-xs text-[#172B25]/70">
                        {activeDetailProduct.unitLabel}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#172B25]/65 mt-1">
                      * Illustrative demonstration price only. Does not represent actual client selling price or live stock commitment.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const prod = activeDetailProduct;
                      closeProductDetail();
                      openEnquiry({ product: prod });
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#087F5B] hover:bg-[#064E3B] shadow-md transition-all shrink-0 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire via WhatsApp</span>
                  </button>
                </div>

                {/* Technical Specifications Grid */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#172B25] mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#087F5B]" />
                    <span>Illustrative Product Specifications</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeDetailProduct.specifications.map((spec) => (
                      <div
                        key={spec.label}
                        className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2]"
                      >
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#172B25]/60 mb-0.5">
                          {spec.label}
                        </span>
                        <span className="text-sm font-semibold text-[#172B25]">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packaging & Storage Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-[#DCE8E2] flex items-start gap-3">
                    <Package className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold text-[#172B25] mb-0.5">
                        Packaging Presentation
                      </span>
                      <p className="text-xs text-[#172B25]/75 leading-relaxed">
                        {activeDetailProduct.packagingFormat}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#DCE8E2] flex items-start gap-3">
                    <Thermometer className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold text-[#172B25] mb-0.5">
                        Handling & Storage Guidance
                      </span>
                      <p className="text-xs text-[#172B25]/75 leading-relaxed">
                        {activeDetailProduct.storageCondition}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Highlights */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#172B25] mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#087F5B]" />
                    <span>Distribution & Packaging Highlights</span>
                  </h3>
                  <ul className="space-y-2">
                    {activeDetailProduct.keyFeatures.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-[#172B25]/85"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

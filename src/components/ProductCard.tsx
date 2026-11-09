"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, MessageCircle, Package, Thermometer } from "lucide-react";
import { formatCurrency, SampleProduct } from "@/data/siteConfig";
import { useHealthcare } from "@/context/HealthcareContext";
import { ProductVisualStudio } from "./ProductVisualStudio";

interface ProductCardProps {
  product: SampleProduct;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { currency, openEnquiry, openProductDetail } = useHealthcare();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl border border-[#DCE8E2] shadow-editorial hover:shadow-editorial-hover hover:border-[#087F5B]/40 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Visual Header */}
      <div
        onClick={() => openProductDetail(product)}
        className="cursor-pointer relative"
      >
        <ProductVisualStudio
          product={product}
          className="h-56 w-full border-b border-[#DCE8E2]"
        />
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#087F5B]">
            {product.category}
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#EFF5F2] text-[#064E3B]">
            Sample Catalogue Item
          </span>
        </div>

        <h3
          onClick={() => openProductDetail(product)}
          className="text-lg font-bold text-[#172B25] group-hover:text-[#087F5B] transition-colors cursor-pointer leading-snug mb-2.5"
        >
          {product.name}
        </h3>

        <p className="text-sm text-[#172B25]/75 leading-relaxed mb-4 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Key Metadata Pills */}
        <div className="space-y-1.5 mb-5 pt-3 border-t border-[#DCE8E2]/70 text-xs text-[#172B25]/80">
          <div className="flex items-start gap-2">
            <Package className="w-3.5 h-3.5 text-[#087F5B] shrink-0 mt-0.5" />
            <span className="line-clamp-1">{product.packagingFormat}</span>
          </div>
          <div className="flex items-start gap-2">
            <Thermometer className="w-3.5 h-3.5 text-[#087F5B] shrink-0 mt-0.5" />
            <span className="line-clamp-1">{product.storageCondition}</span>
          </div>
        </div>

        {/* Sample Quotation Pricing Box */}
        <div className="mt-auto rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] p-3.5 mb-4">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#064E3B]/75">
                Illustrative Sample Quotation Price
              </span>
              <span className="text-lg font-bold text-[#064E3B]">
                {formatCurrency(product.sampleUnitPrice, currency)}
              </span>
            </div>
            <span className="text-[11px] text-[#172B25]/65 text-right max-w-[140px] leading-tight">
              {product.unitLabel}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => openProductDetail(product)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#172B25] bg-[#EFF5F2] hover:bg-[#DCE8E2] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#087F5B]" />
            <span>Details & Specs</span>
          </button>

          <button
            type="button"
            onClick={() => openEnquiry({ product })}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#087F5B] hover:bg-[#064E3B] shadow-sm transition-all cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Enquire via WhatsApp</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

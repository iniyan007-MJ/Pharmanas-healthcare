"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Filter,
  HeartPulse,
  Info,
  MessageCircle,
  Search,
  ShieldCheck,
  Stethoscope,
  Wrench,
} from "lucide-react";
import { DEFAULT_SITE_CONFIG, SAMPLE_PRODUCTS, withBasePath } from "@/data/siteConfig";
import { useHealthcare } from "@/context/HealthcareContext";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProductCard } from "@/components/ProductCard";

const DEVICE_SUBCATEGORIES = [
  "All Subcategories",
  "Diagnostic Equipment",
  "Patient Monitoring Devices",
  "Medical Accessories",
  "Clinical and Surgical Support",
];

export default function MedicalDevicesPage() {
  const { openEnquiry } = useHealthcare();
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<string>("All Subcategories");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const deviceProducts = useMemo(
    () => SAMPLE_PRODUCTS.filter((p) => p.category === "Medical Devices"),
    []
  );

  const filteredProducts = useMemo(() => {
    return deviceProducts.filter((product) => {
      const matchesSub =
        selectedSubcategory === "All Subcategories" ||
        product.subcategory === selectedSubcategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.code.toLowerCase().includes(q) ||
        product.subcategory.toLowerCase().includes(q);
      return matchesSub && matchesSearch;
    });
  }, [deviceProducts, selectedSubcategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      {/* =========================================================
          MEDICAL DEVICES HERO SECTION
      ========================================================= */}
      <section className="relative bg-gradient-to-br from-[#064E3B] via-[#054434] to-[#087F5B] text-white py-16 lg:py-24 overflow-hidden border-b border-[#087F5B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb
            items={[
              { label: "Products", href: "/#product-divisions" },
              { label: "Medical Devices" },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-[#B7F0D3] text-xs font-bold uppercase tracking-wider">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{DEFAULT_SITE_CONFIG.companyName} • Division 02</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Clinical Medical Devices, Diagnostics &amp; Patient Monitoring
              </h1>

              <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl">
                Explore our illustrative medical equipment catalogue covering 12-channel digital ECG systems, wireless ultrasound scanners, modular bedside patient monitors, volumetric infusion pumps, and sterile clinical accessories.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openEnquiry({ category: "Medical Devices" })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#B7F0D3] hover:bg-white text-[#064E3B] font-bold text-sm shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire Medical Device Quotation</span>
                </button>
                <Link
                  href="/products/pharmaceuticals"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
                >
                  <span>Switch to Pharmaceuticals</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right Studio Photography Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl overflow-hidden border border-[#B7F0D3]/30 shadow-2xl bg-[#043829] relative">
                <img
                  src={withBasePath("/images/devices-diagnostic.png")}
                  alt="Clinical Diagnostic ECG and Ultrasound Medical Equipment"
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <div className="p-4 bg-[#043829]/95 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#B7F0D3] font-semibold">
                    10 Illustrative Clinical Device Lines
                  </span>
                  <span className="text-white/75">
                    Hospital &amp; Clinic Equipment Demo
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MEDICAL DEVICE SUBCATEGORY GALLERY STRIP
      ========================================================= */}
      <section className="py-12 bg-white border-b border-[#DCE8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] block mb-1">
                Clinical Hardware &amp; Consumables
              </span>
              <h2 className="text-2xl font-bold text-[#172B25]">
                Medical Device Category Gallery
              </h2>
            </div>
            <p className="text-xs text-[#172B25]/65 max-w-md">
              Click any equipment category below to filter the illustrative medical device catalogue.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "Diagnostic Equipment",
                subtitle: "12-Lead ECG, Ultrasound & Thermometry",
                img: "/images/devices-diagnostic.png",
                count: "3 Sample Units",
                icon: Stethoscope,
              },
              {
                name: "Patient Monitoring Devices",
                subtitle: "Bedside Monitors, Infusion & SpO2",
                img: "/images/category-devices.png",
                count: "3 Sample Units",
                icon: HeartPulse,
              },
              {
                name: "Medical Accessories",
                subtitle: "Sterile IV Sets & Reusable NIBP Cuffs",
                img: "/images/devices-sterilizer.png",
                count: "2 Sample Kits",
                icon: Activity,
              },
              {
                name: "Clinical and Surgical Support",
                subtitle: "Suction Aspirators & Steam Autoclaves",
                img: "/images/devices-sterilizer.png",
                count: "2 Sample Units",
                icon: Cpu,
              },
            ].map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedSubcategory === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() =>
                    setSelectedSubcategory(
                      isSelected ? "All Subcategories" : cat.name
                    )
                  }
                  className={`group text-left rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col ${
                    isSelected
                      ? "border-[#087F5B] ring-2 ring-[#087F5B]/30 bg-[#EFF5F2]"
                      : "border-[#DCE8E2] bg-[#F8FAF9] hover:border-[#087F5B]/50"
                  }`}
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    <img
                      src={withBasePath(cat.img)}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-3 text-[11px] font-bold text-[#B7F0D3]">
                      {cat.count}
                    </span>
                  </div>
                  <div className="p-4 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-[#172B25] group-hover:text-[#087F5B]">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[#172B25]/65 mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>
                    <IconComp className="w-4 h-4 text-[#087F5B] shrink-0 mt-0.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FILTERABLE MEDICAL DEVICES CATALOGUE GRID
      ========================================================= */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Demonstration Notice Banner */}
          <div className="rounded-2xl bg-[#EFF5F2] border border-[#087F5B]/25 p-4 sm:p-5 flex items-start gap-3.5">
            <Info className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#172B25]/85 leading-relaxed">
              <strong className="text-[#064E3B]">
                Demonstration Catalogue Notice:
              </strong>{" "}
              All medical devices, technical parameters, and sample unit prices displayed on this page are illustrative demonstrations created for{" "}
              <strong>{DEFAULT_SITE_CONFIG.companyName}</strong>. Click{" "}
              <strong>Enquire via WhatsApp</strong> on any device card to test the automated quotation calculator.
            </div>
          </div>

          {/* Search & Subcategory Toolbar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DCE8E2] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#172B25]/70 mr-1">
                <Filter className="w-3.5 h-3.5 text-[#087F5B]" />
                <span>Filter:</span>
              </span>
              {DEVICE_SUBCATEGORIES.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSubcategory === sub
                      ? "bg-[#087F5B] text-white shadow-xs"
                      : "bg-[#F8FAF9] text-[#172B25]/75 hover:bg-[#EFF5F2]"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-[#087F5B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ECG, monitor, pump, cuff..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-xs sm:text-sm text-[#172B25]"
              />
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#DCE8E2] p-12 text-center space-y-3">
              <p className="text-base font-bold text-[#172B25]">
                No illustrative medical devices match your search criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedSubcategory("All Subcategories");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-[#087F5B] text-white text-xs font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          {/* Business Enquiry CTA Banner */}
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#064E3B] to-[#087F5B] text-white p-8 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7F0D3]">
                <Wrench className="w-4 h-4" />
                <span>Clinical Equipment &amp; Consumable Supply</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold">
                Planning Clinic Setup or Hospital Equipment Procurement?
              </h3>
              <p className="text-sm text-white/85 leading-relaxed">
                Connect with {DEFAULT_SITE_CONFIG.companyName} via our interactive WhatsApp quotation desk to request sample pricing, crating specifications, and delivery lead-time estimates.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-[#B7F0D3]">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Protective Foam-Lined Transit Crating
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Starter Consumable &amp; Cable Kits Included
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                type="button"
                onClick={() => openEnquiry({ category: "Medical Devices" })}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#B7F0D3] hover:bg-white text-[#064E3B] font-bold text-sm shadow-lg inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Request Device Quotation</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

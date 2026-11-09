"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Globe2,
  Handshake,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Pill,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  ThermometerSnowflake,
  Truck,
} from "lucide-react";
import {
  DEFAULT_SITE_CONFIG,
  ProductCategory,
  SAMPLE_PRODUCTS,
  withBasePath,
} from "@/data/siteConfig";
import { useHealthcare } from "@/context/HealthcareContext";
import { Interactive3DHeroVisual } from "@/components/Interactive3DHeroVisual";
import { Interactive3DGlobe } from "@/components/Interactive3DGlobe";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const { openEnquiry } = useHealthcare();
  const [activeTab, setActiveTab] = useState<"ALL" | ProductCategory>("ALL");
  const [catalogueSearch, setCatalogueSearch] = useState("");

  // Quick contact form state on homepage
  const [contactName, setContactName] = useState("");
  const [contactOrg, setContactOrg] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactScope, setContactScope] = useState("Pharmaceutical Import / Distribution");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  const featuredProducts = SAMPLE_PRODUCTS.filter((p) => {
    const matchesTab = activeTab === "ALL" || p.category === activeTab;
    const matchesSearch =
      !catalogueSearch.trim() ||
      p.name.toLowerCase().includes(catalogueSearch.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(catalogueSearch.toLowerCase());
    return matchesTab && matchesSearch;
  }).slice(0, 6);

  const handleQuickContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactOrg.trim() || !contactEmail.trim()) {
      setContactError("Please complete your Name, Organization, and Email Address.");
      return;
    }
    setContactError(null);
    setContactSubmitted(true);
  };

  return (
    <div className="overflow-hidden">
      {/* =========================================================
          B. HERO SECTION
      ========================================================= */}
      <section className="relative pt-10 pb-20 lg:pt-16 lg:pb-28 bg-clinical-grid border-b border-[#DCE8E2] overflow-hidden">
        {/* Ambient Mint & Emerald Radial Gradients */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#B7F0D3]/35 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-40 w-[480px] h-[480px] rounded-full bg-[#087F5B]/12 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Editorial Column */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF5F2] border border-[#087F5B]/25 text-[#064E3B] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#087F5B]" />
                <span>PHARMANAS SDN BHD • KUALA LUMPUR, MALAYSIA</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#172B25] leading-[1.08] tracking-tight">
                Connecting Healthcare Products to the{" "}
                <span className="text-[#087F5B] underline decoration-[#B7F0D3] decoration-4 underline-offset-4">
                  Markets That Need Them.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#172B25]/80 leading-relaxed max-w-xl">
                Your trusted partner for pharmaceutical products, medical devices and healthcare distribution.
              </p>

              {/* Primary & Secondary CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="#product-divisions"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-[#087F5B] hover:bg-[#064E3B] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#087F5B]/25 transition-all hover:-translate-y-0.5"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-[#EFF5F2] text-[#172B25] font-bold text-sm sm:text-base border border-[#DCE8E2] hover:border-[#087F5B]/40 shadow-xs transition-all"
                >
                  <span>Contact Us</span>
                </Link>

                <button
                  type="button"
                  onClick={() => openEnquiry()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-[#EFF5F2] hover:bg-[#B7F0D3]/60 text-[#064E3B] font-bold text-xs sm:text-sm border border-[#087F5B]/20 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#087F5B]" />
                  <span>Quick WhatsApp Quote</span>
                </button>
              </div>

              {/* Core Business Pillars Strip */}
              <div className="pt-6 border-t border-[#DCE8E2] grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] block">
                    Pharmaceuticals
                  </span>
                  <p className="text-xs text-[#172B25]/75 mt-0.5">
                    Solid dosage, bottles, vials &amp; specialty lines
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] block">
                    Medical Devices
                  </span>
                  <p className="text-xs text-[#172B25]/75 mt-0.5">
                    Diagnostics, monitors &amp; clinical accessories
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] block">
                    Import &amp; Export
                  </span>
                  <p className="text-xs text-[#172B25]/75 mt-0.5">
                    Cross-border sourcing &amp; regional distribution
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Interactive 3D Pharmaceutical Studio Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <Interactive3DHeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          C. ABOUT COMPANY SECTION (EDITORIAL ASYMMETRIC LAYOUT)
      ========================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#DCE8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Brand Identity & Facility Visual */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-5"
            >
              <div className="relative rounded-3xl overflow-hidden border border-[#DCE8E2] shadow-editorial bg-[#EAE6DF] p-8 sm:p-10 flex flex-col items-center text-center">
                <img
                  src={withBasePath("/images/pharmanas-logo.png")}
                  alt="PHARMANAS SDN BHD Logo"
                  className="w-full max-w-[290px] object-contain"
                />
              </div>

              <div className="rounded-2xl bg-[#EFF5F2] border border-[#087F5B]/20 p-5 flex items-start gap-3.5">
                <Building2 className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                <div className="text-xs text-[#172B25]/85 leading-relaxed">
                  <strong className="text-[#064E3B] block mb-0.5">
                    Strategic Kuala Lumpur Operations
                  </strong>
                  Positioned along Jalan Ipoh in Kuala Lumpur, PHARMANAS SDN BHD coordinates supply chains connecting international healthcare manufacturers with pharmacies, medical centres, and institutional buyers.
                </div>
              </div>
            </motion.div>

            {/* Right Narrative Content */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF5F2] text-[#087F5B] text-xs font-bold uppercase tracking-wider">
                About {DEFAULT_SITE_CONFIG.companyName}
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#172B25] leading-tight">
                Bridging International Healthcare Manufacturing &amp; Regional Distribution.
              </h2>

              <p className="text-base text-[#172B25]/80 leading-relaxed">
                <strong>{DEFAULT_SITE_CONFIG.companyName}</strong> operates as a dedicated healthcare import, export, and wholesale distribution partner based in Kuala Lumpur, Malaysia. We focus on building reliable commercial pathways between healthcare product manufacturers and the pharmacies, clinics, and healthcare institutions that serve communities every day.
              </p>

              <p className="text-sm sm:text-base text-[#172B25]/75 leading-relaxed">
                Our operational scope spans two core pillars: <strong>Pharmaceutical Formulations</strong> (ranging from oral solid capsules and tablets to liquid suspensions and sterile vials) and <strong>Clinical Medical Devices</strong> (including diagnostic workstations, patient monitoring units, and essential medical consumables).
              </p>

              {/* 4 Pillar Mini Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#DCE8E2]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] block mb-1">
                    01 • Healthcare Product Import
                  </span>
                  <p className="text-xs text-[#172B25]/75 leading-relaxed">
                    Coordinating inbound healthcare consignments, supplier documentation, and arrival scheduling into Malaysia.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#DCE8E2]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] block mb-1">
                    02 • Healthcare Product Export
                  </span>
                  <p className="text-xs text-[#172B25]/75 leading-relaxed">
                    Facilitating cross-border supply of pharmaceutical lines and medical equipment to international trade partners.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#DCE8E2]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] block mb-1">
                    03 • Wholesale Distribution
                  </span>
                  <p className="text-xs text-[#172B25]/75 leading-relaxed">
                    Responsive supply fulfillment for retail pharmacies, private clinics, and healthcare procurement offices.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#DCE8E2]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] block mb-1">
                    04 • Commercial Partnerships
                  </span>
                  <p className="text-xs text-[#172B25]/75 leading-relaxed">
                    Long-term B2B collaboration with manufacturers seeking structured market representation.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#087F5B] hover:text-[#064E3B] group"
                >
                  <span>Read Full Corporate Profile</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          D. HEALTHCARE PRODUCT CATEGORIES (2 DISTINCT FLAGSHIP DIVISIONS)
      ========================================================= */}
      <section
        id="product-divisions"
        className="py-20 lg:py-28 bg-[#F8FAF9] border-b border-[#DCE8E2]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF5F2] text-[#087F5B] text-xs font-bold uppercase tracking-wider mb-3">
              Core Product Divisions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#172B25] tracking-tight">
              Two Specialized Healthcare Portfolios. One Unified Distribution Partner.
            </h2>
            <p className="text-base text-[#172B25]/75 mt-3 leading-relaxed">
              Explore our dedicated product divisions below. Every product listing in this portal is presented as an illustrative sample to demonstrate our quotation and supply coordination workflow.
            </p>
          </div>

          {/* Two Large Asymmetric Division Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Division 1: Pharmaceutical Products */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="group rounded-3xl bg-white border border-[#DCE8E2] shadow-editorial hover:shadow-editorial-hover overflow-hidden flex flex-col transition-all duration-300"
            >
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#064E3B]">
                <img
                  src={withBasePath("/images/category-pharmaceuticals.png")}
                  alt="Pharmaceutical Products Division — Capsules, Tablets, Bottles and Vials"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/90 via-[#064E3B]/25 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#064E3B] text-xs font-bold shadow-sm">
                    <Pill className="w-3.5 h-3.5 text-[#087F5B]" />
                    <span>Division 01</span>
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-1">
                    Pharmaceutical Products
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85">
                    Oral Solid Dosage • Amber Glass Bottles • Sterile Vials • Topical Formulations
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-[#172B25]/80 leading-relaxed">
                    Comprehensive sourcing and wholesale distribution across finished pharmaceutical dosage forms packaged for hospital dispensaries, retail pharmacy chains, and medical clinics.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "Capsules & Tablets",
                      "Amber Glass Bottles",
                      "Sterile Vials & Ampoules",
                      "Ophthalmic & Topical Lines",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-[#EFF5F2] text-[#064E3B] text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCE8E2] flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href="/products/pharmaceuticals"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#087F5B] hover:bg-[#064E3B] text-white text-sm font-bold shadow-sm transition-all"
                  >
                    <span>View Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      openEnquiry({ category: "Pharmaceutical Products" })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-[#F8FAF9] hover:bg-[#EFF5F2] text-[#064E3B] text-xs font-bold border border-[#DCE8E2] transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#087F5B]" />
                    <span>Enquire Pharma Line</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Division 2: Medical Devices */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="group rounded-3xl bg-white border border-[#DCE8E2] shadow-editorial hover:shadow-editorial-hover overflow-hidden flex flex-col transition-all duration-300"
            >
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#064E3B]">
                <img
                  src={withBasePath("/images/category-devices.png")}
                  alt="Medical Devices Division — Diagnostic Equipment, Patient Monitors and Clinical Accessories"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/90 via-[#064E3B]/25 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#064E3B] text-xs font-bold shadow-sm">
                    <Stethoscope className="w-3.5 h-3.5 text-[#087F5B]" />
                    <span>Division 02</span>
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-1">
                    Medical Devices
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85">
                    Diagnostic Systems • Patient Monitors • Infusion Pumps • Clinical Accessories
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-[#172B25]/80 leading-relaxed">
                    Supplying dependable diagnostic workstations, bedside vital-sign monitors, infusion hardware, and single-use clinical consumables for hospitals and specialist care centres.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "Diagnostic Equipment",
                      "Patient Monitoring Devices",
                      "Medical Accessories",
                      "Sterilization & Support",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-[#EFF5F2] text-[#064E3B] text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCE8E2] flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href="/products/medical-devices"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#087F5B] hover:bg-[#064E3B] text-white text-sm font-bold shadow-sm transition-all"
                  >
                    <span>View Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => openEnquiry({ category: "Medical Devices" })}
                    className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-[#F8FAF9] hover:bg-[#EFF5F2] text-[#064E3B] text-xs font-bold border border-[#DCE8E2] transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#087F5B]" />
                    <span>Enquire Medical Devices</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interactive Sample Catalogue Preview Grid on Homepage */}
          <div className="pt-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DCE8E2] pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] block mb-1">
                  Illustrative Sample Catalogue
                </span>
                <h3 className="text-2xl font-bold text-[#172B25]">
                  Featured Demonstration Products
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-[#087F5B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={catalogueSearch}
                    onChange={(e) => setCatalogueSearch(e.target.value)}
                    placeholder="Filter sample items..."
                    className="pl-9 pr-3.5 py-2 rounded-xl bg-white border border-[#DCE8E2] text-xs text-[#172B25] focus:border-[#087F5B] focus:outline-none"
                  />
                </div>

                {/* Filter buttons */}
                {(
                  [
                    { id: "ALL", label: "All Categories" },
                    { id: "Pharmaceutical Products", label: "Pharmaceuticals" },
                    { id: "Medical Devices", label: "Medical Devices" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-[#087F5B] text-white shadow-xs"
                        : "bg-white text-[#172B25]/75 border border-[#DCE8E2] hover:border-[#087F5B]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/products/pharmaceuticals"
                className="px-6 py-3.5 rounded-xl bg-white border border-[#DCE8E2] hover:border-[#087F5B] text-xs sm:text-sm font-bold text-[#172B25] shadow-xs transition-all"
              >
                Explore All 10 Sample Pharmaceutical Products →
              </Link>
              <Link
                href="/products/medical-devices"
                className="px-6 py-3.5 rounded-xl bg-white border border-[#DCE8E2] hover:border-[#087F5B] text-xs sm:text-sm font-bold text-[#172B25] shadow-xs transition-all"
              >
                Explore All 10 Sample Medical Devices →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          E. OUR CAPABILITIES SECTION
      ========================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#DCE8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF5F2] text-[#087F5B] text-xs font-bold uppercase tracking-wider mb-3">
                Our Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#172B25] tracking-tight">
                End-to-End Commercial &amp; Supply Chain Coordination.
              </h2>
            </div>
            <Link
              href="/capabilities"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#087F5B] hover:text-[#064E3B] shrink-0"
            >
              <span>Explore Detailed Capabilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Compass,
                step: "Capability 01",
                title: "Pharmaceutical Product Sourcing Coordination",
                description:
                  "Identifying and coordinating supply of solid dosage, liquid, and parenteral pharmaceutical lines from established international manufacturers.",
                bullets: [
                  "Manufacturer specification alignment",
                  "Pack-size & tropical packaging review",
                  "Sample quotation preparation",
                ],
              },
              {
                icon: Globe2,
                step: "Capability 02",
                title: "Import and Export Coordination",
                description:
                  "Managing cross-border freight scheduling, commercial invoice documentation, and customs interface for inbound and outbound healthcare shipments.",
                bullets: [
                  "Air & sea cargo scheduling",
                  "Shipping documentation verification",
                  "Consignment milestone tracking",
                ],
              },
              {
                icon: Activity,
                step: "Capability 03",
                title: "Medical Device Distribution",
                description:
                  "Supplying diagnostic equipment, bedside monitoring hardware, and sterile single-use accessories to clinics, hospitals, and medical centres.",
                bullets: [
                  "Protective crating & handling",
                  "Accessory & consumable bundling",
                  "Institutional procurement support",
                ],
              },
              {
                icon: Handshake,
                step: "Capability 04",
                title: "Healthcare Business Partnerships",
                description:
                  "Structuring responsive B2B distribution relationships with retail pharmacy groups, private healthcare providers, and regional trade buyers.",
                bullets: [
                  "Dedicated pharmacist enquiry desk",
                  "Flexible multi-category quotations",
                  "Long-term supply planning",
                ],
              },
            ].map((cap, idx) => {
              const IconComponent = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-6 sm:p-7 rounded-3xl bg-[#F8FAF9] border border-[#DCE8E2] hover:border-[#087F5B]/40 shadow-editorial transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="w-12 h-12 rounded-2xl bg-[#087F5B] text-white flex items-center justify-center shadow-sm">
                        <IconComponent className="w-6 h-6" />
                      </span>
                      <span className="text-xs font-mono font-bold text-[#087F5B] bg-[#EFF5F2] px-2.5 py-1 rounded-md">
                        {cap.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#172B25] mb-2.5 leading-snug">
                      {cap.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#172B25]/75 leading-relaxed mb-5">
                      {cap.description}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-[#DCE8E2]">
                    {cap.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-xs font-medium text-[#064E3B]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          F. DISTRIBUTION NETWORK (INTERACTIVE 3D GLOBE + FACILITY VISUAL)
      ========================================================= */}
      <section className="py-20 lg:py-28 bg-[#F8FAF9] border-b border-[#DCE8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF5F2] text-[#087F5B] text-xs font-bold uppercase tracking-wider mb-3">
              Global &amp; Regional Distribution Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#172B25] tracking-tight">
              Coordinated Healthcare Logistics From Kuala Lumpur to Regional Markets.
            </h2>
            <p className="text-base text-[#172B25]/75 mt-3 leading-relaxed">
              Interact with our 3D supply coordination globe below to explore how {DEFAULT_SITE_CONFIG.companyName} structures inbound sourcing, cross-border export, and domestic Malaysian healthcare distribution.
            </p>
          </div>

          {/* Interactive 3D Globe Component */}
          <Interactive3DGlobe />

          {/* Logistics Facility & Cold-Chain Visual Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-[#DCE8E2] shadow-editorial relative h-72 sm:h-80">
              <img
                src={withBasePath("/images/distribution-facility.png")}
                alt="Temperature-Controlled Healthcare Distribution & Logistics Hub"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#B7F0D3] block">
                  Supply Chain Infrastructure
                </span>
                <p className="text-sm sm:text-base font-bold">
                  Structured Storage, Batch Traceability &amp; Dispatch Readiness
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <h3 className="text-2xl font-bold text-[#172B25]">
                Designed for Reliable Healthcare Consignment Flow
              </h3>
              <p className="text-sm sm:text-base text-[#172B25]/80 leading-relaxed">
                Pharmaceutical products and sensitive clinical equipment require disciplined physical handling. Our distribution coordination prioritizes protective packaging integrity, clear documentation handoffs, and environmental awareness at every stage of transit.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#DCE8E2] flex items-start gap-3">
                  <ThermometerSnowflake className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-[#172B25]">
                      Environmental Awareness
                    </span>
                    <p className="text-xs text-[#172B25]/70 mt-0.5">
                      Adherence to manufacturer-specified storage temperature ranges during staging.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#DCE8E2] flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-[#172B25]">
                      Multi-Channel Dispatch
                    </span>
                    <p className="text-xs text-[#172B25]/70 mt-0.5">
                      Coordinated deliveries for retail pharmacies, clinics, and hospital receiving bays.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/distribution"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#087F5B] hover:text-[#064E3B]"
              >
                <span>View Complete Distribution Workflow</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          G. QUALITY AND RESPONSIBILITY SECTION
      ========================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#DCE8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#075E46] to-[#087F5B] text-white p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-[#B7F0D3] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Quality &amp; Corporate Responsibility</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Quality-Conscious Practices in Every Healthcare Transaction.
              </h2>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                Healthcare distribution carries a direct responsibility to pharmacists, clinicians, and patients. At {DEFAULT_SITE_CONFIG.companyName}, our operational culture emphasizes supplier verification diligence, packaging protection, and transparent commercial communication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
                <ClipboardCheck className="w-7 h-7 text-[#B7F0D3]" />
                <h3 className="text-lg font-bold text-white">
                  Supplier &amp; Documentation Diligence
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Every inbound and outbound consignment is coordinated with structured commercial documentation, packing lists, and batch reference checks prior to dispatch.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
                <PackageCheck className="w-7 h-7 text-[#B7F0D3]" />
                <h3 className="text-lg font-bold text-white">
                  Packaging &amp; Storage Integrity
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Products are handled in accordance with manufacturer label guidance—protecting blister packs, amber glass containers, sterile vials, and diagnostic electronics from transit damage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
                <FileCheck2 className="w-7 h-7 text-[#B7F0D3]" />
                <h3 className="text-lg font-bold text-white">
                  Ethical B2B Transparency
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Clear quotation terms, accurate product descriptions, and responsible coordination with licensed healthcare professionals and procurement officers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          H. CONTACT & BUSINESS ENQUIRY SECTION
      ========================================================= */}
      <section className="py-20 lg:py-28 bg-[#F8FAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Corporate Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF5F2] text-[#087F5B] text-xs font-bold uppercase tracking-wider">
                Connect With Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#172B25] tracking-tight">
                Initiate a Supply or Distribution Enquiry.
              </h2>
              <p className="text-sm sm:text-base text-[#172B25]/75 leading-relaxed">
                Whether you are a pharmacist requesting a product quotation, a hospital procurement officer sourcing medical devices, or an international manufacturer exploring distribution in Malaysia, our team is ready to assist.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-[#DCE8E2] flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#087F5B]">
                      Registered Corporate Address
                    </span>
                    <p className="text-sm font-semibold text-[#172B25] mt-0.5">
                      {DEFAULT_SITE_CONFIG.companyName}
                    </p>
                    <p className="text-xs text-[#172B25]/75">
                      {DEFAULT_SITE_CONFIG.addressPlaceholder}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#DCE8E2] flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#087F5B]">
                      Official Email Address
                    </span>
                    <a
                      href={`mailto:${DEFAULT_SITE_CONFIG.emailPlaceholder}`}
                      className="text-sm font-semibold text-[#172B25] hover:text-[#087F5B] transition-colors mt-0.5 block"
                    >
                      {DEFAULT_SITE_CONFIG.emailPlaceholder}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#EFF5F2] border border-[#087F5B]/25 flex items-start justify-between gap-3.5">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                        Instant WhatsApp Order Enquiry
                      </span>
                      <p className="text-xs text-[#172B25]/80 mt-0.5">
                        Direct Quotation Desk: {DEFAULT_SITE_CONFIG.whatsappDisplay}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openEnquiry()}
                    className="px-3.5 py-2 rounded-xl bg-[#087F5B] hover:bg-[#064E3B] text-white text-xs font-bold shrink-0 cursor-pointer"
                  >
                    Open Drawer
                  </button>
                </div>
              </div>
            </div>

            {/* Right Validated Corporate Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-[#DCE8E2] shadow-editorial p-6 sm:p-10">
                <h3 className="text-xl font-bold text-[#172B25] mb-2">
                  Corporate Partnership &amp; Trade Enquiry Form
                </h3>
                <p className="text-xs sm:text-sm text-[#172B25]/70 mb-6">
                  Complete the form below or use our interactive WhatsApp Product Enquiry drawer for immediate item-level quotation estimates.
                </p>

                {contactSubmitted ? (
                  <div className="p-6 rounded-2xl bg-[#EFF5F2] border border-[#087F5B]/30 space-y-4">
                    <div className="flex items-center gap-2.5 text-[#064E3B] font-bold">
                      <CheckCircle2 className="w-6 h-6 text-[#087F5B]" />
                      <span>Corporate Enquiry Recorded for Demonstration</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#172B25]/80 leading-relaxed">
                      Thank you, <strong>{contactName}</strong> ({contactOrg}). Your enquiry regarding <strong>{contactScope}</strong> has been formatted. You can also send this directly to our team via WhatsApp or email.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => openEnquiry()}
                        className="px-4 py-2.5 rounded-xl bg-[#087F5B] text-white text-xs font-bold cursor-pointer"
                      >
                        Launch WhatsApp Product Calculator
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setContactSubmitted(false);
                          setContactName("");
                          setContactOrg("");
                          setContactEmail("");
                          setContactMessage("");
                        }}
                        className="px-4 py-2.5 rounded-xl bg-white border border-[#DCE8E2] text-xs font-semibold text-[#172B25] cursor-pointer"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleQuickContactSubmit} className="space-y-4">
                    {contactError && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                        {contactError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="home-contact-name"
                          className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5"
                        >
                          Full Name / Pharmacist Name *
                        </label>
                        <input
                          id="home-contact-name"
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Enter your name..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="home-contact-org"
                          className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5"
                        >
                          Pharmacy / Organization *
                        </label>
                        <input
                          id="home-contact-org"
                          type="text"
                          value={contactOrg}
                          onChange={(e) => setContactOrg(e.target.value)}
                          placeholder="Company or hospital name..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="home-contact-email"
                          className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5"
                        >
                          Business Email *
                        </label>
                        <input
                          id="home-contact-email"
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="name@organization.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="home-contact-scope"
                          className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5"
                        >
                          Enquiry Nature
                        </label>
                        <select
                          id="home-contact-scope"
                          value={contactScope}
                          onChange={(e) => setContactScope(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm"
                        >
                          <option value="Pharmaceutical Import / Distribution">
                            Pharmaceutical Import / Distribution
                          </option>
                          <option value="Medical Devices Supply">
                            Medical Devices Supply
                          </option>
                          <option value="International Export Partnership">
                            International Export Partnership
                          </option>
                          <option value="Wholesale Pharmacy Quotation">
                            Wholesale Pharmacy Quotation
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="home-contact-msg"
                        className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5"
                      >
                        Enquiry Details
                      </label>
                      <textarea
                        id="home-contact-msg"
                        rows={3}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Describe your product requirements, target market, or partnership enquiry..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-3.5 rounded-xl bg-[#087F5B] hover:bg-[#064E3B] text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
                      >
                        Send Corporate Enquiry
                      </button>

                      <button
                        type="button"
                        onClick={() => openEnquiry()}
                        className="px-5 py-3.5 rounded-xl bg-[#EFF5F2] hover:bg-[#B7F0D3]/50 text-[#064E3B] font-bold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 text-[#087F5B]" />
                        <span>Use Itemized WhatsApp Enquiry Instead</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

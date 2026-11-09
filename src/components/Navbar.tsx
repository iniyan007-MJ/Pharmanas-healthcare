"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  MessageCircle,
  Search,
  X,
} from "lucide-react";
import {
  CURRENCIES,
  CurrencyConfig,
  DEFAULT_SITE_CONFIG,
  formatCurrency,
  SAMPLE_PRODUCTS,
} from "@/data/siteConfig";
import { useHealthcare } from "@/context/HealthcareContext";
import { PharmanasLogo } from "./PharmanasLogo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Pharmaceuticals", href: "/products/pharmaceuticals" },
  { label: "Medical Devices", href: "/products/medical-devices" },
  { label: "Our Capabilities", href: "/capabilities" },
  { label: "Distribution", href: "/distribution" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const {
    openEnquiry,
    openProductDetail,
    isSearchOpen,
    setIsSearchOpen,
    currency,
    setCurrency,
  } = useHealthcare();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const filteredSearchProducts = SAMPLE_PRODUCTS.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Top Corporate Bar */}
      <div className="bg-[#064E3B] text-white/90 text-[11px] py-2 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#B7F0D3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7F0D3]" />
              {DEFAULT_SITE_CONFIG.companyName}
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:inline text-white/80 truncate">
              {DEFAULT_SITE_CONFIG.addressPlaceholder}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href={`mailto:${DEFAULT_SITE_CONFIG.emailPlaceholder}`}
              className="hidden sm:inline hover:text-[#B7F0D3] transition-colors"
            >
              {DEFAULT_SITE_CONFIG.emailPlaceholder}
            </a>
            <span className="hidden sm:inline text-white/30">•</span>
            <div className="flex items-center gap-1">
              <span className="text-white/70">Currency:</span>
              <select
                aria-label="Select display currency"
                value={currency}
                onChange={(e) =>
                  setCurrency(e.target.value as CurrencyConfig["code"])
                }
                className="bg-[#087F5B] text-white font-bold px-1.5 py-0.5 rounded text-[11px] border border-[#B7F0D3]/30 focus:outline-none cursor-pointer"
              >
                {(Object.keys(CURRENCIES) as Array<CurrencyConfig["code"]>).map(
                  (code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/92 backdrop-blur-xl shadow-md border-b border-[#DCE8E2] py-3"
            : "bg-[#F8FAF9]/95 backdrop-blur-md border-b border-[#DCE8E2]/80 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link href="/" className="shrink-0 focus:outline-none">
            <PharmanasLogo size="md" showSubtitle={true} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-1"
          >
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    isActive
                      ? "bg-[#EFF5F2] text-[#087F5B]"
                      : "text-[#172B25]/80 hover:text-[#087F5B] hover:bg-[#EFF5F2]/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Quick Search + Business Enquiry CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search illustrative product catalogue"
              className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-[#DCE8E2] hover:border-[#087F5B] text-xs font-semibold text-[#172B25]/80 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#087F5B]" />
              <span className="hidden sm:inline">Search Products</span>
            </button>

            <button
              type="button"
              onClick={() => openEnquiry()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#087F5B] hover:bg-[#064E3B] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Business Enquiry</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="xl:hidden w-10 h-10 rounded-xl bg-white border border-[#DCE8E2] flex items-center justify-center text-[#172B25] hover:border-[#087F5B] cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-white border-b border-[#DCE8E2] overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1.5">
                {NAV_LINKS.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                        isActive
                          ? "bg-[#EFF5F2] text-[#087F5B]"
                          : "text-[#172B25] hover:bg-[#F8FAF9]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="pt-3 border-t border-[#DCE8E2] flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openEnquiry();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#087F5B] text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Business Enquiry (WhatsApp)</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* GLOBAL PRODUCT CATALOGUE SEARCH MODAL */}
      <AnimatePresence>
        {isSearchOpen && (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Search Healthcare Product Catalogue"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-[#172B25]/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              className="relative z-10 w-full max-w-2xl bg-white rounded-3xl border border-[#DCE8E2] shadow-2xl overflow-hidden"
            >
              <div className="p-4 sm:p-5 border-b border-[#DCE8E2] flex items-center gap-3">
                <Search className="w-5 h-5 text-[#087F5B] shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pharmaceuticals, medical devices, capsules, vials, ECG, monitors..."
                  className="w-full text-sm sm:text-base text-[#172B25] placeholder:text-[#172B25]/45 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1.5 rounded-lg bg-[#F8FAF9] hover:bg-[#EFF5F2] text-[#172B25] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-[#172B25]/60 pb-1">
                  <span>
                    Showing {filteredSearchProducts.length} illustrative sample products
                  </span>
                  <span>Click any item to inspect or enquire</span>
                </div>

                {filteredSearchProducts.length === 0 ? (
                  <div className="py-10 text-center text-sm text-[#172B25]/65">
                    No matching sample products found for &ldquo;{searchQuery}&rdquo;.
                  </div>
                ) : (
                  filteredSearchProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-3.5 rounded-2xl bg-[#F8FAF9] hover:bg-[#EFF5F2] border border-[#DCE8E2] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div
                        onClick={() => {
                          setIsSearchOpen(false);
                          openProductDetail(prod);
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#087F5B] border border-[#DCE8E2]">
                            {prod.category}
                          </span>
                          <span className="text-[11px] text-[#172B25]/65">
                            {prod.subcategory}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#172B25]">
                          {prod.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#064E3B]">
                          Sample Price: {formatCurrency(prod.sampleUnitPrice, currency)} ({prod.unitLabel})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setIsSearchOpen(false);
                            openProductDetail(prod);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white border border-[#DCE8E2] text-xs font-semibold text-[#172B25] hover:border-[#087F5B] cursor-pointer"
                        >
                          Specs
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsSearchOpen(false);
                            openEnquiry({ product: prod });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#087F5B] text-white text-xs font-semibold hover:bg-[#064E3B] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Enquire</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

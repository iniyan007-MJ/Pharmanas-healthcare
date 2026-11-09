"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUp,
  Building2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { DEFAULT_SITE_CONFIG, withBasePath } from "@/data/siteConfig";
import { useHealthcare } from "@/context/HealthcareContext";
import { PharmanasLogo } from "./PharmanasLogo";

export function Footer() {
  const { openEnquiry } = useHealthcare();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#064E3B] text-white border-t border-[#087F5B]/40 relative overflow-hidden">
      {/* Subtle Top CTA Banner */}
      <div className="border-b border-white/10 bg-[#053F2F]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#B7F0D3] mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Wholesale &amp; Institutional Healthcare Distribution</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Looking for a Reliable Healthcare Distribution Partner in Malaysia?
            </h2>
            <p className="text-sm text-white/80 mt-2">
              Connect with {DEFAULT_SITE_CONFIG.companyName} for pharmaceutical sourcing, medical device supply, and structured import/export coordination.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="px-6 py-3.5 rounded-xl bg-[#B7F0D3] hover:bg-white text-[#064E3B] font-bold text-sm shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open Product Enquiry Desk</span>
            </button>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
            >
              Contact Corporate Office
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Column 1: Company Brand & Overview */}
        <div className="lg:col-span-4 space-y-4">
          <PharmanasLogo variant="light" size="md" />
          <p className="text-sm text-white/80 leading-relaxed">
            {DEFAULT_SITE_CONFIG.companyName} is a Malaysian healthcare import, export, and distribution company dedicated to connecting quality-conscious pharmaceutical products and medical devices with pharmacies, clinics, and institutional healthcare partners.
          </p>

          {/* Original Uploaded Brand Card Preview */}
          <div className="pt-2 flex items-center gap-3">
            <img
              src={withBasePath("/images/pharmanas-icon-only.png")}
              alt="PHARMANAS SDN BHD Official Brand Mark"
              className="w-14 h-14 rounded-xl object-contain p-1.5 border border-white/20 shadow-sm bg-[#EAE6DF]"
            />
            <div className="text-xs text-white/75">
              <span className="font-bold text-[#B7F0D3] block">
                Corporate Headquarters
              </span>
              <span>Kompleks Mutiara, Jalan Ipoh</span>
              <span className="block">52100 Kuala Lumpur, Malaysia</span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Navigation */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#B7F0D3]">
            Navigation
          </h3>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li>
              <Link href="/" className="hover:text-[#B7F0D3] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-[#B7F0D3] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/capabilities"
                className="hover:text-[#B7F0D3] transition-colors"
              >
                Our Capabilities
              </Link>
            </li>
            <li>
              <Link
                href="/distribution"
                className="hover:text-[#B7F0D3] transition-colors"
              >
                Distribution Network
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[#B7F0D3] transition-colors"
              >
                Contact &amp; Enquiries
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Product Divisions */}
        <div className="lg:col-span-3 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#B7F0D3]">
            Healthcare Divisions
          </h3>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li>
              <Link
                href="/products/pharmaceuticals"
                className="hover:text-[#B7F0D3] transition-colors font-medium"
              >
                Pharmaceutical Products
              </Link>
              <span className="block text-xs text-white/55">
                Capsules, Tablets, Bottles, Vials &amp; Topicals
              </span>
            </li>
            <li className="pt-1">
              <Link
                href="/products/medical-devices"
                className="hover:text-[#B7F0D3] transition-colors font-medium"
              >
                Medical Devices &amp; Equipment
              </Link>
              <span className="block text-xs text-white/55">
                Diagnostic Systems, Patient Monitors &amp; Accessories
              </span>
            </li>
            <li className="pt-2">
              <button
                type="button"
                onClick={() => openEnquiry()}
                className="text-xs font-bold text-[#B7F0D3] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Request Sample Quotation via WhatsApp →</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Registered Contact Details */}
        <div className="lg:col-span-3 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#B7F0D3]">
            Corporate Contact
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-white/85">
            <li className="flex items-start gap-2.5">
              <Building2 className="w-4 h-4 text-[#B7F0D3] shrink-0 mt-0.5" />
              <span className="font-bold text-white">
                {DEFAULT_SITE_CONFIG.companyName}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#B7F0D3] shrink-0 mt-0.5" />
              <span>{DEFAULT_SITE_CONFIG.addressPlaceholder}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-[#B7F0D3] shrink-0 mt-0.5" />
              <a
                href={`mailto:${DEFAULT_SITE_CONFIG.emailPlaceholder}`}
                className="hover:text-[#B7F0D3] break-all transition-colors"
              >
                {DEFAULT_SITE_CONFIG.emailPlaceholder}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#B7F0D3] shrink-0 mt-0.5" />
              <span>WhatsApp Desk: {DEFAULT_SITE_CONFIG.whatsappDisplay}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#B7F0D3] shrink-0 mt-0.5" />
              <span>{DEFAULT_SITE_CONFIG.businessHoursPlaceholder}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & DUONOVIK Attribution Bar */}
      <div className="border-t border-white/10 bg-[#043528] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>
            © {new Date().getFullYear()} {DEFAULT_SITE_CONFIG.companyName}. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Client Demonstration Experience Engineered by{" "}
            <span className="font-bold text-[#B7F0D3]">
              {DEFAULT_SITE_CONFIG.developedBy}
            </span>
          </p>
        </div>
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-white/10 text-[11px] text-white/55 leading-relaxed">
          {DEFAULT_SITE_CONFIG.disclaimerNote}
        </div>
      </div>

      {/* Floating Back-to-Top Button (Left-aligned on bottom or stacked cleanly above WhatsApp button) */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed left-5 bottom-6 z-40 w-11 h-11 rounded-full bg-white text-[#064E3B] border border-[#DCE8E2] shadow-lg hover:bg-[#EFF5F2] flex items-center justify-center transition-all cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}

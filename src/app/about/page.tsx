"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Compass,
  Globe2,
  Handshake,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Target,
} from "lucide-react";
import { DEFAULT_SITE_CONFIG, withBasePath } from "@/data/siteConfig";
import { useHealthcare } from "@/context/HealthcareContext";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function AboutPage() {
  const { openEnquiry } = useHealthcare();

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#064E3B] via-[#075E46] to-[#087F5B] text-white py-16 lg:py-24 border-b border-[#087F5B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "About Us" }]} />
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-[#B7F0D3] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Corporate Profile • Kuala Lumpur, Malaysia</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              About {DEFAULT_SITE_CONFIG.companyName}
            </h1>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed">
              A dedicated Malaysian healthcare import, export, and distribution company connecting pharmaceutical products and medical devices with the healthcare providers and markets that depend on them.
            </p>
          </div>
        </div>
      </section>

      {/* Main Editorial Story + Official Brand Card */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#DCE8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-5"
          >
            <div className="rounded-3xl bg-[#EAE6DF] border border-[#DCE8E2] p-8 sm:p-10 shadow-editorial text-center flex items-center justify-center">
              <img
                src={withBasePath("/images/pharmanas-logo.png")}
                alt="PHARMANAS SDN BHD Official Corporate Logo"
                className="w-full max-w-[300px] mx-auto object-contain"
              />
            </div>

            <div className="text-left bg-[#F8FAF9] rounded-2xl p-5 border border-[#DCE8E2] space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#087F5B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#172B25] block">
                    Registered Company Name
                  </span>
                  <span className="text-[#172B25]/80">
                    {DEFAULT_SITE_CONFIG.companyName}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#087F5B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#172B25] block">
                    Kuala Lumpur Headquarters
                  </span>
                  <span className="text-[#172B25]/80">
                    {DEFAULT_SITE_CONFIG.addressPlaceholder}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#087F5B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#172B25] block">
                    Corporate Email
                  </span>
                  <span className="text-[#172B25]/80">
                    {DEFAULT_SITE_CONFIG.emailPlaceholder}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
              Our Mandate &amp; Purpose
            </span>
            <h2 className="text-3xl font-bold text-[#172B25] leading-tight">
              Structured Healthcare Trade &amp; Distribution Built on Trust.
            </h2>
            <p className="text-base text-[#172B25]/80 leading-relaxed">
              Headquartered at Kompleks Mutiara, Jalan Ipoh, Kuala Lumpur,{" "}
              <strong>{DEFAULT_SITE_CONFIG.companyName}</strong> serves as a commercial bridge between healthcare product manufacturers and healthcare dispensing networks.
            </p>
            <p className="text-sm sm:text-base text-[#172B25]/75 leading-relaxed">
              The symbol of {DEFAULT_SITE_CONFIG.companyName}—uniting a precision pharmaceutical capsule with a living botanical leaf—reflects our commitment to combining modern clinical reliability with vitality, ethical care, and sustainable business partnerships.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="p-5 rounded-2xl bg-[#F8FAF9] border border-[#DCE8E2] space-y-2">
                <Target className="w-6 h-6 text-[#087F5B]" />
                <h3 className="text-base font-bold text-[#172B25]">
                  Our Mission
                </h3>
                <p className="text-xs text-[#172B25]/75 leading-relaxed">
                  To coordinate reliable, transparent, and quality-conscious supply of pharmaceutical formulations and medical devices across Malaysia and international trade corridors.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8FAF9] border border-[#DCE8E2] space-y-2">
                <Compass className="w-6 h-6 text-[#087F5B]" />
                <h3 className="text-base font-bold text-[#172B25]">
                  Our Vision
                </h3>
                <p className="text-xs text-[#172B25]/75 leading-relaxed">
                  To be recognized as a dependable healthcare import, export, and wholesale distribution partner for pharmacies, clinics, and medical institutions.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openEnquiry()}
                className="px-6 py-3.5 rounded-xl bg-[#087F5B] hover:bg-[#064E3B] text-white text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Start a Product Enquiry</span>
              </button>
              <Link
                href="/capabilities"
                className="px-6 py-3.5 rounded-xl bg-[#EFF5F2] hover:bg-[#DCE8E2] text-[#064E3B] text-sm font-bold inline-flex items-center gap-2"
              >
                <span>Explore Our Capabilities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Operational Values */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] block mb-2">
              Operating Principles
            </span>
            <h2 className="text-3xl font-bold text-[#172B25]">
              How We Support Healthcare Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Quality-First Handling",
                text: "We prioritize primary and secondary packaging integrity, clear batch labeling visibility, and adherence to manufacturer storage instructions.",
              },
              {
                icon: Globe2,
                title: "Import & Export Agility",
                text: "From Kuala Lumpur, we coordinate inbound international sourcing and outbound regional supply with disciplined documentation workflows.",
              },
              {
                icon: Handshake,
                title: "Pharmacist-Centric Service",
                text: "Our quotation and enquiry channels are structured around the practical needs of procurement pharmacists, hospital buyers, and clinic administrators.",
              },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white p-7 rounded-3xl border border-[#DCE8E2] shadow-editorial space-y-3"
                >
                  <span className="w-12 h-12 rounded-2xl bg-[#EFF5F2] text-[#087F5B] flex items-center justify-center">
                    <IconComp className="w-6 h-6" />
                  </span>
                  <h3 className="text-lg font-bold text-[#172B25]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#172B25]/75 leading-relaxed">
                    {item.text}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#087F5B]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Standard Operating Practice</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

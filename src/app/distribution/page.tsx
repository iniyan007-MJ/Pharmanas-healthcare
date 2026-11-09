"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe2,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  ThermometerSnowflake,
  Truck,
} from "lucide-react";
import { DEFAULT_SITE_CONFIG, withBasePath } from "@/data/siteConfig";
import { useHealthcare } from "@/context/HealthcareContext";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Interactive3DGlobe } from "@/components/Interactive3DGlobe";

export default function DistributionPage() {
  const { openEnquiry } = useHealthcare();

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#064E3B] via-[#075E46] to-[#087F5B] text-white py-16 lg:py-24 border-b border-[#087F5B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Distribution Network" }]} />
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-[#B7F0D3] text-xs font-bold uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5" />
              <span>{DEFAULT_SITE_CONFIG.companyName} • Supply Chain Architecture</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Healthcare Import, Export &amp; Wholesale Distribution Network
            </h1>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed">
              Coordinating healthcare product flows from our Kuala Lumpur hub to retail pharmacies, clinics, medical centres, and international trade counterparts.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive 3D Globe Showcase */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <Interactive3DGlobe />

          {/* 3 Distribution Channel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                title: "Community & Retail Pharmacies",
                desc: "Coordinated wholesale supply of blister-packed capsules, tablets, oral liquid suspensions, and OTC diagnostic devices.",
                points: [
                  "Carton & trade-box quantities",
                  "Clear shelf-ready outer packaging",
                  "Rapid quotation response via WhatsApp",
                ],
              },
              {
                icon: ShieldCheck,
                title: "Private Clinics & Medical Centres",
                desc: "Supplying sterile vials, ampoules, diagnostic ECG/ultrasound equipment, patient monitors, and clinical consumables.",
                points: [
                  "Equipment & consumable bundling",
                  "Protective transit packaging",
                  "Direct pharmacist/clinician support",
                ],
              },
              {
                icon: Truck,
                title: "Import & Export Trade Partners",
                desc: "Facilitating inbound international product sourcing and outbound regional healthcare distribution from Kuala Lumpur.",
                points: [
                  "Shipping & packing documentation",
                  "Air & sea freight scheduling",
                  "Multi-currency quotation support",
                ],
              },
            ].map((channel) => {
              const IconComp = channel.icon;
              return (
                <div
                  key={channel.title}
                  className="bg-white rounded-3xl border border-[#DCE8E2] p-7 shadow-editorial flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <span className="w-12 h-12 rounded-2xl bg-[#EFF5F2] text-[#087F5B] flex items-center justify-center">
                      <IconComp className="w-6 h-6" />
                    </span>
                    <h2 className="text-xl font-bold text-[#172B25]">
                      {channel.title}
                    </h2>
                    <p className="text-sm text-[#172B25]/75 leading-relaxed">
                      {channel.desc}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-[#DCE8E2]">
                    {channel.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-xs font-semibold text-[#064E3B]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Cold-Chain & Handling Stewardship Visual Section */}
          <div className="bg-white rounded-3xl border border-[#DCE8E2] shadow-editorial overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 relative min-h-[300px]">
              <img
                src={withBasePath("/images/distribution-facility.png")}
                alt="PHARMANAS SDN BHD Distribution & Storage Coordination"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 p-8 sm:p-10 space-y-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087F5B]">
                <ThermometerSnowflake className="w-4 h-4" />
                <span>Storage &amp; Transit Stewardship</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#172B25]">
                Protecting Product Integrity Through Every Mile
              </h2>
              <p className="text-sm sm:text-base text-[#172B25]/80 leading-relaxed">
                At {DEFAULT_SITE_CONFIG.companyName}, we recognize that healthcare products must arrive in optimal physical and environmental condition. From moisture-barrier blister packs to shock-protected diagnostic consoles, our handling protocols are built around product preservation.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openEnquiry()}
                  className="px-6 py-3.5 rounded-xl bg-[#087F5B] hover:bg-[#064E3B] text-white text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discuss Distribution Requirements</span>
                </button>
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-xl bg-[#EFF5F2] text-[#064E3B] text-sm font-bold inline-flex items-center gap-2"
                >
                  <span>Contact Kuala Lumpur Office</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

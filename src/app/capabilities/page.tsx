"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Compass,
  FileSpreadsheet,
  Globe2,
  Handshake,
  Layers,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { DEFAULT_SITE_CONFIG } from "@/data/siteConfig";
import { useHealthcare } from "@/context/HealthcareContext";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function CapabilitiesPage() {
  const { openEnquiry } = useHealthcare();

  const capabilities = [
    {
      id: "01",
      icon: Compass,
      title: "Pharmaceutical Product Sourcing Coordination",
      subtitle: "Finished Dosage Form Identification & Supplier Alignment",
      description:
        "We work closely with healthcare buyers and international pharmaceutical manufacturers to coordinate supply across essential therapeutic categories and dosage formats.",
      points: [
        "Oral solid dosage forms (capsules, film-coated tablets, caplets)",
        "Liquid oral suspensions in amber glass & HDPE dispensing bottles",
        "Sterile parenteral vials, ophthalmic droppers, and glass ampoules",
        "Topical barrier creams and respiratory inhalation presentations",
      ],
    },
    {
      id: "02",
      icon: Globe2,
      title: "Import and Export Coordination",
      subtitle: "Cross-Border Documentation & Freight Scheduling",
      description:
        "International healthcare trade requires meticulous coordination between manufacturers, freight forwarders, and receiving hubs. We streamline consignment workflows into and out of Malaysia.",
      points: [
        "Commercial invoice, packing list, and certificate document alignment",
        "Air-cargo and sea-freight container consolidation coordination",
        "Tropicalized secondary packaging review for ASEAN humidity conditions",
        "Proactive shipment milestone communication for buyers",
      ],
    },
    {
      id: "03",
      icon: Activity,
      title: "Medical Device Distribution",
      subtitle: "Diagnostic Hardware, Bedside Monitors & Clinical Consumables",
      description:
        "Beyond pharmaceuticals, PHARMANAS SDN BHD distributes modern clinical equipment and single-use accessories to medical centres, specialist clinics, and hospitals.",
      points: [
        "12-channel resting ECG workstations and wireless ultrasound probes",
        "Modular multi-parameter patient monitors and volumetric infusion pumps",
        "Sterile IV administration sets and reusable multi-size NIBP cuffs",
        "Benchtop steam autoclaves and portable clinical suction aspirators",
      ],
    },
    {
      id: "04",
      icon: Handshake,
      title: "Healthcare Business Partnerships",
      subtitle: "Wholesale Pharmacy & Institutional Procurement Support",
      description:
        "We build responsive, transparent B2B relationships with community pharmacies, clinic chains, hospital purchasing teams, and international trade counterparts.",
      points: [
        "Dedicated WhatsApp & email quotation desk for rapid turnaround",
        "Flexible pack-size and carton-level wholesale order structuring",
        "Scheduled replenishment coordination for recurring clinic lines",
        "Clear, honest commercial terms without hidden administrative friction",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#064E3B] via-[#075E46] to-[#087F5B] text-white py-16 lg:py-24 border-b border-[#087F5B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Our Capabilities" }]} />
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-[#B7F0D3] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>{DEFAULT_SITE_CONFIG.companyName} • Operational Scope</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Comprehensive Healthcare Import, Export &amp; Distribution Capabilities
            </h1>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed">
              Structured processes designed to move pharmaceutical products and medical devices reliably from production lines to healthcare dispensing points.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Detailed Capability Blocks */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {capabilities.map((cap, idx) => {
            const IconComp = cap.icon;
            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="bg-white rounded-3xl border border-[#DCE8E2] p-6 sm:p-10 shadow-editorial grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-[#087F5B] text-white flex items-center justify-center shadow-sm">
                      <IconComp className="w-6 h-6" />
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#EFF5F2] text-[#087F5B]">
                      Capability {cap.id}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#172B25]">
                    {cap.title}
                  </h2>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
                    {cap.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-[#172B25]/75 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="lg:col-span-7 bg-[#F8FAF9] rounded-2xl p-6 border border-[#DCE8E2] space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                    Key Coordination Deliverables
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {cap.points.map((pt) => (
                      <div
                        key={pt}
                        className="p-3.5 rounded-xl bg-white border border-[#DCE8E2] flex items-start gap-2.5 text-xs sm:text-sm text-[#172B25]/85"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4-Step B2B Quotation & Supply Process */}
      <section className="py-16 lg:py-24 bg-white border-t border-[#DCE8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] block mb-2">
              Quotation &amp; Fulfillment Workflow
            </span>
            <h2 className="text-3xl font-bold text-[#172B25]">
              How Our B2B Enquiry Process Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "Step 01",
                icon: ClipboardList,
                title: "Product Selection",
                desc: "Browse our Pharmaceutical or Medical Device divisions and select the required items and quantities.",
              },
              {
                step: "Step 02",
                icon: FileSpreadsheet,
                title: "Quotation Request",
                desc: "Use our interactive WhatsApp Enquiry calculator or corporate form to submit your pharmacist/company details.",
              },
              {
                step: "Step 03",
                icon: ShieldCheck,
                title: "Formal Commercial Offer",
                desc: "Our Kuala Lumpur desk reviews availability, pack specifications, and delivery terms to issue a formal quotation.",
              },
              {
                step: "Step 04",
                icon: Truck,
                title: "Coordinated Dispatch",
                desc: "Consignments are prepared with protective packaging and dispatched to your designated healthcare facility.",
              },
            ].map((s) => {
              const IconComp = s.icon;
              return (
                <div
                  key={s.step}
                  className="p-6 rounded-2xl bg-[#F8FAF9] border border-[#DCE8E2] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#087F5B]">
                      {s.step}
                    </span>
                    <IconComp className="w-5 h-5 text-[#087F5B]" />
                  </div>
                  <h3 className="text-base font-bold text-[#172B25]">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#172B25]/75 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="px-6 py-3.5 rounded-xl bg-[#087F5B] hover:bg-[#064E3B] text-white text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Launch WhatsApp Quotation Calculator</span>
            </button>
            <Link
              href="/products/pharmaceuticals"
              className="px-6 py-3.5 rounded-xl bg-[#EFF5F2] text-[#064E3B] text-sm font-bold inline-flex items-center gap-2"
            >
              <span>Browse Sample Product Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

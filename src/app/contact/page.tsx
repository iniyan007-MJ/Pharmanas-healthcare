"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { DEFAULT_SITE_CONFIG, withBasePath } from "@/data/siteConfig";
import { useHealthcare } from "@/context/HealthcareContext";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function ContactPage() {
  const { openEnquiry } = useHealthcare();

  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [enquiryType, setEnquiryType] = useState(
    "Pharmaceutical Products Quotation"
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Please enter your full name or pharmacist designation.");
      return;
    }
    if (!organization.trim()) {
      setError("Please enter your pharmacy, clinic, or company name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid business email address.");
      return;
    }
    if (!message.trim()) {
      setError("Please enter a brief description of your enquiry.");
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    const text = [
      `Hello ${DEFAULT_SITE_CONFIG.companyName}, I am reaching out via the Corporate Contact Page.`,
      "",
      `Name: ${fullName || "[Not provided]"}`,
      `Organization: ${organization || "[Not provided]"}`,
      `Email: ${email || "[Not provided]"}`,
      `Phone: ${phone || "[Not provided]"}`,
      `Enquiry Type: ${enquiryType}`,
      "",
      `Message: ${message || "Please share further details."}`,
    ].join("\n");

    const url = `${DEFAULT_SITE_CONFIG.whatsappUrlBase}?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#064E3B] via-[#075E46] to-[#087F5B] text-white py-16 lg:py-24 border-b border-[#087F5B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Contact Us" }]} />
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-[#B7F0D3] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Kuala Lumpur Corporate Office • Postcode 52100</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Contact {DEFAULT_SITE_CONFIG.companyName}
            </h1>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed">
              Reach out to our Kuala Lumpur team for pharmaceutical product sourcing, medical device quotations, import/export coordination, or wholesale pharmacy partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Corporate Address, Email & Direct WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-[#DCE8E2] p-6 sm:p-8 shadow-editorial space-y-6">
              <div className="flex items-center gap-4 pb-5 border-b border-[#DCE8E2]">
                <img
                  src={withBasePath("/images/pharmanas-icon-only.png")}
                  alt="PHARMANAS SDN BHD"
                  className="w-16 h-16 rounded-2xl object-contain bg-[#EAE6DF] p-1.5 border border-[#087F5B]/20 shrink-0"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B] block">
                    Corporate Headquarters
                  </span>
                  <h2 className="text-xl font-extrabold text-[#172B25]">
                    {DEFAULT_SITE_CONFIG.companyName}
                  </h2>
                  <span className="text-xs text-[#172B25]/70">
                    Kuala Lumpur, Malaysia
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#172B25] block">
                      Office Address
                    </span>
                    <p className="text-[#172B25]/80 mt-0.5 leading-relaxed">
                      568-3-143, Kompleks Mutiara,
                      <br />
                      Jln Ipoh, Kuala Lumpur,
                      <br />
                      Postcode: 52100, Malaysia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#172B25] block">
                      Email ID
                    </span>
                    <a
                      href={`mailto:${DEFAULT_SITE_CONFIG.emailPlaceholder}`}
                      className="text-[#087F5B] font-semibold hover:underline break-all"
                    >
                      {DEFAULT_SITE_CONFIG.emailPlaceholder}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#172B25] block">
                      WhatsApp Quotation Desk
                    </span>
                    <p className="text-[#172B25]/80 mt-0.5">
                      {DEFAULT_SITE_CONFIG.whatsappDisplay}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#172B25] block">
                      Business Hours
                    </span>
                    <p className="text-[#172B25]/80 mt-0.5">
                      {DEFAULT_SITE_CONFIG.businessHoursPlaceholder}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DCE8E2]">
                <button
                  type="button"
                  onClick={() => openEnquiry()}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#087F5B] hover:bg-[#064E3B] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open Itemized WhatsApp Enquiry Popup</span>
                </button>
              </div>
            </div>

            {/* Location Visual Card */}
            <div className="rounded-3xl bg-[#064E3B] text-white p-6 sm:p-7 space-y-3 border border-[#087F5B]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7F0D3]">
                <Building2 className="w-4 h-4" />
                <span>Strategic Jalan Ipoh Corridor</span>
              </div>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                Located within Kompleks Mutiara along Jalan Ipoh (52100 Kuala Lumpur), our office provides convenient access for Klang Valley healthcare partners and central coordination for nationwide and international shipments.
              </p>
            </div>
          </div>

          {/* Right Column: Validated Corporate Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#DCE8E2] p-6 sm:p-10 shadow-editorial">
              <h2 className="text-2xl font-bold text-[#172B25] mb-2">
                Send a Business or Procurement Enquiry
              </h2>
              <p className="text-sm text-[#172B25]/70 mb-6">
                Fill in your details below. All required fields are validated prior to submission.
              </p>

              {submitted ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-[#EFF5F2] border border-[#087F5B]/30 space-y-4">
                  <div className="flex items-center gap-3 text-[#064E3B]">
                    <CheckCircle2 className="w-7 h-7 text-[#087F5B] shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold">
                        Enquiry Validated &amp; Ready
                      </h3>
                      <p className="text-xs text-[#172B25]/75">
                        Thank you, {fullName} ({organization}).
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[#172B25]/85 leading-relaxed">
                    Your corporate enquiry for{" "}
                    <strong>{DEFAULT_SITE_CONFIG.companyName}</strong> has been prepared. You can forward this message immediately via WhatsApp or send an email to{" "}
                    <strong>{DEFAULT_SITE_CONFIG.emailPlaceholder}</strong>.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="px-5 py-3 rounded-xl bg-[#087F5B] hover:bg-[#064E3B] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Forward Enquiry via WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFullName("");
                        setOrganization("");
                        setEmail("");
                        setPhone("");
                        setMessage("");
                      }}
                      className="px-5 py-3 rounded-xl bg-white border border-[#DCE8E2] text-xs sm:text-sm font-semibold text-[#172B25] cursor-pointer"
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-fullname"
                        className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5"
                      >
                        Your Name / Pharmacist Designation *
                      </label>
                      <input
                        id="contact-fullname"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          setError(null);
                        }}
                        placeholder="e.g., Chief Procurement Pharmacist"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-org"
                        className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5"
                      >
                        Pharmacy / Hospital / Company Name *
                      </label>
                      <input
                        id="contact-org"
                        type="text"
                        value={organization}
                        onChange={(e) => {
                          setOrganization(e.target.value);
                          setError(null);
                        }}
                        placeholder="Enter organization name..."
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5"
                      >
                        Business Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError(null);
                        }}
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5"
                      >
                        Telephone / WhatsApp Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+60 ..."
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-type"
                      className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5"
                    >
                      Enquiry Category
                    </label>
                    <select
                      id="contact-type"
                      value={enquiryType}
                      onChange={(e) => setEnquiryType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm"
                    >
                      <option value="Pharmaceutical Products Quotation">
                        Pharmaceutical Products Quotation
                      </option>
                      <option value="Medical Devices & Equipment Supply">
                        Medical Devices &amp; Equipment Supply
                      </option>
                      <option value="Import / Export Distribution Partnership">
                        Import / Export Distribution Partnership
                      </option>
                      <option value="General Corporate Enquiry">
                        General Corporate Enquiry
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5"
                    >
                      Message / Product Requirements *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        setError(null);
                      }}
                      placeholder="Please share the product categories, estimated quantities, or distribution partnership details you would like to discuss..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-7 py-4 rounded-xl bg-[#087F5B] hover:bg-[#064E3B] text-white font-bold text-sm shadow-md inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Validate &amp; Submit Enquiry</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openEnquiry()}
                      className="px-5 py-4 rounded-xl bg-[#EFF5F2] hover:bg-[#B7F0D3]/50 text-[#064E3B] font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#087F5B]" />
                      <span>Open Product Calculator Instead</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

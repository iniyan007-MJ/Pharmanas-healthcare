"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Info,
  MessageCircle,
  Minus,
  Plus,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import {
  CURRENCIES,
  CurrencyConfig,
  DEFAULT_SITE_CONFIG,
  formatCurrency,
  ProductCategory,
  SAMPLE_PRODUCTS,
  SampleProduct,
} from "@/data/siteConfig";
import { useHealthcare } from "@/context/HealthcareContext";

export function WhatsAppEnquirySystem() {
  const {
    isEnquiryOpen,
    openEnquiry,
    closeEnquiry,
    preselectedCategory,
    preselectedProductId,
    currency,
    setCurrency,
    pharmacistOptions,
    addCustomPharmacistOption,
  } = useHealthcare();

  // Editable product list state (allows adding custom illustrative sample products)
  const [customProducts, setCustomProducts] = useState<SampleProduct[]>([]);
  const allProducts = useMemo(
    () => [...SAMPLE_PRODUCTS, ...customProducts],
    [customProducts]
  );

  // Form fields
  const [pharmacistSelection, setPharmacistSelection] = useState<string>(
    pharmacistOptions[0]
  );
  const [customPharmacistName, setCustomPharmacistName] = useState<string>("");
  const [pharmacyCompanyName, setPharmacyCompanyName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    "Pharmaceutical Products"
  );
  const [selectedProductId, setSelectedProductId] = useState<string>(
    SAMPLE_PRODUCTS[0].id
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [additionalRequirements, setAdditionalRequirements] =
    useState<string>("");

  // Optional inline custom product creator
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPriceRM, setNewProductPriceRM] = useState("150");

  // Validation & feedback state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState<
    string | null
  >(null);

  // Sync with preselected product/category when opened from a ProductCard
  useEffect(() => {
    if (isEnquiryOpen) {
      setSelectedCategory(preselectedCategory);
      setSelectedProductId(preselectedProductId);
      setErrorMsg(null);
      setGeneratedWhatsAppUrl(null);
    }
  }, [isEnquiryOpen, preselectedCategory, preselectedProductId]);

  // Filter products by selected category
  const categoryProducts = useMemo(
    () => allProducts.filter((p) => p.category === selectedCategory),
    [allProducts, selectedCategory]
  );

  // Ensure selectedProductId belongs to selectedCategory
  useEffect(() => {
    const exists = categoryProducts.some((p) => p.id === selectedProductId);
    if (!exists && categoryProducts.length > 0) {
      setSelectedProductId(categoryProducts[0].id);
    }
  }, [selectedCategory, categoryProducts, selectedProductId]);

  const currentProduct = useMemo(
    () =>
      categoryProducts.find((p) => p.id === selectedProductId) ||
      categoryProducts[0] ||
      SAMPLE_PRODUCTS[0],
    [categoryProducts, selectedProductId]
  );

  // Unit price and estimated total calculations
  const unitPriceRM = currentProduct ? currentProduct.sampleUnitPrice : 0;
  const safeQuantity = Math.max(1, Number.isFinite(quantity) ? quantity : 1);
  const estimatedTotalRM = unitPriceRM * safeQuantity;

  const formattedUnitPrice = formatCurrency(unitPriceRM, currency);
  const formattedEstimatedTotal = formatCurrency(estimatedTotalRM, currency);

  const handleCategoryChange = (newCat: ProductCategory) => {
    setSelectedCategory(newCat);
    const firstMatch = allProducts.find((p) => p.category === newCat);
    if (firstMatch) {
      setSelectedProductId(firstMatch.id);
    }
    setErrorMsg(null);
  };

  const handleQuantityChange = (val: number) => {
    if (Number.isNaN(val) || val < 1) {
      setQuantity(1);
    } else {
      setQuantity(Math.min(99999, Math.floor(val)));
    }
  };

  const handleAddCustomProduct = () => {
    const trimmed = newProductName.trim();
    const parsedPrice = parseFloat(newProductPriceRM);
    if (!trimmed || Number.isNaN(parsedPrice) || parsedPrice <= 0) return;

    const customItem: SampleProduct = {
      id: `custom-${Date.now()}`,
      slug: `custom-${Date.now()}`,
      code: "DEMO-CUSTOM",
      name: `${trimmed} (Custom Sample)`,
      category: selectedCategory,
      subcategory: "Custom Illustrative Entry",
      shortDescription: "User-configured illustrative sample item.",
      fullDescription: "User-configured illustrative sample item.",
      sampleUnitPrice: parsedPrice,
      unitLabel: "per Sample Unit (Illustrative)",
      packagingFormat: "Standard Trade Packaging (Sample)",
      storageCondition: "Standard Controlled Storage",
      supplyScope: "Illustrative Sample Enquiry",
      image:
        selectedCategory === "Pharmaceutical Products"
          ? "/images/category-pharmaceuticals.png"
          : "/images/category-devices.png",
      visualVariant:
        selectedCategory === "Pharmaceutical Products"
          ? "capsule-blister"
          : "patient-monitor",
      specifications: [],
      keyFeatures: [],
    };

    setCustomProducts((prev) => [...prev, customItem]);
    setSelectedProductId(customItem.id);
    setNewProductName("");
    setShowAddProduct(false);
  };

  const resolvedPharmacistName =
    pharmacistSelection === "Other"
      ? customPharmacistName.trim()
      : pharmacistSelection;

  // Build preview message
  const whatsappMessageText = useMemo(() => {
    const lines = [
      "Hello, I would like to enquire about the following healthcare products.",
      "",
      `Pharmacist Name: ${resolvedPharmacistName || "[Selected Name]"}`,
      `Pharmacy / Company: ${pharmacyCompanyName.trim() || "[Company Name]"}`,
      `Product Category: ${selectedCategory}`,
      `Product Name: ${currentProduct?.name || "[Product]"}`,
      `Quantity: ${safeQuantity}`,
      `Unit Price: ${formattedUnitPrice} (Sample Quotation Price)`,
      `Estimated Total: ${formattedEstimatedTotal}`,
      "",
      `Additional Requirements: ${
        additionalRequirements.trim() ? additionalRequirements.trim() : "None specified"
      }`,
      "",
      "Please share availability and a formal quotation.",
      "",
      "Thank you.",
    ];
    return lines.join("\n");
  }, [
    resolvedPharmacistName,
    pharmacyCompanyName,
    selectedCategory,
    currentProduct,
    safeQuantity,
    formattedUnitPrice,
    formattedEstimatedTotal,
    additionalRequirements,
  ]);

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!resolvedPharmacistName) {
      setErrorMsg("Please select or enter a Pharmacist Name / Role.");
      return;
    }

    if (!pharmacyCompanyName.trim()) {
      setErrorMsg("Please enter your Pharmacy or Company Name.");
      return;
    }

    if (!currentProduct) {
      setErrorMsg("Please select a product from the list.");
      return;
    }

    if (safeQuantity < 1) {
      setErrorMsg("Quantity must be at least 1.");
      return;
    }

    if (pharmacistSelection === "Other" && customPharmacistName.trim()) {
      addCustomPharmacistOption(customPharmacistName.trim());
    }

    const encodedMessage = encodeURIComponent(whatsappMessageText);
    const fullWhatsAppUrl = `${DEFAULT_SITE_CONFIG.whatsappUrlBase}?text=${encodedMessage}`;

    setGeneratedWhatsAppUrl(fullWhatsAppUrl);
    window.open(fullWhatsAppUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* FLOATING WHATSAPP BUTTON — FIXED RIGHT SIDE */}
      <div className="fixed right-5 bottom-6 z-40 flex flex-col items-end gap-2">
        <motion.button
          type="button"
          onClick={() => openEnquiry()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Open Healthcare Product Enquiry via WhatsApp"
          className="group relative flex items-center gap-3 pl-4 pr-5 py-3.5 rounded-full bg-[#087F5B] hover:bg-[#064E3B] text-white shadow-[0_14px_34px_-6px_rgba(8,127,91,0.55)] border border-[#B7F0D3]/40 transition-all cursor-pointer"
        >
          {/* Subtle Pulse Halo */}
          <span className="absolute -inset-1 rounded-full bg-[#087F5B]/30 animate-ping pointer-events-none opacity-60" />

          {/* WhatsApp Official-Style Vector Icon */}
          <span className="relative w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-inner shrink-0">
            <MessageCircle className="w-5 h-5 fill-current" />
          </span>

          <div className="relative text-left">
            <span className="block text-[10px] uppercase tracking-widest text-[#B7F0D3] font-semibold leading-none mb-1">
              Product Quotation Desk
            </span>
            <span className="block text-xs sm:text-sm font-bold leading-none">
              WhatsApp Enquiry
            </span>
          </div>
        </motion.button>
      </div>

      {/* ENQUIRY DRAWER / POPUP MODAL */}
      <AnimatePresence>
        {isEnquiryOpen && (
          <div
            className="fixed inset-0 z-50 flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-enquiry-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEnquiry}
              className="fixed inset-0 bg-[#172B25]/60 backdrop-blur-sm"
            />

            {/* Responsive Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative z-10 w-full max-w-xl bg-white h-full shadow-2xl border-l border-[#DCE8E2] flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-[#064E3B] to-[#087F5B] text-white flex items-start justify-between gap-4 shrink-0">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[#B7F0D3] text-[11px] font-semibold mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>Quotation & Supply Coordination Workflow</span>
                  </div>
                  <h2
                    id="whatsapp-enquiry-title"
                    className="text-xl sm:text-2xl font-bold tracking-tight"
                  >
                    Healthcare Product Enquiry
                  </h2>
                  <p className="text-xs text-white/80 mt-1">
                    WhatsApp Desk: {DEFAULT_SITE_CONFIG.whatsappDisplay} • Prepare your structured quotation request below.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeEnquiry}
                  aria-label="Close enquiry drawer"
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <form
                onSubmit={handleSubmitWhatsApp}
                className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5"
              >
                {/* Market Currency Selector Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2]">
                  <div className="text-xs">
                    <span className="font-bold text-[#172B25] block">
                      Quotation Currency (Configurable Market)
                    </span>
                    <span className="text-[#172B25]/65 text-[11px]">
                      Default RM for Malaysia demonstration
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {(
                      Object.keys(CURRENCIES) as Array<CurrencyConfig["code"]>
                    ).map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setCurrency(code)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          currency === code
                            ? "bg-[#087F5B] text-white shadow-xs"
                            : "bg-white text-[#172B25]/75 border border-[#DCE8E2] hover:border-[#087F5B]"
                        }`}
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error Alert */}
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* 1. Pharmacist Name (Dropdown + Other) */}
                <div>
                  <label
                    htmlFor="enquiry-pharmacist"
                    className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5"
                  >
                    1. Pharmacist Name / Buyer Role <span className="text-[#087F5B]">*</span>
                  </label>
                  <select
                    id="enquiry-pharmacist"
                    value={pharmacistSelection}
                    onChange={(e) => {
                      setPharmacistSelection(e.target.value);
                      setErrorMsg(null);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm text-[#172B25] font-medium"
                  >
                    {pharmacistOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-[#172B25]/60 mt-1">
                    Editable placeholder options for demonstration. Select &ldquo;Other&rdquo; to enter a custom name.
                  </p>

                  {pharmacistSelection === "Other" && (
                    <div className="mt-2.5">
                      <input
                        type="text"
                        value={customPharmacistName}
                        onChange={(e) => {
                          setCustomPharmacistName(e.target.value);
                          setErrorMsg(null);
                        }}
                        placeholder="Enter Pharmacist or Representative Name..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#087F5B] focus:outline-none text-sm text-[#172B25]"
                      />
                    </div>
                  )}
                </div>

                {/* 2. Pharmacy / Company Name */}
                <div>
                  <label
                    htmlFor="enquiry-company"
                    className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5"
                  >
                    2. Pharmacy / Company Name <span className="text-[#087F5B]">*</span>
                  </label>
                  <input
                    id="enquiry-company"
                    type="text"
                    value={pharmacyCompanyName}
                    onChange={(e) => {
                      setPharmacyCompanyName(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder="e.g., [Sample Healthcare Pharmacy Sdn. Bhd.]"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm text-[#172B25]"
                  />
                </div>

                {/* 3. Product Category */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5">
                    3. Product Category <span className="text-[#087F5B]">*</span>
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(
                      [
                        "Pharmaceutical Products",
                        "Medical Devices",
                      ] as ProductCategory[]
                    ).map((cat) => {
                      const active = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleCategoryChange(cat)}
                          className={`px-3.5 py-3 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer flex items-center justify-between ${
                            active
                              ? "bg-[#EFF5F2] border-[#087F5B] text-[#064E3B] shadow-xs"
                              : "bg-[#F8FAF9] border-[#DCE8E2] text-[#172B25]/75 hover:border-[#087F5B]/40"
                          }`}
                        >
                          <span>{cat}</span>
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              active ? "bg-[#087F5B]" : "bg-[#DCE8E2]"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Product Name (Dynamic Dropdown + Editable Custom Addition) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="enquiry-product"
                      className="block text-xs font-bold uppercase tracking-wider text-[#172B25]"
                    >
                      4. Product Name (Illustrative Sample) <span className="text-[#087F5B]">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowAddProduct((prev) => !prev)}
                      className="text-[11px] font-semibold text-[#087F5B] hover:underline cursor-pointer"
                    >
                      {showAddProduct ? "Cancel Custom Item" : "+ Add Custom Sample Item"}
                    </button>
                  </div>

                  <select
                    id="enquiry-product"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm text-[#172B25] font-medium"
                  >
                    {categoryProducts.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name} — {formatCurrency(prod.sampleUnitPrice, currency)}
                      </option>
                    ))}
                  </select>

                  {showAddProduct && (
                    <div className="mt-2.5 p-3.5 rounded-xl bg-[#EFF5F2]/70 border border-[#087F5B]/30 space-y-2.5">
                      <p className="text-[11px] font-semibold text-[#064E3B]">
                        Add Editable Sample Product to {selectedCategory}:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={newProductName}
                          onChange={(e) => setNewProductName(e.target.value)}
                          placeholder="Sample product name..."
                          className="sm:col-span-2 px-3 py-2 rounded-lg bg-white border border-[#DCE8E2] text-xs"
                        />
                        <input
                          type="number"
                          min="1"
                          step="0.5"
                          value={newProductPriceRM}
                          onChange={(e) => setNewProductPriceRM(e.target.value)}
                          placeholder="Sample RM"
                          className="px-3 py-2 rounded-lg bg-white border border-[#DCE8E2] text-xs"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddCustomProduct}
                        className="px-3 py-1.5 rounded-lg bg-[#087F5B] text-white text-xs font-semibold hover:bg-[#064E3B] cursor-pointer"
                      >
                        Save & Select Sample Product
                      </button>
                    </div>
                  )}
                </div>

                {/* 5. Quantity & 6. Unit Price & 7. Estimated Total */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Quantity with Increment/Decrement Controls */}
                  <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#DCE8E2]">
                    <label
                      htmlFor="enquiry-quantity"
                      className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-2"
                    >
                      5. Quantity (Min 1)
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(safeQuantity - 1)}
                        disabled={safeQuantity <= 1}
                        aria-label="Decrease quantity"
                        className="w-10 h-10 rounded-xl bg-white border border-[#DCE8E2] hover:border-[#087F5B] disabled:opacity-40 flex items-center justify-center text-[#172B25] transition-colors cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        id="enquiry-quantity"
                        type="number"
                        min={1}
                        value={safeQuantity}
                        onChange={(e) =>
                          handleQuantityChange(parseInt(e.target.value, 10))
                        }
                        className="w-full h-10 text-center font-bold text-base rounded-xl bg-white border border-[#DCE8E2] focus:border-[#087F5B] focus:outline-none text-[#172B25]"
                      />
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(safeQuantity + 1)}
                        aria-label="Increase quantity"
                        className="w-10 h-10 rounded-xl bg-white border border-[#DCE8E2] hover:border-[#087F5B] flex items-center justify-center text-[#172B25] transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="block text-[11px] text-[#172B25]/60 mt-2">
                      {currentProduct?.unitLabel}
                    </span>
                  </div>

                  {/* 6. Illustrative Unit Price */}
                  <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#DCE8E2] flex flex-col justify-between">
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1">
                        6. Unit Price (Sample)
                      </span>
                      <span className="text-xl font-bold text-[#064E3B] block">
                        {formattedUnitPrice}
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5 mt-2 text-[11px] text-[#087F5B] font-medium">
                      <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>
                        Sample quotation price only (not actual client selling price).
                      </span>
                    </div>
                  </div>
                </div>

                {/* 7. Estimated Total Banner */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#064E3B] to-[#087F5B] text-white shadow-md">
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <span className="block text-[11px] uppercase tracking-widest text-[#B7F0D3] font-semibold">
                        7. Estimated Sample Quotation Total ({currency})
                      </span>
                      <span className="text-xs text-white/80">
                        {safeQuantity} × {formattedUnitPrice}
                      </span>
                    </div>
                    <span
                      data-testid="estimated-total-display"
                      className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
                    >
                      {formattedEstimatedTotal}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#B7F0D3]/90 mt-2 pt-2 border-t border-white/15">
                    Note: This is an illustrative quotation enquiry estimate. Final pricing, availability, and delivery terms are provided upon formal quotation.
                  </p>
                </div>

                {/* 8. Additional Requirements */}
                <div>
                  <label
                    htmlFor="enquiry-notes"
                    className="block text-xs font-bold uppercase tracking-wider text-[#172B25] mb-1.5"
                  >
                    8. Additional Requirements (Optional)
                  </label>
                  <textarea
                    id="enquiry-notes"
                    rows={3}
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    placeholder="Specify preferred delivery region, cold-chain handling questions, or schedule preferences..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] focus:border-[#087F5B] focus:bg-white focus:outline-none text-sm text-[#172B25]"
                  />
                </div>

                {/* Live WhatsApp Message Preview */}
                <div className="rounded-xl bg-[#F8FAF9] border border-[#DCE8E2] p-3.5">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#064E3B] mb-1.5">
                    Formatted WhatsApp Quotation Message Preview
                  </span>
                  <pre className="text-[11px] text-[#172B25]/80 font-mono whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-[#DCE8E2]">
                    {whatsappMessageText}
                  </pre>
                </div>

                {/* Direct Fallback Link if already submitted */}
                {generatedWhatsAppUrl && (
                  <div className="p-3.5 rounded-xl bg-[#EFF5F2] border border-[#087F5B]/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-[#064E3B] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" />
                      <span>WhatsApp quotation window prepared!</span>
                    </div>
                    <a
                      href={generatedWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#087F5B] underline shrink-0"
                    >
                      <span>Open WhatsApp Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* 9. Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-[#087F5B] hover:bg-[#064E3B] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#087F5B]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Continue with WhatsApp</span>
                  </button>
                  <p className="text-center text-[11px] text-[#172B25]/60 mt-2">
                    Redirects to official WhatsApp ({DEFAULT_SITE_CONFIG.whatsappDisplay}) with your pre-filled product enquiry.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

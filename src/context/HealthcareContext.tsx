"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  CurrencyConfig,
  DEFAULT_SITE_CONFIG,
  PHARMACIST_PLACEHOLDER_OPTIONS,
  ProductCategory,
  SAMPLE_PRODUCTS,
  SampleProduct,
} from "@/data/siteConfig";

interface HealthcareContextType {
  // Configurable Site & Demo Settings
  companyName: string;
  setCompanyName: (name: string) => void;
  currency: CurrencyConfig["code"];
  setCurrency: (code: CurrencyConfig["code"]) => void;
  pharmacistOptions: string[];
  addCustomPharmacistOption: (name: string) => void;

  // WhatsApp Enquiry Modal / Drawer State
  isEnquiryOpen: boolean;
  preselectedCategory: ProductCategory;
  preselectedProductId: string;
  openEnquiry: (options?: {
    product?: SampleProduct;
    category?: ProductCategory;
  }) => void;
  closeEnquiry: () => void;

  // Product Detail Modal State
  activeDetailProduct: SampleProduct | null;
  openProductDetail: (product: SampleProduct) => void;
  closeProductDetail: () => void;

  // Global Quick Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const HealthcareContext = createContext<HealthcareContextType | undefined>(
  undefined
);

export function HealthcareProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [companyName, setCompanyName] = useState<string>(
    DEFAULT_SITE_CONFIG.companyName
  );
  const [currency, setCurrency] = useState<CurrencyConfig["code"]>(
    DEFAULT_SITE_CONFIG.defaultCurrency
  );
  const [pharmacistOptions, setPharmacistOptions] = useState<string[]>(
    PHARMACIST_PLACEHOLDER_OPTIONS
  );

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [preselectedCategory, setPreselectedCategory] =
    useState<ProductCategory>("Pharmaceutical Products");
  const [preselectedProductId, setPreselectedProductId] = useState<string>(
    SAMPLE_PRODUCTS[0].id
  );

  const [activeDetailProduct, setActiveDetailProduct] =
    useState<SampleProduct | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const addCustomPharmacistOption = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setPharmacistOptions((prev) => {
      if (prev.includes(trimmed)) return prev;
      const withoutOther = prev.filter((item) => item !== "Other");
      return [...withoutOther, trimmed, "Other"];
    });
  }, []);

  const openEnquiry = useCallback(
    (options?: { product?: SampleProduct; category?: ProductCategory }) => {
      if (options?.product) {
        setPreselectedCategory(options.product.category);
        setPreselectedProductId(options.product.id);
      } else if (options?.category) {
        setPreselectedCategory(options.category);
        const firstInCat = SAMPLE_PRODUCTS.find(
          (p) => p.category === options.category
        );
        if (firstInCat) {
          setPreselectedProductId(firstInCat.id);
        }
      }
      setIsEnquiryOpen(true);
    },
    []
  );

  const closeEnquiry = useCallback(() => {
    setIsEnquiryOpen(false);
  }, []);

  const openProductDetail = useCallback((product: SampleProduct) => {
    setActiveDetailProduct(product);
  }, []);

  const closeProductDetail = useCallback(() => {
    setActiveDetailProduct(null);
  }, []);

  return (
    <HealthcareContext.Provider
      value={{
        companyName,
        setCompanyName,
        currency,
        setCurrency,
        pharmacistOptions,
        addCustomPharmacistOption,
        isEnquiryOpen,
        preselectedCategory,
        preselectedProductId,
        openEnquiry,
        closeEnquiry,
        activeDetailProduct,
        openProductDetail,
        closeProductDetail,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </HealthcareContext.Provider>
  );
}

export function useHealthcare() {
  const ctx = useContext(HealthcareContext);
  if (!ctx) {
    throw new Error("useHealthcare must be used within a HealthcareProvider");
  }
  return ctx;
}

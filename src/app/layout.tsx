import type { Metadata } from "next";
import "./globals.css";
import { HealthcareProvider } from "@/context/HealthcareContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { WhatsAppEnquirySystem } from "@/components/WhatsAppEnquirySystem";

export const metadata: Metadata = {
  title:
    "PHARMANAS SDN BHD | Pharmaceutical Products, Medical Devices & Healthcare Distribution (Malaysia)",
  description:
    "Connecting Healthcare Products to the Markets That Need Them. PHARMANAS SDN BHD is your trusted Malaysian partner for pharmaceutical products, medical devices, and healthcare import, export, and distribution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#F8FAF9] text-[#172B25] flex flex-col antialiased selection:bg-[#B7F0D3] selection:text-[#064E3B]">
        <HealthcareProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ProductDetailModal />
          <WhatsAppEnquirySystem />
        </HealthcareProvider>
      </body>
    </html>
  );
}

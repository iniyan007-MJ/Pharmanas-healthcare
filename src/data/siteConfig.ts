export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(assetPath: string): string {
  if (!assetPath.startsWith("/")) return assetPath;
  if (BASE_PATH && !assetPath.startsWith(BASE_PATH)) {
    return `${BASE_PATH}${assetPath}`;
  }
  return assetPath;
}

export type ProductCategory = "Pharmaceutical Products" | "Medical Devices";

export interface SampleProduct {
  id: string;
  slug: string;
  code: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  shortDescription: string;
  fullDescription: string;
  sampleUnitPrice: number; // Base in RM (Malaysian Ringgit) — Illustrative Sample Quotation Price
  unitLabel: string;
  packagingFormat: string;
  storageCondition: string;
  supplyScope: string;
  image: string;
  visualVariant:
    | "capsule-blister"
    | "tablet-strip"
    | "caplet-pack"
    | "amber-bottle"
    | "hdpe-bottle"
    | "sterile-vial"
    | "ophthalmic-dropper"
    | "glass-ampoule"
    | "dermal-tube"
    | "respiratory-inhaler"
    | "ecg-system"
    | "ultrasound-probe"
    | "ir-thermometer"
    | "patient-monitor"
    | "infusion-pump"
    | "pulse-oximeter"
    | "infusion-set"
    | "nibp-cuff"
    | "suction-unit"
    | "sterilizer-unit";
  specifications: { label: string; value: string }[];
  keyFeatures: string[];
}

export interface CurrencyConfig {
  code: "RM" | "USD" | "SGD" | "EUR" | "INR";
  symbol: string;
  name: string;
  rateFromRM: number; // Illustrative conversion multiplier for multi-market demo
}

export const CURRENCIES: Record<CurrencyConfig["code"], CurrencyConfig> = {
  RM: {
    code: "RM",
    symbol: "RM",
    name: "Malaysian Ringgit (MYR)",
    rateFromRM: 1,
  },
  USD: {
    code: "USD",
    symbol: "US$",
    name: "US Dollar (USD)",
    rateFromRM: 0.23,
  },
  SGD: {
    code: "SGD",
    symbol: "S$",
    name: "Singapore Dollar (SGD)",
    rateFromRM: 0.31,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro (EUR)",
    rateFromRM: 0.21,
  },
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee (INR)",
    rateFromRM: 19.2,
  },
};

export const DEFAULT_SITE_CONFIG = {
  companyName: "PHARMANAS SDN BHD",
  companySubtitle: "Healthcare Import, Export & Distribution • Kuala Lumpur, Malaysia",
  companyTagline: "Connecting Healthcare Products to the Markets That Need Them.",
  brandMonogram: "PN",
  logoImage: "/images/pharmanas-logo.png",
  countryMarket: "Malaysia & International Trade Corridors",
  addressPlaceholder:
    "568-3-143, Kompleks Mutiara, Jln Ipoh, 52100 Kuala Lumpur, Malaysia",
  warehousePlaceholder:
    "Kuala Lumpur & Klang Valley Healthcare Distribution Corridor, Malaysia",
  emailPlaceholder: "pharmanassdnbhd@gmail.com",
  phonePlaceholder: "+91 7812891999 (Enquiry Desk) / Kuala Lumpur Office",
  whatsappNumberRaw: "917812891999",
  whatsappDisplay: "+91 7812891999",
  whatsappUrlBase: "https://wa.me/917812891999",
  businessHoursPlaceholder: "Monday – Friday: 09:00 AM – 06:00 PM (MYT / GMT+8)",
  defaultCurrency: "RM" as CurrencyConfig["code"],
  developedBy: "DUONOVIK",
  disclaimerNote:
    "Official Corporate Demonstration Platform for PHARMANAS SDN BHD (568-3-143, Kompleks Mutiara, Jln Ipoh, 52100 Kuala Lumpur) — Developed by DUONOVIK. Product listings and prices shown in the catalogue are illustrative sample demonstrations for quotation workflows.",
};

export const PHARMACIST_PLACEHOLDER_OPTIONS = [
  "Pharmacist Placeholder 01 — Chief / Lead Procurement Pharmacist",
  "Pharmacist Placeholder 02 — Hospital & Institutional Pharmacist",
  "Pharmacist Placeholder 03 — Community / Retail Pharmacy Buyer",
  "Pharmacist Placeholder 04 — Regional Healthcare Distribution Coordinator",
  "Pharmacist Placeholder 05 — Medical Device & Clinical Supply Specialist",
  "Other",
];

export const SAMPLE_PRODUCTS: SampleProduct[] = [
  // ==========================================
  // 1. PHARMACEUTICAL PRODUCTS (10 ITEMS)
  // ==========================================
  {
    id: "pharma-01",
    slug: "enteric-coated-gastro-capsules",
    code: "DEMO-PH-101",
    name: "Enteric-Coated Gastro-Protective Capsules (Sample Formulation)",
    category: "Pharmaceutical Products",
    subcategory: "Capsules and Tablets",
    shortDescription:
      "Illustrative delayed-release hard gelatin capsules engineered with moisture-barrier alu-alu blister packaging for hospital and retail pharmacy channels.",
    fullDescription:
      "This demonstration product illustrates a standard pharmaceutical solid-dosage capsule line suitable for import and wholesale distribution. Packaged in high-barrier aluminum-aluminum blister strips to support stability in tropical ASEAN climates.",
    sampleUnitPrice: 145.0,
    unitLabel: "per Trade Box (10 × 10 Blister Capsules — Sample Quote)",
    packagingFormat: "Alu-Alu Blister Pack • 10 Strips × 10 Capsules per Carton",
    storageCondition: "Store below 30°C in a dry environment, protected from direct light",
    supplyScope: "Wholesale Pharmacy & Hospital Procurement Coordination (Illustrative)",
    image: "/images/hero-pharma.png",
    visualVariant: "capsule-blister",
    specifications: [
      { label: "Dosage Form", value: "Hard Gelatin Delayed-Release Capsule (Sample)" },
      { label: "Primary Packaging", value: "Cold-Form Alu-Alu Blister Strip" },
      { label: "Pack Configuration", value: "100 Capsules per Trade Carton" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Tropicalized high-barrier blister presentation for humid climate distribution",
      "Clear batch & expiry matrix panel layout for institutional receiving",
      "Structured secondary carton design for automated pharmacy shelving",
    ],
  },
  {
    id: "pharma-02",
    slug: "sustained-release-cardio-tablets",
    code: "DEMO-PH-102",
    name: "Sustained-Release Film-Coated Tablets (Sample Formulation)",
    category: "Pharmaceutical Products",
    subcategory: "Capsules and Tablets",
    shortDescription:
      "Illustrative scored film-coated tablets in PVC/PVDC-aluminum calendar blister packs designed for chronic care distribution demonstrations.",
    fullDescription:
      "An illustrative solid oral dosage presentation representing routine chronic-care pharmaceutical lines handled across regional distribution networks. Features calendar-indexed blister strips and tamper-evident outer cartons.",
    sampleUnitPrice: 118.0,
    unitLabel: "per Trade Carton (6 × 14 Tablets — Sample Quote)",
    packagingFormat: "PVC/PVDC Blister • 84 Film-Coated Tablets per Box",
    storageCondition: "Controlled room temperature (below 25°C – 30°C)",
    supplyScope: "Import & Regional Distribution Portfolio Sample",
    image: "/images/category-pharmaceuticals.png",
    visualVariant: "tablet-strip",
    specifications: [
      { label: "Dosage Form", value: "Biconvex Film-Coated Scored Tablet (Sample)" },
      { label: "Primary Packaging", value: "High-Barrier PVDC Blister Foil" },
      { label: "Pack Configuration", value: "84 Tablets (6 Blister Cards × 14)" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Precision-scored tablet presentation with smooth film coating",
      "Patient-friendly calendar blister indexing for dispensing accuracy",
      "Export-ready carton serialization placeholder layout",
    ],
  },
  {
    id: "pharma-03",
    slug: "effervescent-electrolyte-caplets",
    code: "DEMO-PH-103",
    name: "Micronized Dispersible Caplets & Sachet Pack (Sample Formulation)",
    category: "Pharmaceutical Products",
    subcategory: "Capsules and Tablets",
    shortDescription:
      "Illustrative rapid-dispersion caplets in desiccant-lined multi-layer foil strips for acute care and outpatient pharmacy supply.",
    fullDescription:
      "Represents fast-dispersing solid oral formulations packaged in laminated aluminum foil strips. Designed as a demonstration item showcasing diverse oral solid dosage categories in our healthcare catalogue.",
    sampleUnitPrice: 92.5,
    unitLabel: "per Dispenser Box (50 Caplets — Sample Quote)",
    packagingFormat: "Laminated Foil Strip • 5 × 10 Caplets",
    storageCondition: "Keep tightly sealed in original moisture-resistant packaging",
    supplyScope: "Retail & Clinic Distribution Demonstration",
    image: "/images/hero-pharma.png",
    visualVariant: "caplet-pack",
    specifications: [
      { label: "Dosage Form", value: "Oblong Film-Coated Caplet (Sample)" },
      { label: "Primary Packaging", value: "Triple-Laminated Aluminum Strip" },
      { label: "Pack Configuration", value: "50 Caplets per Inner Box" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Individual pocket-sealed foil cavities for humidity protection",
      "Easy-tear notched perforations for clinical nurse dispensing",
      "Compact shelf footprint for high-density pharmacy drawers",
    ],
  },
  {
    id: "pharma-04",
    slug: "amber-glass-oral-suspension-bottle",
    code: "DEMO-PH-201",
    name: "Amber Glass Oral Liquid Suspension 200ml (Sample Formulation)",
    category: "Pharmaceutical Products",
    subcategory: "Pharmaceutical Bottles",
    shortDescription:
      "Illustrative USP Type III amber glass pharmaceutical bottle with child-resistant cap and calibrated dosing cup.",
    fullDescription:
      "This illustrative pharmaceutical bottle entry showcases liquid oral formulations distributed with protective secondary cartons, calibrated polypropylene measuring cups, and tamper-evident induction seals.",
    sampleUnitPrice: 164.0,
    unitLabel: "per Case of 12 Bottles (200ml each — Sample Quote)",
    packagingFormat: "200ml Amber Glass Bottle × 12 Units per Shipping Case",
    storageCondition: "Store upright below 30°C; protect from light",
    supplyScope: "Wholesale Liquid Formulation Distribution Sample",
    image: "/images/pharma-bottles.png",
    visualVariant: "amber-bottle",
    specifications: [
      { label: "Container Type", value: "200ml Amber Borosilicate / Soda-Lime Glass" },
      { label: "Closure System", value: "Tamper-Evident Child-Resistant Screw Cap" },
      { label: "Accessory Included", value: "Graduated 2.5ml – 20ml Dosing Cup" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "UV-filtering amber glass wall protects light-sensitive liquid formulations",
      "Shock-absorbent corrugated partition dividers for safe transit",
      "Graduated dosing cup locked over closure cap",
    ],
  },
  {
    id: "pharma-05",
    slug: "hdpe-clinical-dispensing-bottle",
    code: "DEMO-PH-202",
    name: "High-Barrier HDPE Bulk Dispensing Bottle 500s (Sample Formulation)",
    category: "Pharmaceutical Products",
    subcategory: "Pharmaceutical Bottles",
    shortDescription:
      "Illustrative medical-grade white HDPE bottle with integrated silica gel desiccant canister and heat-induction foil seal.",
    fullDescription:
      "Represents institutional bulk tablet/capsule containers supplied to hospital dispensaries and medical centres. Equipped with an aluminum induction liner and food/pharma-grade moisture absorber canister.",
    sampleUnitPrice: 280.0,
    unitLabel: "per Institutional Bottle (500 Count — Sample Quote)",
    packagingFormat: "Wide-Mouth HDPE Bottle • 500 Units + Desiccant Capsule",
    storageCondition: "Store in cool, dry dispensary environment below 30°C",
    supplyScope: "Institutional & Hospital Dispensary Coordination Sample",
    image: "/images/pharma-bottles.png",
    visualVariant: "hdpe-bottle",
    specifications: [
      { label: "Container Material", value: "Opaque Pharmaceutical-Grade HDPE" },
      { label: "Seal Integrity", value: "Hermetic Aluminum Heat-Induction Liner" },
      { label: "Moisture Control", value: "Non-Dusting Silica Gel Canister Included" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Wide-mouth ergonomics for rapid automated or manual tablet counting",
      "High-opacity polymer body prevents photodegradation",
      "Wrap-around matte clinical label with peel-off documentation tab",
    ],
  },
  {
    id: "pharma-06",
    slug: "sterile-lyophilized-injection-vials",
    code: "DEMO-PH-301",
    name: "Sterile Lyophilized Powder for Solution 10ml Vial (Sample Formulation)",
    category: "Pharmaceutical Products",
    subcategory: "Vials and Liquid Formulations",
    shortDescription:
      "Illustrative tubular borosilicate glass vials with bromobutyl rubber stoppers and emerald flip-off aluminum seals.",
    fullDescription:
      "A demonstration parenteral presentation illustrating sterile vial packaging handled under temperature-monitored logistics workflows. Packaged in moulded protective trays to prevent glass-to-glass contact.",
    sampleUnitPrice: 340.0,
    unitLabel: "per Tray Box of 10 Vials (10ml — Sample Quote)",
    packagingFormat: "10ml Clear Type I Glass Vial × 10 in Clamshell Tray",
    storageCondition: "Temperature-monitored storage (2°C–8°C or below 25°C per product spec)",
    supplyScope: "Hospital & Specialist Clinic Supply Coordination Sample",
    image: "/images/pharma-vials.png",
    visualVariant: "sterile-vial",
    specifications: [
      { label: "Vial Specification", value: "10ml Clear Tubular Borosilicate Glass" },
      { label: "Closure System", value: "20mm Elastomeric Stopper + Flip-Off Seal" },
      { label: "Secondary Protection", value: "Thermoformed PET Shock-Guard Tray" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Clean flip-off polypropylene cap over crimped aluminum ferrule",
      "Anti-breakage individual vial slots for international air/sea freight",
      "High-contrast graduated inspection window on vial label",
    ],
  },
  {
    id: "pharma-07",
    slug: "isotonic-ophthalmic-dropper-solution",
    code: "DEMO-PH-302",
    name: "Sterile Multi-Dose Ophthalmic Dropper Solution 15ml (Sample Formulation)",
    category: "Pharmaceutical Products",
    subcategory: "Vials and Liquid Formulations",
    shortDescription:
      "Illustrative LDPE sterile dropper bottle with precision micro-nozzle and tamper-evident shrink band.",
    fullDescription:
      "Demonstrates sterile liquid dropper formulations for ophthalmic or otic care categories. Features a calibrated drop-volume nozzle tip and sterile-filtered primary packaging representation.",
    sampleUnitPrice: 128.0,
    unitLabel: "per Box of 10 Dropper Units (15ml — Sample Quote)",
    packagingFormat: "15ml LDPE Dropper Bottle × 10 Individual Cartons",
    storageCondition: "Store below 25°C; protect from freezing",
    supplyScope: "Specialty Clinic & Pharmacy Distribution Sample",
    image: "/images/category-pharmaceuticals.png",
    visualVariant: "ophthalmic-dropper",
    specifications: [
      { label: "Bottle Type", value: "15ml Squeezable Medical LDPE Dropper" },
      { label: "Nozzle Mechanism", value: "Controlled Micro-Drop Dispensing Tip" },
      { label: "Tamper Evidence", value: "Break-Away Ratchet Ring Closure" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Consistent drop calibration for accurate topical administration",
      "Ergonomic soft-squeeze bottle geometry",
      "Individual unit cartons with leaflet insert compartment",
    ],
  },
  {
    id: "pharma-08",
    slug: "parenteral-single-dose-glass-ampoules",
    code: "DEMO-PH-303",
    name: "One-Point-Cut (OPC) Sterile Glass Ampoules 5ml (Sample Formulation)",
    category: "Pharmaceutical Products",
    subcategory: "Vials and Liquid Formulations",
    shortDescription:
      "Illustrative 5ml clear glass ampoules with precision colour-break rings arranged in rigid fluted PVC trays.",
    fullDescription:
      "Represents small-volume parenteral liquid ampoules for acute clinical environments. Engineered with One-Point-Cut (OPC) scoring for clean manual opening without glass particulate shedding.",
    sampleUnitPrice: 210.0,
    unitLabel: "per Carton of 20 Ampoules (5ml — Sample Quote)",
    packagingFormat: "4 Trays × 5 Ampoules (5ml each) per Outer Box",
    storageCondition: "Store in original carton below 25°C",
    supplyScope: "Acute Care & Institutional Distribution Sample",
    image: "/images/pharma-vials.png",
    visualVariant: "glass-ampoule",
    specifications: [
      { label: "Ampoule Capacity", value: "5ml Flame-Sealed Borosilicate Glass" },
      { label: "Opening System", value: "One-Point-Cut (OPC) Ceramic Dot Score" },
      { label: "Tray Packaging", value: "Rigid Fluted Cradle (5 Ampoules/Tray)" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Colour-coded ceramic neck ring for rapid visual verification",
      "Snug-fit fluted tray prevents transit vibration damage",
      "Clear lot number and expiry laser-etched on glass stem",
    ],
  },
  {
    id: "pharma-09",
    slug: "dermatological-topical-emulsion-tube",
    code: "DEMO-PH-401",
    name: "Laminated Barrier Dermatological Cream Tube 50g (Sample Formulation)",
    category: "Pharmaceutical Products",
    subcategory: "Topical and Specialty Formulations",
    shortDescription:
      "Illustrative collapsible aluminum-barrier laminated tube with piercing nozzle cap for dermatology and topical care lines.",
    fullDescription:
      "Illustrates semi-solid pharmaceutical creams, gels, and ointments distributed to dermatology clinics and retail pharmacies. The multi-layer aluminum barrier prevents oxidation and collapse drawbacks.",
    sampleUnitPrice: 156.0,
    unitLabel: "per Pack of 12 Tubes (50g — Sample Quote)",
    packagingFormat: "50g ABL Laminated Tube in Individual Carton × 12",
    storageCondition: "Store below 30°C; do not freeze",
    supplyScope: "Dermatology & Retail Pharmacy Distribution Sample",
    image: "/images/category-pharmaceuticals.png",
    visualVariant: "dermal-tube",
    specifications: [
      { label: "Tube Material", value: "5-Layer Aluminum Barrier Laminate (ABL)" },
      { label: "Orifice Seal", value: "Blind Aluminum Membrane + Piercer Cap" },
      { label: "Net Fill Weight", value: "50g per Collapsible Tube (Illustrative)" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Hermetic membrane nozzle preserves formulation freshness prior to first use",
      "Smooth memory-free tube walls for complete dispensing",
      "Clean bilingual label space for regional compliance stickers",
    ],
  },
  {
    id: "pharma-10",
    slug: "metered-dose-respiratory-actuator",
    code: "DEMO-PH-402",
    name: "Pressurized Metered-Dose Respiratory Actuator Unit (Sample Formulation)",
    category: "Pharmaceutical Products",
    subcategory: "Topical and Specialty Formulations",
    shortDescription:
      "Illustrative precision inhalation actuator with integrated dose-counter window and protective mouthpiece cap.",
    fullDescription:
      "A demonstration respiratory delivery presentation featuring an ergonomic L-shaped polypropylene actuator, anodized aluminum canister housing, and mechanical dose indicator window.",
    sampleUnitPrice: 295.0,
    unitLabel: "per Box of 6 Inhaler Units (Sample Quote)",
    packagingFormat: "200-Actuation Canister + Actuator × 6 Units",
    storageCondition: "Store below 30°C away from direct heat sources",
    supplyScope: "Respiratory Care Distribution Portfolio Sample",
    image: "/images/hero-pharma.png",
    visualVariant: "respiratory-inhaler",
    specifications: [
      { label: "Delivery Format", value: "Metered-Dose Inhalation Actuator (Sample)" },
      { label: "Canister Body", value: "Internal-Coated Seamless Aluminum" },
      { label: "Dose Tracking", value: "Integrated Forward-Reading Counter Window" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Attached dust-cap strap prevents mouthpiece contamination",
      "High-contrast mechanical dose counter for patient adherence",
      "Moisture-pouch secondary wrapping inside unit carton",
    ],
  },

  // ==========================================
  // 2. MEDICAL DEVICES (10 ITEMS)
  // ==========================================
  {
    id: "device-01",
    slug: "digital-12-channel-resting-ecg-system",
    code: "DEMO-MD-501",
    name: "Digital 12-Channel Resting ECG Workstation (Sample Device)",
    category: "Medical Devices",
    subcategory: "Diagnostic Equipment",
    shortDescription:
      "Illustrative clinical 12-lead electrocardiograph featuring a 10.1-inch anti-glare touchscreen, thermal recorder, and LAN/DICOM connectivity.",
    fullDescription:
      "This demonstration diagnostic unit represents modern cardiology and general clinic screening equipment distributed to healthcare facilities. Combines simultaneous 12-lead signal acquisition with high-resolution waveform display and Z-fold thermal printing.",
    sampleUnitPrice: 4850.0,
    unitLabel: "per Complete Clinical Unit (Sample Quote)",
    packagingFormat: "Main Console + Patient Cable + Electrode Set in Foam-Lined Crate",
    storageCondition: "Operating temperature 5°C–40°C; relative humidity ≤80%",
    supplyScope: "Hospital & Medical Centre Equipment Distribution Sample",
    image: "/images/devices-diagnostic.png",
    visualVariant: "ecg-system",
    specifications: [
      { label: "Display Interface", value: "10.1\" High-Resolution Color Tilt Touchscreen" },
      { label: "Lead Acquisition", value: "Simultaneous 12-Channel Digital Sampling" },
      { label: "Output Format", value: "210mm Z-Fold Thermal Printer + PDF/USB Export" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Intuitive one-touch workflow with lead-off detection indicators",
      "Built-in rechargeable lithium battery for mobile ward rounds",
      "Supplied with complete limb and chest suction electrode starter kit",
    ],
  },
  {
    id: "device-02",
    slug: "wireless-point-of-care-ultrasound-probe",
    code: "DEMO-MD-502",
    name: "Dual-Head Wireless Point-of-Care Ultrasound Scanner (Sample Device)",
    category: "Medical Devices",
    subcategory: "Diagnostic Equipment",
    shortDescription:
      "Illustrative handheld convex/linear dual-array ultrasound transducer with wireless tablet/workstation imaging integration.",
    fullDescription:
      "Demonstrates next-generation portable diagnostic imaging equipment for bedside triage, vascular access, and outpatient evaluations. Features a sealed water-resistant housing and inductive charging dock.",
    sampleUnitPrice: 6200.0,
    unitLabel: "per Scanner Kit with Charging Dock (Sample Quote)",
    packagingFormat: "Handheld Transducer + Wireless Dock + Hard Carrying Case",
    storageCondition: "Ambient clinical environment; IPX7 wipe-clean enclosure",
    supplyScope: "Point-of-Care Diagnostic Device Distribution Sample",
    image: "/images/devices-diagnostic.png",
    visualVariant: "ultrasound-probe",
    specifications: [
      { label: "Transducer Array", value: "Dual-Head Convex + Linear Acoustic Array" },
      { label: "Connectivity", value: "Dual-Band High-Speed Wi-Fi & USB-C" },
      { label: "Enclosure Rating", value: "Seamless Disinfectant-Ready Medical Housing" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Cable-free ergonomics for rapid bedside and emergency assessments",
      "B-Mode, M-Mode, and Color Doppler illustrative visualization modes",
      "Delivered in a custom pelicase-style shockproof transport case",
    ],
  },
  {
    id: "device-03",
    slug: "clinical-infrared-thermometry-pack",
    code: "DEMO-MD-503",
    name: "Clinical Non-Contact Infrared Thermometry System (Sample Device)",
    category: "Medical Devices",
    subcategory: "Diagnostic Equipment",
    shortDescription:
      "Illustrative dual-mode clinical infrared thermometer with distance guidance sensor and backlit tri-color OLED readout.",
    fullDescription:
      "Represents high-turnover outpatient screening and triage diagnostic devices supplied in bulk to clinics, pharmacies, and occupational health centres.",
    sampleUnitPrice: 680.0,
    unitLabel: "per Master Carton of 10 Units (Sample Quote)",
    packagingFormat: "10 Individual Retail/Clinical Boxes per Master Carton",
    storageCondition: "Store in dry indoor storage between -20°C and 55°C",
    supplyScope: "Clinic & Pharmacy Wholesale Device Distribution Sample",
    image: "/images/category-devices.png",
    visualVariant: "ir-thermometer",
    specifications: [
      { label: "Measurement Mode", value: "Non-Contact Forehead & Surface Calibration" },
      { label: "Response Time", value: "≤ 1.0 Second Optical Thermopile Sensor" },
      { label: "Memory Recall", value: "32-Reading Clinical Log with Mute Mode" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Optical distance-check indicator ensures consistent measurement distance",
      "Silent night-ward mode for pediatric and inpatient rounds",
      "Supplied with protective storage cradle and quick-reference guide",
    ],
  },
  {
    id: "device-04",
    slug: "multi-parameter-bedside-patient-monitor",
    code: "DEMO-MD-601",
    name: "15-Inch Modular Multi-Parameter Patient Monitor (Sample Device)",
    category: "Medical Devices",
    subcategory: "Patient Monitoring Devices",
    shortDescription:
      "Illustrative ICU/ward bedside monitor displaying ECG, SpO2, NIBP, Respiration, and Dual-Channel Temperature waveforms.",
    fullDescription:
      "A flagship medical equipment demonstration unit illustrating critical-care and general-ward patient monitoring systems. Designed with fanless silent cooling, a 360-degree visible alarm light bar, and modular parameter slots.",
    sampleUnitPrice: 7400.0,
    unitLabel: "per Bedside Monitor System (Sample Quote)",
    packagingFormat: "Monitor Mainframe + SpO2 Sensor + NIBP Hose/Cuff + ECG Trunk Cable",
    storageCondition: "Indoor hospital/clinical environment",
    supplyScope: "Hospital Ward & ICU Equipment Distribution Sample",
    image: "/images/category-devices.png",
    visualVariant: "patient-monitor",
    specifications: [
      { label: "Display Panel", value: "15.6\" HD Capacitive Anti-Glare IPS Screen" },
      { label: "Standard Parameters", value: "5-Lead ECG, SpO2, NIBP, RESP, 2-TEMP" },
      { label: "Cooling Architecture", value: "Fanless Dust-Free Convection Chassis" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Fanless acoustic design reduces cross-contamination and ward noise",
      "Configurable big-numerics view for across-the-room visibility",
      "Compatible with rolling floor stands and wall-mount rails",
    ],
  },
  {
    id: "device-05",
    slug: "dual-channel-volumetric-infusion-pump",
    code: "DEMO-MD-602",
    name: "Smart Dual-Channel Volumetric IV Infusion Pump (Sample Device)",
    category: "Medical Devices",
    subcategory: "Patient Monitoring Devices",
    shortDescription:
      "Illustrative peristaltic IV infusion pump with ultrasonic air-in-line detection, dynamic pressure monitoring, and IV pole clamp.",
    fullDescription:
      "Illustrates precision fluid-delivery and patient care hardware distributed to surgical centres and inpatient wards. Features independent dual-channel control and stackable workstation interlocking.",
    sampleUnitPrice: 3950.0,
    unitLabel: "per Dual-Channel Pump Unit (Sample Quote)",
    packagingFormat: "Infusion Pump Unit + Rotating Pole Clamp + AC Power Cord",
    storageCondition: "Clean indoor medical equipment storage",
    supplyScope: "Clinical Fluid Therapy Equipment Distribution Sample",
    image: "/images/category-devices.png",
    visualVariant: "infusion-pump",
    specifications: [
      { label: "Channel Configuration", value: "2 Independent Peristaltic Infusion Channels" },
      { label: "Safety Sensors", value: "Ultrasonic Air-Bubble & Multi-Level Occlusion" },
      { label: "Mounting System", value: "360° Quick-Release IV Pole Clamp" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Color-coded dual screen layout prevents channel programming confusion",
      "Motorized anti-bolus pressure release mechanism",
      "Long-life internal battery backup for patient transport between departments",
    ],
  },
  {
    id: "device-06",
    slug: "tabletop-clinical-pulse-oximetry-system",
    code: "DEMO-MD-603",
    name: "High-Sensitivity Tabletop Pulse Oximeter & Perfusion Monitor (Sample Device)",
    category: "Medical Devices",
    subcategory: "Patient Monitoring Devices",
    shortDescription:
      "Illustrative desktop/portable SpO2, Pulse Rate, and Perfusion Index monitor with plethysmograph waveform display.",
    fullDescription:
      "Represents compact continuous and spot-check oximetry monitors used in recovery rooms, procedural suites, and outpatient clinics. Built to maintain signal lock during low-perfusion or patient motion.",
    sampleUnitPrice: 1890.0,
    unitLabel: "per Tabletop Monitor Kit (Sample Quote)",
    packagingFormat: "Main Oximeter Unit + Adult Reusable Finger Clip Sensor + Desk Dock",
    storageCondition: "Standard room temperature clinical storage",
    supplyScope: "Outpatient & Recovery Ward Device Distribution Sample",
    image: "/images/category-devices.png",
    visualVariant: "pulse-oximeter",
    specifications: [
      { label: "Measured Metrics", value: "SpO2 (%), Pulse Rate (bpm), Perfusion Index (PI)" },
      { label: "Waveform Display", value: "Real-Time Plethysmogram + Signal IQ Bar" },
      { label: "Data Storage", value: "Up to 72 Hours Trend Table Review" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "High-visibility color TFT screen with adjustable alarm thresholds",
      "Includes soft silicone reusable adult sensor probe",
      "Compact carry handle integrates directly with bedside rails",
    ],
  },
  {
    id: "device-07",
    slug: "sterile-iv-infusion-administration-sets",
    code: "DEMO-MD-701",
    name: "Sterile Luer-Lock IV Infusion Administration Sets (Sample Accessory)",
    category: "Medical Devices",
    subcategory: "Medical Accessories",
    shortDescription:
      "Illustrative DEHP-free sterile gravity/pump infusion sets with 15-micron fluid filter, roller clamp, and needle-free Y-site.",
    fullDescription:
      "Demonstrates high-volume medical consumables and single-use clinical accessories distributed alongside hospital capital equipment. Individually blister-pouched in peel-open sterile medical paper/film.",
    sampleUnitPrice: 420.0,
    unitLabel: "per Shipping Carton of 100 Sterile Sets (Sample Quote)",
    packagingFormat: "100 Individually Pouched Sterile Sets per Export Carton",
    storageCondition: "Store in clean, dry warehouse away from direct sunlight",
    supplyScope: "Consumables & Disposables Wholesale Distribution Sample",
    image: "/images/devices-sterilizer.png",
    visualVariant: "infusion-set",
    specifications: [
      { label: "Tubing Material", value: "Kink-Resistant Medical-Grade DEHP-Free PVC" },
      { label: "Connector Type", value: "Universal Rotating Male Luer-Lock Collar" },
      { label: "Drip Chamber", value: "20 Drops/ml Flexible Clear Chamber + 15µm Filter" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Smooth V-track roller clamp for consistent flow rate titration",
      "Latex-free injection port compatible with standard clinical protocols",
      "Color-coded outer master cartons for rapid warehouse picking",
    ],
  },
  {
    id: "device-08",
    slug: "reusable-antimicrobial-nibp-cuff-kit",
    code: "DEMO-MD-702",
    name: "Reusable TPU Multi-Size NIBP Blood Pressure Cuff Kit (Sample Accessory)",
    category: "Medical Devices",
    subcategory: "Medical Accessories",
    shortDescription:
      "Illustrative bladderless wipe-clean NIBP cuffs (Pediatric, Adult, Large Adult) with quick-connect metal bayonet fittings.",
    fullDescription:
      "An illustrative diagnostic accessory kit compatible with standard patient monitors and sphygmomanometers. Constructed from soft thermoplastic polyurethane (TPU) with artery index alignment markers.",
    sampleUnitPrice: 360.0,
    unitLabel: "per 4-Size Clinical Cuff Kit (Sample Quote)",
    packagingFormat: "Set of 4 Cuffs (Child, Adult, Adult Long, Thigh) + Quick Connectors",
    storageCondition: "Ambient clinical accessory storage",
    supplyScope: "Patient Monitor Accessory Distribution Sample",
    image: "/images/devices-sterilizer.png",
    visualVariant: "nibp-cuff",
    specifications: [
      { label: "Cuff Construction", value: "One-Piece Bladderless Wipe-Clean TPU" },
      { label: "Included Sizes", value: "Pediatric, Standard Adult, Large Adult, Thigh" },
      { label: "Hose Configuration", value: "Single/Dual Tube with Metal Quick-Release" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Rounded soft-edge corners maximize patient comfort during repeated inflation",
      "Clear range indicators verify proper limb circumference fit",
      "Resistant to standard hospital surface disinfectants",
    ],
  },
  {
    id: "device-09",
    slug: "portable-clinical-suction-aspirator",
    code: "DEMO-MD-801",
    name: "Oil-Free Piston Clinical Suction Aspirator Unit (Sample Device)",
    category: "Medical Devices",
    subcategory: "Clinical and Surgical Support",
    shortDescription:
      "Illustrative low-noise portable medical suction unit with 1000ml autoclavable polycarbonate collection jar and hydrophobic bacterial filter.",
    fullDescription:
      "Represents essential clinical support equipment supplied to minor procedure rooms, dental/surgical suites, and emergency wards. Features an oil-free maintenance-free piston pump and precise vacuum regulator dial.",
    sampleUnitPrice: 1450.0,
    unitLabel: "per Complete Suction Unit (Sample Quote)",
    packagingFormat: "Main Aspirator + 1000ml Jar + Silicone Tubing Set + Spare Filters",
    storageCondition: "Clean indoor equipment storage",
    supplyScope: "Surgical & Minor Procedure Device Distribution Sample",
    image: "/images/category-devices.png",
    visualVariant: "suction-unit",
    specifications: [
      { label: "Pump Mechanism", value: "Maintenance-Free Oil-Less Piston Cylinder" },
      { label: "Collection Jar", value: "1000ml Shatter-Resistant Autoclavable PC Jar" },
      { label: "Overflow Protection", value: "Integrated Mechanical Float Shut-Off Valve" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Step-less vacuum control knob with color-zoned gauge readout",
      "Hydrophobic inline filter protects internal pump components",
      "Lightweight molded ABS body with recessed carry handle",
    ],
  },
  {
    id: "device-10",
    slug: "tabletop-class-b-steam-autoclave",
    code: "DEMO-MD-802",
    name: "23L Tabletop Pre-Vacuum Steam Sterilization Chamber (Sample Device)",
    category: "Medical Devices",
    subcategory: "Clinical and Surgical Support",
    shortDescription:
      "Illustrative automated benchtop steam sterilizer with 3-tier stainless steel instrument trays and digital cycle cycle-log printer.",
    fullDescription:
      "Showcases infection-control and sterilization capital equipment distributed to specialist clinics, dental practices, and outpatient surgery centres. Features a one-piece electropolished 304 stainless steel chamber.",
    sampleUnitPrice: 8900.0,
    unitLabel: "per 23L Benchtop Autoclave Unit (Sample Quote)",
    packagingFormat: "Autoclave Unit + 3 Instrument Trays + Drain Hose + Export Pallet Crate",
    storageCondition: "Indoor clinical utility room environment",
    supplyScope: "Sterilization & Clinic Setup Equipment Distribution Sample",
    image: "/images/devices-sterilizer.png",
    visualVariant: "sterilizer-unit",
    specifications: [
      { label: "Chamber Volume", value: "23 Liters Electropolished 304 Stainless Steel" },
      { label: "Vacuum System", value: "Triple-Pulse Fractional Pre-Vacuum Drying" },
      { label: "Cycle Documentation", value: "Built-In Thermal Cycle Printer + USB Log" },
      { label: "Catalogue Status", value: "Demonstration Sample Only" },
    ],
    keyFeatures: [
      "Dual mechanical and electromagnetic safety door interlock system",
      "Separate clean and used water reservoirs with water-quality sensor",
      "Pre-programmed cycles for wrapped, unwrapped, and delicate instruments",
    ],
  },
];

export function formatCurrency(
  amountInRM: number,
  currencyCode: CurrencyConfig["code"] = "RM"
): string {
  const config = CURRENCIES[currencyCode] || CURRENCIES.RM;
  const converted = amountInRM * config.rateFromRM;
  return `${config.symbol} ${converted.toLocaleString("en-MY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

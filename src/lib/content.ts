import {
  Activity,
  BadgeCheck,
  Brain,
  Building2,
  ClipboardList,
  Database,
  FlaskConical,
  KeyRound,
  Lock,
  Microscope,
  Pill,
  ReceiptText,
  ScrollText,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export interface Vertical {
  icon: LucideIcon;
  title: string;
  tagline: string;
  bullets: string[];
}

export const verticals: Vertical[] = [
  {
    icon: Building2,
    title: 'Hospitals & Clinics',
    tagline: 'End-to-end clinical and operational workflows.',
    bullets: [
      'OPD / IPD, ER, ICU, OT, wards, nursing, MRD',
      'Bed & queue management, OT scheduling, blood bank',
      'Billing, tariffs, estimates, claims and pre-auth',
    ],
  },
  {
    icon: Microscope,
    title: 'Diagnostics',
    tagline: 'LIS + RIS/PACS in one tenant-aware platform.',
    bullets: [
      'Phlebotomy, analyzer capture, microbiology',
      'Pathology & radiology reporting, PACS viewer',
      'Referral portal, result delivery, e-signatures',
    ],
  },
  {
    icon: Pill,
    title: 'Pharmacy',
    tagline: 'E-prescription dispense to vendor reconciliation.',
    bullets: [
      'POS, batch / expiry, FEFO, narcotics register',
      'Vendor management, GRN, e-claims',
      'Inventory across hospital and retail counters',
    ],
  },
  {
    icon: Smartphone,
    title: 'Patient Mobile App',
    tagline: 'Records, appointments, consent — patient-first.',
    bullets: [
      'ABHA linkage, digital consent, health locker',
      'Appointments, reports, supportive therapy plans',
      'Insurance / ABDM bundles, family records',
    ],
  },
];

export interface SpineModule {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const spineModules: SpineModule[] = [
  {
    number: '01',
    title: 'Identity & records',
    description:
      'Master Patient Index, ABHA linkage, biometric de-duplication, role-aware audit on every read.',
    icon: KeyRound,
  },
  {
    number: '02',
    title: 'Care workflow',
    description:
      'EMR / HMS encounters, orders, discharge, smart triage, structured notifications across teams.',
    icon: Stethoscope,
  },
  {
    number: '03',
    title: 'Operations',
    description:
      'Beds, queues, nurse tasks, duty roster, inventory, procurement — coordinated in real time.',
    icon: Workflow,
  },
  {
    number: '04',
    title: 'Revenue',
    description:
      'Tenant metering, patient billing, tariffs, estimates, pre-auth, payer claims and reconciliation.',
    icon: ReceiptText,
  },
  {
    number: '05',
    title: 'Intelligence',
    description:
      'Risk models, discharge accelerator, drift monitoring, clinician-in-the-loop overrides.',
    icon: Brain,
  },
  {
    number: '06',
    title: 'Governance',
    description:
      'Reporting, regulatory exports, immutable audits, findings tracker for NABH / DPDP / ABDM.',
    icon: ScrollText,
  },
];

export interface Pillar {
  icon: LucideIcon;
  title: string;
  bullets: string[];
}

export const pillars: Pillar[] = [
  {
    icon: Brain,
    title: 'AI-driven intelligence',
    bullets: [
      'Predictive risk stratification for sepsis & deterioration',
      'Automated AI claim-scrubbing for insurance',
      'Drift monitoring with clinician override loops',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'High-stakes security',
    bullets: [
      'Field-level AES-256 encryption, TLS 1.2+ in transit',
      'MFA, SSO/OIDC/SAML, biometric step-up for high-risk actions',
      'Tenant isolation, break-glass with mandatory review',
    ],
  },
  {
    icon: BadgeCheck,
    title: 'Regulatory excellence',
    bullets: [
      'Architected for DPDP Act 2023 from day one',
      'ABDM-ready: HIP/HIU registration, FHIR R4 bundles',
      'India data residency, immutable audit, NABH exports',
    ],
  },
];

export interface ComplianceBadge {
  label: string;
  hint: string;
}

export const complianceBadges: ComplianceBadge[] = [
  { label: 'ABDM', hint: 'Ayushman Bharat Digital Mission' },
  { label: 'DPDP Act 2023', hint: 'Digital Personal Data Protection' },
  { label: 'NABH', hint: 'National Accreditation Board for Hospitals' },
  { label: 'CERT-In', hint: 'Indian Computer Emergency Response Team' },
  { label: 'FHIR R4', hint: 'HL7 interoperability standard' },
  { label: 'SNOMED · LOINC', hint: 'Clinical & observation dictionaries' },
  { label: 'ICD-10', hint: 'WHO diagnosis coding' },
  { label: 'AES-256', hint: 'Field-level encryption' },
  { label: 'India data residency', hint: 'In-country storage & backup' },
];

export interface PricingTier {
  name: string;
  vertical: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
  icon: LucideIcon;
}

export const pricingTiers: PricingTier[] = [
  {
    name: 'Hospital',
    vertical: 'Hospitals & Clinics',
    price: '₹49',
    unit: '/ bed / month',
    description: 'Full HMS + EMR — OPD, IPD, OT, ER, billing, MRD, nursing.',
    features: [
      'All clinical & operational modules',
      'ABHA + ABDM integration',
      'Field-level encryption + audit',
      'NABH / DPDP exports',
    ],
    highlighted: true,
    ctaLabel: 'Talk to sales',
    icon: Building2,
  },
  {
    name: 'Diagnostics',
    vertical: 'Diagnostics labs & imaging',
    price: '₹19',
    unit: '/ accession / month',
    description: 'LIS + RIS/PACS, analyzer capture, referral portal.',
    features: [
      'Pathology + radiology reporting',
      'Analyzer integration',
      'Referrer portal & e-signatures',
      'FHIR R4 result bundles',
    ],
    ctaLabel: 'Talk to sales',
    icon: FlaskConical,
  },
  {
    name: 'Pharmacy',
    vertical: 'Hospital & retail pharmacy',
    price: '₹2,499',
    unit: '/ counter / month',
    description: 'Dispense, POS, batch/expiry, narcotics, e-claims.',
    features: [
      'FEFO + narcotics register',
      'Vendor management & GRN',
      'Hospital + retail counters',
      'Insurance e-claims',
    ],
    ctaLabel: 'Talk to sales',
    icon: Pill,
  },
  {
    name: 'Patient app',
    vertical: 'Patient-facing mobile',
    price: 'Free',
    unit: 'per patient',
    description: 'White-labelled mobile app for your patients.',
    features: [
      'Records, reports, appointments',
      'Digital consent & ABHA linkage',
      'Insurance + ABDM bundles',
      'Push notifications',
    ],
    ctaLabel: 'Get a build',
    icon: Smartphone,
  },
];

export interface PlatformStat {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const platformStats: PlatformStat[] = [
  { value: '4', label: 'Healthcare verticals on one tenant', icon: Activity },
  { value: '85+', label: 'Bounded data domains in IP module alone', icon: Database },
  { value: 'FHIR R4', label: 'Container model + SNOMED / LOINC / ICD-10', icon: ClipboardList },
  { value: 'AES-256', label: 'Field-level encryption, India residency', icon: Lock },
];

export const navLinks = [
  { href: '#platform', label: 'Platform' },
  { href: '#verticals', label: 'Verticals' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#compliance', label: 'Compliance' },
  { href: '#demo', label: 'Request demo' },
];

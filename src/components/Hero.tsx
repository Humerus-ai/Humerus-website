import { motion } from 'framer-motion';
import { ArrowRight, Building2, FlaskConical, Pill, ShieldCheck, Smartphone, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white"
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 right-1/2 -z-10 h-[480px] w-[480px] translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
      />

      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 backdrop-blur px-3 py-1 text-xs font-semibold text-brand-700">
            <Sparkles className="h-3.5 w-3.5" />
            Multi-tenant SaaS · ABDM-ready · DPDP Act 2023
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-slate-900">
            The unified <span className="text-brand-600">healthcare SaaS</span> ecosystem.
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 max-w-2xl">
            Humerus is one platform for hospitals, diagnostics, pharmacy and patients — built on a
            shared spine of identity, consent, orders, billing and audit. Engineered for India's
            DPDP Act, ABHA-linked from day one.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#demo" className="btn-primary">
              Request a demo <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#platform" className="btn-secondary">
              See the platform
            </a>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Field-level AES-256 · India data residency · Immutable audit
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="lg:col-span-5"
        >
          <EcosystemVisual />
        </motion.div>
      </div>
    </section>
  );
}

function EcosystemVisual() {
  const orbit = [
    { label: 'Hospitals', icon: Building2, angle: 0 },
    { label: 'Diagnostics', icon: FlaskConical, angle: 90 },
    { label: 'Pharmacy', icon: Pill, angle: 180 },
    { label: 'Patient app', icon: Smartphone, angle: 270 },
  ];

  return (
    <div className="relative mx-auto aspect-square max-w-md">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-100 to-white shadow-card" />
      <div className="absolute inset-6 rounded-full border border-dashed border-brand-300/70 animate-pulse-soft" />
      <div className="absolute inset-16 rounded-full border border-dashed border-brand-300/40" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-5 shadow-card-hover">
          <img src="/logo.png" alt="" className="h-10 w-10" />
          <div className="mt-2 text-sm font-bold text-brand-700">Humerus core</div>
          <div className="text-[11px] uppercase tracking-wider text-slate-500">
            Patient-centric spine
          </div>
        </div>
      </div>

      {orbit.map(({ label, icon: Icon, angle }) => {
        const radius = 42;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + radius * Math.cos(rad);
        const y = 50 + radius * Math.sin(rad);
        return (
          <div
            key={label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-card">
              <Icon className="h-5 w-5 text-brand-600" />
            </div>
            <span className="rounded-md bg-white/80 px-2 py-0.5 text-[11px] font-semibold text-slate-700 backdrop-blur">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

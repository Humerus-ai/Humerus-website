import { Check } from 'lucide-react';
import { Section } from './ui/Section';
import { pricingTiers } from '../lib/content';

export function Pricing() {
  return (
    <Section
      id="pricing"
      align="center"
      eyebrow="Pricing"
      title="One platform. Pricing that fits each vertical."
      subtitle="Indicative pricing for India launch. Annual contracts include implementation, ABDM onboarding and 24×7 support."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pricingTiers.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.name}
              className={`relative rounded-2xl border p-6 flex flex-col text-left transition ${
                t.highlighted
                  ? 'border-brand-500 bg-brand-50/40 shadow-card-hover dark:border-brand-500 dark:bg-brand-900/20'
                  : 'border-slate-200 bg-white hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700'
              }`}
            >
              {t.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white dark:bg-brand-500">
                  Most popular
                </span>
              )}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand-600 shadow-card dark:bg-slate-800 dark:text-brand-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-semibold text-slate-900 dark:text-white">{t.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{t.vertical}</div>
                </div>
              </div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{t.price}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">{t.unit}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t.description}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2 text-slate-700 dark:text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#demo"
                className={`mt-6 ${t.highlighted ? 'btn-primary' : 'btn-secondary'} w-full justify-center`}
              >
                {t.ctaLabel}
              </a>
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-xs text-slate-500 dark:text-slate-400">
        Custom pricing available for enterprise hospital chains and lab networks. Contact sales for a tenant-specific quote.
      </p>
    </Section>
  );
}

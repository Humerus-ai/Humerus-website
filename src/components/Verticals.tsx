import { Check } from 'lucide-react';
import { Section } from './ui/Section';
import { Card } from './ui/Card';
import { verticals } from '../lib/content';

export function Verticals() {
  return (
    <Section
      id="verticals"
      eyebrow="Four verticals, one platform"
      title="Built for every corner of healthcare delivery."
      subtitle="Hospitals, diagnostics labs, pharmacies and patients run on the same tenant-aware spine — no integration tax."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {verticals.map((v, i) => (
          <Card key={v.title} delay={i * 0.05} className="h-full">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-100 dark:bg-brand-900/40 dark:text-brand-300 dark:group-hover:bg-brand-900/70">
                <v.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{v.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{v.tagline}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-2">
              {v.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

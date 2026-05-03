import { Check } from 'lucide-react';
import { Section } from './ui/Section';
import { Card } from './ui/Card';
import { pillars } from '../lib/content';

export function AISecurity() {
  return (
    <Section
      id="compliance"
      eyebrow="Technology & compliance"
      title="Engineered for the high-stakes side of healthcare."
      subtitle="Clinical safety, security, and regulatory readiness aren't bolted on later — they're architectural decisions in Phase 1."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {pillars.map((p, i) => (
          <Card key={p.title} delay={i * 0.05} className="h-full">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/10 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
              <p.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{p.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {p.bullets.map((b) => (
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

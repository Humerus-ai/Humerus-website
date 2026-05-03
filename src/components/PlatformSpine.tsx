import { Section } from './ui/Section';
import { Card } from './ui/Card';
import { spineModules } from '../lib/content';

export function PlatformSpine() {
  return (
    <Section
      id="platform"
      className="bg-slate-50"
      eyebrow="One reusable backbone"
      title="The shared platform spine."
      subtitle="Patient identity, consent, orders, billing, audit and interoperability — built once, reused across every vertical."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {spineModules.map((m, i) => (
          <Card key={m.title} delay={i * 0.04} className="h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-[0.18em] text-brand-600">{m.number}</span>
              <m.icon className="h-5 w-5 text-slate-400 group-hover:text-brand-600 transition" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-900">{m.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

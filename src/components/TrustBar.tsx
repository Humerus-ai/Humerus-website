import { complianceBadges } from '../lib/content';

export function TrustBar() {
  return (
    <section
      id="compliance-strip"
      aria-label="Compliance and standards"
      className="border-y border-slate-200 bg-slate-50"
    >
      <div className="container-page py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {complianceBadges.map((b) => (
          <span
            key={b.label}
            title={b.hint}
            className="text-xs sm:text-sm font-semibold tracking-wide text-slate-600"
          >
            {b.label}
          </span>
        ))}
      </div>
    </section>
  );
}

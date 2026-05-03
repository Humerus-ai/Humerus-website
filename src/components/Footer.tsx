export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-page py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2 sm:col-span-1">
          <img src="/logo.png" alt="Humerus" className="h-9 w-auto object-contain dark:brightness-110" />
          <p className="mt-3 text-sm text-slate-600 max-w-xs dark:text-slate-400">
            The unified healthcare SaaS ecosystem for hospitals, diagnostics, pharmacy and patients.
          </p>
        </div>
        <FooterCol
          title="Platform"
          links={[
            ['Verticals', '#verticals'],
            ['Backbone', '#platform'],
            ['Compliance', '#compliance'],
            ['Pricing', '#pricing'],
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            ['About', '#'],
            ['Customers', '#'],
            ['Careers', '#'],
            ['Contact', '#demo'],
          ]}
        />
        <FooterCol
          title="Resources"
          links={[
            ['ABDM readiness', '#compliance'],
            ['DPDP Act 2023', '#compliance'],
            ['Security', '#compliance'],
            ['Privacy policy', '#'],
          ]}
        />
      </div>
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-xs text-slate-500 dark:text-slate-400">
          <span>© {year} Humerus Technologies. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <Badge>DPDP-ready</Badge>
            <Badge>ABDM-aligned</Badge>
            <Badge>India data residency</Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
        {title}
      </h4>
      <ul className="mt-3 space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="text-sm text-slate-600 hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-300"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
      {children}
    </span>
  );
}

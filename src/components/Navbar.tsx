import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../lib/content';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center" aria-label="Humerus home">
          <img src="/logo.png" alt="Humerus" className="h-9 w-auto object-contain" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.slice(0, -1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-700"
            >
              {link.label}
            </a>
          ))}
          <a href="#demo" className="btn-primary !py-2 !text-sm">
            Request demo
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="md:hidden rounded-lg p-2 text-slate-700 hover:bg-slate-100"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="container-page flex flex-col py-4 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-700"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

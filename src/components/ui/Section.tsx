import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  className = '',
  align = 'left',
  children,
}: PropsWithChildren<SectionProps>) {
  const alignment = align === 'center' ? 'text-center mx-auto' : '';
  return (
    <section id={id} className={`py-20 sm:py-24 ${className}`}>
      <div className="container-page">
        {(eyebrow || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`max-w-2xl ${alignment} mb-12 sm:mb-16`}
          >
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg leading-relaxed text-slate-600">{subtitle}</p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

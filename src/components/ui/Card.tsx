import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

interface CardProps {
  className?: string;
  delay?: number;
}

export function Card({ className = '', delay = 0, children }: PropsWithChildren<CardProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35, ease: 'easeOut', delay }}
      className={`group rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:border-brand-200 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700 ${className}`}
    >
      {children}
    </motion.div>
  );
}

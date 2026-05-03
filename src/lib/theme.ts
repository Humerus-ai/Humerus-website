import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'humerus-theme';

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // SSR-safe: defaults to light, will sync on mount.
    if (typeof window === 'undefined') return 'light';
    return (document.documentElement.classList.contains('dark') ? 'dark' : 'light') as Theme;
  });

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage may be blocked; ignore.
    }
  }, [theme]);

  // Follow system changes only when the user hasn't pinned a choice.
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
      setTheme(e.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return {
    theme,
    toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    setTheme,
  };
}

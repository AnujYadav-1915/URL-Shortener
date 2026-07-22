import React from 'react';
import { useTheme, Theme } from '../lib/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  
  const themes: { id: Theme; label: string }[] = [
    { id: 'stripe', label: 'Minimal Stripe' },
    { id: 'fintech', label: 'Modern Fintech' },
    { id: 'brutal', label: 'Neo-Brutalism' },
    { id: 'apple', label: 'Apple Soft' },
    { id: 'cyber', label: 'Cyber Dark' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 p-3 bg-skin-card rounded-theme-card border border-skin-border shadow-theme">
      <p className="text-xs font-bold font-heading text-skin-text mb-1 px-1">Select UI Theme:</p>
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`text-left text-sm px-3 py-1.5 rounded-theme transition-colors ${
            theme === t.id
              ? 'bg-skin-primary text-white font-bold'
              : 'text-skin-text hover:bg-skin-surface'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

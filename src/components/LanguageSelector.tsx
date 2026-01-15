import React from 'react';
import type { Language } from '../types';
import { Globe2 } from 'lucide-react';

interface Props {
  language: Language;
  onChange: (lang: Language) => void;
}

export function LanguageSelector({ language, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Globe2 className="w-5 h-5 text-gray-500" />
      <select
        value={language}
        onChange={(e) => onChange(e.target.value as Language)}
        className="bg-transparent border-none text-sm text-gray-600 focus:ring-0 cursor-pointer"
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
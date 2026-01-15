import React from 'react';
import type { Unit, Language } from '../types';
import { translations, unitLabels } from '../translations';
import { RulerIcon } from 'lucide-react';

interface Props {
  unit: Unit;
  onChange: (unit: Unit) => void;
  language: Language;
}

export function UnitSelector({ unit, onChange, language }: Props) {
  const t = translations[language];

  return (
    <div className="flex items-center gap-2">
      <RulerIcon className="w-5 h-5 text-gray-500" />
      <select
        value={unit}
        onChange={(e) => onChange(e.target.value as Unit)}
        className="bg-transparent border-none text-sm text-gray-600 focus:ring-0 cursor-pointer"
      >
        {(Object.keys(unitLabels) as Unit[]).map((u) => (
          <option key={u} value={u}>
            {unitLabels[u][language]}
          </option>
        ))}
      </select>
    </div>
  );
}
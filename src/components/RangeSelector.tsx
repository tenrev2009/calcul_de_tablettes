import React from 'react';
import type { ProductRange, Language } from '../types';
import { RANGE_CONFIGS } from '../config';
import { translations } from '../translations';
import { LayoutGrid, Columns, Table2, Grid2X2, Grid } from 'lucide-react';

interface Props {
  selectedRange: ProductRange;
  onChange: (range: ProductRange) => void;
  language: Language;
}

const RangeIcons: Record<ProductRange, React.ComponentType<{ className?: string }>> = {
  londonMetal: LayoutGrid,
  london: Grid,
  classic: Columns,
  classicNoPanel: Grid2X2,
  lingo: Table2
};

export function RangeSelector({ selectedRange, onChange, language }: Props) {
  const t = translations[language];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {t.selectRange}
      </h2>
      <div className="space-y-4">
        {(Object.entries(RANGE_CONFIGS) as [ProductRange, typeof RANGE_CONFIGS[ProductRange]][]).map(
          ([key, config]) => (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`w-full text-left transition-colors ${
                selectedRange === key 
                  ? 'bg-indigo-50 border-2 border-indigo-500' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              } rounded-xl overflow-hidden`}
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 mb-2">{config.name[language]}</h3>
                    <p className="text-sm text-gray-600">{config.description[language]}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 p-4 border border-gray-200 flex items-center justify-center">
                      {React.createElement(RangeIcons[key], {
                        className: `w-full h-full ${
                          selectedRange === key 
                            ? 'text-indigo-600' 
                            : 'text-gray-500'
                        }`
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          )
        )}
      </div>
    </div>
  );
}